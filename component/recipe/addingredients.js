import { useEffect, useState, useContext } from "react";
import EmptyResult from "../general/emptyResult";
import IngredientToAdd from "./ingredientsToAdd";
import { AppContext } from "../../pages/AppContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchInput from "../general/searchInput";
import { postRequest, getRequest } from "../../utils/api.requests";

import {
  INGREDIENTS_TO_ADD,
  ADD_INGREDIENTS_TO_RECIPE_URL,
  INGREDIENT_UNITS_URL,
} from "../../utils/api.endpoints";

import { defaultPaginationObject } from "../../utils/helper";
import BlockingLoadingComponent from "../general/blockingloading";

const AddIngredients = ({
  hideAddIngredients,
  loadRecipeIngredients,
  recipe,
  units,
}) => {
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false);

  const [ingredients, setIngredients] = useState({});

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page: 0,
    limit: process.env.NEXT_PUBLIC_PAGINATION_LIMIT || 1000,
    totalPagesCount: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [baseUnits, setBaseUnits] = useState({});

  useEffect(() => {
    getIngredientsToAddSearch();
  }, [pagination.page, searchTerm]);

  const onChange = (e, ingredient) => {
    const value = e.target.value;

    ingredient.quantity = value;

    const foundIndex = ingredients.findIndex(
      (aIngredient) => aIngredient._id == ingredient._id
    );

    if (foundIndex != -1) {
      const sm = selectedIngredients;

      sm.splice(foundIndex, 1, ingredient);

      setIngredients(sm);
    }
  };

  const getIngredientUnits = async (ingredient_id) => {
    try {
      appContext.setBlockingLoading(true);

      const result = await getRequest(
        INGREDIENT_UNITS_URL + "?ingredient_id=" + ingredient_id
      );

      const new_result = result.response.map((ingredient) => {
        return { ...ingredient, quantity: 0 };
      });

      setIngredients(new_result);

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
      console.log(err);
    }
  };

  const getIngredientsToAdd = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        INGREDIENTS_TO_ADD + "?recipe_id=" + recipe._id
      );

      const new_result = result.response.map((ingredient) => {
        return { ...ingredient, quantity: 0 };
      });

      setIngredients(new_result);

      appContext.setBlockingLoading(false);
    } catch (err) {
      appContext.setBlockingLoading(false);
      console.log(err);
    }
  };

  const emptySearchAndGetIngredients = async () => {
    setSearchTerm("");

    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        INGREDIENTS_TO_ADD +
          "?recipe_id=" +
          recipe._id +
          "&search_term=" +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.map((ingredient) => {
        return { ...ingredient, quantity: 0 };
      });

      setIngredients(new_result);

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const getIngredientsToAddSearch = async () => {
    appContext.setBlockingLoading(true);

    try {
      const result = await getRequest(
        INGREDIENTS_TO_ADD +
          "?recipe_id=" +
          recipe._id +
          "&search_term=" +
          searchTerm +
          "&page=" +
          pagination.page +
          "&limit=" +
          pagination.limit
      );

      const new_result = result.response.docs.map((ingredient) => {
        return { ...ingredient, quantity: 0 };
      });

      setPagination({
        ...pagination,
        totalPagesCount: result.response.totalPages,
      });

      setIngredients({ ...result.response, docs: new_result });

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
    }
  };

  const addIngredientToSelected = (ingredient) => {
    setError("");

    const sm = selectedIngredients;

    const foundIndex = selectedIngredients.findIndex(
      (aIngredient) => aIngredient.ingredient == ingredient._id
    );

    if (foundIndex == -1) {
      sm.push({
        ingredient: ingredient._id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    } else {
      sm.splice(foundIndex, 1);
    }

    setSelectedIngredients(sm);
  };

  const doAddIngredients = async () => {
    if (selectedIngredients.length > 0) {
      setBlockingLoading(true);

      setError("");

      try {
        const response = await postRequest(ADD_INGREDIENTS_TO_RECIPE_URL, {
          id: recipe._id,
          ingredients: selectedIngredients,
        });

        setBlockingLoading(false);

        loadRecipeIngredients();

        hideAddIngredients();
      } catch (err) {
        console.log(err);
        setBlockingLoading(false);
      }
    } else {
      if (ingredients.length > 0) {
        setError(
          "Add ingredients to recipe by clicking/tapping the add button"
        );
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
    <div className="fixed bottom-0 top-0 left-0 right-0 z-40 flex  items-center justify-center bg-secondary/50">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className="my-24 flex max-h-[700px] w-[1120px] flex-col overflow-y-scroll rounded-lg bg-primary p-6 shadow-lg scrollbar-hide">
        <div className="">
          <div>
            <h4 className="text-xl font-bold text-bgPurple">
              Add Ingredients to {recipe.name}
            </h4>
            <h5>Select ingredients to add</h5>

            <div className="my-8">
              <SearchInput
                search_value={searchTerm}
                searchClicked={getIngredientsToAddSearch}
                onSearchChanged={onSearchChanged}
                closeSearchClicked={emptySearchAndGetIngredients}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <button
              onClick={doAddIngredients}
              className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
            >
              Save
            </button>
            <button
              onClick={hideAddIngredients}
              className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
            >
              Close
            </button>
          </div>
        </div>
        <div>
          <h5>{error && error.length > 0 && error}</h5>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            {!appContext.state.isLoading ? (
              <>
                {ingredients &&
                ingredients.docs &&
                ingredients.docs.length > 0 ? (
                  <thead>
                    <tr className="bg-bgPurple/90 text-sm text-primary">
                      <th className="w-21 py-3 pl-7 text-left md:pl-16">
                        Name
                      </th>
                      <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left md:pl-16">
                        Quantity in stock
                      </th>
                      <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left md:pl-16">
                        Purchase Unit
                      </th>
                      <th className="w-24 border-r border-bgPurple py-3 pl-7 text-left">
                        Price per unit
                      </th>
                      <th className="id w-21 border-r border-bgPurple py-3 pl-7 text-left ">
                        Unit To Add
                      </th>
                      <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left">
                        Quantity To Add
                      </th>
                      <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left">
                        Quantity To Add Cost
                      </th>
                      <th className="w-21 border-r border-bgPurple py-3 pl-7 text-left">
                        Action
                      </th>
                    </tr>
                    {ingredients.docs.map((ingredient) => {
                      return (
                        <IngredientToAdd
                          addToSelected={addIngredientToSelected}
                          ingredient={ingredient}
                          onChange={onChange}
                          selectedIngredients={selectedIngredients}
                        />
                      );
                    })}
                  </thead>
                ) : (
                  <EmptyResult
                    message={
                      "No Ingredients found to add. Add ingredients to inventory"
                    }
                    onEmptyButtonClicked={getIngredientsToAddSearch}
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

export default AddIngredients;
