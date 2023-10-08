import Head from "next/head";
import ProductsIndex from "../../component/products/index";
import withAuth from "../../utils/withAuthRefactored";

function Products() {
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
			<ProductsIndex />
		</div>
	);
}
''
export default withAuth(Products);
