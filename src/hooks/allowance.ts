import { useCall, useEthers } from "@usedapp/core";
import { Contract, utils } from "ethers";
import abi from "../abi/CanToken.json";
import { CanToken } from "./../../gen/types/CanToken";

const canTokenInterface = new utils.Interface(abi);
const canTokenAddress = "0x64c04eEAdE15861f3FF729515d72F90f7D93D787";
const contractAddressNFT = "0xCB73A13B0bfDf9B6E15629921AF32e98ee463212";
const canTokenContract = new Contract(
  canTokenAddress,
  canTokenInterface
) as CanToken;

function useAllowance() {
  const { account } = useEthers();

  const state = useCall({
    contract: canTokenContract,
    method: "allowance",
    args: [account as string, contractAddressNFT],
  });

  return {
    allowance: state?.value?.[0] ? utils.formatEther(state.value[0]) : 0,
  };
}

export default useAllowance;
