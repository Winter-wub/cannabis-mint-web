import useInventory from "../hooks/inventory";

function Inventory() {
  const items = useInventory([1, 2, 3, 4]); // premuim

  return (
    <>
      {items.map((item) => (
        <div>
          <img
            src={item.image as string}
            alt="item1"
            style={{ width: 320, height: 400 }}
          />
          id:{item.id}: {item.amount}
        </div>
      ))}
    </>
  );
}

export default Inventory;
