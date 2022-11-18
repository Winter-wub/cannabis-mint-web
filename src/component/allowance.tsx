import { utils } from "ethers";
import useAllowance from "../hooks/allowance";
import useApprove from "../hooks/approveToken";
import useClaimCanItem from "../hooks/claimItem";

type Props = {
  children: React.ReactNode;
};

function Allowance(props: Props) {
  const { allowance } = useAllowance();
  const contractAddressNFT = "0xCB73A13B0bfDf9B6E15629921AF32e98ee463212";
  const { price } = useClaimCanItem();
  const { approve, state: approveState } = useApprove();
  console.log("allowance: ", allowance);
  console.log("price: ", price);

  return (
    <div>
      {allowance && price && (
        <>
          {utils
            .parseEther(allowance as string)
            .lt(utils.parseEther(price as string)) && (
            <button
              style={{ marginBottom: "1rem" }}
              onClick={() =>
                approve(contractAddressNFT, utils.parseEther(price as string))
              }
            >
              Accept {price} CAN to MINT
            </button>
          )}
        </>
      )}
      {allowance && price && (
        <div>
          {utils
            .parseEther(allowance as string)
            .gte(utils.parseEther(price as string)) && props.children}
        </div>
      )}
    </div>
  );
}

export default Allowance;
