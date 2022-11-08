import { Contract } from "@ethersproject/contracts";
import { useCall, useEthers } from "@usedapp/core";
import axios from "axios";
import { utils } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import abi from "../abi/CanItem.json";
import { CanItem } from "./../../gen/types/CanItem";

const wethinterface = new utils.Interface(abi);
const canItemAddress = "0xA8600548Dc3eC0680A91A827Ff26F5Def533D549";
const contract = new Contract(canItemAddress, wethinterface) as CanItem;

function useInventory(itemId: number) {
  const { account } = useEthers();
  const [image, setImage] = useState<string>();

  const balanceOf = useCall({
    contract: contract,
    method: "balanceOf",
    args: [account as string, itemId],
  });

  const uri = useCall({
    contract: contract,
    method: "uri",
    args: [itemId],
  });

  const value = useMemo(() => {
    if (balanceOf?.value) {
      return balanceOf.value;
    }
    return 0;
  }, [balanceOf]);

  const uriValue = useMemo(() => {
    if (uri?.value) {
      return uri.value[0];
    }
    return "";
  }, [uri]);

  const fetchImageURI = useCallback(async () => {
    if (uriValue !== "") {
      try {
        console.log(uriValue);
        const response = await axios.get(uriValue);
        setImage(response.data.image);
      } catch (e) {
        console.log(e);
      }
    }
  }, [uriValue]);

  useEffect(() => {
    fetchImageURI();
  }, [fetchImageURI]);

  return {
    balance: value,
    uri: uriValue,
    image: image,
  };
}

export default useInventory;
