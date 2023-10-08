import IngredientRecipeItem from "./ingredientrecipeitem";

const today = new Date();

const recipes = [
  {
    name: "Fufu",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    ingredients: 3,
    cost: 500,
  },
  {
    name: "Cake",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    ingredients: 12,
    cost: 40000,
  },
  {
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    ingredients: 8,
    cost: 25000,
  },
];

const IngredientRecipes = () => {
  return (
    <div>
      <h2>Recipes using Salt</h2>

      <div>
        <div>
          <h5>Name</h5>
        </div>
        <div>
          <h5>Created</h5>
        </div>
        <div>
          <h5>Status</h5>
        </div>
        <div>
          <h5>Ingredients</h5>
        </div>
        <div>
          <h5>Total Cost</h5>
        </div>
      </div>

      {recipes &&
        recipes.map((recipe) => {
          return <IngredientRecipeItem key={recipe.name} recipe={recipe} />;
        })}
    </div>
  );
};

export default IngredientRecipes;
