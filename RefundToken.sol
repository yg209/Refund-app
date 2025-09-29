// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract RefundToken is ERC20, Ownable, Pausable, ReentrancyGuard {
    uint256 public multiplier = 2;
    address public escrow;

    event MultiplierUpdated(uint256 oldValue, uint256 newValue);
    event EscrowUpdated(address indexed oldEscrow, address indexed newEscrow);

    constructor() ERC20("Refund Guardian Token", "RGT") {}

    function setMultiplier(uint256 _multiplier) external onlyOwner {
        require(_multiplier > 0 && _multiplier <= 10, "Invalid multiplier");
        emit MultiplierUpdated(multiplier, _multiplier);
        multiplier = _multiplier;
    }

    function setEscrow(address _escrow) external onlyOwner {
        emit EscrowUpdated(escrow, _escrow);
        escrow = _escrow;
    }

    function mint(address to, uint256 refundAmountUSD) external whenNotPaused nonReentrant {
        require(msg.sender == escrow, "Not authorized");
        uint256 tokensToMint = refundAmountUSD * multiplier;
        _mint(to, tokensToMint);
    }
}
