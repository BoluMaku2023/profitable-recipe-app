import { useState } from "react";
import { toUpperCase } from "../../utils/helper";

const recipeToAdd = ({ recipe, selectedRecipes, addToSelected }) => {
  const [quantityUnit, setQuantityUnit] = useState({
    quantity: 1,
    unit: recipe?.yield?.unit?._id,
  });

  const [isAdded, setIsAdded] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setQuantityUnit({ ...quantityUnit, [name]: value });
  };

  const doAddToSelected = () => {
    recipe.quantity = quantityUnit?.quantity;
    recipe.unit = quantityUnit?.unit;

    setIsAdded(!isAdded);

    addToSelected(recipe);
  };

  return (
    <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
      <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
        {toUpperCase(recipe?.name)}
      </td>
      <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
        {recipe?.yield && recipe?.yield?.amount}{" "}
        {recipe?.yield && recipe?.yield?.unit?.abbreviation}
      </td>
      <td className="cursor-pointer py-2 pl-7 text-left md:pl-16">
        <input
          type="number"
          name="quantity"
          min="0"
          placeholder="Enter yield"
          className="h-11 w-[60px] rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          value={
            recipe?.yield
              ? quantityUnit?.quantity > recipe?.yield?.amount
                ? recipe?.yield?.amount
                : quantityUnit?.quantity
              : quantityUnit?.quantity
          }
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <select
          defaultValue={recipe?.yield?.unit?._id}
          style={{ marginLeft: "0px" }}
          onChange={(e) => onChange(e)}
          name="unit"
          className="h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
        >
          {recipe &&
            recipe?.units &&
            recipe?.units.map((aUnit) => {
              return (
                <option value={aUnit?._id}>
                  {aUnit?.name} ({aUnit?.abbreviation})
                </option>
              );
            })}
        </select>
      </td>
      <td className="flex items-center justify-center py-2">
        <button
          onClick={doAddToSelected}
          className=" flex max-h-11 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
        >
          {isAdded ? "Remove" : "Add"}
        </button>
      </td>
    </tr>
  );
};

export default recipeToAdd;
