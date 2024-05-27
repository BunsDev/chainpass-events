// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./EventTicket.sol";

contract EventTicketManager is Ownable {
    struct Event {
        string name;
        uint256 date;
        uint256 ticketSupply;
        uint256 ticketsMinted;
        bool exists;
    }

    mapping(uint256 => Event) public events;
    uint256 public nextEventId;
    EventTicket public collection;

    event EventCreated(uint256 indexed eventId, string name, uint256 date, uint256 ticketSupply);
    event TicketClaimed(uint256 indexed eventId, address indexed user, uint256 tokenId);

    constructor(address collectionAddress) {
        collection = EventTicket(collectionAddress);
    }

    function createEvent(string memory name, uint256 date, uint256 ticketSupply) external onlyOwner {
        require(ticketSupply > 0, "Ticket supply must be greater than zero");

        uint256 eventId = nextEventId;
        events[eventId] = Event(name, date, ticketSupply, 0, true);
        nextEventId++;

        collection.batchMint(address(this), ticketSupply);

        emit EventCreated(eventId, name, date, ticketSupply);
    }

    function claimTicket(uint256 eventId) external {
        Event storage eventInfo = events[eventId];
        require(eventInfo.exists, "Event does not exist");
        require(eventInfo.ticketsMinted < eventInfo.ticketSupply, "No more tickets available");

        uint256 tokenId = eventInfo.ticketsMinted;
        eventInfo.ticketsMinted++;

        collection.safeTransferFrom(address(this), msg.sender, tokenId);

        emit TicketClaimed(eventId, msg.sender, tokenId);
    }

    function getEvent(uint256 eventId) external view returns (Event memory) {
        return events[eventId];
    }

    function getTotalEvents() external view returns (uint256) {
        return nextEventId;
    }
}