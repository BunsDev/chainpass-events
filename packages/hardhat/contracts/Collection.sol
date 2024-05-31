// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collection is ERC721URIStorage, Ownable {
    uint256 public _nextTokenId;

    constructor()
        ERC721("EventTicket", "GM2T")
    {}
    function batchMint(address to, uint256 quantity, string memory tokenUri) external {
        for (uint256 i = 0; i < quantity; i++) {
            mintTokens(to, tokenUri);
        }
    }

    function mintTokens(address to, string memory tokenUri) internal returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        _nextTokenId++;
        return tokenId;
    }
    
    function getTotalCollection() external view returns (uint256) {
        return _nextTokenId;
    }
}