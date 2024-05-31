// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Collection} from "./Collection.sol";

contract DestinationMinter is CCIPReceiver {
    Collection _collection;

    event TicketClaimed();

    constructor(address router, address collectionAddress) CCIPReceiver(router) {
        _collection = Collection(collectionAddress);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(_collection).call(message.data);
        require(success);
        emit TicketClaimed();
    }
}