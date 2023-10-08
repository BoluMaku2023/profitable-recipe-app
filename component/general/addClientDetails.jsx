import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const AddClientDetails = ({ back, addOrder, aOrder }) => {
  const [client, setCient] = useState({ email: "", phone_number: "" });
  const order = localStorage.getItem("_orderDt")
    ? JSON.parse(localStorage.getItem("_orderDt"))
    : null;

  useEffect(() => {
    setCient({
      email: aOrder ? aOrder?.client?.email : "",
      phone_number: aOrder ? aOrder?.client?.phone_number : "",
    });
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setCient({ ...client, [name]: value });
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-40 flex items-center justify-center bg-secondary/50 px-8">
      <div className="w-500 rounded-lg bg-primary p-8">
        <h3 className="mb-4 text-xl font-bold text-bgPurple">Client Contact</h3>

        <div className="inputFieldHolder">
          <h4>Email Address</h4>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={client.email}
            placeholder="Enter client email"
            className=" border border-bgPurple text-sm outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div className="inputFieldHolder">
          <h4 className="font-semibold">Phone Number</h4>
          <input
            onChange={onChange}
            type="tel"
            name="phone_number"
            value={client.phone_number}
            placeholder="Enter client phone number"
            className=" border border-bgPurple text-sm outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        {/* <h5>You can add products after saving order.</h5> */}

        <div className="flex items-center">
          <button
            onClick={(e) =>
              addOrder(e, {
                ...order,
                ...client,
              })
            }
            className=" flex max-h-11 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={back}
            className=" ml-6 flex max-h-11 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientDetails;
