import { useState } from "react";
import { CREATE_UNITS_URL } from "../../utils/api.endpoints";
import { postRequest } from "../../utils/api.requests";
import { AppContext } from "../../pages/AppContext";
import { getBaseUnits } from "../../utils/helper";
import { toast } from "react-toastify";

const AddUnit = ({ closeAddUnit, getUnits, baseUnits }) => {
  const appContext = AppContext();

  const [unit, setUnit] = useState({
    name: "",
    abbreviation: "",
    amount: 1000,
    isDefault: false,
    parent: null,
    isBase: true,
  });

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "parent") {
      if (value != "none") {
        //we are setting a base for this unit, which means this unit is NOT a base unit that the user wants to add
        const foundBaseUnit = baseUnits
          .filter((aBaseUnit) => aBaseUnit?.abbreviation === value)
          .shift();

        //We need to know if the base we are setting is a default one or one added by the user
        if (foundBaseUnit?.isDefault) {
          //its a default base unit so we use abbreviation
          setUnit({
            ...unit,
            parent: foundBaseUnit?.abbreviation,
            isBase: false,
          });
        } else {
          //its NOT a default base unit so we use _id
          setUnit({ ...unit, parent: foundBaseUnit?._id, isBase: false });
        }
      } else {
        setUnit({ ...unit, parent: null, isBase: true });
      }
    } else {
      setUnit({ ...unit, [name]: value });
    }
  };

  const doCreateUnit = async () => {
    appContext.setBlockingLoading(true);

    console.log(unit);

    // if (!!unit?.name && !!unit?.abbreviation && !!unit?.amount) {
    //   allUnits.push(childUnit);
    // }

    // if (!isBase && !parent) {
    //   appContext.setMessage({
    //     visible: true,
    //     message: "Either add unit to base or make unit base unit",
    //     title: "Units Not Saved",
    //     type: "INFO",
    //   });
    //   return;
    // }

    try {
      let result = await postRequest(CREATE_UNITS_URL, { unit });

      if (!!result) {
        getUnits();
        closeAddUnit();
      }

      appContext.setBlockingLoading(false);
    } catch (err) {
      console.log(err);
      appContext.setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message:
          "An error occurred saving units. Please make sure the unit does not exist",
        title: "Units Not Saved",
        type: "ERROR",
      });
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-40 flex  items-center justify-center bg-secondary/50 px-8">
      <div className=" flex h-auto max-w-[500px] flex-col overflow-y-auto rounded-lg bg-primary p-6 shadow-lg">
        <h3 className="text-xl font-bold text-bgPurple">Add Unit</h3>
        <h6 className="my-4">Only the parent unit is required</h6>

        <div className="mb-8 flex items-center gap-x-6">
          <h5 className="font-semibold"> Base</h5>
          <select
            onChange={onChange}
            name="parent"
            className="flex h-12 max-h-12 w-full items-center justify-center rounded-md border border-bgPurple px-3 text-sm text-bgPurple focus:border-dogwoodRose focus:outline-none"
          >
            <option value="none">None</option>
            {baseUnits.map((aBaseUnit) => {
              return (
                <option value={aBaseUnit?.abbreviation}>
                  {aBaseUnit?.name} ({aBaseUnit?.abbreviation})
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex w-full items-center justify-between gap-x-6">
          <h5 className="font-semibold">Unit</h5>
          <div className="flex w-full items-center gap-6">
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={unit?.name}
              placeholder="Name - e.g Gram"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
            <input
              onChange={onChange}
              type="text"
              name="abbreviation"
              value={unit?.abbreviation}
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
            <input
              onChange={onChange}
              type="number"
              name="amount"
              value={unit?.amount}
              placeholder="Amount - e.g 1000"
              className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
            />
          </div>
        </div>

        <div className=" mt-6 flex items-center">
          <button
            onClick={doCreateUnit}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={closeAddUnit}
            className=" ml-4 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;

/*
    <div className={styles.addUnitRowHeader}>
        <h5 style={{width: "16%"}}></h5>
        <h5 className="addUnitRowItem">Name</h5>
        <h5 className="addUnitRowItem">Abbreviation</h5>
        <h5 className="addUnitRowItem">Amount</h5>
    </div>  
*/
