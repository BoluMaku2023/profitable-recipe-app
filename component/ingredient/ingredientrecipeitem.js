import { getDate, getAmount } from "../../utils/helper";

const IngredientRecipeItem = ({ recipe }) => {
  return (
    <div>
      <div>
        <h5>{recipe.name}</h5>
      </div>
      <div>
        <h5>{getDate(recipe.created)}</h5>
      </div>
      <div>
        <h5>{recipe.status}</h5>
      </div>
      <div>
        <h5>{recipe.ingredients}</h5>
      </div>
      <div>
        <h5>{getAmount(recipe.cost)}</h5>
      </div>
    </div>
  );
};

export default IngredientRecipeItem;
