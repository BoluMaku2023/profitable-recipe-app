import Link from "next/link";
import { AppContext } from "../../pages/AppContext";
import { useEffect, useState } from "react";
import LogoText from "../general/logotext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const initialState = { email: "", res: "" };

  const value = AppContext();
  const [userData, setUserData] = useState(initialState);
  const [isInput, setIsInput] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [message, setMessage] = useState();

  const router = useRouter();

  const showValidInput = () => {
    setIsInput(true);
  };

  const hideValidInput = () => {
    setIsInput(false);
  };

  const showValidEmail = () => {
    setIsEmail(true);
  };

  const hideValidEmail = () => {
    setIsEmail(false);
  };

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;

  //   setUserData({ ...userData, [name]: value });
  // };

  const doSignInAndNavigate = (e) => {
    e.preventDefault();
    // hideValidInput();
    // hideValidEmail();

    // let eRegex =
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // try {
    //   if (userData.email === "") {
    //     showValidInput();
    //     value.setBlockingLoading(false);
    //   } else if (!eRegex.test(userData.email)) {
    //     showValidEmail();
    //     value.setBlockingLoading(false);
    //   } else {
    //     console.log(userData.email);
    //     setUserData();
    //   }
    // } catch (err) {
    //   value.setBlockingLoading(false);
    // }

    console.log(userData.email);
    try {
      fetch(
        `https://backend-theprofittable2022.koyeb.app/api/v1/access/forgot-password?email=${userData.email}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setMessage(result);
          toast(message?.message);
          router.push("/signin");
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // doSignInAndNavigate();
  // }),
  //   [];

  return (
    <div className=" h-auto py-28">
      <div className=" m-auto h-36 w-96">
        <LogoText width={50} height={50} cssStyles=" text-bgYellow text-lg" />
        <div className=" my-24">
          <h3 className=" my-12 text-sm ">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </h3>
          <form onSubmit={doSignInAndNavigate}>
            <h4 className=" my-6 font-semibold">Email</h4>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
              className=" h-14 w-full border border-bgPurple px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
            />
            <div>
              <div className="my-3 text-xs text-dogwoodRose">
                {isInput && <h5>An input field cannot be empty.</h5>}
                {isEmail && <h5>Invalid email address.</h5>}
              </div>
            </div>
            <button
              type="submit"
              className=" mt-6 w-full bg-bgPurple font-bold text-primary hover:bg-darkPurple"
            >
              Send
            </button>
          </form>
          <h5 className=" mt-20 flex justify-center">
            Remember password?
            <span className=" ml-2 text-bgPurple">
              <Link href="/signin">Login</Link>
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
