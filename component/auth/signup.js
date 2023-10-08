import Link from "next/link";
import { AppContext } from "../../pages/AppContext";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { FaRegEye, FaRegEyeSlash, FaUser, FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
const Auth = new AuthHelperMethods();

const SignUp = () => {
  const value = AppContext();
  const router = useRouter();
  const [resError, setResError] = useState("");

  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userData, setUserData] = useState(initialState);

  const [isInput, setIsInput] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });

  const hideValidInput = () => {
    setIsInput(false);
  };
  const hideValidName = () => {
    setIsName(false);
  };
  const hideValidPassword = () => {
    setIsPassword(false);
  };
  const hideValidNumber = () => {
    setIsNumber(false);
  };
  const hideValidEmail = () => {
    setIsEmail(false);
  };
  const hideConfirmPassword = () => {
    setConfirmPassword(false);
  };

  const showValidInput = () => {
    setIsInput(true);
  };
  const showValidName = () => {
    setIsName(true);
  };
  const showValidPassword = () => {
    setIsPassword(true);
  };
  const showValidNumber = () => {
    setIsNumber(true);
  };
  const showValidEmail = () => {
    setIsEmail(true);
  };
  const showConfirmPassword = () => {
    setConfirmPassword(true);
  };

  const doSignUpAndNavigate = async () => {
    hideValidInput();

    hideValidName();

    hideValidEmail();

    hideValidPassword();

    hideValidNumber();

    hideConfirmPassword();

    let flnRegex = /^[a-zA-Z\-]+$/;

    let eRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let nRegex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

    let pRegex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,100}$/;

    try {
      if (
        userData.firstName === "" ||
        userData.lastName === "" ||
        userData.phoneNumber === "" ||
        userData.email === "" ||
        userData.password === "" ||
        userData.confirmPassword === ""
      ) {
        showValidInput();
      } else if (
        !flnRegex.test(userData.firstName) ||
        !flnRegex.test(userData.lastName)
      ) {
        showValidName();
      } else if (!eRegex.test(userData.email)) {
        showValidEmail();
      } else if (!nRegex.test(userData.phoneNumber)) {
        showValidNumber();
      } else if (!pRegex.test(userData.password)) {
        showValidPassword();
      } else if (!(userData.password === userData.confirmPassword)) {
        showConfirmPassword();
      } else {
        value.setBlockingLoading(true);

        const data = await Auth.signup(userData);

        value.setBlockingLoading(false);

        console.log(data);

        if (data?.data?.message === "Account creation successful") {
          toast.success(data?.data?.message);
          router.push("/dashboard");
        } else {
          toast.error("Email or Phone number already exist");
        }

        value.setBlockingLoading(false);
      }
    } catch (err) {
      value.setBlockingLoading(false);
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Profitable | Signup</title>
      </Head>
      <div className="flex h-screen">
        {/* left section */}
        <div className="bg-bg-center hidden h-full bg-bg-sigup bg-cover bg-no-repeat lg:block lg:w-1/2 xl:w-1/2"></div>
        {/* singup content */}
        <div className="flex w-full items-center justify-center bg-ghostWhite lg:w-full lg:p-3 xl:w-3/5 xl:p-52">
          <div className="mx-auto w-4/5">
            <h2 className="mb-16 text-2xl font-extrabold">SignUp</h2>
            <div className="flex items-center gap-x-4">
              {/* firstname */}
              <div className="w-full">
                <h4 className="mb-6 font-semibold">Firstname</h4>
                <div>
                  <input
                    className="h-14 w-full border  border-bgPurple bg-platinum  px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
                    type="text"
                    value={userData.firstName}
                    name="firstName"
                    placeholder="Enter Firstname"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              {/*lastname  */}
              <div className="w-full">
                <h4 className="mb-6 font-semibold">Lastname</h4>
                <div>
                  <input
                    className="x-4 h-14 w-full border border-bgPurple  bg-platinum placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
                    type="text"
                    value={userData.lastName}
                    name="lastName"
                    placeholder="Enter Lastname"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </div>
            {/* section_2 */}
            <div className="my-5 flex items-center gap-x-4">
              {/* email */}
              <div className="w-full">
                <h4 className="mb-6 font-semibold">Email</h4>
                <div className="flex">
                  <input
                    className="h-14 w-full border border-bgPurple bg-platinum  px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
                    type="email"
                    value={userData.email}
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              {/* phone_number */}
              <div className="w-full">
                <h4 className="mb-6 font-semibold">Phone No.</h4>
                <div className="flex">
                  <input
                    className="h-14 w-full border  border-bgPurple bg-platinum  px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
                    type="tel"
                    value={userData.phoneNumber}
                    name="phoneNumber"
                    placeholder="Enter Phone No."
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            </div>
            {/* section_3 */}
            <div className="my-5 flex items-center gap-x-4">
              <div className="w-full">
                <h4 className="mb-6 font-semibold">Password</h4>
                <div className="relative flex items-center">
                  <input
                    className="h-14 w-full border  border-bgPurple bg-platinum  px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none "
                    value={userData.password}
                    type={`${showPassword.password ? "text" : "password"}`}
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChangeInput}
                  />
                  <span
                    className="absolute right-4"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                  >
                    {showPassword.password ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>

              <div className="w-full">
                <h4 className="mb-6 font-semibold">Confirm Password</h4>
                <div className="relative flex items-center">
                  <input
                    className="h-14 w-full border  border-bgPurple bg-platinum  px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none "
                    value={userData.confirmPassword}
                    type={`${showPassword.cpassword ? "text" : "password"}`}
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    onChange={handleChangeInput}
                  />
                  <span
                    className="absolute right-4"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        cpassword: !showPassword.cpassword,
                      })
                    }
                  >
                    {showPassword.cpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={doSignUpAndNavigate}
              className=" my-4 w-full rounded-lg bg-btnBg p-4 text-primary transition hover:bg-darkerPurple"
            >
              Sign Up
            </button>
            <div className="text-dogwoodRose">
              {isInput && <h5>An input field cannot be empty.</h5>}
              {isName && <h5>A user's name can only contain letters.</h5>}
              {isEmail && <h5>Invalid email address.</h5>}
              {isNumber && <h5>Invalid phone number.</h5>}
              {isPassword && (
                <h5>
                  Password length must be at least up to 8 to 16 characters that
                  includes lower and uppercase letters, numbers and special
                  characters.
                </h5>
              )}
              {confirmPassword && <h5>Password does not match.</h5>}
            </div>

            {resError && <div className="mt-2 flex text-red">{resError}</div>}

            <h5 className="my-8">
              Already have an account?{" "}
              <span className="link">
                <Link
                  className="font-semibold text-darkerPurple underline"
                  href="/signin"
                >
                  Login
                </Link>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
