
import styles from "../../styles/Recipes.module.css"

import {getDate, getAmount} from "../../utils/helper"

const RecipeDetails = ({recipe}) => {
    
    return <div className={styles.recipeDetailsHolder}>
            <div className={styles.detailsHolderTitles}>
                <h5>
                    Date Created
                </h5>
                <h5>
                    Total cost
                </h5>
            </div>
            <div className={styles.detailsHolderContent}>
                <h5>
                    {getDate(recipe.created)}
                </h5>
                <h5>
                    {getAmount(recipe.total_cost)}
                </h5>
            </div>
    </div>
}

export default RecipeDetails;