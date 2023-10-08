import { useState } from "react";

import { toUpperCase } from "../../utils/helper";

const EditProductRecipe = ({
  recipe,
  onPerformEditClicked,
  onCancelEditClicked,
}) => {
  const [recipeYield, setRecipeYield] = useState({
    quantity: recipe.yield.amount,
    unit: recipe.yield.unit?._id,
  });

  console.log(recipe);

  const doEdit = () => {
    // if (quantity !== recipe.yield.amount) {
      onPerformEditClicked({ ...recipe, yield: recipeYield });
    // }
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setRecipeYield({ ...recipeYield, [name]: value });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto w-full items-center justify-center bg-secondary/50 px-6">
      <div className="w-500 rounded-lg bg-primary p-8">
        <h3 className="text-xl font-bold text-bgPurple">
          Edit {recipe.name.length > 0 && toUpperCase(recipe.name)}
        </h3>

        <div>
          <h4 className="mt-6 mb-4 font-semibold">Quantity</h4>
          <input
            onChange={onChange}
            type="number"
            name="quantity"
            min="0"
            value={recipeYield.amount}
            className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
          />
        </div>

        <div>
          <h4 className="mt-6 mb-4 font-semibold">Unit</h4>
          <select
            defaultValue={recipe.yield.unit?._id}
            onChange={(e) => onChange(e)}
            name="unit"
            min="0"
            className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
          >
            {recipe &&
              recipe.units &&
              recipe.units.map((aUnit) => {
                console.log(aUnit);
                return (
                  <option value={aUnit?._id}>
                    {aUnit?.name} ({aUnit?.abbreviation})
                  </option>
                );
              })}
          </select>
        </div>

        <div className="mt-6 flex items-center gap-x-6">
          <button
            onClick={doEdit}
            className="flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={onCancelEditClicked}
            className="flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductRecipe;
