import { getDate, getAmount } from "../../utils/helper";
import { useRouter } from "next/router";

const IngredientsItem = ({ ingredient, setShowDelete }) => {
  const removeIngredient = () => {
    setShowDelete(true);
  };

  const router = useRouter();

  const navigateToIngredient = () => {
    router.push("/ingredient/1");
  };

  return (
    <div className="">
      <div>
        <h5>{ingredient.name}</h5>
      </div>
      <div>
        <h5>{ingredient.purchase_quantity}</h5>
      </div>
      <div>
        <h5>{ingredient.purchase_size}</h5>
      </div>
      <div>
        <h5>{getAmount(ingredient.price)}</h5>
      </div>
      <div onClick={navigateToIngredient} className={styles.ingredientEdit}>
        <button className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple">
          Edit
        </button>
      </div>
      <div>
        <button
          onClick={removeIngredient}
          className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default IngredientsItem;
