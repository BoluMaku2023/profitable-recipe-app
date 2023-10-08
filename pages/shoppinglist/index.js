import ShoppingListIndex from "../../component/orders/shoppingList";

import withAuth from "../../utils/withAuthRefactored";

function ShoppingList() {
	return (
		<div className="pageHolder">
			<ShoppingListIndex />
		</div>
	);
}

export default withAuth(ShoppingList);
