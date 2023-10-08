import { AppContext } from "../../pages/AppContext";

import { useEffect, useState, useContext } from "react";

import EmptyResult from "../general/emptyResult";

import { toUpperCase, getAmount } from "../../utils/helper";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";

import { ORDERS_SHOPPING_LIST_URL } from "../../utils/api.endpoints";

const ShoppingList = () => {
  const value = AppContext();

  const orderIds = localStorage.getItem("selectedOrders")
    ? JSON.parse(localStorage.getItem("selectedOrders"))
    : null;

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
      const result = await getRequest(
        ORDERS_SHOPPING_LIST_URL +
          "?order_ids=" +
          JSON.stringify(orderIds?.map((arr) => arr.order))
      );

      value.setBlockingLoading(false);

      setOrder(result.response);

      const materials = result.response.map((data) =>
        data?.materials?.map((dt) => dt)
      );
      const joinMaterials = [].concat(...materials);

      setInventory(joinMaterials);
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
    const ingredients = order.map((data) => data?.ingredients?.map((dt) => dt));
    const joinIngredients = [].concat(...ingredients);

    const materials = order.map((data) => data?.materials?.map((dt) => dt));
    const joinMaterials = [].concat(...materials);

    if (name == "type") {
      switch (aVal) {
        case "materials":
          setInventory(joinMaterials);
          break;
        case "ingredients":
          setInventory(joinIngredients);
          break;
      }
    }
  }

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <div>
        <div>
          <h2>Shopping List</h2>
          <h4>
            <strong>Orders</strong> -{" "}
            <span>
              {orderIds &&
                toUpperCase(orderIds?.map((arr) => arr.name)?.join(", "))}
            </span>
          </h4>
          <h5>
            <strong>Status</strong> -{" "}
            {orderIds && orderIds?.map((arr) => arr.status)?.join(", ")}
          </h5>
        </div>

        <div>
          <div>
            <h4>Materials</h4>
            <h4>
              {order && order?.length >= 1
                ? order
                    .map((data) =>
                      data?.materials ? data?.materials?.length : 0
                    )
                    ?.reduce((sum, a) => sum + a)
                : 0}
            </h4>
          </div>

          <div>
            <h4>Ingredients</h4>
            <h4>
              {order && order?.length >= 1
                ? order
                    .map((data) =>
                      data?.ingredients ? data?.ingredients?.length : 0
                    )
                    ?.reduce((sum, a) => sum + a)
                : 0}
            </h4>
          </div>
        </div>

        <div className="">
          <select onChange={onFieldChanged} name="type">
            <option value="materials">Materials</option>
            <option value="ingredients">Ingredients</option>
          </select>
          <select onChange={onFieldChanged} name="status">
            <option>All</option>
            <option>Low</option>
            <option>Normal</option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-bgPurple/90 text-primary">
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">Name</th>
                <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  Purchase Unit
                </th>
                {/* <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  Purchase Price
                </th>
                <th className="w-[12%] py-3 pl-7 text-left md:pl-16">Cost</th>
                <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  Low Level
                </th> */}
                <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  Quantity Required
                </th>
                <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  Quantity In Stock
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  Outstanding Quantity
                </th>
                {/* <th className="w-[12%] py-3 pl-7 text-left md:pl-16">
                  {" "}
                  Status
                </th> */}
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
                      <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && toUpperCase(invent?.name)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {invent && invent?.unit?.name} (
                          {invent && invent?.unit?.abbreviation})
                        </td>
                        {/* <td className="w-21 py-3 pl-7 text-left md:pl-16">
                          {invent && getAmount(invent?.price)}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && getAmount(invent?.cost)}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && invent?.lowLevel}
                        </td> */}
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && invent?.quantity}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && invent?.quantity_in_stock}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent && invent?.quantityToFulfill}
                        </td>
                        {/* <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
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
