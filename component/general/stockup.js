import React, { useState } from "react";

export const Stockup = ({
  closeStockUp,
  stockUpInventory,
  units,
  stockType,
  saveStockInventory,
}) => {
  const getType = () => {
    switch (stockType) {
      case "materials":
        return "Material";
        break;
      case "ingredients":
        return "Ingredient";
        break;
    }
  };

  const [ingredient, setIngredient] = useState({
    id: stockUpInventory?._id,
    quantity: "",
    unitId: ""
  });

  const toUpperCase = (aString) => {
    return aString.charAt(0).toUpperCase() + aString.slice(1);
  };

  const onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "units") {
      value = units.filter((aUnit) => aUnit?._id == value).shift();
    }

    setIngredient({ ...ingredient, [name]: value });
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-40 flex items-center justify-center bg-secondary/50 px-8">
      <div className="relative w-500 rounded-lg bg-primary p-8 shadow-lg">
        <h3 className="mb-3 text-xl font-bold text-bgPurple">
          {stockUpInventory?.name
            ? toUpperCase(stockUpInventory?.name)
            : "Add Ingredient"}
        </h3>

        <div className="mt-6 flex w-full flex-col items-center gap-5">
          <div className="flex w-full flex-col gap-1.5">
            <h4 className="font-semibold">Quantity</h4>
            <input
              onChange={onChange}
              type="text"
              min="0"
              name="quantity"
              value={toUpperCase(ingredient.quantity)}
              placeholder={`Enter ${stockType.toLowerCase()} quantity`}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <h4 className="font-semibold">Units</h4>
            <select
              defaultValue={ingredient.unit}
              onChange={onChange}
              name="unitId"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            >
              <option value="">Select Unit</option>
              {units.map((aUnit, i) => {
                return (
                  <option key={i} value={aUnit?._id}>
                    {aUnit?.name} ({aUnit?.abbreviation})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          <button
            onClick={(e) => saveStockInventory(e, ingredient)}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeStockUp}
            className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
