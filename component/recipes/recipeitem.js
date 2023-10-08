import { useState } from "react"

import styles from "../../styles/Recipes.module.css"

import { useRouter } from "next/router"

import {getDate, getAmount} from "../../utils/helper"

import DeleteDialog from "../general/deletedialog"

const RecipeItem = ({recipe}) => {

    const router = useRouter()

    const navigateToRecipe = () => {

        router.push("/recipe")
    }

    const [showDelete, setShowDelete] = useState(false)

    const showDeleteDialog = () => {
        setShowDelete(true)
    }

    const onPerformDeleteClicked = () => {
        setShowDelete(false);
    }

    const onCancelDeleteClicked = () => {
        setShowDelete(false);
    }

    return <>
        <div className={`whiteBox ${styles.recipeItemHolder}`}>
            <div className={styles.recipeName}>
                <h5 className="colorSecondary">{recipe.name}</h5>
            </div>
            <div className={styles.recipeDate}>
                <h5>{getDate(recipe.created)}</h5>
            </div>
            <div className={styles.recipeTotalCost}>
                <h5>{getAmount(recipe.tcost)}</h5>
            </div>
            <div className={styles.recipeIngredientCount}>
                <h5>{recipe.ingredients}</h5>
            </div>
            <div onClick={navigateToRecipe} className={styles.recipeIngredientView}>
                <button className="button secondaryButton colorWhite">
                    View
                </button>
            </div>
            <div onClick={showDeleteDialog} className={styles.recipeIngredientDelete}>
                <button className="button greyButton colorBlack ${styles.recipeIngredientDeleteButton">
                    Delete
                </button>
            </div>

        </div>
        {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Recipe"} message={"Confirm that you want to delete this recipe. It will also be removed from all orders it is attached to."}  />
        }
    </>
}

export default RecipeItem;