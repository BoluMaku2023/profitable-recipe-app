import { useState } from "react";
import { getAmount, toUpperCase } from "../../utils/helper";

const EditIngredient = ({
  closeEditIngredient,
  saveEditedInventory,
  inventoryToEdit,
  inventoryType,
  units,
}) => {
  const getType = () => {
    switch (inventoryType) {
      case "materials":
        return "Material";
        break;
      case "ingredients":
        return "Ingredient";
        break;
    }
  };

  const [ingredient, setIngredient] = useState({
    // type: getType(),
    name: inventoryToEdit?.name,
    // purchase_quantity: inventoryToEdit?.purchase_quantity?.amount,
    // purchase_unit: inventoryToEdit?.purchase_quantity?.unit || "",
    // price: inventoryToEdit?.price,
    // quantity_in_stock: inventoryToEdit?.quantity_in_stock,
    lowLevel: inventoryToEdit?.lowLevel,
    // pieces: inventoryToEdit?.pieces,
    _id: inventoryToEdit?._id,
  });

  const onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "purchase_unit") {
      value = units.filter((aUnit) => aUnit?._id == value).shift();
    }

    setIngredient({ ...ingredient, [name]: value });
  };

  const toUpperCase = (aString) => {
    return aString.charAt(0).toUpperCase() + aString.slice(1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto w-full items-center justify-center bg-secondary/50 px-6">
      <div className="mt-12 flex w-500 flex-col  rounded-lg bg-primary p-6">
        <h3 className="text-xl font-bold text-bgPurple">
          Edit{" "}
          {ingredient.name
            ? toUpperCase(ingredient.name)
            : "New " + ingredient.type}
        </h3>
        <div className="flex items-center">
          <h4>Type -</h4>
          <h5>{getType()}</h5>
        </div>

        <div className="mt-6 flex w-full items-center gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Name</h4>
            <input
              onChange={onChange}
              type="text"
              min="0"
              name="name"
              value={toUpperCase(ingredient.name)}
              placeholder={`Enter ${inventoryType.toLowerCase()} name`}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>

          <div className="w-full">
            <h4 className="font- semibold  mb-4">Low Threshold</h4>
            <input
              onChange={onChange}
              type="number"
              min="0"
              name="lowLevel"
              value={ingredient.lowLevel}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
          {/* <div className="w-full">
            <h4 className="mb-4 font-semibold">Purchase Quanity</h4>
            <input
              onChange={onChange}
              min="0"
              type="text"
              name="purchase_quantity"
              value={ingredient.purchase_quantity}
              placeholder="Enter purchase quantity"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div> */}
        </div>

        {/* <div className="mt-6 flex items-center gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Purchase Unit</h4>
            <select
              defaultValue={ingredient.purchase_unit}
              onChange={onChange}
              name="purchase_unit"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
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

          <div className="w-full ">
            <h4 className="mb-4 font-semibold">Total Price</h4>
            <input
              onChange={onChange}
              type="number"
              name="price"
              min="0"
              value={ingredient.price}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div> */}

        {/* <div className="mt-6 flex items-center gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Quantity In Stock</h4>
            <input
              onChange={onChange}
              type="number"
              min="0"
              name="quantity_in_stock"
              value={ingredient.quantity_in_stock}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>

          <div className="w-full">
            <h4 className="font- semibold  mb-4">Low Threshold</h4>
            <input
              onChange={onChange}
              type="number"
              min="0"
              name="lowLevel"
              value={ingredient.lowLevel}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div> */}

        {/* {ingredient.type == "Material" && (
          <div className="mt-6">
            <h4 className="mb-4 font-semibold">Pieces</h4>
            <input
              onChange={onChange}
              min="0"
              type="number"
              name="pieces"
              value={ingredient.pieces}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        )} */}

        <div className="mt-6 flex items-center gap-x-6">
          <button
            onClick={(e) => saveEditedInventory(e, ingredient)}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeEditIngredient}
            className="flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditIngredient;
