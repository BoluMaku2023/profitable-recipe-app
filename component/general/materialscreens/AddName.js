import { useState } from "react";

const AddName = ({ setName, moveCurrentUI, closeAddMaterial }) => {
  const [name, setAName] = useState("");

  function onChange(e) {
    const value = e.target.value;

    setAName(value);
  }

  const continueClicked = () => {
    if (name.length > 0) {
      setName(name);
      moveCurrentUI(2);
    }
  };

  return (
    <div className="relative flex w-[400px] flex-col gap-y-5 rounded-lg bg-primary py-9 px-6 shadow-lg">
      <h4 className="absolute right-6 top-3 text-sm text-dogwoodRose">
        Step 1/4
      </h4>
      <h3 className="font-semibold">What is the name of this material?</h3>
      <input
        onChange={onChange}
        type="text"
        name="name"
        value={name}
        placeholder="Enter name"
        className=" h-11 rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
      />
      <div className="flex items-center">
        <button
          onClick={continueClicked}
          className=" flex max-h-11 w-24 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
        >
          Continue
        </button>
        <button
          onClick={closeAddMaterial}
          className=" ml-6 flex max-h-11 w-24 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddName;
