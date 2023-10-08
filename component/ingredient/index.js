import { useState } from "react";
import DeleteDialog from "../general/deletedialog";

import EditIngredient from "../general/editingredient";

import IngredientRecipes from "./ingredientrecipes";

const IngredientIndex = ({ ingredient }) => {
  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const showEditIngredient = () => {
    setShowEdit(true);
  };

  const closeEditIngredient = () => {
    setShowEdit(false);
  };

  const showDeleteDialog = () => {
    setShowDelete(true);
  };

  const onPerformDeleteClicked = () => {
    setShowDelete(false);
  };

  const onCancelDeleteClicked = () => {
    setShowDelete(false);
  };

  return (
    <>
      <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
        <div>
          <div>
            <h2>Salt</h2>
          </div>

          <div>
            <div>
              <h5>Purchase Quantity</h5>
              <h4>1</h4>
            </div>
            <div>
              <h5>Purchase Size</h5>
              <h4>kg</h4>
            </div>
            <div>
              <h5>Price</h5>
              <h4>4,000</h4>
            </div>
          </div>

          <div>
            <button onClick={showEditIngredient}>Edit</button>
            <button onClick={showDeleteDialog}>Delete</button>
          </div>
        </div>
      </div>

      <IngredientRecipes />

      {showEdit && (
        <EditIngredient
          ingredient={ingredient}
          closeEditIngredient={closeEditIngredient}
        />
      )}

      {showDelete && (
        <DeleteDialog
          onPerformDeleteClicked={onPerformDeleteClicked}
          onCancelDeleteClicked={onCancelDeleteClicked}
          type={"Ingredient"}
          message={
            "Confirm that you want to delete this ingredient. It will also be removed from all recipes it is attached to"
          }
        />
      )}
    </>
  );
};

export default IngredientIndex;
