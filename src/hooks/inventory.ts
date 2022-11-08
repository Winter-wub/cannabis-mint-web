import { Contract } from "@ethersproject/contracts";
import { useCall, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useMemo } from "react";
import abi from "../abi/CanItem.json";
import { CanItem } from "./../../gen/types/CanItem";

const wethinterface = new utils.Interface(abi);
const canItemAddress = "0xA8600548Dc3eC0680A91A827Ff26F5Def533D549";
const contract = new Contract(canItemAddress, wethinterface) as CanItem;

function useInventory(itemId: number) {
  const { account } = useEthers();
  const call = useCall({
    contract: contract,
    method: "balanceOf",
    args: [account as string, itemId],
  });

  const value = useMemo(() => {
    if (call?.value) {
      return call.value;
    }
    return 0;
  }, [call]);

  return {
    balance: value,
  };
}

export default useInventory;
