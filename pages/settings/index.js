import Head from "next/head";
import SettingsIndex from "../../component/settings/index";
import withAuth from "../../utils/withAuthRefactored";

function Settings() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<meta
					name="description"
					content="A recipe consists of ingredients (and quantity requried for each ingredient) to create individual recipes. e.g Red velvet recipe
"
				/>
				<title>Profitable | Settings</title>
			</Head>
			<SettingsIndex />
		</div>
	);
}

export default withAuth(Settings);
