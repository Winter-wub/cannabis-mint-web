import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import abi from "../abi/CanToken.json";
import { CanToken } from "./../../gen/types/CanToken";

const wethinterface = new utils.Interface(abi);
const canTokenAddress = "0x64c04eEAdE15861f3FF729515d72F90f7D93D787";
const contract = new Contract(canTokenAddress, wethinterface) as CanToken;

function useApprove() {
  const { state, send } = useContractFunction(contract, "approve", {
    transactionName: "approve", // optional
    gasLimitBufferPercentage: 10,
  });

  return {
    approve: send,
    state,
  };
}

export default useApprove;
