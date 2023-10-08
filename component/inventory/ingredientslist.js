import IngredientsItem from "./ingredientitem";

const IngredientsList = ({ ingredients, setShowDelete }) => {
  return (
    <div className="mt-20 py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <div>
        <div>
          <h5>Name</h5>
        </div>
        <div>
          <h5>Purchase Quantity</h5>
        </div>
        <div>
          <h5>Purchase Size</h5>
        </div>
        <div>
          <h5>Price</h5>
        </div>
        <div></div>
        <div></div>
      </div>

      {ingredients &&
        ingredients.map((ingredient) => {
          return (
            <IngredientsItem
              setShowDelete={setShowDelete}
              key={ingredient.name}
              ingredient={ingredient}
            />
          );
        })}
    </div>
  );
};

export default IngredientsList;
