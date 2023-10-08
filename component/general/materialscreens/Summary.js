import { useState } from "react";

import { getAmount, toUpperCase } from "../../../utils/helper";

const Summary = ({ saveMaterial, newMaterial, units, closeAddMaterial }) => {
  const [material, setMaterial] = useState(newMaterial);

  const onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "purchase_unit") {
      value = units.filter((aUnit) => aUnit?._id == value).shift();
    }

    setMaterial({ ...material, [name]: value });
  };

  const doSaveMaterial = () => {
    console.log(material);
    if (
      !material.name ||
      !material.purchase_quantity ||
      !material.purchase_unit ||
      !material.price ||
      !material.lowLevel ||
      !material.pieces
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    saveMaterial(material);
  };

  return (
    <div className="flex w-[500px]  flex-col gap-y-5 rounded-lg bg-primary py-9 px-6 shadow-lg">
      <div>
        <h4 className="mb-3 text-xl font-bold text-bgPurple">
          Material Summary
        </h4>
        <h3>{material.name}</h3>
        <div className="flex flex-col gap-4 gap-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <h4 className="my-3 font-semibold">Name</h4>
              <input
                onChange={onChange}
                type="text"
                name="name"
                value={toUpperCase(material.name)}
                required={true}
                min="0"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>

            <div className="w-full">
              <h4 className="my-3 font-semibold">Purchase Quanity</h4>
              <input
                onChange={onChange}
                type="text"
                name="purchase_quantity"
                min="0"
                required={true}
                value={material.purchase_quantity}
                placeholder="Enter purchase quantity"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <h4 className="my-3 font-semibold">Purchase Unit</h4>
              <select
                onChange={onChange}
                required={true}
                name="purchase_unit"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              >
                {units.map((aUnit) => {
                  return (
                    <option value={aUnit?._id}>
                      {aUnit?.name} ({aUnit?.abbreviation})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="w-full">
              <h4 className="my-3 font-semibold">Price</h4>
              <input
                onChange={onChange}
                type="number"
                required={true}
                name="price"
                value={material.price}
                min="0"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="w-full">
            <h4 className="my-3 font-semibold">Quantity In Stock</h4>
            <input
              onChange={onChange}
              type="number"
              name="quantity_in_stock"
              value={material.quantity_in_stock}
              className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div> */}

            <div className="w-full">
              <h4 className="my-3 font-semibold">Low Threshold</h4>
              <input
                onChange={onChange}
                type="number"
                name="lowLevel"
                required={true}
                value={material.lowLevel}
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>

            {/* <div className="w-full">
              <h4 className="my-3 font-semibold">Pieces per Packet/Carton</h4>
              <input
                onChange={onChange}
                type="number"
                name="pieces"
                value={material.pieces}
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div> */}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-x-6">
          <button
            onClick={doSaveMaterial}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAddMaterial}
            className="flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
