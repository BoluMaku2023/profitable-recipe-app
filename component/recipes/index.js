import React, { useRef, useEffect, useState, useContext } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import EmptyResult from "../general/emptyResult";
import AddRecipe from "../general/addrecipe";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import {
  getAmount,
  getDate,
  defaultPaginationObject,
} from "../../utils/helper";
import { useRouter } from "next/router";
import { AppContext } from "../../pages/AppContext";
import Pagination from "../general/pagination";
import { postRequest, getRequest } from "../../utils/api.requests";
import {
  BASE_URL,
  CREATE_RECIPE,
  GET_ALL_RECIPES,
  UPLOAD_RECIPES,
  SEARCH_RECIPES_URL,
  GET_UNITS_URL,
} from "../../utils/api.endpoints";
import { Icon } from "@iconify/react";
import { ExportExcel } from "../excelExport";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import { DownloadExcel } from "../downloadExcel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import BlockingLoadingComponent from "../general/blockingloading";

const create_recipe_url = BASE_URL + CREATE_RECIPE;
const upload_recipes = UPLOAD_RECIPES;
const get_recipes_url = BASE_URL + GET_ALL_RECIPES;

const RecipesIndex = () => {
  const appContext = AppContext();
  const tableRef = useRef(null);
  const [blockingLoading, setBlockingLoading] = useState(false);
  const [export_dropdown, setExportDropdown] = useState(false);
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [recipes, setRecipes] = useState();
  const [pagination, setPagination] = useState(defaultPaginationObject);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [units, setUnits] = useState(null);

  useEffect(() => {
    getUnits();
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [pagination.page]);

  const navigateToRecipe = (e, id) => {
    e.preventDefault();
    router.push(`/recipe/${id}`);
  };

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
  };

  const showAddRecipe = () => {
    setShowAdd(true);
  };

  const closeAddRecipe = () => {
    setShowAdd(false);
  };

  /*
    New functions
    */

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

  const showSearchRecipes = () => {
    setIsSearchOpen(true);
  };

  const closeSearchRecipes = () => {
    if (searchTerm && searchTerm.length > 0) {
      loadRecipes();
    }

    setIsSearchOpen(false);
  };

  useEffect(() => {
    searchRecipes();
  }, [searchTerm]);

  const searchRecipes = async () => {
    // e.preventDefault();
    if (searchTerm && searchTerm.length > 0) {
      try {
        appContext.setBlockingLoading(true);
        const result = await getRequest(
          SEARCH_RECIPES_URL +
            "?searchTerm=" +
            searchTerm +
            "&page=" +
            (pagination.page + 1) +
            "&limit=" +
            pagination.limit
        );
        appContext.setBlockingLoading(false);

        setRecipes(result.response);
      } catch (err) {
        console.log(err);
        appContext.setBlockingLoading(false);
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  const addRecipe = async (e, data) => {
    setBlockingLoading(true);
    e.preventDefault();
    try {
      const result = await postRequest(create_recipe_url, data);

      closeAddRecipe();

      setBlockingLoading(false);

      router.push(`/recipe/${result.response._id}`);
    } catch (err) {
      console.log(err);
      setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "Could not create recipe...",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const loadRecipes = async () => {
    appContext.setBlockingLoading(true);

    try {
      const url =
        get_recipes_url +
        "?limit=" +
        pagination.limit +
        "&page=" +
        (pagination.page + 1);

      const result = await getRequest(url);
      console.log(result.data);

      setRecipes(result?.data);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
    }
  };

  console.log(recipes);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Profitable Recipe Table";
    const headers = [["Name", "Created", "Total Cost"]];
    const data = recipes?.docs.map((recipe) => [
      recipe?.name,
      recipe?.created,
      recipe?.totalCost,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("recipes.pdf");
    setExportDropdown(!export_dropdown);
  };

  const handlePageClick = async (event) => {
    setPagination({ ...pagination, page: event.selected });
  };

  const ExportExcelData = [
    {
      Name: "Recipe1",
      Description: "Recipe1 description",
      Unit: "Kilogram",
      Yield: "12",
    },
    {
      Name: "Recipe2",
      Description: "Recipe2 description",
      Unit: "Gram",
      Yield: "12",
    },
    {
      Name: "Recipe3",
      Description: "Recipe3 description",
      Unit: "Litre",
      Yield: "12",
    },
    {
      Name: "Recipe4",
      Description: "Recipe4 description",
      Unit: "Millilitre",
      Yield: "12",
    },
  ];

  const handleFileUpload = async (e) => {
    e.preventDefault();
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
    setBlockingLoading(true);

    try {
      const result = await postRequest(upload_recipes, data);

      setBlockingLoading(false);

      const url =
        get_recipes_url +
        "?limit=" +
        pagination.limit +
        "&page=" +
        (pagination.page + 1);

      const result2 = await getRequest(url);

      setRecipes(result2.response);

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });
    } catch (err) {
      console.log(err);
      setBlockingLoading(false);
    }
  };

  const recipeData = recipes?.map((recipe) => {
    return {
      Name: recipe?.name,
      Created: recipe?.created,
      "Total Cost": recipe?.totalCost,
    };
  });

  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      {/*hero section */}
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex w-full flex-col justify-between  xl:flex-row xl:items-center">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            className=" h-8 w-8 rounded-lg bg-bgPurple p-3 text-primary"
          />
          <div className="ml-6">
            <h2 className="font-semibold">
              <span className="block text-3xl font-bold">Recipes</span>
            </h2>
          </div>
        </div>
        {/* hero quickaccess_btn*/}
        <div className="relative mt-16 flex w-full flex-col justify-between md:flex-row md:items-center xl:mt-0 xl:w-1/2">
          {/* <SearchInput
            search_value={searchTerm}
            searchClicked={searchRecipes}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchRecipes}
          /> */}
          <div className="mt-6 flex w-full items-center xl:mt-0 xl:justify-end">
            <button
              className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
              onClick={showAddRecipe}
            >
              <div className="flex items-center justify-center">
                <EditIcon />
              </div>
            </button>
            {/* <button className="mx-2 flex h-14 w-16 items-center justify-center bg-bgPurple text-3xl text-primary">
              <label htmlFor="file">
                <CloudUploadIcon className="cursor-pointer" />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  name="file"
                  id="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </label>
            </button> */}
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
                <DownloadExcel
                  excelData={recipeData}
                  fileName="recipe"
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
            {/* <ExportExcel
              excelData={ExportExcelData}
              fileName={"recipe"}
              page="recipe"
            /> */}
          </div>
        </div>
      </div>
      {/* recipe_description */}
      <div className=" mt-24 flex gap-x-12">
        <div className="max-w-lg rounded-lg bg-primary p-6 text-sm leading-8 shadow-md">
          <h3>
            What are recipes? A recipe consists of ingredients (and quantity
            required for each ingredient) to create individual recipes. e.g Red
            velvet recipe
          </h3>
        </div>
      </div>

      <div className="mt-12 py-5 pb-16 xl:rounded-3xl xl:bg-primary xl:px-12 xl:shadow-lg">
        <h2 className="my-8 text-2xl font-bold">Recipes</h2>
        <div>
          <SearchInput
            search_value={searchTerm}
            searchClicked={searchRecipes}
            onSearchChanged={onSearchChanged}
            closeSearchClicked={closeSearchRecipes}
          />
        </div>
        {/* tablemenu */}
        <div className="mt-12 w-full overflow-scroll pb-12 scrollbar-hide">
          {!appContext.state.isLoading ? (
            <table
              className="w-full table-fixed border-separate border-spacing-y-2 xl:w-full"
              ref={tableRef}
            >
              <thead>
                <tr className="bg-bgPurple/90 text-primary">
                  <th className="w-21 py-3 px-4 text-left md:pl-16">Name</th>
                  <th className="w-21 py-3 px-4 text-left md:pl-16">Created</th>
                  <th className="w-21 py-3 px-4 text-left md:pl-16">
                    Total cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipes?.map((recipe) => {
                  return (
                    <tr
                      key={recipe._id}
                      onClick={(e) => navigateToRecipe(e, recipe._id)}
                      className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                    >
                      <td className="w-21 py-3 px-4 text-left md:pl-16">{recipe.name}</td>
                      <td className="w-21 py-3 px-4 text-left md:pl-16">{getDate(recipe.created)}</td>
                      <td className="w-21 py-3 px-4 text-left md:pl-16">₦{recipe?.totalCost?.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="skeletonHolder">
              <Skeleton count={8} height={50} />
            </div>
          )}

          {recipes &&
            recipes.docs &&
            recipes.docs.length == 0 &&
            !appContext.state.isLoading && (
              <EmptyResult
                message="No recipes found"
                onEmptyButtonClicked={loadRecipes}
                emptyButtonText="Reload"
              />
            )}
        </div>
      </div>
      {recipes && recipes.docs && (
        <Pagination
          pageCount={pagination.totalPagesCount}
          handlePageClick={handlePageClick}
          currentPage={pagination.page}
        />
      )}
      {showAdd && (
        <AddRecipe
          units={units}
          closeAddRecipe={closeAddRecipe}
          addRecipe={addRecipe}
        />
      )}
    </div>
  );
};

export default RecipesIndex;
