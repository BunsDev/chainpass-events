// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
contract Minter is Ownable {
    struct Event {
        string name;
        uint256 date;
        uint256 ticketSupply;
        uint256 ticketsMinted;
        bool exists;
        string description;
        string tokenUri;
        string imageUrl;
        uint256 tokenIdStartAt;
    }
    struct TicketInfo {
        uint256 tokenId;
        uint256 eventId;
    }
    mapping(uint256 => Event) public events;
    uint256 public nextEventId;
    Collection public collection;
    event EventCreated(uint256 indexed eventId, string name, uint256 date, uint256 ticketSupply, string description);
    event TicketClaimed(uint256 indexed eventId, address indexed user, uint256 tokenId);
    constructor(address collectionAddress) {
        collection = Collection(collectionAddress);
    }
    function createEvent(
        string memory name,
        uint256 date,
        uint256 ticketSupply,
        string memory description,
        string memory tokenUri,
        string memory imageUrl
    ) external onlyOwner {
        require(ticketSupply > 0, "Ticket supply must be greater than zero");
        uint256 eventId = nextEventId;
        uint256 tokenIdStartsAt = collection.getTotalCollection();
        events[eventId] = Event(name, date, ticketSupply, 0, true, description, tokenUri, imageUrl, tokenIdStartsAt);
        nextEventId++;
        collection.batchMint(address(this), ticketSupply, tokenUri);
        emit EventCreated(eventId, name, date, ticketSupply, description);
    }
    function claimTicket(uint256 eventId) external {
        Event storage eventInfo = events[eventId];
        require(eventInfo.exists, "Event does not exist");
        require(eventInfo.ticketsMinted < eventInfo.ticketSupply, "No more tickets available");
        uint256 tokenId = eventInfo.tokenIdStartAt + eventInfo.ticketsMinted;
        eventInfo.ticketsMinted++;
        collection.transferFrom(address(this), msg.sender, tokenId);
        emit TicketClaimed(eventId, msg.sender, tokenId);
    }
    function getEvent(uint256 eventId) external view returns (Event memory) {
        return events[eventId];
    }
    function getTotalEvents() external view returns (uint256) {
        return nextEventId;
    }
    //TO DO: Improve this logic
    function getUserTickets(address walletOwner) external view returns (TicketInfo[] memory) {
        uint256 totalTokens = collection.getTotalCollection();
        uint256[] memory userTokenIds = new uint256[](totalTokens);
        uint256 userTicketsCount = 0;
        for (uint256 i = 0; i < totalTokens; i++) {
            if (collection.ownerOf(i) == walletOwner) {
                userTokenIds[userTicketsCount] = i;
                userTicketsCount++;
            }
        }
        TicketInfo[] memory userTickets = new TicketInfo[](userTicketsCount);
        uint256 ticketIndex = 0;
        for (uint256 j = 0; j < userTicketsCount; j++) {
            uint256 tokenId = userTokenIds[j];
            for (uint256 eventId = 0; eventId < nextEventId; eventId++) {
                Event storage eventInfo = events[eventId];
                if (tokenId >= eventInfo.tokenIdStartAt && tokenId < (eventInfo.tokenIdStartAt + eventInfo.ticketSupply)) {
                    userTickets[ticketIndex] = TicketInfo({
                        tokenId: tokenId,
                        eventId: eventId
                    });
                    ticketIndex++;
                    break;
                }
            }
        }
        return userTickets;
    }
}
