import { useState } from "react";
import {
  getAmount,
  toUpperCase,
  getMaterialUnit,
  getMaterialQuantityCost,
} from "../../utils/helper";

const materialToAdd = ({ material, addToSelected, units }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [unit, setUnit] = useState(
    units && units.length >= 1 ? units[0]?._id : undefined
  );

  const onUnitChange = (e) => {
    const value = e.target.value;

    setUnit(value);
  };

  const onChange = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  const doAddToSelected = () => {
    material.quantity = quantity;
    material.unit = unit;
    setIsAdded(!isAdded);
    addToSelected(material);
  };

  return (
    <tr className=" bg-bgPurple/10">
      <td className="rounded-l-lg  px-4 py-3">
        {toUpperCase(material?.name)}
      </td>
      <td className=" px-6">
        <input
          type="number"
          name="quantity"
          min="0"
          className=" w-16 rounded-md border border-bgPurple px-3 py-2 text-bgPurple"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className=" px-5">
        <select
          onChange={onUnitChange}
          name="unit"
          className=" rounded-md border border-bgPurple px-3 py-2 text-bgPurple"
        >
          {units &&
            units.map((aUnit) => {
              return (
                <option value={aUnit?._id}>
                  {aUnit?.name} ({aUnit?.abbreviation})
                </option>
              );
            })}
        </select>
      </td>
      <td className="rounded-r-lg  px-4">
        <button
          onClick={doAddToSelected}
          className=" rounded-md border border-bgPurple bg-bgPurple px-3 py-1 text-primary"
        >
          {isAdded ? "Remove" : "Add"}
        </button>
      </td>
    </tr>
  );
};

export default materialToAdd;
