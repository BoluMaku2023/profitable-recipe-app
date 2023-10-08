import { useState } from "react";
import ChangePassword from "./changepassword";
import { EDIT_PROFILE_URL } from "../../utils/api.endpoints";
import { putRequest } from "../../utils/api.requests";
import { emailRegex, stringRegex, phoneNumberRegex } from "../../utils/helper";
import { AppContext } from "../../pages/AppContext";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { Icon } from "@iconify/react";
import DeleteAccount from "./deleteAccount";
import Language from "./language";
import Timezone from "./timezone";
import BlockingLoadingComponent from "../general/blockingloading";

const Auth = new AuthHelperMethods();

const AccountIndex = () => {
  const appContext = AppContext();
  const [blockingLoading, setBlockingLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const user = Auth.getAdmin();
  const [profile, setProfile] = useState({
    email: user.email,
    password: "",
    phone_number: user.phone_number,
    firstname: user.firstname,
    lastname: user.lastname,
  });
  const switchIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const saveProfile = async () => {
    if (!emailRegex.test(profile.email)) {
      appContext.setMessage({
        visible: true,
        message: "Please enter a valid email address",
        title: "Message",
        type: "ERROR",
      });
      return;
    }

    if (!phoneNumberRegex.test(profile.phone_number)) {
      appContext.setMessage({
        visible: true,
        message: "Please enter a valid phone number",
        title: "Message",
        type: "ERROR",
      });
      return;
    }

    if (!stringRegex.test(profile.firstname)) {
      appContext.setMessage({
        visible: true,
        message: "Please enter a valid first name",
        title: "Message",
        type: "ERROR",
      });
      return;
    }

    if (!stringRegex.test(profile.lastname)) {
      appContext.setMessage({
        visible: true,
        message: "Please enter a valid last name",
        title: "Message",
        type: "ERROR",
      });
      return;
    }

    try {
      setBlockingLoading(true);

      const response = await putRequest(EDIT_PROFILE_URL, profile);

      console.log(response.data);

      setBlockingLoading(false);
    } catch (err) {
      setBlockingLoading(false);
      appContext.setMessage({
        visible: true,
        message: "An error occurred updating your profile",
        title: "Message",
        type: "ERROR",
      });
    }
  };

  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="mt-20 h-full py-12 px-8 xl:mt-0 xl:ml-64 xl:p-14">
      <BlockingLoadingComponent visible={blockingLoading} />
      <div className=" mt-10 flex items-center">
        <Icon
          icon="material-symbols:account-circle"
          className=" h-auto w-16 rounded-lg bg-bgPurple p-3 text-primary"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">
            <span className="block text-3xl font-bold">Accounts</span>
          </h2>
        </div>
      </div>
      {/* container */}
      <div className="mt-20 flex flex-col">
        <div className="flex h-auto max-w-2xl flex-col rounded-lg bg-primary px-10 py-8 shadow-lg">
          <div>
            <h4 className="mb-4 font-semibold">Email</h4>
            {isEdit ? (
              <input
                onChange={onChange}
                type="email"
                name="email"
                value={profile.email}
                placeholder="Enter email"
                className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            ) : (
              <div>
                <h3>{profile.email}</h3>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h4 className="mb-4 font-semibold">Phone Number</h4>
            {isEdit ? (
              <input
                onChange={onChange}
                value={profile.phone_number}
                type="phone"
                name="phone_number"
                placeholder="Enter phone number"
                className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            ) : (
              <h5>{profile.phone_number}</h5>
            )}
          </div>
          <div className="mt-4">
            <h4 className="mb-4 font-semibold">First Name</h4>
            {isEdit ? (
              <input
                onChange={onChange}
                value={profile.firstname}
                type="text"
                name="firstname"
                placeholder="First Name"
                className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            ) : (
              <h5>{profile.firstname}</h5>
            )}
          </div>

          <div className="mt-4">
            <h4 className="mb-4 font-semibold">Last Name</h4>
            {isEdit ? (
              <input
                onChange={onChange}
                value={profile.lastname}
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="h-11 w-full rounded-lg border border-bgPurple px-3 outline-none placeholder:text-xs focus:border-dogwoodRose"
              />
            ) : (
              <h5>{profile.lastname}</h5>
            )}
          </div>
          <div className=" mt-7 flex items-center ">
            {isEdit ? (
              <button
                onClick={saveProfile}
                className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
              >
                Save
              </button>
            ) : null}
            {/* edit account btn */}
            <div className=" flex items-center">
              {isEdit ? (
                <button
                  onClick={switchIsEdit}
                  className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={switchIsEdit}
                  className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        <ChangePassword />
        <DeleteAccount />
        <Language />
        <Timezone />
      </div>
    </div>
  );
};

export default AccountIndex;
