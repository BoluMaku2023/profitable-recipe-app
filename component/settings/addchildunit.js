import { useState } from "react";
import { CREATE_CHILD_UNIT_URL } from "../../utils/api.endpoints";
import { postRequest } from "../../utils/api.requests";
import { AppContext } from "../../pages/AppContext";

const AddChildUnit = ({ closeAddChildUnit, getUnits, parentUnitDetails }) => {
  const appContext = AppContext();

  const [parentUnit, setParentUnit] = useState({
    ...parentUnitDetails,
    amount: 1,
  });
  const [childUnit, setChildUnit] = useState({
    name: "",
    abbreviation: "",
    amount: 1000,
    isDefault: false,
    isParent: false,
    parentId: null,
  });

  const onChildChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setChildUnit({ ...childUnit, [name]: value });
  };

  const doCreateChildUnit = async () => {
    appContext.setBlockingLoading(true);

    const allUnits = [];

    allUnits.push(parentUnit);

    if (!childUnit?.name || !childUnit?.abbreviation || !childUnit?.amount) {
      appContext.setMessage({
        visible: true,
        message: "Complete all fields!",
        title: "Message",
        type: "INFO",
      });
      return;
    }

    try {
      let result = await postRequest(CREATE_CHILD_UNIT_URL, {
        childUnit,
        parentId: parentUnit?._id,
      });

      if (!!result) {
        getUnits();
        closeAddChildUnit();
      }

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred saving units",
        title: "Units Not Saved",
        type: "ERROR",
      });
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-40 flex items-center justify-center bg-secondary/50 px-8">
      <div className="w-700 rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="mb-7 text-xl font-bold text-bgPurple">Add Unit</h3>

        <h6>Only the parent unit is required</h6>

        <div className="my-6 mx-auto flex w-full max-w-md items-center justify-between gap-x-6">
          <h5>Name</h5>
          <h5>Abbreviation</h5>
          <h5>Amount</h5>
        </div>

        <div className="flex items-center gap-x-6">
          <h5 className="font-semibold">Parent</h5>
          <div className="flex w-full items-center gap-x-6">
            <input
              readonly="readonly"
              disabled="disabled"
              type="text"
              min="0"
              name="name"
              value={parentUnit?.name}
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
            <input
              readonly="readonly"
              disabled="disabled"
              type="text"
              name="abbreviation"
              min="0"
              value={parentUnit?.abbreviation}
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
            <input
              readonly="readonly"
              disabled="disabled"
              type="number"
              name="amount"
              min="0"
              value={parentUnit?.amount}
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-x-6">
          <h5 className="font-semibold">Child</h5>
          <div className="flex w-full items-center gap-x-6">
            <input
              onChange={onChildChange}
              type="text"
              name="name"
              value={childUnit?.name}
              placeholder="Name e.g Gram"
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
            <input
              onChange={onChildChange}
              type="text"
              name="abbreviation"
              value={childUnit?.abbreviation}
              placeholder="Abbreviation e.g g"
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
            <input
              onChange={onChildChange}
              type="number"
              min="0"
              name="amount"
              value={childUnit?.amount}
              placeholder="Amount e.g 1000"
              className=" h-11 w-full rounded-lg border border-bgPurple px-6 placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-x-6">
          <button
            onClick={doCreateChildUnit}
            className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAddChildUnit}
            className="flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChildUnit;
