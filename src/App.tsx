import { useConfig, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useCallback } from "react";
import "./App.css";
import useClaimCanItem from "./hooks/claimItem";
import useInventory from "./hooks/inventory";

function App() {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const { readOnlyUrls } = useConfig();
  const { claimNFT } = useClaimCanItem();
  // get item that user claimed
  const { balance: item1 } = useInventory(1); // premuim
  const { balance: item2 } = useInventory(2); // ultimate rare
  const { balance: item3 } = useInventory(3); // legendary
  const { balance: item4 } = useInventory(4); // top rare

  const onClickMint = useCallback(async () => {
    try {
      // should random tokenId from server because onChain is not secure
      // logic random we can control the rate of mint
      const randomId = Math.floor(Math.random() * 4) + 1;
      // price can control by server
      const price = utils.parseEther("0.000005");
      const trxReceipt = await claimNFT(randomId, { value: price });
      if (trxReceipt) {
        alert("Mint success at " + trxReceipt.blockHash);
      } else {
        alert("Mint fail");
      }
    } catch (error) {
      alert("Mint fail");
      console.error(error);
    }
  }, [account, claimNFT]);

  if (readOnlyUrls?.[chainId as number]) {
    return (
      <div className="App">
        <h1>sample app</h1>
        {account ? (
          <button onClick={deactivate}>Logout</button>
        ) : (
          <button onClick={activateBrowserWallet}>Connect Wallet</button>
        )}
        {account && (
          <div>
            <div>Account: {account}</div>
            <div>Network ID: {chainId}</div>
            <button onClick={onClickMint}>Mint Item</button>
            <br />
            <div>Premium: {item1.toString()}</div>
            <div>Super Rare: {item2.toString()}</div>
            <div>Ultimate Rare: {item3.toString()}</div>
            <div>Top Rare: {item4.toString()}</div>
          </div>
        )}
      </div>
    );
  }

  return <div className="App">Please select network "BSC Testnet"</div>;
}

export default App;
