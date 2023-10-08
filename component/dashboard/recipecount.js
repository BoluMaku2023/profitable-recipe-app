import { useRouter } from "next/router";
import { FiTag } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const RecipeCount = ({ count = 0 }) => {
  const router = useRouter();

  const navigateToRecipe = () => {
    router.push("/recipes");
  };

  return (
    <div
      onClick={navigateToRecipe}
      className="relative flex h-64 w-full flex-col rounded-lg bg-bgPurple/10 p-16 shadow-lg md:my-0 md:w-1/4 xl:p-6"
    >
      <FontAwesomeIcon
        icon={faShoppingBasket}
        className="absolute right-6 top-5 hidden h-auto w-8 rounded-lg bg-bgPurple p-2 text-sm text-primary xl:block"
      />
      <h3 className="text-xl font-bold text-bgPurple">
        <span>Recipes</span>
      </h3>
      <div className="m-auto flex justify-between text-xl font-bold xl:w-31">
        <h3>Total</h3>
        <span className="block">-</span>
        <h1 className="text-xl">{count}</h1>
      </div>
    </div>
  );
};

export default RecipeCount;
