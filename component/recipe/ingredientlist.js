
import styles from "../../styles/Recipes.module.css"

import IngredientsItem from "./ingredientitem"

const ingredients = [
    {
        _id: 1,
        name: "Salt",
        purchase_quantity: 1,
        purchase_size: "kg",
        price: 200,
    },
    {
        _id: 2,
        name: "Sugar",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 500,
    },
    {
        _id: 3,
        name: "Ketchup",
        purchase_quantity: 1,
        purchase_size: "cl",
        price: 2000,
    },
    {
        _id: 4,
        name: "Butter",
        purchase_quantity: 1,
        purchase_size: "g",
        price: 650,
    }
]

const IngredientsItemList = () => {
    return <div className={styles.ingredientsList}>
        <div className={styles.ingredientsHolderTitle}>
            <div className={styles.ingredientName}>
                <h5>Name</h5>
            </div>
            <div className={styles.ingredientPQ}>
                <h5>Quantity</h5>
            </div>
            <div className={styles.ingredientPS}>
                <h5>Size</h5>
            </div>
            <div className={styles.ingredientPrice}>
                <h5>Price</h5>
            </div>
            <div className={styles.ingredientEdit}>
                
            </div>
            <div className={styles.ingredientDelete}>
                
            </div>
        </div>

        {
            ingredients && ingredients.map(ingredient => { 
                return <IngredientsItem key={ingredient.name} ingredient={ingredient} />
            })
        }

    </div>
}

export default IngredientsItemList;