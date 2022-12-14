import { BSCTestnet, Config } from "@usedapp/core";

import { getDefaultProvider } from "ethers";
const config: Config = {
  autoConnect: true,
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: getDefaultProvider(BSCTestnet.rpcUrl),
  },
  networks: [BSCTestnet],
};

export default config;
