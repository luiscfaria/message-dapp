// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewMessage extends ethereum.Event {
  get params(): NewMessage__Params {
    return new NewMessage__Params(this);
  }
}

export class NewMessage__Params {
  _event: NewMessage;

  constructor(event: NewMessage) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get messageIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get message(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class MessageBoard__getLastMessagesResultValue0Struct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get text(): string {
    return this[1].toString();
  }
}

export class MessageBoard__messagesResult {
  value0: Address;
  value1: string;

  constructor(value0: Address, value1: string) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    return map;
  }

  getSender(): Address {
    return this.value0;
  }

  getText(): string {
    return this.value1;
  }
}

export class MessageBoard extends ethereum.SmartContract {
  static bind(address: Address): MessageBoard {
    return new MessageBoard("MessageBoard", address);
  }

  getLastMessages(
    numMessages: BigInt
  ): Array<MessageBoard__getLastMessagesResultValue0Struct> {
    let result = super.call(
      "getLastMessages",
      "getLastMessages(uint256):((address,string)[])",
      [ethereum.Value.fromUnsignedBigInt(numMessages)]
    );

    return result[0].toTupleArray<
      MessageBoard__getLastMessagesResultValue0Struct
    >();
  }

  try_getLastMessages(
    numMessages: BigInt
  ): ethereum.CallResult<
    Array<MessageBoard__getLastMessagesResultValue0Struct>
  > {
    let result = super.tryCall(
      "getLastMessages",
      "getLastMessages(uint256):((address,string)[])",
      [ethereum.Value.fromUnsignedBigInt(numMessages)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<MessageBoard__getLastMessagesResultValue0Struct>()
    );
  }

  messageCount(): BigInt {
    let result = super.call("messageCount", "messageCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_messageCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("messageCount", "messageCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  messages(param0: BigInt): MessageBoard__messagesResult {
    let result = super.call("messages", "messages(uint256):(address,string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return new MessageBoard__messagesResult(
      result[0].toAddress(),
      result[1].toString()
    );
  }

  try_messages(
    param0: BigInt
  ): ethereum.CallResult<MessageBoard__messagesResult> {
    let result = super.tryCall(
      "messages",
      "messages(uint256):(address,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MessageBoard__messagesResult(
        value[0].toAddress(),
        value[1].toString()
      )
    );
  }
}

export class WriteMessageCall extends ethereum.Call {
  get inputs(): WriteMessageCall__Inputs {
    return new WriteMessageCall__Inputs(this);
  }

  get outputs(): WriteMessageCall__Outputs {
    return new WriteMessageCall__Outputs(this);
  }
}

export class WriteMessageCall__Inputs {
  _call: WriteMessageCall;

  constructor(call: WriteMessageCall) {
    this._call = call;
  }

  get message(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class WriteMessageCall__Outputs {
  _call: WriteMessageCall;

  constructor(call: WriteMessageCall) {
    this._call = call;
  }
}