import { useEffect, useState } from "react";
import EmptyResult from "../general/emptyResult";
import ProductToAdd from "./productToAdd";
import { AppContext } from "../../pages/AppContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import { getRequest, putRequest } from "../../utils/api.requests";
import {
  PRODUCTS_TO_ADD_URL,
  ADD_PRODUCTS_TO_ORDER_URL,
} from "../../utils/api.endpoints";
import { getDate, defaultPaginationObject } from "../../utils/helper";
import BlockingLoadingComponent from "../general/blockingloading";

const AddProducts = ({ hideAddProduct, loadOrderProducts, order }) => {
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProductsToAddSearch();
  }, [pagination.page]);

  const onChange = (e, product) => {
    const value = e.target.value;

    product.quantity = value;

    const foundIndex = products.docs.findIndex(
      (aProduct) => aProduct._id == product._id
    );

    if (foundIndex != -1) {
      const sm = selectedProducts;

      sm.splice(foundIndex, 1, product);

      setProducts({ ...products, docs: sm });
    }
  };

  const getProductsToAdd = async () => {
    setIsLoading(true);
    try {
      const result = await getRequest(PRODUCTS_TO_ADD_URL + "?id=" + order._id);

      const new_result = result.response.map((product) => {
        return { ...product, quantity: 0 };
      });

      setProducts(new_result);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const emptySearchAndGetProducts = async () => {
    setSearchTerm("");

    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        PRODUCTS_TO_ADD_URL +
          "?id=" +
          order._id +
          "&search_term=" +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((product) => {
        return { ...product, quantity: 0 };
      });

      setProducts({ ...result.response, docs: new_result });

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

  const getProductsToAddSearch = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        PRODUCTS_TO_ADD_URL +
          "?id=" +
          order._id +
          "&search_term=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((product) => {
        return { ...product, quantity: 0 };
      });

      setProducts({ ...result.response, docs: new_result });

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

  const addProductToSelected = (product) => {
    setError("");

    const sm = selectedProducts;

    const foundIndex = selectedProducts.findIndex(
      (aProduct) => aProduct.product == product._id
    );

    if (foundIndex == -1) {
      sm.push({
        product: product._id,
        quantity: product.quantity,
      });
    } else {
      sm.splice(foundIndex, 1);
    }

    setSelectedProducts(sm);
  };

  const doAddProducts = async () => {
    if (selectedProducts.length > 0) {
      setBlockingLoading(true);

      setError("");

      try {
        const response = await putRequest(ADD_PRODUCTS_TO_ORDER_URL, {
          id: order._id,
          products: selectedProducts,
        });

        setBlockingLoading(false);

        loadOrderProducts();

        hideAddProduct();
      } catch (err) {
        console.log(err);
        setBlockingLoading(false);
      }
    } else {
      if (products.length > 0) {
        setError("Add products to order by clicking/tapping the add button");
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto items-center justify-center bg-secondary/50">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className=" flex w-700 max-w-700 flex-col rounded-lg bg-primary p-6 shadow-lg">
        <div>
          <div>
            <h4 className="text-xl font-bold text-bgPurple">
              Add Products to Order
            </h4>
            <h5 className=" my-3 font-semibold">Select Products to add</h5>
          </div>

          <div className="my-6 flex items-center justify-between">
            <SearchInput
              search_value={searchTerm}
              searchClicked={getProductsToAddSearch}
              onSearchChanged={onSearchChanged}
              closeSearchClicked={emptySearchAndGetProducts}
            />
            <div className="ml-5 flex items-center">
              <button
                onClick={doAddProducts}
                className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
              >
                Save
              </button>
              <button
                onClick={hideAddProduct}
                className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-dogwoodRose">
            {error && error.length > 0 && error}
          </h5>
          <table className="w-full table-auto border-separate border-spacing-y-2 ">
            {!appContext.state.isLoading ? (
              <>
                {products && products.docs && products.docs.length > 0 ? (
                  <>
                    <thead>
                      <tr className="  bg-bgPurple text-primary">
                        <th className="rounded-tl-lg py-3 font-semibold">
                          Name
                        </th>
                        <th className="font-semibold">Quantity To Add</th>
                        <th className="rounded-tr-lg text-left font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.docs.map((product, productKey) => {
                        return (
                          <ProductToAdd
                            addToSelected={addProductToSelected}
                            product={product}
                            key={productKey}
                            onChange={onChange}
                            selectedProducts={selectedProducts}
                          />
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <EmptyResult
                    message={
                      "No Products found to add. Add some products on the products page"
                    }
                    onEmptyButtonClicked={getProductsToAddSearch}
                    emptyButtonText={"Try Again"}
                  />
                )}
              </>
            ) : (
              <Skeleton count={8} height={50} />
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
