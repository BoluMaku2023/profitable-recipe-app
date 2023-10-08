import { useEffect, useState } from "react";
import EmptyResult from "../general/emptyResult";
import OrderToAdd from "./orderToAdd";
import { AppContext } from "../../pages/AppContext";
import { defaultPaginationObject } from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import { getRequest } from "../../utils/api.requests";
import { useRouter } from "next/router";
import { ORDERS_TO_ADD } from "../../utils/api.endpoints";

const AddOrder = ({ hideAddOrder }) => {
  const appContext = AppContext();

  const [orders, setOrders] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    getOrdersToAddSearch();
  }, [searchTerm]);

  const getOrdersToAdd = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(ORDERS_TO_ADD);

      const new_result = result.response.map((order) => {
        return { ...order };
      });

      setOrders(new_result);

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const emptySearchAndGetOrders = async () => {
    setSearchTerm("");

    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        ORDERS_TO_ADD +
          "?search_term=" +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.map((order) => {
        return { ...order };
      });

      setOrders({ ...result.response, docs: new_result });

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const getOrdersToAddSearch = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        ORDERS_TO_ADD +
          "?search_term=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((order) => {
        return { ...order };
      });

      setOrders({ ...result.response, docs: new_result });

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const addOrderToSelected = (order) => {
    const sm = selectedOrders;

    const foundIndex = selectedOrders.findIndex(
      (aOrder) => aOrder.order == order._id
    );

    if (foundIndex == -1) {
      sm.push({
        order: order._id,
        name: order.name,
        status: order.status,
      });
    } else {
      sm.splice(foundIndex, 1);
    }

    setSelectedOrders(sm);
  };

  const doAddOrder = async () => {
    if (selectedOrders.length > 0) {
      localStorage.setItem("selectedOrders", JSON.stringify(selectedOrders));

      // hideAddOrder();
      router.push("/shoppinglist");
    } else {
      if (orders.length > 0) {
        setError("Select orders by clicking/tapping the select button");
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-40 flex h-full w-full items-center justify-center bg-secondary/50 px-8">
      <div className="max-w-4xl rounded-lg bg-primary p-8 shadow-sm">
        <div className="popUpAddInnerContentTop">
          <div>
            <h4 className="text-xl font-bold text-bgPurple">Add Orders</h4>
            <h5 className="my-3">
              Select Orders get cummulative shopping list
            </h5>

            <div className="mt-4">
              <SearchInput
                search_value={searchTerm}
                searchClicked={getOrdersToAddSearch}
                onSearchChanged={onSearchChanged}
                closeSearchClicked={emptySearchAndGetOrders}
              />
            </div>
          </div>

          <div className="my-6 flex items-center">
            <button
              onClick={doAddOrder}
              className=" flex max-h-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
            >
              Get Shopping List
            </button>
            <button
              onClick={hideAddOrder}
              className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
            >
              Close
            </button>
          </div>
        </div>
        <div>
          <h5>{error && error.length > 0 && error}</h5>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            {!appContext.state.isLoading ? (
              <>
                {orders && orders.docs && orders.docs.length > 0 ? (
                  <>
                    <thead>
                      <tr className="bg-bgPurple text-primary">
                        <th className="py-3 pl-6 text-left">Name</th>
                        <th className="hidden py-3 pl-6  text-left xl:block">
                          Created
                        </th>
                        <th className="py-3 pl-8 text-left">Status</th>
                        <th className="w-25"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.docs.map((order) => {
                        return (
                          <OrderToAdd
                            addToSelected={addOrderToSelected}
                            order={order}
                            selectedOrders={selectedOrders}
                          />
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <EmptyResult
                    message={"No Orders found to add. Create an order"}
                    onEmptyButtonClicked={getOrdersToAddSearch}
                    emptyButtonText={"Try Again"}
                  />
                )}
              </>
            ) : (
              <Skeleton count={8} height={40} />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
