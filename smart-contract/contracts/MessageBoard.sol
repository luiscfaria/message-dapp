// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title MessageBoard
 * @dev This contract allows users to write and retrieve messages.
 * The contract stores the messages by their index and keeps track of who wrote the message.
 * The contract emits an event when a user writes a message.
 */

contract MessageBoard {
    /**
     * @dev Event that is emitted when a user writes a message
     * @param sender The address of the user who wrote the message
     * @param messageIndex The index of the message in the contract
     * @param message The message text
     */
    event NewMessage(
        address indexed sender,
        uint256 messageIndex,
        string message
    );

    /**
     * @dev struct that contains the message text and the address of the sender
     */
    struct Message {
        address sender;
        string text;
    }

    /**
     * @dev mapping that stores the messages by their index
     */
    mapping(uint256 => Message) public messages;

    /**
     * @dev variable that keeps track of how many messages have been written to the contract
     */
    uint256 public messageCount;

    /**
     * @dev function that allows a user to write a message to the contract
     * @param message The message text to be written
     */
    function writeMessage(string memory message) public {
        require(bytes(message).length > 0, "Cannot write empty message");
        messages[messageCount] = Message(msg.sender, message);
        messageCount++;
        emit NewMessage(msg.sender, messageCount - 1, message);
    }

    /**
     * @dev function that allows a user to retrieve the last messages written in the contract
     * @param numMessages The number of messages to retrieve
     * @return An array of messages
     */
    function getLastMessages(uint256 numMessages)
        public
        view
        returns (Message[] memory)
    {
        require(numMessages <= messageCount, "Not enough messages");
        uint256 startIndex = messageCount > numMessages
            ? messageCount - numMessages
            : 0;
        Message[] memory lastMessages = new Message[](numMessages);
        for (uint256 i = 0; i < numMessages; i++) {
            lastMessages[i] = messages[startIndex + i];
        }
        return lastMessages;
    }
}
