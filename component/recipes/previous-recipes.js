import React from "react";

import RecipesList from "./RecipesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faPen,
	faAdd,
	faTrash,
	faSearch,
	faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Recipes.module.css";

import AddRecipe from "../general/addrecipe";

import { useState } from "react";

const RecipesIndex = () => {
	const [showAdd, setShowAdd] = useState(false);

	const showAddRecipe = () => {
		setShowAdd(true);
	};

	const closeAddRecipe = () => {
		setShowAdd(false);
	};

	return (
		<>
			<div className={styles.recipesIndex}>
				<div className={styles.recipesTop}>
					<h2 className="pageTitle">Recipes</h2>
					<div>
						<h4>Total cost</h4>
						<h4>#50,000</h4>
					</div>
					<div className="pageHolderContentTopRight">
						<button
							onClick={showAddRecipe}
							className={`squareButtonPrimary ${styles.recipesButton}`}
						>
							<FontAwesomeIcon icon={faSearch} />
						</button>
						<button
							onClick={showAddRecipe}
							className={`squareButtonPrimary ${styles.recipesButton}`}
						>
							<FontAwesomeIcon icon={faAdd} />
						</button>
					</div>
				</div>
				<div className={styles.recipesTop}>
					<h4>Description - </h4>
				</div>

				<div className={styles.recipesListHolder}>
					<RecipesList />
				</div>
			</div>

			{showAdd && <AddRecipe closeAddRecipe={closeAddRecipe} />}
		</>
	);
};

export default RecipesIndex;
