import styles from "../../styles/Recipes.module.css";

import RecipeItem from "./recipeitem";

const today = new Date();

const recipes = [
  {
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    tcost: 1000,
    ingredients: 9,
  },
  {
    name: "Spag",
    created: "December 17, 2022 03:24:00",
    tcost: 500,
    ingredients: 8,
  },
  {
    name: "Meatpie",
    created: "December 17, 2022 03:24:00",
    tcost: 900,
    ingredients: 7,
  },
];

const RecipesList = () => {
  return (
    <div className={styles.recipesListHolder}>
      <div className={styles.recipesListHolderTitle}>
        <div className={styles.recipeName}>
          <h5>Name</h5>
        </div>
        <div className={styles.recipeDate}>
          <h5>
            Date
            <br />
            Created
          </h5>
        </div>

        <div className={styles.recipeTotalCost}>
          <h5>
            Total
            <br />
            cost
          </h5>
        </div>
        <div className={styles.recipeIngredientCount}>
          <h5>
            Ingredient
            <br />
            count
          </h5>
        </div>
        <div className={styles.recipeIngredientView}></div>
        <div className={styles.recipeIngredientDelete}></div>
      </div>

      {recipes &&
        recipes.map((recipe) => {
          return <RecipeItem key={recipe.name} recipe={recipe} />;
        })}
    </div>
  );
};

export default RecipesList;
