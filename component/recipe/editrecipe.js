import { useState } from "react";

import { toUpperCase } from "../../utils/helper";

const EditRecipe = ({ hideEditRecipe, editRecipe, aRecipe }) => {
  const [recipe, setRecipe] = useState({
    name: aRecipe.name,
    description: aRecipe.description,
  });
  const [ayield, setYield] = useState({
    amount: aRecipe.yield ? aRecipe.yield.amount : 0,
    unit: aRecipe.yield ? aRecipe.yield.unit : "",
  });

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setRecipe({ ...recipe, [name]: value });
  };

  const onYieldChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setYield({ ...ayield, [name]: value });
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto items-center justify-center bg-secondary/50">
      <div className=" flex w-500 flex-col rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">
          {recipe.name.length > 0 ? toUpperCase(recipe.name) : "New Recipe"}
        </h3>

        <div>
          <h4 className="my-4 font-semibold">Name</h4>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={recipe.name}
            placeholder="Enter recipe name"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div>
          <h4 className="my-4 font-semibold">Description</h4>
          <input
            onChange={onChange}
            type="text"
            name="description"
            value={recipe.description}
            placeholder="Enter recipe description"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div>
          <h4 className="my-4 font-semibold">Yield</h4>
          <input
            onChange={onYieldChange}
            type="text"
            name="amount"
            value={ayield.amount}
            placeholder="Enter recipe description"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div>
          <h4 className="my-4 font-semibold">Unit</h4>
          <select
            onChange={onYieldChange}
            name="unit"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          >
            {aRecipe.units &&
              aRecipe.units.map((aUnit) => {
                return (
                  <option key={aUnit?._id} value={aUnit?._id}>
                    {aUnit?.name} ({aUnit?.abbreviation})
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex items-center gap-x-6 mt-6">
          <button
            onClick={(e) => editRecipe(e, { ...recipe, yields: ayield })}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={hideEditRecipe}
            className="flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
