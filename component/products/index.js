import React, { useRef, useEffect, useState, useContext } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddProduct from "../general/addproduct";
import SearchInput from "../general/searchInput";
import Pagination from "../general/pagination";
import { useRouter } from "next/router";
import {
  getAmount,
  getDate,
  defaultPaginationObject,
} from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EmptyResult from "../general/emptyResult";
import { AppContext } from "../../pages/AppContext";
import { postRequest, getRequest } from "../../utils/api.requests";
import {
  BASE_URL,
  GET_ALL_PRODUCTS,
  ADD_PRODUCT,
  SEARCH_PRODUCTS_URL,
} from "../../utils/api.endpoints";
// import { Icon } from "@iconify/react";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { DownloadExcel } from "../downloadExcel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import GeneralUI from "../general/generalUI";
import BlockingLoadingComponent from "../general/blockingloading";

const get_products_url = BASE_URL + GET_ALL_PRODUCTS;

const add_product_url = BASE_URL + ADD_PRODUCT;

const ProductsIndex = () => {
  const appContext = AppContext();
  const tableRef = useRef(null);
  const [export_dropdown, setExportDropdown] = useState(false);

  const router = useRouter();
  const [blockingLoading, setBlockingLoading] = useState(false);
  const navigateToProduct = (e, id) => {
    e.preventDefault();
    router.push("/product/" + id);
  };

  const [showAdd, setShowAdd] = useState(false);
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [products, setProducts] = useState({
    p: null,
  });

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [pagination.page]);

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const showAddProduct = () => {
    setShowAdd(true);
  };

  const closeAddProduct = () => {
    setShowAdd(false);
  };

  /*
    New functions
    */

  const showSearchProducts = () => {
    setIsSearchOpen(true);
  };

  const closeSearchProducts = () => {
    setIsSearchOpen(false);

    loadProducts();
  };

  useEffect(() => {
    searchProducts();
  }, [searchTerm]);

  const searchProducts = async () => {
    if (searchTerm && searchTerm.length > 0) {
      try {
        appContext.setBlockingLoading(true);
        const result = await getRequest(
          SEARCH_PRODUCTS_URL +
            "?searchTerm=" +
            searchTerm +
            "&page=" +
            (pagination.page + 1) +
            "&limit=" +
            pagination.limit
        );
        appContext.setBlockingLoading(false);

        setProducts({
          ...products,
          p: result.response,
        });
        console.log(result.response);
      } catch (err) {
        appContext.setBlockingLoading(false);
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  const addProduct = async (data) => {
    setBlockingLoading(true);

    try {
      const result = await postRequest(add_product_url, data);

      closeAddProduct();

      setBlockingLoading(false);

      router.push("/product/" + result.response._id);
    } catch (err) {
      setBlockingLoading(false);
    }
  };

  const loadProducts = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        get_products_url +
          "?limit=" +
          pagination.limit +
          "&page=" +
          (pagination.page + 1)
      );

      setProducts({
        ...products,
        p: result.response,
      });

      console.log(result.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Profitable Product Table";
    const headers = [["Name", "Created", "Total Cost", "Actual Selling Price"]];

    const data = products?.docs.map((product) => [
      product?.name,
      product?.created,
      product?.totalCost || "0",
      product?.actual_selling_price || "0",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("products.pdf");
    setExportDropdown(!export_dropdown);
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  const productData =
    products &&
    products.docs &&
    products.docs.length > 0 &&
    products.docs.map((product) => {
      return {
        Name: product?.name,
        Created: product?.created,
        "Total Cost": product.totalCost - product.actual_profit,
        "Actual Profit Margin": product.actual_profit,
        "Actual Selling Price": product.actual_selling_price,
      };
    });

  //     correct product datatable Name , total
  // cost, profit margin, proposed selling price and actual selling price

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full flex-col justify-between xl:flex-row">
        <div className=" flex items-center">
          <FontAwesomeIcon
            icon={faBagShopping}
            className=" h-8 w-8 rounded-lg bg-bgPurple p-3 text-primary"
          />
          <div className="ml-6">
            <h2 className="font-semibold">
              <span className="block text-3xl font-bold">Products</span>
            </h2>
            <h3 className="mt-2 text-base font-medium">What are products</h3>
          </div>
        </div>

        <div className="relative mt-16 flex w-full flex-col justify-between md:flex-row md:items-center xl:mt-0 xl:w-1/2">
          {/* <SearchInput
            searchClicked={searchProducts}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchProducts}
          /> */}
          <div className="mt-6 flex w-full items-center justify-end md:mt-0">
            <button
              className="mr-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary md:mx-2 md:mr-0"
              onClick={showAddProduct}
            >
              <div className="flex items-center justify-center">
                <AddIcon />
              </div>
            </button>
            <button
              onClick={() => setExportDropdown(!export_dropdown)}
              className="mx-2 flex h-14 w-16 items-center justify-center bg-bgPurple text-3xl text-primary"
            >
              <div>
                <DownloadIcon />
              </div>
            </button>
            {export_dropdown && (
              <div className="absolute top-20 right-0">
                <DownloadExcel
                  excelData={productData}
                  fileName="product"
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
      {/* product summary */}
      <div className=" mt-24 flex w-full flex-col gap-y-12 md:flex-row md:gap-x-12">
        <div className="max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            Products are what you sell to your consumers. They are made up of
            recipes and materials.
          </h3>
        </div>
        <div className="flex max-w-lg flex-col items-center rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h5 className="text-4xl">{products ? products.totalDocs : 0}</h5>
          <h4>in Total</h4>
        </div>
      </div>
      {/* table menu */}
      <div className="mt-12 py-5 pb-16 xl:rounded-3xl xl:bg-primary xl:px-12 xl:shadow-lg">
        <h2 className="my-8 text-2xl font-bold">Products Lists</h2>
        <div>
          <SearchInput
            searchClicked={searchProducts}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchProducts}
          />
        </div>
        <div className="mt-12 w-full overflow-scroll pb-12 scrollbar-hide">
          {!appContext.state.isLoading ? (
            <table
              className="w-[1400px] table-fixed border-separate border-spacing-y-2 xl:w-full"
              ref={tableRef}
            >
              <thead>
                <tr className="bg-bgPurple/90 text-primary">
                  <th className="w-21 py-3 pl-7 text-left md:pl-16">Name</th>
                  {/* <th className="w-21 pl-16 text-left">Created</th> */}
                  <th className="w-21 border-r border-bgPurple pl-16 text-left">
                    Total cost
                  </th>
                  <th className="w-21 pl-7 text-left md:pl-16">
                    Profit Margin
                  </th>
                  <th className="w-21 pl-7 text-left md:pl-16">
                    Proposed Selling Price
                  </th>
                  <th className="w-21 pl-7 text-left md:pl-16">
                    Actual Selling Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.p &&
                  products.p.docs &&
                  products.p.docs.length > 0 &&
                  products.p.docs.map((product) => {
                    const total =
                      product?.totalCost?.toFixed(2) -
                      product?.actual_profit?.toFixed(2);
                    return (
                      <tr
                        key={product._id}
                        onClick={(e) => navigateToProduct(e, product._id)}
                        className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                      >
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {product.name}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{total?.toFixed(2)}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{product?.actual_profit?.toFixed(2)}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{product?.proposed_selling_price?.toFixed(2) || 0}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{product?.actual_selling_price?.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="px-11 pb-7">
              <Skeleton count={8} height={50} />
            </div>
          )}
          {products &&
            products.docs &&
            products.docs.length == 0 &&
            !appContext.state.isLoading && (
              <EmptyResult
                message="No products found"
                onEmptyButtonClicked={loadProducts}
                emptyButtonText="Reload"
              />
            )}
        </div>

        {products && products.docs && (
          <Pagination
            pageCount={pagination.totalPagesCount}
            handlePageClick={handlePageClick}
            currentPage={pagination.page}
          />
        )}
      </div>
      {showAdd && (
        <AddProduct addProduct={addProduct} closeAdd={closeAddProduct} />
      )}
    </div>
  );
};

export default ProductsIndex;
