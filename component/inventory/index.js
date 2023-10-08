import AddIngredient from "../general/addingredient";
import AddMaterial from "../general/addmaterial";
import EditIngredient from "../general/editingredient";
import DeleteDialog from "../general/deletedialog";
import { AppContext } from "../../pages/AppContext";
import React, { useRef, useEffect, useState, useContext } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import EmptyResult from "../general/emptyResult";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchInput from "../general/searchInput";
import Pagination from "../general/pagination";
// import Papa from "papaparse";
import {
  toUpperCase,
  getAmount,
  defaultPaginationObject,
} from "../../utils/helper";
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
  DELETE_INGREDIENT_URL,
  DELETE_MATERIAL_URL,
  CREATE_INGREDIENT,
  CREATE_MATERIAL,
  GET_ALL_INVENTORY,
  EDIT_INGREDIENT_URL,
  EDIT_MATERIAL_URL,
  GET_UNITS_URL,
  GET_MATERIAL_UNITS_URL,
  UPLOAD_INGREDIENTS,
  UPLOAD_MATERIALS,
  STOCKUP,
  EDIT_MATERIALS_URL,
} from "../../utils/api.endpoints";
import { ExportExcel } from "../excelExport";
import { Icon } from "@iconify/react";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import BlockingLoadingComponent from "../general/blockingloading";
import { Stockup } from "../general/stockup";
import { toast } from "react-toastify";

const create_ingredient_url = BASE_URL + CREATE_INGREDIENT;
const create_material_url = BASE_URL + CREATE_MATERIAL;
const get_inventory_url = BASE_URL + GET_ALL_INVENTORY;
const upload_ingredients = UPLOAD_INGREDIENTS;
const upload_materials = UPLOAD_MATERIALS;

