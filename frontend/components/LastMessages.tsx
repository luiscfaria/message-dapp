import React, { useEffect, useState } from "react";
import Message from "./Message";
import useGraph from "helpers/useGraph";
import { MessageType } from "types/types";
import { Select, Spinner, useToast } from "@chakra-ui/react";
import { useContractEvent } from "wagmi";
import abi from "../data/abi/MessageBoard";

function LastMessages() {
  const { fetchStoredMessages } = useGraph();
  const contractAddress = "0x01F05a7a4A7a1f1bef6DbF53815696a12a9149BA";
  const [fetchedMessages, setFetchedMessages] = useState<MessageType[]>([]);
  const [numberOfMessages, setNumberOfMessages] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const choice = parseInt(event.target.value);
    setNumberOfMessages(choice);
  };

  const initMessages = async () => {
    setLoading(true);
    const data = await fetchStoredMessages(contractAddress, numberOfMessages);
    if (!data) {
      console.log("No data");
      setLoading(false);
      return;
    }
    setFetchedMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    initMessages();
  }, [numberOfMessages]);

  const toast = useToast();

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "NewMessage",
    listener(node, label, owner) {
      console.log("%cNew message incoming", "color: green");
      setTimeout(() => {
        toast({
          title: "Receiving new messages...",
          status: "info",
          variant: "subtle",
          isClosable: true,
        });
      }, 5000);
      setTimeout(() => {
        toast({
          title: "Loading, please wait...",
          status: "info",
          variant: "subtle",
          isClosable: true,
        });
      }, 10000);
      setTimeout(() => {
        initMessages();
      }, 15000);
    },
  });

  return (
    <div className="messages">
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div className="d-flex" style={{ width: "100%", maxWidth: "800px" }}>
            <h1 className="info-h1" style={{ fontSize: "1.6rem" }}>
              Check out the last messages!
            </h1>
            <Select
              placeholder="Messages to display"
              className="n-select"
              w={200}
              onChange={handleChange}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Select>
          </div>
          {fetchedMessages.length > 0 ? (
            fetchedMessages.map((el, index) => (
              <Message key={index} sender={el.sender} message={el.message} />
            ))
          ) : (
            <h1
              className="info-h1"
              style={{ fontWeight: "500", marginTop: "1rem" }}
            >
              There are no messages yet, be the first one to say hello!
            </h1>
          )}
        </>
      )}
    </div>
  );
}

export default LastMessages;
