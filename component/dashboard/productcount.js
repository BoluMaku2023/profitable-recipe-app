import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const ProductCount = ({ count = 0 }) => {
  const router = useRouter();

  const navigateToProduct = () => {
    router.push("/products");
  };

  const [total, setTotal] = useState(81);

  return (
    <div
      onClick={navigateToProduct}
      className="relative flex h-64 w-full flex-col rounded-lg bg-bgPurple/10 p-16 shadow-lg md:my-0 md:w-1/4 xl:p-6"
    >
      <FontAwesomeIcon
        icon={faBagShopping}
        className="absolute right-6 top-5 hidden h-auto w-8 rounded-lg bg-bgPurple p-2 text-sm text-primary xl:block"
      />
      <h3 className="text-xl font-bold text-bgPurple">
        <span>Products</span>
      </h3>
      <div className="m-auto flex justify-between text-xl font-bold xl:w-31">
        <h3>Total</h3>
        <span className="block">-</span>
        <h1 className="text-xl">{count}</h1>
      </div>
    </div>
  );
};

export default ProductCount;
