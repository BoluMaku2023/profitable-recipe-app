import { useEffect, useState } from "react";
import EmptyResult from "../general/emptyResult";
import RecipeToAdd from "./recipeToAdd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { defaultPaginationObject } from "../../utils/helper";
import { postRequest, getRequest } from "../../utils/api.requests";
import SearchInput from "../general/searchInput";
import {
  RECIPES_TO_ADD,
  ADD_RECIPES_TO_PRODUCT,
} from "../../utils/api.endpoints";
import { AppContext } from "../../pages/AppContext";
import BlockingLoadingComponent from "../general/blockingloading";

const AddRecipes = ({ hideAddRecipe, loadProductRecipes, product }) => {
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState(defaultPaginationObject);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getRecipesToAddSearch();
  }, [searchTerm]);

  const onChange = (e, recipe) => {
    const value = e.target.value;

    recipe.quantity = value;

    const foundIndex = recipes.docs.findIndex(
      (aRecipe) => aRecipe._id == recipe._id
    );

    if (foundIndex != -1) {
      const sm = selectedRecipes;

      sm.splice(foundIndex, 1, recipe);

      setRecipes({ ...recipes, docs: sm });
    }
  };

  const emptySearchAndGetRecipes = async () => {
    setSearchTerm("");

    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        RECIPES_TO_ADD +
          "?product_id=" +
          product._id +
          "&search_term=" +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((recipe) => {
        return { ...recipe, quantity: 0 };
      });

      setRecipes({ ...result.response, docs: new_result });

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

  const getRecipesToAddSearch = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        RECIPES_TO_ADD +
          "?product_id=" +
          product._id +
          "&search_term=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((recipe) => {
        return { ...recipe, quantity: 0 };
      });

      setRecipes({ ...result.response, docs: new_result });

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

  const addRecipesToSelected = (recipe) => {
    setError("");

    const sm = selectedRecipes;

    const foundIndex = selectedRecipes.findIndex(
      (aRecipe) => aRecipe.recipe == recipe._id
    );

    if (foundIndex == -1) {
      sm.push({
        recipe: recipe._id,
        unit: recipe.unit,
        quantity: recipe.quantity,
      });
    } else {
      sm.splice(foundIndex, 1);
    }

    setSelectedRecipes(sm);
  };

  const doAddRecipes = async () => {
    if (selectedRecipes.length > 0) {
      setBlockingLoading(true);
      setError("");

      try {
        const response = await postRequest(ADD_RECIPES_TO_PRODUCT, {
          id: product._id,
          recipes: selectedRecipes,
        });

        setBlockingLoading(false);

        loadProductRecipes();

        hideAddRecipe();
      } catch (err) {
        console.log(err);
        setBlockingLoading(false);
      }
    } else {
      if (recipes.length > 0) {
        setError("Add recipes to product by clicking/tapping the add button");
      }
    }
  };

  const onSearchChanged = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  };

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 z-40 flex h-auto w-full items-center justify-center bg-secondary/50 px-6">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="mt-12 flex max-h-[700px] max-w-800 flex-col overflow-y-scroll rounded-lg bg-primary shadow-lg scrollbar-hide">
        <div className="flex w-full flex-col items-start justify-between rounded-t-lg rounded-r-lg bg-primary p-6 shadow-md">
          <div>
            <h4 className="text-xl font-bold text-bgPurple">
              Add Recipes to {product.name}
            </h4>
            <h5 className="my-3">Select Recipes to add</h5>
          </div>

          <div className="mt-4 flex w-full justify-between gap-x-6">
            {/* search  */}
            <SearchInput
              search_value={searchTerm}
              searchClicked={getRecipesToAddSearch}
              onSearchChanged={onSearchChanged}
              closeSearchClicked={emptySearchAndGetRecipes}
            />

            {/* quickbtn */}
            <div className="flex items-center">
              <button
                onClick={doAddRecipes}
                className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
              >
                Save
              </button>
              <button
                onClick={hideAddRecipe}
                className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex h-full w-full flex-col items-center justify-between p-4 shadow-lg">
          <h5 className="bg-dogwoodRose">
            {error && error.length > 0 && error}
          </h5>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            {!appContext.state.isLoading ? (
              <>
                {recipes && recipes.docs && recipes.docs.length > 0 ? (
                  <>
                    <thead>
                      <tr className="bg-bgPurple/90 text-primary">
                        <th className="w-21 py-3 pl-7 text-left md:pl-16">
                          Name
                        </th>
                        <th className="w-21 border-r border-bgPurple pl-16 text-left">
                          Yield
                        </th>
                        <th className="w-21 pl-7 text-left md:pl-16">
                          Yield To Add
                        </th>
                        <th className="w-21 pl-7 text-left md:pl-16">Unit</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.docs.map((recipe, inKey) => {
                        return (
                          <RecipeToAdd
                            addToSelected={addRecipesToSelected}
                            recipe={recipe}
                            onChange={onChange}
                            selectedRecipes={selectedRecipes}
                            key={inKey}
                          />
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <EmptyResult
                    message={
                      "No Recipes found to add. Add recipes on the recipes pages"
                    }
                    onEmptyButtonClicked={getRecipesToAddSearch}
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

export default AddRecipes;
