import { useRouter } from "next/router";

const OrderNumbers = ({ fulfilledOrdersCount, pendingOrdersCount }) => {
  const router = useRouter();

  const navigateToOrder = () => {
    router.push("/orders");
  };

  return (
    <div
      onClick={navigateToOrder}
      className="flex h-64 max-h-64 min-w-250 flex-col rounded-lg bg-primary p-6 shadow-lg lg:w-1/4"
    >
      <h3 className="">
        <span className="text-xl font-bold font-Raleway text-bgPurple">Orders</span>
      </h3>

      <div className="my-auto flex flex-col justify-between gap-y-6">
        <div className="flex items-center justify-between">
          <h5 className=" font-normal  font-Raleway  text-dogwoodRose">Pending</h5>
          <h4 className=" mt-0 text-xl">{pendingOrdersCount}</h4>
        </div>
        <div className="flex items-center justify-between">
          <h5 className=" font-semibold  font-Raleway text-aquaMarine">Fulfilled</h5>
          <h4 className=" mt-0 text-xl">{fulfilledOrdersCount}</h4>
        </div>
        <div className="flex items-center justify-between">
          <h5 className=" font-semibold font-Raleway  text-purpleLigther">Total</h5>
          <h4 className=" mt-0 text-xl">
            {pendingOrdersCount || fulfilledOrdersCount === ""
              ? pendingOrdersCount + fulfilledOrdersCount
              : ""}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default OrderNumbers;
