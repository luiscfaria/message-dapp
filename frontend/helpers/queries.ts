const storedMessagesQuery = (
  contractAddress: string,
  numberOfMessages: number
): string => {
  const query = `
  {
    storage(id: "${contractAddress.toLowerCase()}") {
      storedMessages(orderBy: blockTimestamp, orderDirection: desc, first: ${numberOfMessages}) {
        sender
        message
      }
    }
  }
    `;
  return query;
};

export { storedMessagesQuery };
