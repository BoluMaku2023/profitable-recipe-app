import Head from "next/head";
import RecipesIndex from "../../component/recipes/index";
import withAuth from "../../utils/withAuthRefactored";

function Recipes() {
	return (
		<div className="bg-ghostWhite">
			<Head>
				<meta
					name="description"
					content="A recipe consists of ingredients (and quantity requried for each ingredient) to create individual recipes. e.g Red velvet recipe
"
				/>
				<title>Profitable | Recipes</title>
			</Head>
			<RecipesIndex />
		</div>
	);
}

export default withAuth(Recipes);
