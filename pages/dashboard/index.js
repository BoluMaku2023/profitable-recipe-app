import Head from "next/head";
import DashboardIndex from "../../component/dashboard/index";
import withAuth from "../../utils/withAuthRefactored";
function Dashboard() {
	return (
		<div className=" bg-ghostWhite">
			<Head>
				<title>Profitable | Dashboard</title>
				<meta
					name="description"
					content="A platform for ingredient and recipe management"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<DashboardIndex />
		</div>
	);
}

export default withAuth(Dashboard);
