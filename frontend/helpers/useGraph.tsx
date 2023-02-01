import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { storedMessagesQuery } from "./queries";
import { MessageType } from "types/types";

function useGraph() {
  const subgraphURI =
    "https://api.studio.thegraph.com/query/37255/message-board/1.0.0";

  const fetchStoredMessages = async (
    contractAddress: string,
    numberOfMessages: number
  ): Promise<MessageType[]> => {
    const client = new ApolloClient({
      uri: subgraphURI,
      cache: new InMemoryCache(),
    });
    try {
      const data = await client.query({
        query: gql(storedMessagesQuery(contractAddress, numberOfMessages)),
      });
      const dataMessages = data.data.storage.storedMessages;
      const messages: MessageType[] = [];
      for (let i = 0; i < dataMessages.length; i++) {
        const newMessage = {
          sender: dataMessages[i].sender,
          message: dataMessages[i].message,
        };
        messages.push(newMessage);
      }
      return messages;
    } catch (error) {
      console.log("🚀 ~ useGraph ~ error", error);
      return [];
    }
  };

  return {
    fetchStoredMessages,
  };
}

export default useGraph;
