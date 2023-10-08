

import styles from "../../styles/Recipes.module.css"

import {getDate, getAmount} from "../../utils/helper"

const IngredientsItemToAdd = ({ingredient, selectedIngredients, selectIngredient, editIngredient}) => {
    const toggleSelected = () => {
        selectIngredient(ingredient._id)
    }

    return <div className={`whiteBox ${styles.ingredientToAddItemHolder}`}>
            <div className={styles.ingredientSelectAdd}>
                {
                    selectedIngredients.includes(ingredient._id) ? <button onClick={toggleSelected} className="button greyButton colorWhite">Remove</button> : <button onClick={toggleSelected} className="button secondaryButton colorWhite">Add</button>
                }
            </div>
            <div className={styles.ingredientNameAdd}>
                <h5>{ingredient.name}</h5>
            </div>
            <div className={styles.ingredientPQAdd}>
                <h5>{ingredient.purchase_quantity}</h5>
            </div>
            <div className={styles.ingredientPSAdd}>
                <h5>{ingredient.purchase_size}</h5>
            </div>
            <div className={styles.ingredientPriceAdd}>
                <h5>{getAmount(ingredient.price * ingredient.purchase_size)}</h5>
            </div>
    </div>
}

export default IngredientsItemToAdd;