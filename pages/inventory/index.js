import Head from "next/head";
import InventoryIndex from "../../component/inventory/index";
import withAuth from "../../utils/withAuthRefactored";

function Inventory() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<meta
					content="Materials are items that are not directly used in recipe production but are required in the preparation/assembly of the final product e.g packaging box."
					name="description"
				/>
				<title>Profitable | Inventory</title>
			</Head>
			<InventoryIndex />
		</div>
	);
}

export default withAuth(Inventory);
