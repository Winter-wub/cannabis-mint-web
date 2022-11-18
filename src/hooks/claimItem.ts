import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { CanItem } from "../../gen/types/CanItem";
import abi from "../abi/CannabisItem.json";

const wethinterface = new utils.Interface(abi);
const canItemAddress = "0xCB73A13B0bfDf9B6E15629921AF32e98ee463212";
const contract = new Contract(canItemAddress, wethinterface) as CanItem;

function useClaimCanItem() {
  const { state: claimState, send } = useContractFunction(
    contract,
    "claimNFT",
    {
      transactionName: "Claim NFT", // optional
      gasLimitBufferPercentage: 10,
    }
  );

  const state = useCall({
    contract: contract,
    method: "getClaimPrice",
    args: [],
  });

  return {
    price: state?.value?.[0] ? utils.formatEther(state.value[0]) : 0,
    claimNFT: send,
    claimState,
  };
}

export default useClaimCanItem;
