import React from "react";
import Connection from "components/Connection";
import Form from "components/Form";
import LastMessages from "components/LastMessages";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <>
      <div className="main">
        <Connection />
        {isConnected ? (
          <>
            <Form />
            <LastMessages />
          </>
        ) : null}
      </div>
    </>
  );
}
