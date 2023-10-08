import { AppContext } from "../../pages/AppContext";
import { useEffect, useState, useContext } from "react";
import EmptyResult from "../general/emptyResult";
import { toUpperCase, getAmount } from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";
import { ORDER_SHOPPING_LIST_URL } from "../../utils/api.endpoints";

const ShoppingList = ({ id }) => {
  const value = AppContext();

  const [order, setOrder] = useState({});

  const [inventory, setInventory] = useState([]);

  const [filters, setFilters] = useState({
    type: "materials",
    status: "All",
    searchTerm: "",
  });

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = async () => {
    value.setBlockingLoading(true);

    try {
      const result = await getRequest(ORDER_SHOPPING_LIST_URL + "?id=" + id);

      value.setBlockingLoading(false);
      setOrder(result.response);

      setInventory(result.response.materials);
    } catch (err) {
      value.setBlockingLoading(false);
      console.log(err);
    }
  };

  async function onFieldChanged(event) {
    event.preventDefault();
    const target = event.target;
    const aVal = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFilters({ ...filters, [name]: aVal });

    if (name == "type") {
      switch (aVal) {
        case "materials":
          if (order && order.materials) setInventory(order.materials);
          break;
        case "ingredients":
          if (order && order.ingredients) setInventory(order.ingredients);
          break;
      }
    }
  }

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14 ">
      <div className="mt-9 flex items-center justify-between">
        <Link href="/orders">
          <Icon icon="material-symbols:arrow-back" className="text-3xl" />
        </Link>
      </div>
      <div className=" mt-10 w-1/2 max-w-800">
        <div>
          <h2 className="text-lg font-bold text-bgPurple">Shopping List</h2>
          <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
            <span>
              Order - {order && order.name && toUpperCase(order.name)}
            </span>
          </h3>
        </div>
        <h5 className="my-6 text-lg font-bold text-bgPurple">
          <strong>Status</strong> -{" "}
          <span className="font-normal text-dogwoodRose">
            {order && order.status}
          </span>
        </h5>
      </div>

      <div className="flex max-w-800 items-center gap-x-6">
        <div className=" flex w-full flex-col">
          <h4 className="text-lg font-bold text-bgPurple">Materials</h4>
          <h4 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
            {order && order.materials && order.materials.length}
          </h4>
        </div>

        <div className=" flex w-full flex-col">
          <h4 className="text-lg font-bold text-bgPurple">Ingredients</h4>
          <h4 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
            {order && order.ingredients && order.ingredients.length}
          </h4>
        </div>
      </div>

      <div className=" mt-12 xl:rounded-3xl xl:bg-primary xl:px-12 xl:py-5 xl:pb-16 xl:shadow-lg">
        <div className="relative my-6 flex items-center gap-x-8">
          <div className="relative">
            <select
              onChange={onFieldChanged}
              name="type"
              className="w-36 appearance-none rounded-lg border border-bgPurple px-6 py-3 text-sm outline-none"
            >
              <Icon
                icon="mdi:caret"
                rotate={2}
                className="absolute top-0 right-1"
              />
              <option value="materials">Materials</option>
              <option value="ingredients">Ingredients</option>
            </select>
            <Icon
              icon="mdi:caret"
              rotate={2}
              className="absolute top-2 right-3 text-3xl text-bgPurple"
            />
          </div>
          <div className="relative">
            <select
              onChange={onFieldChanged}
              border
              border-bgPurple
              name="status"
              className="w-36 appearance-none rounded-lg border border-bgPurple px-6 py-3 text-sm outline-none"
            >
              <option>All</option>
              <option>Low</option>
              <option>Normal</option>
            </select>

            <Icon
              icon="mdi:caret"
              rotate={2}
              className="absolute top-2 right-3 text-3xl text-bgPurple"
            />
          </div>
        </div>

        <div className="w-full ">
          <table className="w-full table-fixed border-separate border-spacing-y-2 text-sm">
            <thead className="">
              <tr className="bg-bgPurple font-semibold text-primary">
                <th className="py-4 pl-6 text-left">Name</th>
                <th className="py-4 pl-6 text-left">Purchase Unit</th>
                {/* <th className="py-4 pl-6 text-left">Purchase Price</th>
                <th className="py-4 pl-6 text-left ">Low Level</th>
                <th className="py-4 pl-6 text-left">Cost</th> */}
                <th className="py-4 pl-6 text-left">Quantity Required</th>
                <th className="py-4 pl-6 text-left">Quantity In Stock</th>
                <th className="py-4 pl-6 text-left">
                  Outstanding Quantity
                </th>
                {/* <th className="py-4 pl-6 text-left">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {inventory &&
                inventory.length > 0 &&
                inventory.map((invent) => {
                  return (
                    (filters.status == "All" ||
                      invent?.status.toLowerCase() ===
                        filters.status.toLowerCase()) && (
                      <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && toUpperCase(invent?.name)}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && invent?.unit?.name} (
                          {invent && invent?.unit?.abbreviation})
                        </td>
                        {/* <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && getAmount(invent?.price)}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && getAmount(invent?.cost)}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && invent?.lowLevel}
                        </td> */}
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && invent?.quantity}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && invent?.quantity_in_stock}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-6">
                          {invent && invent?.quantityToFulfill}
                        </td>
                        {/* <td className=" py-4 pl-6">
                          {invent && invent?.status}
                        </td> */}
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>

          {inventory &&
            inventory.length == 0 &&
            !value.state.loading &&
            !value.state.isBlockingLoading && (
              <EmptyResult
                message="No products were found for this order."
                onEmptyButtonClicked={loadShoppingList}
                emptyButtonText="Try Again"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

// const thStyle = {
//   width: "11%",
//   fontSize: "14px",
//   paddingLeft: "16px",
//   fontWeight: "700",
// };

// const thStyleFirst = {
//   width: "12%",
//   fontSize: "14px",
//   paddingLeft: "16px",
//   fontWeight: "700",
// };

// const tdStyle = { fontSize: "14px", paddingLeft: "16px" };
