import { useState } from "react"

import styles from "../../styles/Recipes.module.css"

import DeleteDialog from "../general/deletedialog"

import {getDate, getAmount} from "../../utils/helper"

const IngredientsItem = ({ingredient}) => {

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
        <div className={`whiteBox ${styles.ingredientItemHolder}`}>
       
            <div className={styles.ingredientName}>
                <h5>{ingredient.name}</h5>
            </div>
            <div className={styles.ingredientPQ}>
                <h5>{ingredient.purchase_quantity}</h5>
            </div>
            <div className={styles.ingredientPS}>
                <h5>{ingredient.purchase_size}</h5>
            </div>
            <div className={styles.ingredientPrice}>
                <h5>{getAmount(ingredient.price)}</h5>
            </div>
            <div className={styles.ingredientEdit}>
                <button className="button secondaryButton colorWhite">Edit</button>
            </div>
            <div onClick={showDeleteDialog} className={styles.ingredientDelete}>
                <button className="button greyButton colorBlack">Remove</button>
            </div>
        </div>
        {
            showDelete && <DeleteDialog onPerformDeleteClicked={onPerformDeleteClicked} onCancelDeleteClicked={onCancelDeleteClicked} type={"Ingredient"} message={"Confirm that you want to delete this ingredient. It will also be removed from all orders this recipe is attached to inside of the recipe."}  />
        }
    </>
}

export default IngredientsItem;