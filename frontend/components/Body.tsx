import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { useRouter } from "next/router";

import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || "error" }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MultipleProviderComponent(props: any) {
  const router = useRouter();
  const { Component } = props;

  return (
    <div>
      <ChakraProvider>
        <WagmiConfig client={client}>
          <Component {...props} />
        </WagmiConfig>
      </ChakraProvider>
    </div>
  );
}

function Body(props: any) {
  {
    return <MultipleProviderComponent {...props} />;
  }
}

export { Body };
