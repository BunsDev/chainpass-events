// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collection is ERC721URIStorage, Ownable {
    uint256 public _nextTokenId;
    address private _minter;

    constructor() ERC721("EventTicket", "GM2T"){}

    modifier onlyMinter() {
        require(_minter == _msgSender(), "caller is not the minter");
        _;
    }

    function setMinter(address minter) external onlyOwner {
        _minter = minter;
    }

    function batchMint(address to, uint256 quantity, string memory tokenUri) external onlyMinter{
        for (uint256 i = 0; i < quantity; i++) {
            mintTokens(to, tokenUri);
        }
    }

    function mint(address to, uint256 tokenId, string memory tokenUri) external onlyMinter {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    function burn(uint256 tokenId) external onlyMinter{
        _burn(tokenId);
    }

    function mintTokens(address to, string memory tokenUri) internal {
        uint256 tokenId = _nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        _nextTokenId++;
    }

    function getTotalCollection() external view returns (uint256) {
        return _nextTokenId;
    }
}