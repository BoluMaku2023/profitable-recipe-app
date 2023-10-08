
import styles from "../../styles/Orders.module.css"

import OrderItem from "./orderitem"

const today = new Date();

const orders = [{
    name: "Shawarma",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    recipes: 8
},{
    name: "Spag",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    recipes: 8
},{
    name: "Meatpie",
    created: "December 17, 2022 03:24:00",
    status: "pending",
    tcost: 500,
    date: "December 17, 2022 03:24:00",
    lcost: 25000,
    recipes: 8
}]

const OrdersList = () => {
    return <div className={styles.ordersListHolder}>

        <div className={styles.ordersListHolderTitle}>
            <div className={styles.orderName}>
                <h5>Name</h5>
            </div>
            <div className={styles.orderDate}>
                <h5>Date<br />Created</h5>
            </div>
            <div className={styles.orderStatus}>
                <h5>Status</h5>
            </div>
            <div className={styles.orderTotalCost}>
                <h5>Total<br />cost</h5>
            </div>
            <div className={styles.orderFulfilled}>
                <h5>Fulfillment<br />date</h5>
            </div>
            <div className={styles.orderLabourCost}>
                <h5>Labour<br />cost</h5>
            </div>
            <div className={styles.orderRecipeCount}>
                <h5>Recipe<br />count</h5>
            </div>
            <div className={styles.orderRecipeView}>
                
            </div>
            <div className={styles.orderRecipeDelete}>
                
            </div>

        </div>

        {
            orders && orders.map(order => { 
                return <OrderItem key={order.name} order={order} />
            })
        }


    </div>
}

export default OrdersList;