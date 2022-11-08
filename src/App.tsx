import { useConfig, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useCallback } from "react";
import "./App.css";
import useClaimCanItem from "./hooks/claimItem";
import useInventory from "./hooks/inventory";
function App() {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const { readOnlyUrls } = useConfig();
  const { claimNFT, state } = useClaimCanItem();

  // get item that user claimed
  const { balance: item1, image: item1URI } = useInventory(1); // premuim
  const { balance: item2, image: item2URI } = useInventory(2); // ultimate rare
  const { balance: item3, image: item3URI } = useInventory(3); // super rare
  const { balance: item4, image: item4URI } = useInventory(4); // top rare

  const onClickMint = useCallback(async () => {
    try {
      // fetch api first price
      const trxReceipt = await claimNFT({
        value: utils.parseEther("0.000005"),
      });
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
            <button
              onClick={onClickMint}
              disabled={["PendingSignature", "Mining"].includes(state.status)}
            >
              {["PendingSignature", "Mining"].includes(state.status)
                ? "Processing"
                : "  Mint Item"}
            </button>
            <br />
            <div>
              <img
                src={item1URI as string}
                alt="item1"
                style={{ width: 320, height: 400 }}
              />
              Premium: {item1.toString()}
            </div>
            <div>
              <img
                src={item2URI as string}
                alt="item2"
                style={{ width: 320, height: 400 }}
              />
              Super Rare: {item2.toString()}
            </div>
            <div>
              <img
                src={item3URI as string}
                alt="item3"
                style={{ width: 320, height: 400 }}
              />
              Ultimate: {item3.toString()}
            </div>
            <div>
              <img
                src={item4URI as string}
                alt="item4"
                style={{ width: 320, height: 400 }}
              />
              Top Rare: {item1.toString()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div className="App">Please select network "BSC Testnet"</div>;
}

export default App;
