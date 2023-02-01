import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MessageBoard", function () {
  let MessageBoard: Contract;
  let users,
    owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
  });

  beforeEach(async () => {
    MessageBoard = await ethers.getContractFactory("MessageBoard");
    MessageBoard = await MessageBoard.deploy();
    await MessageBoard.deployed();
  });

  describe("Contract Functionality", function () {
    it("Should write a message and retrieve it correctly", async () => {
      const message = "Hello, People!";

      await MessageBoard.writeMessage(message);

      const lastMessage = await MessageBoard.getLastMessages(1);

      expect(lastMessage[0].text).to.equal(message);
    });

    it("Should increment the message count after writing a message", async () => {
      const messageCount = await MessageBoard.messageCount();

      await MessageBoard.writeMessage("Hello again!");

      const newMessageCount = await MessageBoard.messageCount();

      expect(newMessageCount.toNumber()).to.equal(messageCount.toNumber() + 1);
    });

    it("Should fail to write an empty message", async function () {
      await expect(MessageBoard.writeMessage("")).to.be.revertedWith(
        "Cannot write empty message"
      );
    });

    it("Should fail to retrieve more messages than stored", async function () {
      await MessageBoard.writeMessage("Message 1");
      await MessageBoard.writeMessage("Message 2");

      await expect(MessageBoard.getLastMessages(10)).to.be.revertedWith(
        "Not enough messages"
      );
    });

    it("Should return the expected number of messages when requesting less messages than stored", async () => {
      await MessageBoard.writeMessage("Message 1");
      await MessageBoard.writeMessage("Message 2");

      const lastMessages = await MessageBoard.getLastMessages(1);

      expect(lastMessages.length).to.equal(1);
    });

    it("Should emit the NewMessage event when writing a message", async () => {
      const tx = await MessageBoard.connect(addr1).writeMessage("Message 1");

      const receipt = await tx.wait();

      expect(receipt.events).to.exist;

      const eventData = receipt.events[0].args;

      expect(eventData.sender).to.equal(addr1.address);

      const messageIndex = eventData.messageIndex;
      const messageCount = (await MessageBoard.messageCount()) - 1;

      expect(messageIndex).to.equal(messageCount);
      expect(eventData.message).to.equal("Message 1");
    });
  });
});
