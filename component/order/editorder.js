import { useState, useEffect } from "react";
import { toUpperCase } from "../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditOrder = ({ hideEditOrder, next, aOrder }) => {
  const [order, setOrder] = useState({
    name: "",
    status: "",
    fulfillment_date: "",
    note: "",
  });
  const savedOrder = localStorage.getItem("_orderDt")
    ? JSON.parse(localStorage.getItem("_orderDt"))
    : null;

  useEffect(() => {
    setOrder({
      name: savedOrder ? savedOrder?.name : aOrder ? aOrder.name : "",
      fulfillment_date: savedOrder
        ? savedOrder?.fulfillment_date
        : aOrder
        ? aOrder.fulfillment_date
        : "",
      note: savedOrder ? savedOrder?.note : aOrder ? aOrder.note : "",
      status: savedOrder ? savedOrder?.status : aOrder ? aOrder.status : "",
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
    <div className=" fixed top-0 left-0 right-0 bottom-0 z-40 flex h-auto items-center justify-center bg-secondary/50">
      <div className=" flex w-500 flex-col rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">
          {order.name.length > 0 ? toUpperCase(order.name) : "New Order"}
        </h3>
        {/* name_field */}
        <div>
          <h4 className="my-4 font-semibold">Name</h4>
          <input
            className=" h-11 w-full rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            onChange={onChange}
            type="text"
            name="name"
            value={order.name}
            placeholder="Enter order name"
          />
        </div>
        {/* fulfilment_field */}
        <div>
          <h4 className="my-4 font-semibold">Fulfillment date</h4>
          {order?.fulfillment_date && (
            <DatePicker
              className=" h-11 w-full rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
              minDate={new Date()}
              onChange={(date) =>
                setOrder({ ...order, fulfillment_date: date })
              }
              selected={new Date(order.fulfillment_date)}
            />
          )}
        </div>
        {/* note_field */}
        <div>
          <h4 className="my-4 font-semibold">Note</h4>
          <input
            className=" h-11 w-full rounded-lg border border-bgPurple px-3 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            onChange={onChange}
            type="text"
            name="note"
            value={order.note}
            placeholder="Enter order note"
          />
        </div>

        <div className=" mt-7 flex items-center">
          <button
            onClick={handleNext}
            className=" flex max-h-11 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Next
          </button>
          <button
            onClick={hideEditOrder}
            className=" ml-6 flex max-h-11 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
