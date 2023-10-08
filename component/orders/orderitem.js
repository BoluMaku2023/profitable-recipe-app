import { useState } from "react";
import styles from "../../styles/Orders.module.css";
import { useRouter } from "next/router";
import DeleteDialog from "../general/deletedialog";
import { getDate, getAmount } from "../../utils/helper";

const OrderItem = ({ order }) => {
  const router = useRouter();

  const navigateToOrder = () => {
    router.push("/order");
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
    <>
      <div className={`whiteBox ${styles.orderItemHolder}`}>
        <div className={styles.orderName}>
          <h5 className="colorSecondary">{order.name}</h5>
        </div>
        <div className={styles.orderDate}>
          <h5>{getDate(order.created)}</h5>
        </div>
        <div className={styles.orderStatus}>
          <h5>{order.status}</h5>
        </div>
        <div className={styles.orderTotalCost}>
          <h5>{getAmount(order.tcost)}</h5>
        </div>
        <div className={styles.orderFulfilled}>
          <h5>{getDate(order.date)}</h5>
        </div>
        <div className={styles.orderLabourCost}>
          <h5>{getAmount(order.lcost)}</h5>
        </div>
        <div className={styles.orderRecipeCount}>
          <h5>{order.recipes}</h5>
        </div>
        <div onClick={navigateToOrder} className={styles.orderRecipeView}>
          <button className="bg-bgPurple/70 transition-colors ease-in-out hover:bg-bgPurple">
            View
          </button>
        </div>
        <div onClick={showDeleteDialog} className={styles.orderRecipeDelete}>
          <button className="bg-dogwoodRose/70 text-primary transition-colors ease-in-out hover:bg-dogwoodRose">
            Delete
          </button>
        </div>
      </div>
      {showDelete && (
        <DeleteDialog
          onPerformDeleteClicked={onPerformDeleteClicked}
          onCancelDeleteClicked={onCancelDeleteClicked}
          type={"Recipe"}
          message={"Confirm that you want to delete this order."}
        />
      )}
    </>
  );
};

export default OrderItem;
