import { NewMessage as NewMessageEvent } from "../generated/MessageBoard/MessageBoard";
import { NewMessage, Storage } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleNewMessage(event: NewMessageEvent): void {
  let message = new NewMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  message.sender = event.params.sender;
  message.messageIndex = event.params.messageIndex;
  message.message = event.params.message;

  message.blockNumber = event.block.number;
  message.blockTimestamp = event.block.timestamp;
  message.transactionHash = event.transaction.hash;
  message.save();

  let storage = fetchStorage(event.address)
  const messages = storage.storedMessages
  messages.push(message.id)
  storage.storedMessages = messages
  storage.save()
}

function fetchStorage(address: Bytes): Storage {
  let storage = Storage.load(address);
  if (!storage) {
    storage = new Storage(address);
    storage.storedMessages = []
    storage.save();
  }
  return storage;
}
