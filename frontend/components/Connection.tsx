import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { formatEthAddress } from "helpers/general";

function Connection() {
  const connector = new MetaMaskConnector();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: connector,
  });
  const { disconnect } = useDisconnect();
  const [userAddress, setUserAddress] = useState<string>("");

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  return (
    <>
      <div className="connection">
        {isConnected ? (
          <>
            <div className="d-flex flex-row justify-center align-center">
              <h1 className="info-h1">
                Connected to {formatEthAddress(userAddress as string)}
              </h1>
              <Button colorScheme="blue" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex flex-row justify-center align-center">
              <h1 className="info-h1">
                Welcome! First connect with your wallet
              </h1>
              <Button colorScheme="blue" onClick={() => connect()}>
              Connect
            </Button>
            </div>
            
          </>
        )}
      </div>
    </>
  );
}

export default Connection;
