import { Contract } from "@ethersproject/contracts";
import { useCall, useEthers } from "@usedapp/core";
import axios from "axios";
import { utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import abi from "../abi/CanItem.json";
import { CanItem } from "./../../gen/types/CanItem";

const wethinterface = new utils.Interface(abi);
const canItemAddress = "0xA8600548Dc3eC0680A91A827Ff26F5Def533D549";
const contract = new Contract(canItemAddress, wethinterface) as CanItem;

type Item = { id: number; amount: string; uri: string; image?: string };

function useInventory(itemIds: number[]) {
  const { account } = useEthers();
  const [items, setItems] = useState<Item[]>([]);

  const amountCalls =
    itemIds?.map((item) => {
      return useCall({
        contract: contract,
        method: "balanceOf",
        args: [account as string, item],
      });
    }) ?? [];

  const uriCalls =
    itemIds?.map((item) => {
      return useCall({
        contract: contract,
        method: "uri",
        args: [item],
      });
    }) ?? [];

  const fetchImageURI = useCallback(async (items: Item[]) => {
    try {
      const promises = items.map(async (item) => {
        const response = await axios.get(item.uri);
        return {
          ...item,
          image: response.data.image,
        };
      });
      const result = await Promise.all(promises);
      setItems(result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(amountCalls) && Array.isArray(uriCalls)) {
      const items: Item[] = [];
      amountCalls.forEach((amount, index) => {
        items.push({
          id: itemIds[index],
          amount: amount?.value?.[0].toString() as unknown as string,
          uri: String(uriCalls[index]?.value?.[0]),
        });
      });
      fetchImageURI(items);
    }
  }, [amountCalls, uriCalls, fetchImageURI]);

  return items;
}

export default useInventory;
