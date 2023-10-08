import { useState } from "react";
import { getAmount, toUpperCase } from "../../utils/helper";

const orderToAdd = ({ order, addToSelected }) => {
  const [isAdded, setIsAdded] = useState(false);

  const doAddToSelected = () => {
    setIsAdded(!isAdded);
    addToSelected(order);
  };

  return (
    <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
      <td className="border-r-2 border-primary py-4 pl-6">
        {toUpperCase(order?.name)}
      </td>
      <td className="hidden border-r-2 border-primary py-4 pl-6 xl:block">
        {order?.created}
      </td>
      <td className="border-r-2 border-primary py-4 pl-8">{order?.status}</td>
      <td className="w-full pl-6 ">
        <button
          onClick={doAddToSelected}
          className=" flex max-h-10 w-28 items-center justify-center  bg-bgPurple text-primary transition-colors ease-in-out hover:bg-darkPurple"
        >
          {isAdded ? "Remove" : "Select"}
        </button>
      </td>
    </tr>
  );
};

export default orderToAdd;
