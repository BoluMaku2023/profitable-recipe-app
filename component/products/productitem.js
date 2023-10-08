import { useState } from "react";
import styles from "../../styles/Products.module.css";
import { useRouter } from "next/router";
import { getDate, getAmount } from "../../utils/helper";
import DeleteDialog from "../general/deletedialog";

const ProductItem = ({ product }) => {
  const router = useRouter();

  const navigateToProduct = () => {
    router.push("/product");
  };

  const [showDelete, setShowDelete] = useState(false);

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
    <div className="">
      <div className="bg-primary">
        <div>
          <h5>{product.name}</h5>
        </div>
        <div>
          <h5>{getDate(product.created)}</h5>
        </div>
        <div>
          <h5>{getAmount(product.tcost)}</h5>
        </div>
        <div className={styles.p}>
          <h5>{product.ingredients}</h5>
        </div>
        <div
          onClick={navigateToProduct}
          className={styles.productIngredientView}
        >
          <button className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple">
            View
          </button>
        </div>
        <div
          onClick={showDeleteDialog}
          className={styles.productIngredientDelete}
        >
          <button className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose">
            Delete
          </button>
        </div>
      </div>
      {showDelete && (
        <DeleteDialog
          onPerformDeleteClicked={onPerformDeleteClicked}
          onCancelDeleteClicked={onCancelDeleteClicked}
          type={"Product"}
          message={
            "Confirm that you want to delete this product. It will also be removed from all orders it is attached to."
          }
        />
      )}
    </div>
  );
};

export default ProductItem;
