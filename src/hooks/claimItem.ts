import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { CanItem } from "../../gen/types/CanItem";
import abi from "../abi/CanItem.json";

const wethinterface = new utils.Interface(abi);
const canItemAddress = "0xA8600548Dc3eC0680A91A827Ff26F5Def533D549";
const contract = new Contract(canItemAddress, wethinterface) as CanItem;

function useClaimCanItem() {
  const { state, send } = useContractFunction(contract, "claimNFT", {
    transactionName: "Claim NFT", // optional
    gasLimitBufferPercentage: 10,
  });

  return {
    claimNFT: send,
    state,
  };
}

export default useClaimCanItem;
