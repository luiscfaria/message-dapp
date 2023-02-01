import React, { useEffect, useState } from "react";
import { Alert, AlertIcon, Button, Textarea, useToast } from "@chakra-ui/react";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import abi from "../data/abi/MessageBoard";

function Form() {
  const toast = useToast();
  const contractAddress = "0x01F05a7a4A7a1f1bef6DbF53815696a12a9149BA";
  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "writeMessage",
    args: [message],
  });

  const { write, data: txData, error } = useContractWrite(config);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const handleTransactionResult = (result: boolean) => {
    toast({
      title: result ? "Success, message sent!" : "Something went wrong :(",
      status: result ? "success" : "error",
      isClosable: true,
    });
  };

  const { data: waitData, error: waitError } = useWaitForTransaction({
    hash: txData?.hash,
    onSuccess(data) {
      console.log("Success", { data });
      setLoading(false);
      if (data.status === 0) {
        handleTransactionResult(false);
      } else {
        handleTransactionResult(true);
      }
    },
  });

  const handleSave = async () => {
    if (!message) {
      toast({
        title: "Please write a message :)",
        status: "info",
        isClosable: true,
      });
    } else {
      setLoading(true);
      write?.();
    }
  };

  return (
    <div className="form">
      <Textarea
        className="form-text-area"
        placeholder="Write your message to the world"
        onChange={(event) => setMessage(event.target.value)}
      />
      <div
        className="d-flex justify-end"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <Button isLoading={loading} colorScheme="blue" onClick={handleSave}>
          Send
        </Button>
      </div>
      {loading ? (
        <Alert status="info" w="100%" maxW={800} mt={2}>
          <AlertIcon />
          Please confirm and wait for transaction confirmation!
        </Alert>
      ) : null}
    </div>
  );
}

export default Form;
