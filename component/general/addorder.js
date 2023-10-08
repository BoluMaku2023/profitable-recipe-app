import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const AddOrder = ({ closeAdd, next }) => {
  const [order, setOrder] = useState({
    name: "",
    fulfillment_date: "",
    note: "",
  });
  const savedOrder = localStorage.getItem("_orderDt")
    ? JSON.parse(localStorage.getItem("_orderDt"))
    : null;

  useEffect(() => {
    setOrder({
      name: savedOrder ? savedOrder?.name : "",
      fulfillment_date: savedOrder ? savedOrder?.fulfillment_date : "",
      note: savedOrder ? savedOrder?.note : "",
    });
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setOrder({ ...order, [name]: value });
  };

  const handleNext = () => {
    if (order.name !== "" && order.fulfillment_date !== "") {
      localStorage.setItem("_orderDt", JSON.stringify(order));
      next();
    } else {
      null;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto w-full items-center justify-center bg-secondary/50 px-8">
      <div className="my-24 flex w-500 flex-col rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">
          {order.name.length > 0 ? order.name : "New Order"}
        </h3>

        <div>
          <h4 className="my-4 font-semibold">Name</h4>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={order.name}
            placeholder="Enter order name"
            className=" h-11 w-full rounded-lg border border-bgPurple px-3 placeholder:text-xs placeholder:opacity-60 focus:border-dogwoodRose focus:outline-none"
          />
        </div>

        <div>
          <h4 className="my-4 font-semibold">Fulfillment Date</h4>
          <input
            onChange={onChange}
            type="date"
            name="fulfillment_date"
            value={order.fulfillment_date}
            className=" h-11 w-full rounded-lg border border-bgPurple px-3 text-sm placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
          />
        </div>

        <div>
          <h4 className="my-4 font-semibold">Note</h4>
          <input
            onChange={onChange}
            type="text"
            name="note"
            value={order.note}
            placeholder="Enter order note"
            className=" h-11 w-full rounded-lg border border-bgPurple px-3 placeholder:text-xs placeholder:opacity-60 focus:border-dogwoodRose focus:outline-none"
          />
        </div>

        <h5 className="my-6">You can add products after saving order.</h5>

        <div className="flex items-center">
          <button
            onClick={handleNext}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Next
          </button>
          <button
            onClick={closeAdd}
            className="ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
