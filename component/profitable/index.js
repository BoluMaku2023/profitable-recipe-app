import { useEffect, useState, useContext } from "react";
import EmptyResult from "../general/emptyResult";
import SearchInput from "../general/searchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../pages/AppContext";
import { useRouter } from "next/router";
import Pagination from "../general/pagination";
import {
  faTrash,
  faCaretDown,
  faCaretUp,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  toUpperCase,
  getAmount,
  defaultPaginationObject,
} from "../../utils/helper";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";
import {
  BASE_URL,
  GET_ALL_INVENTORY,
  APPLY_PROFITABLE_CHANGES_URL,
} from "../../utils/api.endpoints";
import { Icon } from "@iconify/react";
import BlockingLoadingComponent from "../general/blockingloading";

const get_inventory_url = BASE_URL + GET_ALL_INVENTORY;

const Profitable = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const appContext = AppContext();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [inventoryInFocus, setInventoryInFocus] = useState({});
  const [whatIsOpen, setWhatIsOpen] = useState(false);

  const [filters, setFilters] = useState({
    type: "materials",
    status: "All",
    searchTerm: "",
  });

  const [inventory, setInventory] = useState([]);
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [changeList, setChangeList] = useState({});

  const [generalAmount, setGeneralAmount] = useState(0);

  const setGeneralChangeAmount = (event) => {
    const aValue = event.target.value;

    setGeneralAmount(aValue);
  };

  console.log(changeList);

  const navigateToProfitableApply = (e, item) => {
    e.preventDefault();

    if (!changeList || Object.keys(changeList).length == 0) return;

    let idObj = {};

    idObj[item._id] = changeList[item._id];

    const details = {
      type: filters.type,
      inventoryItem: item,
      changeObject: changeList[item._id],
    };

    const detailsString = JSON.stringify(details);

    router.push("/profitable/apply/" + detailsString);
  };

  useEffect(() => {
    search();
  }, [pagination.page, filters?.type, searchTerm]);

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const showSearch = () => {
    setIsSearchOpen(true);
  };

  const hideSearch = () => {
    setIsSearchOpen(false);
  };

  const search = async () => {
    appContext.setBlockingLoading(true);

    try {
      let url =
        get_inventory_url +
        "?limit=" +
        pagination.limit +
        "&page=" +
        (pagination.page + 1) +
        "&type=" +
        filters.type +
        "&searchTerm=" +
        searchTerm +
        "&status=" +
        filters.status;

      var result = await getRequest(url);

      setInventory(result.response);

      console.log(result.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
      console.log(err);
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  async function onFieldChanged(event) {
    event.preventDefault();
    const target = event.target;
    const aVal = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFilters({ ...filters, [name]: aVal });

    const pageQuery = getPageQueryParam(name);

    appContext.setBlockingLoading(true);

    try {
      let url =
        get_inventory_url +
        "?limit=" +
        pagination.limit +
        "&page=" +
        pageQuery +
        "&type=" +
        (name == "type" ? aVal : filters.type) +
        "&searchTerm=" +
        (name == "searchTerm" ? aVal : filters.searchTerm) +
        "&status=" +
        (name == "status" ? aVal : filters.status);

      var result = await getRequest(url);

      setInventory(result.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  }

  const getPageQueryParam = (name) => {
    if (name == "type") {
      setPagination({ ...pagination, page: 0 });
      return 1;
    }

    return pagination.page + 1;
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  const onCheckBoxChanged = (event, id) => {
    const target = event.target;
    const aVal = target.type === "checkbox" ? target.checked : target.value;

    let newChangeList = changeList;

    if (aVal) newChangeList[id] = generalAmount != 0 ? generalAmount : 0;
    else newChangeList[id] = "";
    delete newChangeList[id];

    setChangeList(newChangeList);
  };

  const onAmountChanged = (event, item) => {
    const target = event.target;
    const aValue = target.value;

    let newChangeList = changeList;

    if (aValue && aValue != "0") {
      newChangeList[item._id] = parseInt(aValue);
    } else {
      delete newChangeList[item._id];
    }

    setChangeList(newChangeList);
    console.log(newChangeList);
  };

  const applyChange = async (e, inventoryItem) => {
    setBlockingLoading(true);

    try {
      let url = APPLY_PROFITABLE_CHANGES_URL;

      await postRequest(url, {
        type: filters.type,
        id: inventoryItem._id,
        change: changeList[inventoryItem._id],
      });

      setBlockingLoading(false);

      // setChangeList({});

      search();
    } catch (err) {
      console.log(
        `An error occurred applying changes to ${inventoryItem._id} with error ${err}`
      );
      setBlockingLoading(false);
    }
  };

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full justify-between">
        <div className=" flex items-center">
          <Icon
            icon="raphael:barchart"
            className=" h-auto w-16 rounded-lg bg-bgPurple p-3 text-primary"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">
              <span className="block text-3xl font-bold">Profitable</span>
            </h2>
          </div>
        </div>

        <div className="relative mt-16 flex w-1/2 flex-col justify-between gap-y-6 xl:mt-0 xl:flex-row xl:items-center xl:gap-y-0">
          <SearchInput
            searchClicked={search}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={hideSearch}
          />
        </div>
      </div>

      <div className="mt-24">
        <span
          onClick={() => setFilters({ ...filters, type: "materials" })}
          className={`my-8 mr-8 inline-block cursor-pointer text-2xl ${
            filters?.type == "materials" && "text-bgPurple"
          } font-bold capitalize`}
        >
          Materials
        </span>

        <span
          onClick={() => setFilters({ ...filters, type: "ingredients" })}
          className={`my-8 inline-block cursor-pointer text-2xl capitalize ${
            filters?.type == "ingredients" && "text-bgPurple"
          } font-bold`}
        >
          Ingredients
        </span>
        <div>
          {!appContext.state.isLoading ? (
            <table className="w-full table-fixed border-separate border-spacing-y-2">
              <thead className="w-full">
                <tr className="bg-bgPurple/90 text-primary">
                  <th className="w-1/6 py-3 pl-7 text-left md:pl-16">Name</th>
                  <th className="w-21 py-3 pl-7 text-left md:pl-16">
                    Purchase Quantity
                  </th>
                  {/* <th className="w-21 py-3 pl-7 text-left md:pl-16">
                    Purchase Unit
                  </th> */}
                  <th className="w-1/5 py-3 pl-7 text-left md:pl-16">Price</th>
                  <th className="w-21 py-3 pl-7 text-left md:pl-16">
                    Quantity (In Stock)
                  </th>
                  <th className="w-21 py-3 pl-7 text-left md:pl-16">
                    Price (In Stock)
                  </th>
                  <th className="w-21 py-3 px-4 text-left">New Price</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {inventory &&
                  inventory.docs &&
                  inventory.docs.map((invent) => {
                    return (
                      <tr
                        key={invent?._id}
                        className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                      >
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {toUpperCase(invent?.name)}
                        </td>
                        {/* <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent?.quantity_in_stock}
                        </td> */}
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent?.unit?.name} ({invent?.unit?.abbreviation})
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{invent?.price?.toFixed(2)}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          {invent?.quantity_in_stock}
                        </td>
                        <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                          ₦{invent?.costOfQuantityInStock.toFixed(2)}
                        </td>
                        <td className="flex items-center gap-x-2 py-2">
                          <input
                            value={changeList[invent?._id]}
                            onChange={(e) => onAmountChanged(e, invent)}
                            type="number"
                            min="0"
                            name="changeInputValue"
                            className="h-11 w-[60px] rounded-lg px-3 outline-none "
                          />

                          <button
                            onClick={(e) =>
                              navigateToProfitableApply(e, invent)
                            }
                            className="flex w-5 items-center justify-center bg-dogwoodRose text-primary"
                          >
                            View
                          </button>

                          <button
                            onClick={(e) => applyChange(e, invent)}
                            className=" flex max-h-11 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div>
              <Skeleton count={8} height={50} />
            </div>
          )}

          {!appContext.state.isLoading &&
            !appContext.state.isBlockingLoading &&
            (!inventory.docs || inventory.docs.length == 0) && (
              <EmptyResult
                message="No items found. Try adjusting search parameters."
                onEmptyButtonClicked={search}
                emptyButtonText="Try Again"
              />
            )}
        </div>

        {inventory && inventory.docs && (
          <Pagination
            pageCount={pagination.totalPagesCount}
            handlePageClick={handlePageClick}
            currentPage={pagination.page}
          />
        )}
      </div>
    </div>
  );
};

export default Profitable;
