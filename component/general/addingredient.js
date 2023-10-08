import { useState } from "react";
import { getAmount, toUpperCase } from "../../utils/helper";

const AddIngredient = ({ closeAddIngredient, addInventory, units }) => {
  // units[0]._id
  const [ingredient, setIngredient] = useState({
    name: "",
    purchase_quantity: "",
    purchase_unit: "",
    price: 0,
    quantity_in_stock: 0,
    lowLevel: 0,
  });

  const onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "purchase_unit") {
      value = units.filter((aUnit) => aUnit?._id == value).shift();
    }

    setIngredient({ ...ingredient, [name]: value });
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-40 flex items-center justify-center bg-secondary/50 px-8">
      <form
        onSubmit={(e) => addInventory(e, ingredient)}
        className="relative w-500 rounded-lg bg-primary p-8 shadow-lg"
      >
        <h3 className="mb-3 text-xl font-bold text-bgPurple">
          {ingredient.name ? toUpperCase(ingredient.name) : "Add Ingredient"}
        </h3>
        <div className="flex w-full flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <h4 className="my-3 font-semibold">Name</h4>
              <input
                onChange={onChange}
                type="text"
                name="name"
                value={toUpperCase(ingredient.name)}
                placeholder="Ingredient Name"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>
            <div className="w-full">
              <h4 className="my-3 font-semibold">Purchase Quanity</h4>
              <input
                onChange={onChange}
                type="text"
                name="purchase_quantity"
                value={ingredient.purchase_quantity}
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
                name="purchase_unit"
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              >
                <option value="">Select Unit</option>
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
              <h4 className="my-3 font-semibold">Total Price</h4>
              <input
                onChange={onChange}
                type="number"
                name="price"
                min="0"
                value={ingredient.price}
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div>
            <h4 className="my-3 font-semibold">Quantity In Stock</h4>
            <input
              onChange={onChange}
              type="number"
              min="0"
              name="quantity_in_stock"
              value={ingredient.quantity_in_stock}
              className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div> */}
            <div className="w-full">
              <h4 className="my-3 font-semibold">Low Threshold</h4>
              <input
                onChange={onChange}
                type="number"
                name="lowLevel"
                min="0"
                value={ingredient.lowLevel}
                className=" h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <button
            type="submit"
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAddIngredient}
            type="button"
            className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIngredient;
