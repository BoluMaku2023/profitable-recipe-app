import { useRouter } from "next/router";
import { getDate, getAmount } from "../../utils/helper";

const RecentOrder = ({ order }) => {
	const router = useRouter();

	const navigateToOrder = () => {
		router.push("/order");
	};
	return (
		<div
			onClick={navigateToOrder}
			className={`whiteBox ${styles.recentOrderHolder}`}
		>
			<div className={styles.orderName}>
				<h5 className="colorSecondary">{order.name}</h5>
			</div>
			<div className={styles.orderDate}>
				<h5>{getDate(order.created)}</h5>
			</div>
			<div className={styles.orderStatus}>
				<h5>{order.status}</h5>
			</div>
			<div className={styles.orderRecipe}>
				<h5>{order.ingredients}</h5>
			</div>
			<div className={styles.orderCost}>
				<h5>{getAmount(order.cost)}</h5>
			</div>
		</div>
	);
};

export default RecentOrder;
