import Image from "next/image";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { useState } from "react";

const Auth = new AuthHelperMethods();

const User = () => {
  const user = Auth.getAdmin();

  const [profile, setProfile] = useState({
    email: user.email,
    firstname: user.firstName,
  });

  return (
    <div className="hidden w-full lg:flex text-base text-primary xl:block">
      <div className=" mt-4 flex w-full items-center gap-4 p-4">
        <div>
          <Image
            src="/images/avatar.png"
            width={70}
            height={70}
            alt="avatar"
            className="block border-2 border-darkPurple rounded-full"
          />
        </div>
        <div className="">
          <h3 className="text-base capitalize text-secondary">
            {profile.firstname}
          </h3>
          <p className=" mt-1 text-sm text-spaceCadet/50">{profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
