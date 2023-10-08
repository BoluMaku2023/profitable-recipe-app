import { useState } from "react";

const AddStock = ({
  setInStock,
  moveCurrentUI,
  material_name,
  unit_name,
  closeAddMaterial,
}) => {
  const [inStockObj, setInStockObj] = useState({ inStock: 0, lowLevel: 0 });

  function onChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setInStockObj({ ...inStockObj, [name]: value });
  }

  const continueClicked = () => {
    if (inStockObj.inStock > 0 && inStockObj.lowLevel > 0) {
      setInStock(inStockObj);
      moveCurrentUI(5);
    }
  };

  return (
    <div className="relative flex w-[400px] flex-col gap-y-5 rounded-lg bg-primary py-9 px-6 shadow-lg">
      <h4 className="absolute right-6 top-3 text-sm text-dogwoodRose">
        Step 4/4
      </h4>
      <div className="flex flex-col gap-y-3">
        <h3 className="font-semibold">
          How many {unit_name.toLowerCase()} of {material_name} do you have in
          stock?
        </h3>
        <input
          onChange={onChange}
          type="number"
          name="inStock"
          min="0"
          value={inStockObj.inStock}
          placeholder="Enter number"
          className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="font-semibold">
          At what level would you need to restock?
        </h3>
        <input
          onChange={onChange}
          type="number"
          name="lowLevel"
          value={inStockObj.lowLevel}
          placeholder="Enter number"
          min="0"
          className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
        />
      </div>

      <div className="flex items-center">
        <button
          onClick={continueClicked}
          className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
        >
          Continue
        </button>
        <button
          onClick={closeAddMaterial}
          className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddStock;
