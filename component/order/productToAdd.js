import { useState } from "react";
import { toUpperCase, getPriceOfQuantity, getAmount } from "../../utils/helper";

const productToAdd = ({ product, selectedProducts, addToSelected }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  const doAddToSelected = () => {
    product.quantity = quantity;

    setIsAdded(!isAdded);

    addToSelected(product);
  };

  return (
    <tr className=" cursor-pointer bg-bgPurple/10 hover:bg-bgPurple/20">
      <td className="border-bgPurple pl-12">{toUpperCase(product.name)}</td>
      <td className="border-r border-primary text-center">
        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={quantity}
          min="0"
          onChange={(e) => onChange(e)}
          className=" h-11 w-20 max-w-24 rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
        />
      </td>
      <td className=" flex items-center  justify-center rounded-r-lg text-center">
        <button
          onClick={doAddToSelected}
          className=" flex h-11 max-h-24 w-20 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
        >
          {isAdded ? "Remove" : "Add"}
        </button>
      </td>
    </tr>
  );
};

export default productToAdd;