const IngredientsIndex = () => {
  const appContext = AppContext();
  const tableRef = useRef(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showStockUp, setShowStockUp] = useState(false);
  const [export_dropdown, setExportDropdown] = useState(false);
  const [addtoInventory, setAddtoInventory] = useState(false);
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [isDelete, setIsDelete] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  const [filters, setFilters] = useState({
    type: "materials",
    status: "All",
    searchTerm: "",
  });

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [units, setUnits] = useState(null);
  const [materialUnits, setMaterialUnits] = useState(null);

  const [whatIsOpen, setWhatIsOpen] = useState(false);

  const [inventory, setInventory] = useState([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [inventoryInFocus, setInventoryInFocus] = useState({});

  const [stockupdata, setStockUpdata] = useState({});

  useEffect(() => {
    getMaterialUnits();
    getUnits();
  }, []);

  useEffect(() => {
    search();
  }, [pagination.page, filters?.type, searchTerm]);

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const openStock = (e, anInventory) => {
    setInventoryInFocus(anInventory);
    setShowStockUp(!showStockUp);
  };

  const openShowAdd = () => {
    setShowAdd(true);
  };

  const closeShowAdd = () => {
    setShowAdd(false);
  };

  const openShowAddMaterial = () => {
    setShowAddMaterial(true);
  };

  const closeShowAddMaterial = () => {
    setShowAddMaterial(false);
  };

  const onPerformDeleteClicked = () => {
    setShowDelete(false);
  };

  const onCancelDeleteClicked = () => {
    setShowDelete(false);
  };

  const showSearch = () => {
    setIsSearchOpen(true);
  };

  const hideSearch = () => {
    setIsSearchOpen(false);
  };

  const getUnits = async () => {
    appContext.setBlockingLoading(true);

    try {
      let result = await getRequest(GET_UNITS_URL);

      if (!!result) {
        setUnits(result.response);
      }
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred fetching units",
        title: "Units Not Loaded",
        type: "ERROR",
      });
    }
  };

  const getMaterialUnits = async () => {
    appContext.setBlockingLoading(true);

    try {
      let result = await getRequest(GET_MATERIAL_UNITS_URL);

      if (!!result) {
        setMaterialUnits(result.response);
      }
      console.log(materialUnits);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred fetching material units",
        title: "Material Units Not Loaded",
        type: "ERROR",
      });
    }
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

      let result = await getRequest(url);

      setInventory(result.response);

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

  const showEditInventory = (e, anInventory) => {
    e.preventDefault();
    setInventoryInFocus(anInventory);
    setShowEdit(true);
  };

  const hideEditInventory = () => {
    setInventoryInFocus({});
    setShowEdit(false);
  };

  const editInventory = async (e, inventorytoEdit) => {
    e.preventDefault();

    setBlockingLoading(true);

    try {
      filters.type === "materials"
        ? await putRequest(EDIT_MATERIALS_URL, {
            ...inventorytoEdit,
          })
        : await putRequest(EDIT_INGREDIENT_URL, {
            ...inventorytoEdit,
          });

      hideEditInventory();

      search();

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
      appContext.setMessage("An error occurred processing the request.");
    }
  };

  const saveStock = async (e, stockInvent) => {
    e.preventDefault();

    setBlockingLoading(true);

    console.log(stockInvent);

    try {
      const res = await postRequest(`${STOCKUP}/${filters.type}/stock-up`, {
        ...stockInvent,
      });

      if (res.status === "success") {
        toast.success(res.message);
        setShowStockUp(false);
        search();
      } else {
        toast.error(res.message);
      }

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
      appContext.setMessage("An error occurred processing the request.");
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Profitable Inventory Table";
    const headers = [
      [
        "Name",
        "Purchase Quantity",
        "Purchase Unit",
        "Price",
        "Quantity(In Stock)",
        "Price(In Stock)",
        "Status",
        "Low Level",
      ],
    ];

    const data = inventory?.docs.map((invent) => [
      invent?.name,
      invent?.purchase_quantity?.amount,
      `${invent?.purchase_quantity?.unit?.name} (${invent?.purchase_quantity?.unit?.abbreviation})`,
      Number(invent?.price).toFixed(1),
      invent?.quantity_in_stock,
      Number(invent?.costOfQuantityInStock).toFixed(1),
      invent?.lowLevel
        ? invent?.quantity_in_stock >= invent?.lowLevel
          ? "NORMAL"
          : "LOW"
        : "NORMAL",
      invent?.lowLevel || "Not Set",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("inventory.pdf");
    setExportDropdown(!export_dropdown);
  };

  const showDeleteInventoryItem = (e, anInventory) => {
    e.preventDefault();

    setInventoryInFocus(anInventory);

    setIsDelete({
      visible: true,
      title: "Confirm Action",
      message: `Confirm that you want to delete ${toUpperCase(
        anInventory.name
      )} from inventory`,
    });
  };

  const hideDeleteInventoryItem = () => {
    setIsDelete({ visible: false, title: "", message: "", type: "" });
  };

  const deleteInventoryItem = async () => {
    hideDeleteInventoryItem();

    setBlockingLoading(true);

    try {
      await deleteRequest(
        filters.type == "ingredients"
          ? DELETE_INGREDIENT_URL
          : DELETE_MATERIAL_URL,
        { id: inventoryInFocus._id }
      );

      setBlockingLoading(false);

      setInventoryInFocus({});

      search();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);
    }
  };

  const addIngredientToInventory = async (e, inventoryToAdd) => {
    e.preventDefault();

    setBlockingLoading(true);

    try {
      var result = await postRequest(create_ingredient_url, {
        ingredient: inventoryToAdd,
      });

      closeShowAdd();

      search();

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
      appContext.setMessage("An error occurred processing the request.");
    }
  };

  const addMaterialToInventory = async (inventoryToAdd) => {
    setBlockingLoading(true);

    try {
      var result = await postRequest(create_material_url, {
        material: inventoryToAdd,
      });

      closeShowAddMaterial();

      search();

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
      appContext.setMessage("An error occurred processing the request.");
    }
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

  const handlePageClick = (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  const ExportIngredientData = [
    {
      Name: "Ingredient1",
      "Purchase Quantity": "10",
      Unit: "Kilogram",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
    },
    {
      Name: "Ingredient2",
      "Purchase Quantity": "10",
      Unit: "Gram",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
    },
    {
      Name: "Ingredient3",
      "Purchase Quantity": "10",
      Unit: "Millilitre",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
    },
    {
      Name: "Ingredient4",
      "Purchase Quantity": "10",
      Unit: "Litre",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
    },
  ];

  const ExportMaterialData = [
    {
      Name: "Material1",
      "Purchase Quantity": "10",
      Unit: "Packets",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
      Pieces: "",
    },
    {
      Name: "Material2",
      "Purchase Quantity": "10",
      Unit: "Pieces",
      Price: "1000",
      "Quantity in Stock": "10",
      "Low Threshold": "1",
      Pieces: "2",
    },
  ];

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setBlockingLoading(true);

    const data = new FormData();
    let excelFile = e.target.files[0];

    data.append("file", excelFile);
    data.append(
      "units",
      JSON.stringify(
        units?.map((unit) => {
          return {
            id: unit?._id,
            name: unit?.name,
          };
        })
      )
    );
    data.append(
      "materialUnits",
      JSON.stringify(
        materialUnits?.map((unit) => {
          return {
            id: unit?._id,
            name: unit?.name,
          };
        })
      )
    );

    try {
      const result =
        filters.type == "ingredients"
          ? await postRequest(upload_ingredients, data)
          : await postRequest(upload_materials, data);

      setBlockingLoading(false);

      const url =
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

      const result2 = await getRequest(url);

      setInventory(result2.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });
    } catch (err) {
      console.log(err);
      setBlockingLoading(false);
      // appContext.setMessage({
      // 	visible: true,
      // 	message: "Could not upload recipes...",
      // 	title: "Message",
      // 	type: "ERROR",
      // });
    }
  };

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      {/* inventory */}
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full flex-col justify-between xl:flex-row">
        <div className=" flex items-center gap-4">
          <FontAwesomeIcon
            icon={faList}
            className=" h-8 w-8 rounded-lg bg-bgPurple p-3 text-primary"
          />
          <div className="">
            <h2 className="text-2xl font-semibold">
              <span className="block text-3xl font-bold">Inventory</span>
            </h2>
            <h3 className="mt-2 text-base font-medium">
              Ingredients and Materials
            </h3>
          </div>
        </div>
        {/* quick access btn */}
        <div className="relative mt-16 flex w-[70%] flex-col justify-between gap-y-6 xl:mt-0 xl:flex-row xl:items-center xl:gap-y-0">
          <SearchInput
            searchClicked={search}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={hideSearch}
          />
          <div className="flex items-center ">
            <button
              className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
              onClick={() => setAddtoInventory(!addtoInventory)}
            >
              <div className="flex items-center justify-center">
                <AddIcon />
              </div>
            </button>
            {addtoInventory && (
              <div className="absolute top-40 flex items-center gap-4 lg:top-20">
                <div
                  className="flex cursor-pointer items-center rounded-lg bg-aquaMarine p-2 text-primary"
                  onClick={openShowAdd}
                >
                  <span>Ingredients</span>
                </div>
                <div
                  className="flex cursor-pointer items-center rounded-lg bg-dogwoodRose p-2 text-primary"
                  onClick={openShowAddMaterial}
                >
                  <span>Materials</span>
                </div>
              </div>
            )}

            <button className="mx-2 flex h-14 w-16 items-center justify-center bg-bgPurple text-3xl text-primary">
              <label htmlFor="fileUpload">
                <CloudUploadIcon className="h-full w-full cursor-pointer" />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  name="fileUpload"
                  id="fileUpload"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
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
              <div className="absolute top-20 right-36">
                <DownloadTableExcel
                  filename="inventory table"
                  sheet="inventory"
                  currentTableRef={tableRef.current}
                >
                  <div
                    className="flex cursor-pointer items-center rounded-lg bg-aquaMarine p-2 text-primary"
                    onClick={() => setExportDropdown(!export_dropdown)}
                  >
                    <Icon
                      icon="file-icons:microsoft-excel"
                      className="text-3xl"
                    />
                    <span className="ml-2">as excel</span>
                  </div>
                </DownloadTableExcel>

                <div
                  className="mt-3 flex cursor-pointer items-center rounded-lg bg-dogwoodRose p-2 text-primary"
                  onClick={exportPDF}
                >
                  <Icon icon="bi:file-earmark-pdf" className="text-3xl" />
                  <span className="ml-2">as pdf</span>
                </div>
              </div>
            )}

            {/* {filters.type == "ingredients" ? (
              <ExportExcel
                excelData={ExportIngredientData}
                fileName={"ingredient"}
                page="ingredient"
              />
            ) : (
              <ExportExcel
                excelData={ExportMaterialData}
                fileName={"material"}
                page="material"
              />
            )} */}
          </div>
        </div>
      </div>
      {/* about section */}
      <div className=" mt-24 flex flex-col gap-y-6  xl:flex-row xl:gap-x-12">
        <div className=" max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            Materials are items that are not directly used in recipe production
            but are required in the preparation/assembly of the final product
            e.g packaging box.
          </h3>
        </div>

        <div className=" max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            Ingredients are edible items that are used directly in the
            production of your recipes e.g flour, sugar, salt.
          </h3>
        </div>
        {/* <div className=" max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            A recipe consists of ingredients (and quantity requried for each
            ingredient) to create individual recipes. e.g Red velvet recipe
          </h3>
        </div> */}
      </div>
      {/* tablemenu */}
      <div className="mt-12 py-5 pb-0 xl:rounded-3xl xl:bg-primary xl:px-12 xl:pb-16 xl:shadow-lg">
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
          <div className="flex w-full items-center justify-center rounded-t-xl bg-bgPurple p-4">
            <h2 className="capitalize text-primary">{filters.type}</h2>
          </div>

          <div className="mt-12 w-full overflow-scroll pb-12 scrollbar-hide">
            {!appContext.state.isLoading ? (
              <table
                className="w-[1400px] table-fixed border-separate border-spacing-y-2 xl:w-full"
                ref={tableRef}
              >
                <thead>
                  <tr className="bg-bgPurple/90 text-primary">
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">Name</th>
                    {/* <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      Purchase Quantity
                    </th> */}
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">Unit</th>
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">
                      Price per unit
                    </th>
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">
                      Quantity (In Stock)
                    </th>
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">
                      Price (In Stock)
                    </th>
                    <th className="w-fit py-3 pl-7 text-left md:pl-16">
                      Status
                    </th>
                    <th className="w-fit text-center">Low Level</th>
                    <th className="w-fit py-3 text-center md:pl-16">Action</th>
                  </tr>
                </thead>
                <tbody>
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
                            {invent?.purchase_quantity &&
                              invent?.purchase_quantity?.amount}
                          </td> */}
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {invent?.unit?.name
                              ? `${invent?.unit?.name} (
													${invent?.unit?.abbreviation})`
                              : "----"}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            ₦{invent?.price?.toFixed(2)}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {invent?.quantity_in_stock}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            ₦{invent?.costOfQuantityInStock?.toFixed(2)}
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {invent?.lowLevel
                              ? invent?.quantity_in_stock >= invent?.lowLevel
                                ? "NORMAL"
                                : "LOW"
                              : "NORMAL"}
                          </td>
                          <td className="cursor-pointer py-4 text-center">
                            {invent?.lowLevel || "Not Set"}
                          </td>
                          <td className="flex items-center justify-center gap-x-2 py-2">
                            <button
                              onClick={(e) => openStock(e, invent)}
                              className="flex w-8 items-center justify-center bg-spaceCadet text-primary"
                            >
                              <AddIcon />
                            </button>
                            <button
                              onClick={(e) => showEditInventory(e, invent)}
                              className="flex w-6 items-center justify-center bg-bgPurple text-primary"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={(e) =>
                                showDeleteInventoryItem(e, invent)
                              }
                              className="flex w-6 items-center justify-center bg-dogwoodRose text-primary"
                            >
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="pt-0 pr-11 pb-8 pl-11">
                <Skeleton count={8} height={50} />
              </div>
            )}

            {!appContext.state.isLoading &&
              !appContext.state.isBlockingLoading &&
              (!inventory || !inventory.docs || inventory.docs.length == 0) && (
                <EmptyResult
                  message="No items found. Try adjusting search parameters."
                  onEmptyButtonClicked={search}
                  emptyButtonText="Try Again"
                />
              )}
          </div>
        </div>
      </div>

      {inventory && inventory.docs && (
        <Pagination
          pageCount={pagination.totalPagesCount}
          handlePageClick={handlePageClick}
          currentPage={pagination.page}
        />
      )}
      {showAdd && (
        <AddIngredient
          closeAddIngredient={closeShowAdd}
          addInventory={addIngredientToInventory}
          units={units}
        />
      )}

      {showStockUp && (
        <Stockup
          stockUpInventory={inventoryInFocus}
          closeStockUp={() => setShowStockUp(false)}
          stockType={filters.type}
          units={units}
          saveStockInventory={saveStock}
        />
      )}

      {showEdit && (
        <EditIngredient
          closeEditIngredient={hideEditInventory}
          saveEditedInventory={editInventory}
          inventoryToEdit={inventoryInFocus}
          inventoryType={filters.type}
          units={units}
        />
      )}

      {isDelete.visible && (
        <DeleteDialog
          onPerformDeleteClicked={deleteInventoryItem}
          onCancelDeleteClicked={hideDeleteInventoryItem}
          type={isDelete.type}
          message={isDelete.message}
          title={isDelete.title}
        />
      )}

      {showAddMaterial && (
        <AddMaterial
          closeAddMaterial={closeShowAddMaterial}
          units={materialUnits}
          addMaterialToInventory={addMaterialToInventory}
        />
      )}
    </div>
  );
};

export default IngredientsIndex;
