import { useState } from "react";
import { toUpperCase } from "../../utils/helper";

const AddRecipe = ({ closeAddRecipe, addRecipe, units }) => {
  const [recipe, setRecipe] = useState({ name: "", description: "" });
  const [ayield, setYield] = useState({ amount: 0, unit: units[0]._id });

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
    <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-secondary/50 px-8 ">
      <div className="flex h-auto  flex-col items-center rounded-lg bg-primary p-6 ">
        <h3 className="w-full text-xl font-bold text-bgPurple">
          {recipe.name.length > 0 ? toUpperCase(recipe.name) : "New Recipe"}
        </h3>

        {/* first_row */}
        <div className=" flex items-center gap-x-6">
          {/* name_field */}
          <div className="">
            <h4 className="my-4 font-semibold">Name</h4>
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={recipe.name}
              placeholder="Enter recipe name"
              className=" h-12 rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
          </div>
          {/* description_field */}
          <div>
            <h4 className="my-4 font-semibold">Description</h4>
            <input
              onChange={onChange}
              type="text"
              name="description"
              value={recipe.description}
              placeholder="Enter recipe description"
              className=" h-12 rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
          </div>
        </div>
        {/* second_row */}
        <div className="flex w-full items-center gap-x-6">
          {/* yield_field */}
          <div>
            <h4 className="my-4 font-semibold">Yield</h4>
            <input
              onChange={onYieldChange}
              type="number"
              name="amount"
              value={ayield.amount}
              min={"0"}
              placeholder="Enter recipe description"
              className=" h-12 rounded-lg border px-3 marker:border-bgPurple placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
          </div>
          {/* units */}
          <div>
            <h4 className="my-4 font-semibold">Unit</h4>
            <select
              onChange={onYieldChange}
              className=" h-12 rounded-lg border border-bgPurple px-3 text-sm placeholder:text-sm focus:border-dogwoodRose focus:outline-none"
              name="unit"
            >
              {units &&
                units.map((aUnit, inKey) => {
                  return (
                    <option className="text-sm" value={aUnit?._id} key={inKey}>
                      {aUnit?.name} ({aUnit?.abbreviation})
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <h5 className="my-6">
          You can add ingredients after saving the recipe.
        </h5>
        {/*quick btn*/}
        <div className=" flex w-full  items-center">
          <button
            onClick={(e) => addRecipe(e, { ...recipe, yields: ayield })}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAddRecipe}
            className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
