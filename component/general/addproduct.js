import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { checkValidProductToAdd } from "../../utils/helper";

const AddProduct = ({ closeAdd, addProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    labour_cost: 0,
    actual_selling_price: 0,
    overhead_cost: 0,
    profit_margin: 20,
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setProduct({ ...product, [name]: value });
  };

  const doAddProduct = (e, data) => {
    setError("");
    e.preventDefault();
    const checkValid = checkValidProductToAdd(data);

    if (!checkValid) {
      setError("The name and profit margin fields are compulsory");
      return;
    }

    addProduct(data);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-40 flex w-full items-center justify-center bg-secondary/50 px-8">
      <div className="w-500 rounded-lg bg-primary p-8">
        <h3 className="text-xl font-bold text-bgPurple">
          {product.name.length > 0 ? product.name : "New Product"}
        </h3>

        {error && error.length > 0 && (
          <h5 style={{ marginBottom: "12px" }} className="colorRed">
            {error}
          </h5>
        )}

        <div className="inputFieldHolder">
          <h4 className="mt-6 mb-4 font-semibold">Name</h4>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={product.name}
            placeholder="Enter Product name"
            className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
          />
        </div>

        <h5 className="my-4">
          You can add recipes and materials after saving the product.
        </h5>

        <div className="mt-6 flex items-center">
          <button
            onClick={(e) => doAddProduct(e, product)}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAdd}
            className=" ml-3 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
