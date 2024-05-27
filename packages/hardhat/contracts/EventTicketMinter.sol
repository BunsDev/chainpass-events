// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract EventTicketMinter is ERC721, Ownable {
    uint256 public _nextTokenId;

    constructor()
        ERC721("EventTicket", "GM2T")
    {}

    function batchMint(address to, uint256 quantity) external {
        for (uint256 i = 0; i < quantity; i++) {
            mintTokens(to);
        }
    }

    function mintTokens(address to) internal returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _mint(to, tokenId);
        _nextTokenId++;
        return tokenId;
    }
}