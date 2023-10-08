import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AddIngredients from "./addingredients";
import EditRecipe from "./editrecipe";
import EditRecipeIngredient from "./editrecipeingredient";
import DeleteDialog from "../general/deletedialog";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  toUpperCase,
  getAmount,
  defaultPaginationObject,
} from "../../utils/helper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppContext } from "../../pages/AppContext";
import EmptyResult from "../general/emptyResult";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "../../utils/api.requests";
import { Icon } from "@iconify/react";

import {
  BASE_URL,
  GET_UNITS_URL,
  GET_RECIPE,
  ALL_RECIPE_INGREDIENTS_URL,
  EDIT_RECIPE_URL,
  DELETE_RECIPE_URL,
  EDIT_RECIPE_INGREDIENT_URL,
  DELETE_RECIPE_INGREDIENT_URL,
  MAKE_RECIPE,
} from "../../utils/api.endpoints";
import Link from "next/link";
import BlockingLoadingComponent from "../general/blockingloading";
import { toast } from "react-toastify";

const get_recipe_url = BASE_URL + GET_RECIPE;

const DetailsTab = "Details";
const IngredientsTab = "Ingredients";
const StocksTab = "Stocks";

const RecipeIndex = ({ id }) => {
  const router = useRouter();

  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [showAddIngredients, setShowAddIngredients] = useState(false);
  const [selectedTab, setSelectedTab] = useState(DetailsTab);

  const [recipe, setRecipe] = useState({});

  const [whatIsOpen, setWhatIsOpen] = useState(false);

  const [showEditRecipe, setShowEditRecipe] = useState(false);

  const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [showEditRecipeIngredient, setShowEditRecipeIngredient] =
    useState(false);

  const [showDeleteRecipeIngredient, setShowDeleteRecipeIngredient] =
    useState(false);

  const [entityInFocus, setEntityInFocus] = useState({});

  const [units, setUnits] = useState(null);

  const [make, setMake] = useState(null);

  useEffect(() => {
    loadRecipe();

    loadRecipeIngredients();

    getUnits();
  }, []);

  const switchSelectedTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  const switchWhatIs = (e) => {
    e.preventDefault();
    setWhatIsOpen(!whatIsOpen);
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

  const loadRecipe = async () => {
    try {
      const url = get_recipe_url + "/?id=" + id;

      const aRecipe = await getRequest(url);

      setRecipe(aRecipe?.response);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRecipeIngredients = async () => {
    appContext.setBlockingLoading(true);
    try {
      const result = await getRequest(
        ALL_RECIPE_INGREDIENTS_URL +
          `?id=${id}&page=${pagination.page}&limit=${pagination.limit}`
      );
      console.log(result);
      setIngredients(result);

      setPagination({
        ...pagination,
        // totalPagesCount: result.response.totalPages,
      });

      appContext.setBlockingLoading(false);

      getRecipeCost();
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const openAddIngredients = () => {
    setShowAddIngredients(true);
  };

  const hideAddIngredients = () => {
    setShowAddIngredients(false);
  };

  const openEditRecipe = () => {
    setShowEditRecipe(true);
  };

  const hideEditRecipe = () => {
    setShowEditRecipe(false);
  };

  const editRecipe = async (e, editedRecipe) => {
    setBlockingLoading(true);
    try {
      const result = await putRequest(EDIT_RECIPE_URL, {
        ...recipe,
        ...editedRecipe,
      });

      console.log(result);

      hideEditRecipe();

      loadRecipe();

      setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setMessage({
        visible: true,
        message: "Could not edit recipe successfully",
        title: "Message",
        type: "ERROR",
      });

      setBlockingLoading(false);
    }
  };

  const editIngredient = async (newEditedRecipe) => {
    setBlockingLoading(true);

    try {
      await putRequest(EDIT_RECIPE_INGREDIENT_URL, {
        id: id,
        ingredient_id: newEditedRecipe._id,
        quantity: newEditedRecipe.quantity,
        purchase_size: newEditedRecipe.purchase_size,
      });

      setBlockingLoading(false);

      hideEditRecipeIngredient();

      loadRecipeIngredients();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      hideEditRecipeIngredient();

      appContext.setMessage({
        visible: true,
        message: "Could not edit recipe ingredient successfully",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const openEditRecipeIngredient = (e, ingredientToEdit) => {
    e.preventDefault();
    setEntityInFocus(ingredientToEdit);
    setShowEditRecipeIngredient(true);
  };

  const hideEditRecipeIngredient = () => {
    setEntityInFocus({});
    setShowEditRecipeIngredient(false);
  };

  const openDeleteRecipe = () => {
    setShowDeleteRecipe(true);
  };

  const hideDeleteRecipe = () => {
    setShowDeleteRecipe(false);
  };

  const deleteRecipe = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_RECIPE_URL, { id: id });

      setBlockingLoading(false);

      router.push("/recipes");
    } catch (err) {
      setBlockingLoading(false);
    }
  };

  const showDeleteIngredient = (e, ingredientToDelete) => {
    e.preventDefault();
    setEntityInFocus(ingredientToDelete);
    setShowDeleteRecipeIngredient(true);
  };

  const hideDeleteIngredient = () => {
    setEntityInFocus({});
    setShowDeleteRecipeIngredient(false);
  };

  const deleteIngredient = async () => {
    setBlockingLoading(true);

    try {
      await deleteRequest(DELETE_RECIPE_INGREDIENT_URL, {
        ingredient_id: entityInFocus._id,
        id: id,
      });

      setBlockingLoading(false);

      hideDeleteIngredient();

      loadRecipeIngredients();
    } catch (err) {
      console.log(err);

      setBlockingLoading(false);

      hideDeleteIngredient();

      appContext.setMessage({
        visible: true,
        message: "Could not delete ingredient from recipe",
        title: "Error Deleting",
        type: "ERROR",
      });
    }
  };

  const getRecipeCost = () => {
    if (!ingredients || !ingredients.data || ingredients.data.length == 0) {
      return getAmount(0);
    }

    const aSum = ingredients.data.reduce((accumulator, ingredient) => {
      return (accumulator += ingredient?.totalCost);
    }, 0);

    return `₦${aSum?.toFixed(2)}`;
  };

  const makeRecipe = async () => {
    try {
      const make = await postRequest(MAKE_RECIPE, {
        id: id,
      });
      setMake(make);
      loadRecipe();
      if (make?.status === "error") {
        toast.error(make?.message);
      } else {
        toast.success(make?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20 h-screen py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-9 flex items-center justify-between">
        <Link href="/recipes">
          <Icon icon="material-symbols:arrow-back" className="text-3xl" />
        </Link>
        <div className="flex gap-x-5">
          <button
            className="mx-2 h-14 w-16 items-center justify-center bg-bgPurple p-2 text-3xl text-primary"
            onClick={openEditRecipe}
          >
            <div className="flex items-center justify-center">
              <EditIcon />
            </div>
          </button>
          <button
            onClick={openAddIngredients}
            className=" bg-bgPurple text-primary"
          >
            <AddIcon />
          </button>
          <button
            onClick={openDeleteRecipe}
            className=" bg-bgPurple text-primary"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      {/* recipe content*/}
      <div className="mt-10 w-full">
        <div>
          <h2 className="text-lg font-bold text-bgPurple">
            Recipe -<span className="">{recipe && recipe.name}</span>
          </h2>
          <h5>
            Description - <span>{recipe && recipe.description}</span>
          </h5>
        </div>
        <div className=" my-6 flex w-full items-center">
          <h3
            onClick={(e) => switchSelectedTab(e, DetailsTab)}
            className={`${
              selectedTab == DetailsTab ? "bg-bgPurple/100 text-primary" : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            DetailsTab
          </h3>
          <h3
            onClick={(e) => switchSelectedTab(e, IngredientsTab)}
            className={`${
              selectedTab == IngredientsTab
                ? "bg-bgPurple/100 text-primary"
                : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            Ingredients
          </h3>
          <h3
            onClick={(e) => switchSelectedTab(e, StocksTab)}
            className={`${
              selectedTab == StocksTab ? "bg-bgPurple/100 text-primary" : ""
            } flex h-full w-full cursor-pointer items-center justify-center bg-secondary/50 py-4`}
          >
            Recipe Stock
          </h3>
        </div>
        <div className=" my-6 flex w-full items-center">
          <div className="w-full">
            {selectedTab == DetailsTab ? (
              <table className="w-full table-fixed border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">Name</th>
                    <th className="w-21 py-3 pl-7 text-left md:pl-16">
                      {recipe && recipe?.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                    <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                      Description
                    </td>
                    <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                      {recipe && recipe?.description}
                    </td>
                  </tr>
                  <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                    <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                      Yield
                    </td>
                    <td className="flex cursor-pointer items-center gap-x-6 py-4 pl-7 text-left md:pl-16">
                      <div>
                        <span>
                          {recipe && recipe?.yield && recipe?.yield.amount}
                        </span>
                        <span>
                          {recipe &&
                            recipe?.yield &&
                            recipe?.yield?.unit?.abbreviation}{" "}
                          {!recipe || (!recipe?.yield && 0)}
                        </span>
                      </div>

                      <button
                        onClick={openEditRecipe}
                        className="flex w-8 items-center justify-center bg-bgPurple text-primary"
                      >
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                  <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                    <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                      Total Cost
                    </td>
                    <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                      {getRecipeCost()}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : selectedTab == IngredientsTab ? (
              <div className="w-full">
                {!appContext.state.isLoading ? (
                  <table className="w-full border-separate border-spacing-y-2">
                    <thead className="w-full">
                      <tr className="w-full bg-bgPurple/90 text-primary">
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Name
                        </th>
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Quantity
                        </th>
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Unit
                        </th>
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Cost
                        </th>
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {ingredients &&
                        ingredients?.data &&
                        ingredients?.data?.length > 0 &&
                        ingredients?.data?.map((ingredient) => {
                          return (
                            <tr
                              key={ingredient?._id}
                              className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20"
                            >
                              <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                                {toUpperCase(ingredient?.name)}
                              </td>
                              <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                                {ingredient?.quantity}
                              </td>
                              <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                                {ingredient?.unit?.name} (
                                {ingredient?.unit?.abbreviation})
                              </td>
                              <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                                ₦{ingredient?.totalCost?.toFixed(2) || 0}
                              </td>
                              <td className="flex items-center justify-center gap-x-3 py-2">
                                <button
                                  onClick={(e) =>
                                    openEditRecipeIngredient(e, ingredient)
                                  }
                                  className="flex w-8 items-center justify-center bg-bgPurple text-primary"
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  onClick={(e) =>
                                    showDeleteIngredient(e, ingredient)
                                  }
                                  className="flex w-8 items-center justify-center bg-dogwoodRose text-primary"
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
                  <Skeleton height={70} count={6} />
                )}

                {!appContext.state.isLoading &&
                  !appContext.state.isBlockingLoading &&
                  (!ingredients ||
                    !ingredients.data ||
                    ingredients.data.length == 0) && (
                    <EmptyResult
                      message="No ingredients found for this recipe"
                      onEmptyButtonClicked={loadRecipeIngredients}
                      emptyButtonText="Try Again"
                    />
                  )}
              </div>
            ) : (
              <div className="w-full">
                {!appContext.state.isLoading ? (
                  <div className="flex flex-col gap-5">
                    <table className="w-full table-fixed border-separate border-spacing-y-2">
                      <thead>
                        <tr>
                          <th className="w-21 py-3 pl-7 text-left md:pl-16">
                            Name
                          </th>
                          <th className="w-21 py-3 pl-7 text-left md:pl-16">
                            {recipe && recipe?.name}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            Quantity
                          </td>
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            {recipe && recipe?.stock?.quantity}
                          </td>
                        </tr>
                        <tr className="cursor-pointer bg-bgPurple/10 text-sm transition ease-linear hover:bg-bgPurple/20">
                          <td className="cursor-pointer py-4 pl-7 text-left md:pl-16">
                            Unit
                          </td>
                          <td className="flex cursor-pointer items-center gap-x-6 py-4 pl-7 text-left md:pl-16">
                            <div>
                              {/* <span>
                                {recipe && recipe?.stock?.unit?.amount}
                              </span> */}
                              <span>
                                {recipe.stock?.unit?.name} (
                                {recipe.stock?.unit?.abbreviation})
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex w-full justify-end">
                      <button
                        onClick={() => makeRecipe()}
                        className="w-fit items-center justify-center bg-bgPurple px-4 py-2 text-primary"
                      >
                        make recipe
                      </button>
                    </div>
                  </div>
                ) : (
                  <Skeleton height={70} count={6} />
                )}

                {!appContext.state.isLoading &&
                  !appContext.state.isBlockingLoading &&
                  (!ingredients ||
                    !ingredients.data ||
                    ingredients.data.length == 0) && (
                    <EmptyResult
                      message="No ingredients found for this recipe"
                      onEmptyButtonClicked={loadRecipeIngredients}
                      emptyButtonText="Try Again"
                    />
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddIngredients && (
        <AddIngredients
          units={units}
          recipe={recipe}
          loadRecipeIngredients={loadRecipeIngredients}
          hideAddIngredients={hideAddIngredients}
        />
      )}

      {showEditRecipe && (
        <EditRecipe
          hideEditRecipe={hideEditRecipe}
          editRecipe={editRecipe}
          aRecipe={recipe}
        />
      )}

      {showDeleteRecipe && (
        <DeleteDialog
          type={"Recipe"}
          onPerformDeleteClicked={deleteRecipe}
          onCancelDeleteClicked={hideDeleteRecipe}
        />
      )}

      {showEditRecipeIngredient && (
        <EditRecipeIngredient
          ingredient={entityInFocus}
          onPerformEditClicked={editIngredient}
          onCancelEditClicked={hideEditRecipeIngredient}
        />
      )}

      {showDeleteRecipeIngredient && (
        <DeleteDialog
          onPerformDeleteClicked={deleteIngredient}
          onCancelDeleteClicked={hideDeleteIngredient}
          type={`${entityInFocus.name} from ${recipe.name}`}
        />
      )}
    </div>
  );
};

export default RecipeIndex;

const mobileMiddleSpacer = {
  marginBottom: "16px",
  marginTop: "0px",
};

const mobileMiddleRightSpacer = {
  marginRight: "16px",
};

const mobileTopSpacer = {
  marginBottom: "0px",
  marginTop: "0px",
};
