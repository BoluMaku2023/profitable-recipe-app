import React, { useRef, useEffect, useState, useContext } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddOrder from "../general/addorder";
import ClientContact from "../general/addClientDetails";
import { useRouter } from "next/router";
import Pagination from "../general/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import EmptyResult from "../general/emptyResult";
import { AppContext } from "../../pages/AppContext";
import AddOrders from "./addOrders";
import {
  getDate,
  defaultPaginationObject,
  getAmount,
} from "../../utils/helper";
import { getRequest, postRequest } from "../../utils/api.requests";
import {
  ALL_ORDERS_URL,
  CREATE_ORDER_URL,
  SEARCH_ORDERS_URL,
} from "../../utils/api.endpoints";
import { Icon } from "@iconify/react";
import { DownloadExcel } from "../downloadExcel";
import BlockingLoadingComponent from "../general/blockingloading";

const OrdersIndex = () => {
  const appContext = AppContext();
  const tableRef = useRef(null);
  const [export_dropdown, setExportDropdown] = useState(false);

  const [showAdd, setShowAdd] = useState("");
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPaginationObject);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [changeList, setChangeList] = useState([]);
  const [blockingLoading, setBlockingLoading] = useState(false);

  // useEffect(() => {
  //   loadOrders();
  // }, [pagination.page]);

  const [orders, setOrders] = useState([]);

  const router = useRouter();

  const navigateToOrder = (e, id) => {
    e.preventDefault();
    router.push("/order/" + id);
  };

  const navigateToShoppingList = (e, id) => {
    e.preventDefault();
    router.push("/shoppinglist/" + id);
  };

  // useEffect(() => {
  //   loadOrders();
  // }, []);

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const showAddOrder = () => {
    setShowAdd("order");
  };

  const closeAddOrder = () => {
    setShowAdd("");
    localStorage.removeItem("_orderDt");
  };

  /*
    New functions
    */

  const showSearchOrders = () => {
    setIsSearchOpen(true);
  };

  const closeSearchOrders = () => {
    setIsSearchOpen(false);

    setSearchResult([]);
  };

  useEffect(() => {
    searchOrders();
  }, [searchTerm]);

  const searchOrders = async () => {
    appContext.setBlockingLoading(true);

    // if (searchTerm && searchTerm.length > 0) {
    try {
      setIsLoading(true);
      const result = await getRequest(
        SEARCH_ORDERS_URL +
          "?searchTerm=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          (pagination.page + 5)
      );
      appContext.setBlockingLoading(false);

      setOrders(result.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    // }
  };

  const addOrder = async (e, order) => {
    setBlockingLoading(true);

    try {
      await postRequest(CREATE_ORDER_URL, order);

      setBlockingLoading(false);

      closeAddOrder();

      loadOrders();
    } catch (err) {
      setBlockingLoading(false);

      appContext.setMessage({
        visible: true,
        message: "An error occurred saving those details",
        title: "Saving Error",
        type: "ERROR",
      });
    }
  };

  const loadOrders = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        ALL_ORDERS_URL +
          "?limit=" +
          pagination.limit +
          "&page=" +
          (pagination.page + 1)
      );

      setOrders(result);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  const selectedOrder = (event, id) => {
    const checked = event.target.checked;

    if (checked) {
      setChangeList((current) => [...current, id]);
    } else {
      setChangeList((current) =>
        current.filter((element) => {
          return element !== id;
        })
      );
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Profitable Order Table";
    const headers = [["Name", "Created", "Status"]];

    const data = orders?.docs.map((order) => [
      order?.name,
      order?.created,
      order?.status,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("orders.pdf");
    setExportDropdown(!export_dropdown);
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  const orderData =
    orders &&
    orders?.docs?.map((order) => {
      return {
        Order: order?.name,
        Created: order?.created,
        Status: order?.status,
      };
    });

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full flex-col justify-between xl:flex-row">
        <div className=" flex items-center">
          <Icon
            icon="mdi:tag-multiple"
            className=" h-auto w-16 rounded-lg bg-bgPurple p-3 text-primary"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">
              <span className="block text-3xl font-bold">Orders</span>
            </h2>
          </div>
        </div>

        <div className="relative mt-16 flex w-full flex-col justify-between md:flex-row md:items-center xl:mt-0 xl:w-1/2">
          {/* <SearchInput
            searchClicked={searchOrders}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchOrders}
          /> */}
          <div className="mt-6 flex w-full items-center justify-end md:mt-0">
            <button
              className="mr-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary md:mx-2 md:mr-0"
              onClick={showAddOrder}
            >
              <div className="flex items-center justify-center">
                <Icon icon="material-symbols:add" />
              </div>
            </button>
            <button
              className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
              onClick={() => setSelectOrder(true)}
            >
              <div className="flex items-center justify-center">
                <Icon icon="bxs:shopping-bag" />
              </div>
            </button>
            <button
              onClick={() => setExportDropdown(!export_dropdown)}
              className="mx-2 flex h-14 w-16 items-center justify-center bg-bgPurple text-3xl text-primary"
            >
              <div>
                <Icon icon="ic:baseline-file-download" />
              </div>
            </button>
            {export_dropdown && (
              <div className="absolute top-20 right-0">
                <DownloadExcel
                  excelData={orderData}
                  fileName="order"
                  close={() => setExportDropdown(!export_dropdown)}
                />
                <div
                  className="mt-3 flex cursor-pointer items-center rounded-lg bg-dogwoodRose p-2 text-primary"
                  onClick={exportPDF}
                >
                  <Icon icon="bi:file-earmark-pdf" className="text-3xl" />
                  <span className="ml-2">as pdf</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* order summary*/}
      <div className=" mt-24 flex w-full flex-col gap-y-12 md:flex-row md:gap-x-12">
        <div className=" max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            Orders comprise details of products sold and client information.
          </h3>
        </div>
        <div className="flex max-w-lg flex-col   items-center rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h5 className="text-4xl">
            {orders && orders.totalDocs ? orders.totalDocs : 0}
          </h5>
          <h4>Total</h4>
        </div>
      </div>

      {/* table menu */}
      <div className=" mt-12 xl:rounded-3xl xl:bg-primary xl:px-12 xl:py-5 xl:pb-16 xl:shadow-lg">
        <h2 className="my-8 text-2xl font-bold">Order Lists</h2>
        <div>
          <SearchInput
            searchClicked={searchOrders}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchOrders}
          />
        </div>
        <div className="">
          <div className="mt-6">
            {!appContext.state.isLoading ? (
              <table
                className="w-full table-fixed border-separate border-spacing-y-2"
                ref={tableRef}
              >
                <thead>
                  <tr className="bg-bgPurple/90 text-primary">
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Name</th>
                    <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left md:pl-16">
                      Created
                    </th>
                    <th className="w-21 pl-7 text-left md:pl-16">
                      Fulfillment Date
                    </th>
                    <th className="w-21 pl-7 text-left md:pl-16">Amount</th>
                    <th className="w-21 pl-7 text-left md:pl-16">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.docs &&
                    orders.docs.length > 0 &&
                    orders.docs.map((order, inOrder) => {
                      console.log(order);
                      const products = order.products;
                      let amount = 0;

                      for (const product of products) {
                        amount += product.quantity * product.unitCost;
                      }

                      console.log(
                        `Amount for order with ID ${order._id}: ${amount}`
                      );
                      return (
                        <tr
                          key={inOrder}
                          onClick={(e) => navigateToOrder(e, order._id)}
                          className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                        >
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {order.name}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {getDate(order.created)}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {getDate(order.fulfillment_date)}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            ₦{amount.toFixed(2) || 0}
                          </td>
                          <td className=" py-4 pl-7 text-left md:pl-16">
                            {order.status}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="px-8 py-3">
                <Skeleton count={8} height={50} />
              </div>
            )}

            {orders &&
              orders.docs &&
              orders.docs.length == 0 &&
              !appContext.state.isLoading && (
                <EmptyResult
                  message={"No Orders found "}
                  onEmptyButtonClicked={loadOrders}
                  emptyButtonText={"Try Again"}
                />
              )}
          </div>
        </div>
      </div>
      <div className="flex">
        {orders && orders.docs && (
          <Pagination
            pageCount={pagination.totalPagesCount}
            handlePageClick={handlePageClick}
            currentPage={pagination.page}
          />
        )}
      </div>
      {selectOrder && <AddOrders hideAddOrder={() => setSelectOrder(false)} />}

      {showAdd === "order" ? (
        <AddOrder next={() => setShowAdd("client")} closeAdd={closeAddOrder} />
      ) : showAdd === "client" ? (
        <ClientContact addOrder={addOrder} back={() => setShowAdd("order")} />
      ) : null}
    </div>
  );
};

export default OrdersIndex;
