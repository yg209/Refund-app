// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./RefundToken.sol";

contract RefundEscrow is Ownable, ReentrancyGuard {
    RefundToken public refundToken;

    event RefundCreated(address indexed user, uint256 amount);
    event RefundReleased(address indexed user, uint256 amount);

    constructor(address tokenAddress) {
        refundToken = RefundToken(tokenAddress);
    }

    function createRefund(address user, uint256 amountUSD) external onlyOwner nonReentrant {
        emit RefundCreated(user, amountUSD);
        refundToken.mint(user, amountUSD);
        emit RefundReleased(user, amountUSD);
    }
}
