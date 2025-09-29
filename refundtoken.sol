// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.20;
 import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";
 import "@openzeppelin/contracts/security/Pausable.sol";
 import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
 contract RefundToken is ERC20, Ownable, Pausable, ReentrancyGuard {
     uint256 public multiplier = 2;
     address public escrow;
     constructor() ERC20("Refund Guardian Token","RGT"){}
     modifier onlyEscrow(){require(msg.sender==escrow,"not escrow");_; }
     function setEscrow(address _esc) external onlyOwner { escrow=_esc; }
     function setMultiplier(uint256 m) external onlyOwner { multiplier=m; }
     function mintForRefund(address to, uint256 refundAmountUSD) external whenNotPaused nonReentrant onlyEscrow {
         uint256 tokens = refundAmountUSD * multiplier * (10 ** decimals());
         _mint(to,tokens);
     }
 }
sol