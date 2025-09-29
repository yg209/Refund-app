// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.20;
 import "@openzeppelin/contracts/access/Ownable.sol";
 import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
 import "./RefundToken.sol";
 contract RefundEscrow is Ownable, ReentrancyGuard {
     RefundToken public refundToken;
     event RefundCreated(uint256 id, address user, uint256 amountUSD);
     uint256 private _next = 1;
     struct Refund { address user; uint256 amountUSD; bool executed; }
     mapping(uint256 => Refund) public refunds;
     constructor(address tokenAddr){ refundToken = RefundToken(tokenAddr); }
     function createRefund(address user, uint256 amountUSD) external onlyOwner returns (uint256) {
         uint256 id = _next++;
         refunds[id] = Refund(user, amountUSD, false);
         refundToken.mintForRefund(user, amountUSD);
         emit RefundCreated(id, user, amountUSD);
         return id;
     }
     function setToken(address tokenAddr) external onlyOwner { refundToken = RefundToken(tokenAddr); }
 }
SO