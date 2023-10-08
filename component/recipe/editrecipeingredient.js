import { useState } from "react";

import { toUpperCase } from "../../utils/helper";

const EditRecipeIngredient = ({
  ingredient,
  onPerformEditClicked,
  onCancelEditClicked,
}) => {
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [unit, setUnit] = useState(ingredient?.unit?._id);

  const doEdit = () => {
    if (quantity !== ingredient.quantity) {
      onPerformEditClicked({
        ...ingredient,
        quantity: quantity,
        purchase_size: unit,
      });
    }
  };

  const onChange = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  const onUnitChange = (e) => {
    const value = e.target.value;

    setUnit(value);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto items-center justify-center bg-secondary/50 px-6">
      <div className=" flex w-500 flex-col gap-6 rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">
          Edit {ingredient.name.length > 0 && toUpperCase(ingredient.name)}
        </h3>

        <div className="flex items-center gap-4">
          <div className="w-full">
            <input
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              onChange={onChange}
              id="qty"
              type="number"
              name="name"
              placeholder="quantity"
              value={quantity}
            />
          </div>

          <div className="w-full">
            <select
              defaultValue={ingredient.unit?._id}
              onChange={onUnitChange}
              name="purchase_size"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            >
              <option key={ingredient.unit?._id} value={ingredient.unit?._id}>
                {ingredient.unit?.name}
              </option>
              {/* {ingredient.unit.map((aUnit) => {
              return (
                <option key={aUnit?._id} value={aUnit?._id}>
                  {aUnit?.name} ({aUnit?.abbreviation})
                </option>
              );
            })} */}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-x-6">
          <button
            onClick={doEdit}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={onCancelEditClicked}
            className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeIngredient;
