import { useState, useContext } from "react";
import { toUpperCase, getAmount, downloadFile } from "../../utils/helper";
import EmptyResult from "../general/emptyResult";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";
import { AppContext } from "../../pages/AppContext";
import { useRouter } from "next/router";
import {
  PRODUCTS_PROFITABLE_URL,
  APPLY_PROFITABLE_CHANGES_URL,
} from "../../utils/api.endpoints";
import { useEffect } from "react";
import BlockingLoadingComponent from "../general/blockingloading";

const ProfitableApply = ({ apply_details }) => {
  const router = useRouter();
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);
  const details = JSON.parse(apply_details);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setBlockingLoading(true);

    console.log(details);

    try {
      const result = await getRequest(
        PRODUCTS_PROFITABLE_URL +
          "?type=" +
          details.type +
          "&id=" +
          details.inventoryItem._id +
          "&price=" +
          details.changeObject
      );

      setProducts(result.response);

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
    }
  };

  const exitChange = () => {
    router.push("/profitable/");
  };

  const applyChange = async () => {
    setBlockingLoading(true);

    try {
      let url = APPLY_PROFITABLE_CHANGES_URL;

      await postRequest(url, {
        type: details.type,
        id: details.inventoryItem._id,
        change: details.changeObject,
      });

      setBlockingLoading(false);

      router.push("/profitable");
    } catch (err) {
      console.log(
        `An error occurred applying changes to ${changeDetails.inventoryItem._id} with error ${err}`
      );
      setBlockingLoading(false);
    }
  };

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="flex items-center gap-x-6">
        <h4>
          The following products will be affected if you change the price of{" "}
          {details.inventoryItem.name} from{" "}
          <strong>{getAmount(details.inventoryItem.price)}</strong> to{" "}
          <strong>{getAmount(details.changeObject)}</strong>{" "}
        </h4>
        <div className="flex items-center gap-x-6">
          <button
            onClick={applyChange}
            className=" flex max-h-11 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Apply Change
          </button>
          <button
            onClick={exitChange}
            className=" flex max-h-11 items-center justify-center bg-dogwoodRose text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
      <div className="tabbedListMainHolder">
        <div className="tabbedListTableHolder">
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-bgPurple/90 text-sm text-primary">
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">Name</th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  Old Total Cost
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  Proposed Selling Price
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  New Total Cost
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  New Selling Price
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  Actual Selling Price
                </th>
                <th className="w-[16%] py-3 pl-7 text-left md:pl-16">
                  Profit Margin
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((product) => {
                  return (
                    product && (
                      <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {toUpperCase(product.name)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {getAmount(product.totalCostWithoutProfitMargin)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {getAmount(product.totalCostWithProfitMargin)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {getAmount(product.totalCostWithIncrease)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {getAmount(
                            product.newProposedCostPriceWithIncreaseAndProfitMargin
                          )}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {getAmount(product.actual_selling_price)}
                        </td>
                        <td className="py-3 pl-7 text-left md:pl-16">
                          {product.profit_margin}%
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          {!appContext.state.isLoading &&
            !appContext.state.isBlockingLoading &&
            (!products || products.length == 0) && (
              <EmptyResult
                message="No products were found."
                onEmptyButtonClicked={loadProducts}
                emptyButtonText="Try Again"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default ProfitableApply;

const topLeftStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  flexDirection: "row",
};

const topLeftStyleText = { margin: "0px" };
