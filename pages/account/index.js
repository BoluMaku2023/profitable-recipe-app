import Head from "next/head";
import AccountIndex from "../../component/account/index";
import withAuth from "../../utils/withAuthRefactored";

function Account() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<title>Recipe Platform | Get Started</title>
				<meta
					name="description"
					content="A marketplace platform for ingredient and recipe management. Connect your inventory to our platform, accessing products from suppliers in bulk or a la carte, delivering them when you need them and tracking customer sales online. Profit gives users access to faster quoting, up-to-date availability and price detail on any order."
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<AccountIndex />
		</div>
	);
}

export default withAuth(Account);
