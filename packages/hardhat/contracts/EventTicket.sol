// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicket is ERC721, ERC721Burnable, Ownable {
    uint256 public _nextTokenId;

    constructor(address initialOwner)
        ERC721("EventTicket", "EES")
    {}

    function mintEventToken(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _mint(to, tokenId);
        _nextTokenId++;
        return tokenId;
    }

    function batchMint(address to, uint256 quantity) external onlyOwner {
        for (uint256 i = 0; i < quantity; i++) {
            mintEventToken(to);
        }
    }
}