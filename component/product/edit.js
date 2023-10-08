import { useState, useEffect } from "react";
import {
  checkValidProductToAdd,
  checkValidLabourCost,
  checkValidOverheadCost,
  getAmount,
} from "../../utils/helper";

const EditProduct = ({
  productToEdit,
  closeEdit,
  editProduct,
  proposedSellingPrice,
  totalCost,
  profit
}) => {
  const [product, setProduct] = useState({
    name: productToEdit?.name,
    labour_cost: productToEdit?.labour_cost,
    actual_selling_price: productToEdit?.actual_selling_price,
    overhead_cost: productToEdit?.overhead_cost,
    profit_margin: productToEdit?.profit_margin,
    actual_profit: profit(),
    product_cost: totalCost()?.toFixed(1)
  });
  const [proposedSellingCost, setProposedSellingPrice] =
    useState(proposedSellingPrice);
  const [error, setError] = useState("");

  useEffect(() => {
    const newTotalCost =
      parseInt(totalCost()?.toFixed(1)) +
      parseInt(product.labour_cost ? product.labour_cost : 0) +
      parseInt(product.overhead_cost ? product.overhead_cost : 0);

    const newProposedSellingPrice =
      newTotalCost +
      (product.profit_margin
        ? (product.profit_margin * newTotalCost) / 100
        : 0);

    setProposedSellingPrice(newProposedSellingPrice);
  }, [product]);

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    /*if(name == "profit_margin"){
            const old_profit_amount = product.profit_margin * proposedSellingPrice / 100

            const proposedSellingWithoutProfitMargin = proposedSellingPrice - old_profit_amount

            const new_profit_amount = value * proposedSellingWithoutProfitMargin / 100

            const new_proposed_selling_price =  new_profit_amount + proposedSellingPrice

            setProposedSellingPrice(new_proposed_selling_price)
        }*/

    setProduct({ ...product, [name]: value });
  };

  const onChangeProfit = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const newTotalCost =
      parseInt(totalCost()?.toFixed(1)) +
      parseInt(product.labour_cost ? product.labour_cost : 0) +
      parseInt(product.overhead_cost ? product.overhead_cost : 0);

    const actualProfit = value ? (value * newTotalCost) / 100 : "";
    const profitMargin = value ? (value * 100) / newTotalCost : "";

    setProduct({
      ...product,
      profit_margin: profitMargin,
      actual_profit: actualProfit,
      [name]: value,
    });
  };

  const doEditProduct = () => {
    setError("");

    if (!checkValidProductToAdd(product)) {
      setError("The name field is required");
      return;
    }

    if (!checkValidLabourCost(product)) {
      setError("The labour cost needs to be set before saving");
      return;
    }

    if (!checkValidOverheadCost(product)) {
      setError("The overhead cost needs to be set before saving");
      return;
    }

    editProduct(product);
  };

  return (
    <div className="fixed top-0 right-0 z-40 flex h-screen w-full items-center justify-center bg-secondary/50">
      <div className="w-700 rounded-lg bg-primary p-8 shadow-md">
        <h3 className="mb-7 text-xl font-bold text-bgPurple">
          Edit {product.name.length > 0 ? product.name : "New Product"}
        </h3>
        {error && error.length > 0 && (
          <h5 className="text-dogwoodRose">{error}</h5>
        )}
        <div className=" mt-6 flex items-center justify-between gap-x-6">
        <div className="w-full">
          <h4 className="mb-4 font-semibold">Name</h4>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={product.name}
            placeholder="Enter Product name"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
          </div>

          <div className="w-full">
            <h4 className="mb-4 font-semibold">Product Cost</h4>
            <input
              onChange={onChange}
              type="number"
              name="product_cost"
              min={0}
              value={product.product_cost}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div>
        {/* laboutCost & OverheadCost */}
        <div className=" mt-6 flex items-center justify-between gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Labour Cost</h4>
            <input
              onChange={onChange}
              type="number"
              name="labour_cost"
              min={0}
              value={product.labour_cost}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>

          <div className="w-full">
            <h4 className="mb-4 font-semibold">Overhead Cost</h4>
            <input
              onChange={onChange}
              type="number"
              name="overhead_cost"
              min={0}
              value={product.overhead_cost}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div>
        {/* profit margin & actual profit Margin */}
        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Profit Margin (%)</h4>
            <input
              onChange={onChangeProfit}
              type="number"
              name="profit_margin"
              min={0}
              value={product.profit_margin}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Profit Margin (N)</h4>
            <input
              onChange={onChangeProfit}
              type="number"
              name="actual_profit"
              value={product.actual_profit}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div>
        {/* proposed_selling & Actual price */}
        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div className="w-full">
            <h4 className="mb-4 font-semibold ">Proposed Selling Price</h4>
            <h5 className="flex h-auto items-center rounded-lg bg-bgPurple/10 px-6 py-3">
              {getAmount(proposedSellingCost)}
            </h5>
          </div>
          <div className="w-full">
            <h4 className="mb-4 font-semibold">Actual Selling Price</h4>
            <input
              onChange={onChange}
              type="number"
              name="actual_selling_price"
              min={0}
              value={product.actual_selling_price}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div>

        <div className="mt-10 flex items-center ">
          <button
            onClick={doEditProduct}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeEdit}
            className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors ease-in-out hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
