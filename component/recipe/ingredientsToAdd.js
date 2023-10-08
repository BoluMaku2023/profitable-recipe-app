import { useEffect, useState } from "react";
import {
  getAmount,
  toUpperCase,
  getPriceOfQuantity,
  getChildQuantityFromParentQuantity,
} from "../../utils/helper";

const ingredientToAdd = ({
  ingredient,
  selectedIngredients,
  addToSelected,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(
    ingredient?.units && ingredient?.units?.length >= 1
      ? ingredient?.units[0]?._id
      : ""
  );
  const [isAdded, setIsAdded] = useState(false);
  const [costQuantity, setCostQuantity] = useState();

  const getUnitAmountFromId = () => {
    return ingredient?.units && ingredient?.units?.length >= 1
      ? ingredient?.units?.find((aUnit) => aUnit?._id == unit)?.amount
      : 0;
  };

  const d = getUnitAmountFromId();

  useEffect(() => {
    const amountData = getAmount(
      getPriceOfQuantity(
        ingredient?.price,
        quantity,
        d,
        ingredient?.purchase_quantity?.unit?.amount
      )
    );

    setCostQuantity(amountData)
  });

  const onChange = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  const onUnitChange = (e) => {
    const value = e.target.value;

    setUnit(value);
  };

  const doAddToSelected = () => {
    ingredient.quantity = quantity;
    ingredient.unit = unit;

    setIsAdded(!isAdded);

    addToSelected(ingredient);
  };

  return (
    <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
      <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
        {toUpperCase(ingredient?.name)}
      </td>
      <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
        {/* {ingredient?.purchase_quantity && ingredient?.purchase_quantity?.amount} */}
        {ingredient?.quantity_in_stock}
      </td>
      <td className="flex cursor-pointer items-center gap-x-1 py-4 pl-7 text-left md:pl-16">
        {ingredient?.purchase_quantity?.unit?.name || "---"}
        <p>({ingredient?.purchase_quantity?.unit?.abbreviation || "---"})</p>
      </td>
      <td className="w-24 py-3 pl-7 text-left">
        {getAmount(ingredient?.price)}
      </td>
      <td className="flex gap-x-3">
        <select
          onChange={(e) => onUnitChange(e)}
          name="unit"
          className="w-24 rounded-lg border border-bgPurple px-2 outline-none placeholder:text-xs focus:border-dogwoodRose"
        >
          {ingredient?.units &&
            ingredient?.units.map((aUnit) => {
              return (
                <option value={aUnit?._id}>
                  {aUnit?.name} ({aUnit?.abbreviation})
                </option>
              );
            })}
        </select>
      </td>
      <td>
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => onChange(e)}
          className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          min="0"
        />
      </td>
      <td className="w-21 py-3 pl-7 text-left">
        {costQuantity}
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

export default ingredientToAdd;
