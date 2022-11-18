import { useConfig, useEthers } from "@usedapp/core";
import { useCallback } from "react";
import "./App.css";
import Allowance from "./component/allowance";
import useClaimCanItem from "./hooks/claimItem";
function App() {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const { readOnlyUrls } = useConfig();
  const { claimNFT, claimState, price } = useClaimCanItem();

  // get item that user claimed

  const onClickMint = useCallback(async () => {
    try {
      // fetch api first price
      const trxReceipt = await claimNFT();
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
            <br />
            <Allowance>
              <button
                onClick={onClickMint}
                disabled={["PendingSignature", "Mining"].includes(
                  claimState.status
                )}
              >
                {["PendingSignature", "Mining"].includes(claimState.status)
                  ? "Processing"
                  : `  Mint Item ${price} CAN`}
              </button>
            </Allowance>
            {/* <Inventory /> */}
          </div>
        )}
      </div>
    );
  }

  return <div className="App">Please select network "BSC Testnet"</div>;
}

export default App;
