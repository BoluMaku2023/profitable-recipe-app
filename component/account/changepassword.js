import { useState } from "react";

const ChangePassword = ({ onPasswordChanged, onCancelClicked }) => {
  const [passwordDetails, setPasswordDetails] = useState({
    newPassword: "",
    newPasswordAgain: "",
    oldPassword: "",
  });

  const onchangeDetails = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  const onSubmitClicked = () => {};

  return (
    <div className="mt-12 h-auto max-w-2xl flex-col rounded-lg bg-primary px-10 py-8 shadow-lg">
      <div>
        <h3 className="mb-7 text-xl font-bold text-bgPurple">
          Change Password
        </h3>
        {/* old password */}
        <div className="mt-4">
          <h4 className="mb-4 font-semibold">Old Password</h4>
          <input
            onChange={onchangeDetails}
            type="password"
            name="oldPassword"
            value={passwordDetails.oldPassword}
            placeholder="Old Password"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>
        {/* new password */}
        <div className="mt-4">
          <h4 className="mb-4 font-semibold">New Password</h4>
          <input
            onChange={onchangeDetails}
            type="password"
            name="newPassword"
            value={passwordDetails.newPassword}
            placeholder="New Password"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>
        {/* confirm new password */}
        <div className="mt-4">
          <h4 className="mb-4 font-semibold">Confirm New Password</h4>
          <input
            onChange={onchangeDetails}
            type="password"
            name="newPasswordAgain"
            value={passwordDetails.newPasswordAgain}
            placeholder="New Password Again"
            className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
          />
        </div>

        <div className=" mt-7 flex items-center">
          <button
            onClick={onSubmitClicked}
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
          >
            Save
          </button>
          <button
            onClick={onCancelClicked}
            className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
