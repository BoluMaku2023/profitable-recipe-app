import { useState } from "react";
import { toUpperCase } from "../../utils/helper";

const EditOrderProduct = ({
  product,
  onPerformEditClicked,
  onCancelEditClicked,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const doEdit = () => {
    if (quantity !== product.quantity) {
      onPerformEditClicked({ ...product, quantity: quantity });
    }
  };

  const onChange = (e) => {
    const value = e.target.value;

    setQuantity(value);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto items-center justify-center bg-secondary/50">
      <div className=" flex w-500 flex-col rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">
          Edit {product.name.length > 0 && toUpperCase(product.name)}
        </h3>

        <div>
          <h4 className="my-4 font-semibold">Quantity</h4>
          <input
            onChange={onChange}
            type="number"
            name="name"
            min="0"
            value={quantity}
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div className=" mt-7 flex items-center">
          <button
            onClick={doEdit}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={onCancelEditClicked}
            className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderProduct;
