import Head from "next/head";
import ProfitableIndex from "../../component/profitable/index";
import withAuth from "../../utils/withAuthRefactored";

function Profitable() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<title>Profitable | Products</title>
				<meta
					name="description"
					content="A platform for ingredient and recipe management"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<ProfitableIndex />
		</div>
	);
}

export default withAuth(Profitable);
