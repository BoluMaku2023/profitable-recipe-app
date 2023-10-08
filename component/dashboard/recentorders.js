import RecentOrder from "./recentorder";

const today = new Date();

const orders = [
	{
		name: "Mr Davids Wedding",
		created: "December 17, 2022 03:24:00",
		status: "pending",
		ingredients: 3,
		cost: 500,
	},
	{
		name: "Folake's Birthday",
		created: "December 17, 2022 03:24:00",
		status: "pending",
		ingredients: 12,
		cost: 40000,
	},
	{
		name: "The Food Guys",
		created: "December 17, 2022 03:24:00",
		status: "pending",
		ingredients: 8,
		cost: 25000,
	},
];

const RecentOrders = () => {
	return (
		<div>
			<div>
				<h2>Recent Orders</h2>
			</div>

			<div>
				<div>
					<h5>Name</h5>
				</div>
				<div>
					<h5>Created</h5>
				</div>
				<div>
					<h5>Status</h5>
				</div>
				<div>
					<h5>Recipes</h5>
				</div>
				<div>
					<h5>Total Cost</h5>
				</div>
			</div>

			{orders &&
				orders.map((order) => {
					return (
						<RecentOrder
							key={order.name}
							order={order}
						/>
					);
				})}
		</div>
	);
};

export default RecentOrders;

/*
{
    orders && orders.map(order => {
        return <RecentOrder key={order.name} order={order} />
    })
}
*/
