import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewMessage } from "../generated/MessageBoard/MessageBoard"

export function createNewMessageEvent(
  sender: Address,
  messageIndex: BigInt,
  message: string
): NewMessage {
  let newMessageEvent = changetype<NewMessage>(newMockEvent())

  newMessageEvent.parameters = new Array()

  newMessageEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  newMessageEvent.parameters.push(
    new ethereum.EventParam(
      "messageIndex",
      ethereum.Value.fromUnsignedBigInt(messageIndex)
    )
  )
  newMessageEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )

  return newMessageEvent
}
