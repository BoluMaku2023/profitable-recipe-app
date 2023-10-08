import { useState } from "react";

const AddPurchase = ({
  setPurchase,
  moveCurrentUI,
  units,
  closeAddMaterial,
}) => {
  const [purchase, setAPurchase] = useState({
    amount: 0,
    price: 0,
    unit: units[0]._id,
  });

  function onChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setAPurchase({ ...purchase, [name]: value });
  }

  const continueClicked = () => {
    if (!!purchase.amount && !!purchase.price && !!purchase.unit) {
      setPurchase(purchase);
      moveCurrentUI(4);
    }
  };

  return (
    <div className="relative flex w-[400px] max-w-[400px] flex-col gap-y-5 rounded-lg bg-primary py-9 px-6 shadow-lg">
      <h4 className="absolute right-6 top-3 text-sm text-dogwoodRose">
        Step 3/4
      </h4>
      <h3 className="font-semibold">
        How much did you purchase the <br /> quantity you bought?
      </h3>

      <div className="flex flex-col gap-y-4">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-semibold">I bought </h5>
          <input
            onChange={onChange}
            type="number"
            name="amount"
            value={purchase.amount}
            placeholder="Enter name"
            min="0"
            className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <h5 className="font-semibold">at ₦</h5>
          <input
            onChange={onChange}
            type="number"
            name="price"
            min="0"
            value={purchase.price}
            placeholder="Enter name"
            className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <select
          onChange={onChange}
          name="unit"
          className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
        >
          {units.map((aUnit) => {
            return (
              <option key={aUnit?._id} value={aUnit?._id}>
                {aUnit?.name} ({aUnit?.abbreviation})
              </option>
            );
          })}
        </select>
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

export default AddPurchase;
