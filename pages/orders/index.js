import Head from "next/head";
import OrdersIndex from "../../component/orders/index";
import withAuth from "../../utils/withAuthRefactored";

function Orders() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<title>Profitable | Orders</title>
				<meta
					name="description"
					content="A platform for ingredient and recipe management"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<OrdersIndex />
		</div>
	);
}

export default withAuth(Orders);
