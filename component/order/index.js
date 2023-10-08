import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import EditOrder from "./editorder";
import ClientContact from "../../component/general/addClientDetails";
import EditOrderProduct from "./editorderproduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../general/pagination";
import { AppContext } from "../../pages/AppContext";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  GET_ORDER_URL,
  ORDER_PRODUCTS_URL,
  EDIT_ORDER_URL,
  DELETE_ORDER_URL,
  FULFILL_ORDER_URL,
  UNFULFILL_ORDER_URL,
  DELETE_ORDER_PRODUCT_URL,
  EDIT_ORDER_PRODUCT_URL,
} from "../../utils/api.endpoints";
import AddProducts from "./addproducts";
import {
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";
import DeleteDialog from "../general/deletedialog";
import MessageDialog from "../general/messagedialog";
import {
  getAmount,
  toUpperCase,
  getDate,
  defaultPaginationObject,
} from "../../utils/helper";
import { Icon } from "@iconify/react";
import BlockingLoadingComponent from "../general/blockingloading";
import { toast } from "react-toastify";

const DetailsTab = "Details";
const ProductsTab = "Products";

const OrderIndex = ({ id }) => {
  const router = useRouter();

  const [selected, setSelected] = useState(1);

  const appContext = AppContext();

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedTab, setSelectedTab] = useState(DetailsTab);

  const [showDeleteOrder, setShowDeleteOrder] = useState(false);
  const [showDeleteOrderProduct, setShowDeleteOrderProduct] = useState(false);
  const [showEditOrderProduct, setShowEditOrderProduct] = useState(false);
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [order, setOrder] = useState({});

  const [showEditOrder, setShowEditOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [showFulfillOrderMessage, setShowFulfillOrderMessage] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [recipes, setRecipes] = useState({});
  const [productPaginate, setProductPaginate] = useState({
    offset: 0,
    limit: 30,
  });
  const [recipePaginate, setRecipePaginate] = useState({
    offset: 0,
    limit: 30,
  });

  const [entityInFocus, setEntityInFocus] = useState({});

  const [isDelete, setIsDelete] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    loadAllAsync();
  }, []);

  const loadAllAsync = async () => {
    await loadOrder();

    await loadOrderProducts();
  };

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  useEffect(() => {
    loadOrderProducts();
  }, [pagination.page]);

  /*const showAddRecipesModal = () => {
        setShowAddIngredients(true)
    }

    const hideAddIngredientsModal = () => {
        setShowAddIngredients(false)
    }*/

  const switchSelectedTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  useEffect(() => {
    loadOrder();
    loadOrderProducts();
  }, []);

  const showPendingStatus = () => {
    setIsStatus(true);
  };

  const showFulfilledStatus = () => {
    setIsStatus(false);
  };

  /*
    New functions
    */

  const loadOrder = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(GET_ORDER_URL + "?id=" + id);

      appContext.setBlockingLoading(false);

      setOrder(result.response);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  const loadOrderProducts = async () => {
    appContext.setBlockingLoading(true);
    try {
      const result = await getRequest(
        ORDER_PRODUCTS_URL +
          "?id=" +
          id +
          `&page=${pagination.page}&limit=${pagination.limit}`
      );

      setProducts(result.response);

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  const goToShoppingList = () => {
    router.push("/shoppinglist/" + order._id);
  };

  const openEditOrder = () => {
    setShowEditOrder("order");
  };

  const hideEditOrder = () => {
    setShowEditOrder("");
  };

  const editOrder = async (e, editedOrder) => {
    setBlockingLoading(true);
    try {
      const newEditedOrder = { ...order, ...editedOrder, id: order._id };
      console.log(newEditedOrder);
      const result = await putRequest(EDIT_ORDER_URL, newEditedOrder);

      console.log(result);

      hideEditOrder();

      loadOrder();

      setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setMessage({
        visible: true,
        message: "Could not edit order successfully",
        title: "Message",
        type: "ERROR",
      });

      setBlockingLoading(false);
    }
  };

  const openAddProduct = () => {
    setShowAddProduct(true);
  };

  const hideAddProduct = () => {
    setShowAddProduct(false);
  };

  const openDeleteOrder = () => {
    setShowDeleteOrder(true);
  };

  const hideDeleteOrder = () => {
    setShowDeleteOrder(false);
  };

  const openDeleteOrderProduct = (e, productToDelete) => {
    e.preventDefault();
    setEntityInFocus(productToDelete);
    setShowDeleteOrderProduct(true);
  };

  const hideDeleteOrderProduct = () => {
    setEntityInFocus({});
    setShowDeleteOrderProduct(false);
  };

  const openEditOrderProduct = (e, productToEdit) => {
    e.preventDefault();
    setEntityInFocus(productToEdit);
    setShowEditOrderProduct(true);
  };

  const hideEditOrderProduct = () => {
    setEntityInFocus({});
    setShowEditOrderProduct(false);
  };

  const deleteOrder = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_ORDER_URL, { id: id });

      setBlockingLoading(false);

      router.push("/orders");
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);
    }
  };

  const openFulfillOrderMessage = () => {
    setShowFulfillOrderMessage(true);
  };

  const closeFulfillOrderMessage = () => {
    setShowFulfillOrderMessage(false);
  };

  const fulfillOrder = async () => {
    closeFulfillOrderMessage();
    setBlockingLoading(true);

    try {
      const result = await putRequest(FULFILL_ORDER_URL, { id: order._id });
      if (result.response !== "SUCCESS") {
        toast.error(result.response);
      } else {
        toast.success(result.response);
      }
      setBlockingLoading(false);

      loadOrder();
    } catch (err) {
      setBlockingLoading(false);
      console.log(err);
    }
  };

  const unfulfillOrder = async () => {
    setBlockingLoading(true);

    try {
      const result = await putRequest(UNFULFILL_ORDER_URL, { id: order._id });

      setBlockingLoading(false);

      loadOrder();
    } catch (err) {
      setBlockingLoading(false);
      console.log(err);
    }
  };

  const deleteOrderProduct = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_ORDER_PRODUCT_URL, {
        product_id: entityInFocus._id,
        id: id,
      });

      setBlockingLoading(false);

      hideDeleteOrderProduct();

      loadOrderProducts();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      hideDeleteOrderProduct();

      appContext.setMessage({
        visible: true,
        message: "Could not delete product from order",
        title: "Error Deleting",
        type: "ERROR",
      });
    }
  };

  const editOrderProduct = async (newEditedProduct) => {
    setBlockingLoading(true);

    try {
      await putRequest(EDIT_ORDER_PRODUCT_URL, {
        id: id,
        product_id: newEditedProduct._id,
        quantity: newEditedProduct.quantity,
      });

      setBlockingLoading(false);

      hideEditOrderProduct();

      loadOrderProducts();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      hideEditOrderProduct();

      appContext.setMessage({
        visible: true,
        message: "Could not edit order product successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const goToProduct = (e, product_id) => {
    e.preventDefault();
    router.push("/product/" + product_id);
  };

  const getTotalCost = () => {
    if (products && products.length > 0) {
      const costSum = products.reduce((acc, aProduct) => {
        return acc + aProduct.totalCost;
      }, 0);

      return costSum;
    }

    return 0;
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  return (
    <div className="mt-20 h-full py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14 ">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full flex-col justify-between gap-y-12 xl:flex-row xl:items-center xl:gap-y-0">
        <Link href="/orders">
          <Icon icon="material-symbols:arrow-back" className="text-3xl" />
        </Link>
        {/* quick btn */}
        <div className="flex items-center gap-x-2 xl:gap-x-5">
          <button
            onClick={openEditOrder}
            className="mr-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary md:mx-2 md:mr-0"
          >
            <div className="flex items-center justify-center">
              <Icon icon="material-symbols:edit" />
            </div>
          </button>
          <button
            onClick={openAddProduct}
            className="mr-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary md:mx-2 md:mr-0"
          >
            <div className="flex items-center justify-center">
              <Icon icon="material-symbols:add" />
            </div>
          </button>
          <button
            onClick={openDeleteOrder}
            className="mr-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary md:mx-2 md:mr-0"
          >
            <div className="flex items-center justify-center">
              <Icon icon="ph:trash-fill" />
            </div>
          </button>
          <button
            onClick={goToShoppingList}
            className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
          >
            <div className="flex items-center justify-center">
              <Icon icon="bxs:shopping-bag" />
            </div>
          </button>
        </div>
      </div>

      <div className=" mt-10 w-1/2 max-w-800">
        <div>
          <h2 className="text-lg font-bold text-bgPurple"> Order Name</h2>
          <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
            <span>{order && order.name && toUpperCase(order.name)}</span>
          </h3>
        </div>
        <div>
          <h2 className="text-lg font-bold text-bgPurple">
            {" "}
            Products Quantity
          </h2>
          <h3 className="my-3 rounded-lg bg-bgPurple/10 p-3 text-base">
            <span>{products ? products.length : 0}</span>
          </h3>
        </div>
      </div>

      <div className="my-12 w-full max-w-800">
        <div className="flex items-start justify-evenly">
          <div
            onClick={(e) => switchSelectedTab(e, DetailsTab)}
            className="flex w-full cursor-pointer items-center justify-center bg-secondary/50 py-4 text-primary"
          >
            <h5>Details</h5>
          </div>
          <div
            onClick={(e) => switchSelectedTab(e, ProductsTab)}
            className="flex w-full cursor-pointer items-center justify-center bg-bgPurple/50 py-4 text-primary"
          >
            <h5>Products</h5>
          </div>
        </div>

        {selectedTab == DetailsTab ? (
          <div className="overflow-x-scroll text-base scrollbar-hide">
            <table className="h-full w-[600px] table-fixed border-separate border-spacing-y-1 xl:w-full">
              <tbody>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary  py-4 pl-7 md:pl-16">
                    Name
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    {order && order.name && toUpperCase(order.name)}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Date
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    {order && order.created && getDate(order.created)}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Total Cost
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    ₦{order && order?.totalCost?.toFixed(2)}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Order status
                  </td>
                  <td className="flex items-center pl-7 md:pl-16">
                    <span className="mr-6"> {order && order.status}</span>
                    {order &&
                      (order.status == "PENDING" ? (
                        <button
                          onClick={openFulfillOrderMessage}
                          className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
                        >
                          Fulfill
                        </button>
                      ) : (
                        <button
                          onClick={unfulfillOrder}
                          className=" ml-6 flex max-h-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
                        >
                          Unfulfill
                        </button>
                      ))}
                  </td>
                </tr>

                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Fulfillment date
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    {order &&
                      order.fulfillment_date &&
                      getDate(order.fulfillment_date)}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Client Phone Number
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    {order && order?.client && order?.client?.phone_number}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Client Email
                  </td>
                  <td className="py-4 pl-7  md:pl-16">
                    {order && order?.client && order?.client?.email}
                  </td>
                </tr>
                <tr className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20">
                  <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                    Note
                  </td>
                  <td className="py-4 pl-7  md:pl-16">{order && order.note}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-scroll scrollbar-hide">
            <table className="w-[800px] table-fixed border-separate border-spacing-y-2 xl:w-full">
              <thead>
                <tr className="bg-bgPurple text-primary">
                  <th className="py-4 pl-7 text-left md:pl-16">Name</th>
                  <th className="py-4 pl-7 text-left md:pl-16">Quantity</th>
                  <th className="py-4 pl-7 text-left md:pl-16">Total Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.length > 0 &&
                  products.map((product) => {
                    return (
                      <tr
                        key={product._id}
                        className="cursor-pointer bg-bgPurple/10 text-sm hover:bg-bgPurple/20"
                      >
                        <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                          {product && toUpperCase(product.name)}
                        </td>
                        <td className="border-r-2 border-primary py-4 pl-7  md:pl-16">
                          {product.quantity}
                        </td>
                        <td className="border-r-2  border-primary py-4 pl-7 md:pl-16">
                          {getAmount(product.totalCost)}
                        </td>
                        <td className="flex items-center pl-7 md:pl-16">
                          <button
                            onClick={(e) => openEditOrderProduct(e, product)}
                            className="flex w-6 items-center justify-center rounded-lg bg-bgPurple text-primary shadow-sm"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            onClick={(e) => openDeleteOrderProduct(e, product)}
                            className="ml-3 flex w-6 items-center justify-center rounded-lg bg-dogwoodRose text-primary shadow-sm"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {
              <Pagination
                pageCount={pagination.totalPagesCount}
                handlePageClick={handlePageClick}
                currentPage={pagination.page}
              />
            }
          </div>
        )}
      </div>

      {showEditOrder === "order" ? (
        <EditOrder
          hideEditOrder={hideEditOrder}
          next={() => setShowEditOrder("client")}
          aOrder={order}
        />
      ) : showEditOrder === "client" ? (
        <ClientContact
          back={() => setShowEditOrder("order")}
          addOrder={editOrder}
          aOrder={order}
        />
      ) : null}

      {showAddProduct && (
        <AddProducts
          loadOrderProducts={loadOrderProducts}
          order={order}
          hideAddProduct={hideAddProduct}
        />
      )}

      {showFulfillOrderMessage && (
        <MessageDialog
          onPerformClicked={fulfillOrder}
          onCancelClicked={closeFulfillOrderMessage}
          title="Confirm Fulfillment"
          message="Are you sure you want to fulfill this order? Fulfilling this order will deduct the quantity of items in this order from inventory."
        />
      )}

      {showDeleteOrder && (
        <DeleteDialog
          onPerformDeleteClicked={deleteOrder}
          onCancelDeleteClicked={hideDeleteOrder}
          type={"Order"}
        />
      )}

      {showDeleteOrderProduct && (
        <DeleteDialog
          onPerformDeleteClicked={deleteOrderProduct}
          onCancelDeleteClicked={hideDeleteOrderProduct}
          type={`${entityInFocus.name} from ${order.name}`}
        />
      )}

      {showEditOrderProduct && (
        <EditOrderProduct
          product={entityInFocus}
          onPerformEditClicked={editOrderProduct}
          onCancelEditClicked={hideEditOrderProduct}
        />
      )}
    </div>
  );
};

export default OrderIndex;
