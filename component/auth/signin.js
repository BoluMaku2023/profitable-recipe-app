import Link from "next/link";
import { useRouter } from "next/router";
import { AppContext } from "../../pages/AppContext";
import AuthHelperMethods from "../../utils/AuthHelperMethods";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";

const Auth = new AuthHelperMethods();

const Signin = () => {
  const initialState = { email: "", password: "" };
  const value = AppContext();
  const [userData, setUserData] = useState(initialState);
  const [isInput, setIsInput] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isUnfound, setIsUnfound] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const showValidPassword = () => {
    setIsPassword(true);
  };

  const hideValidPassword = () => {
    setIsPassword(false);
  };

  const showValidUser = () => {
    setIsUnfound(true);
  };

  const hideValidUser = () => {
    setIsUnfound(false);
  };

  const showWrongPassword = () => {
    setIsWrong(true);
  };

  const hideWrongPassword = () => {
    setIsWrong(false);
  };

  const doSignInAndNavigate = async () => {
    hideValidInput();
    hideValidEmail();
    hideValidPassword();
    hideValidUser();
    hideWrongPassword();
    let eRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (userData.email === "" || userData.password === "") {
        showValidInput();
        return;
      } else if (!eRegex.test(userData.email)) {
        showValidEmail();
      } else {
        value.setBlockingLoading(true);

        const res = await Auth.login(userData.email, userData.password);

        console.log(res);

        res?.data?.msg === "not_found" || res === "error"
          ? showValidUser()
          : res.msg === "wrong_password"
          ? showWrongPassword()
          : router.push("/dashboard");

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
      <div className="flex h-screen">
        {/* plain div */}
        <div className="hidden h-full bg-bg-pexel bg-cover bg-center bg-no-repeat lg:block lg:w-1/2 xl:w-1/2"></div>
        <div className="flex w-full items-center justify-center bg-ghostWhite lg:w-full lg:p-3 xl:w-3/5 xl:p-52 ">
          {/* content_wrapper */}
          <div className="mx-auto w-4/5">
            <h2 className="mb-16 text-2xl font-extrabold">Login</h2>
            <div className="my-8">
              <h4 className="mb-6 font-semibold">Email</h4>
              <div className=" relative flex items-center ">
                <input
                  className="h-14 w-full border border-bgPurple bg-platinum  px-4 outline-none placeholder:text-xs
			  focus:border-dogwoodRose focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={userData.email}
                  onChange={handleChangeInput}
                />
                <span className="absolute right-0 flex h-14 w-12 cursor-pointer items-center justify-center rounded-r-lg bg-bgPurple/5 ">
                  <FaUser className="text-btnBg" />
                </span>
              </div>
            </div>

            <div className="my-8">
              <h4 className="mb-6 font-semibold">Password</h4>
              <div className="relative flex items-center">
                <input
                  className=" h-14 w-full border border-bgPurple  bg-platinum px-4 outline-none
			  placeholder:text-xs focus:border-dogwoodRose focus:outline-none"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter password"
                  value={userData.password}
                  onChange={handleChangeInput}
                />
                <span
                  className="absolute right-0 flex h-14 w-12 cursor-pointer items-center justify-center rounded-r-lg bg-bgPurple/5 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className=" text-btnBg" />
                  ) : (
                    <FaRegEyeSlash className=" text-btnBg" />
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={doSignInAndNavigate}
              className=" my-4 w-full rounded-lg bg-btnBg p-4 text-primary transition-colors ease-in-out hover:bg-darkerPurple"
            >
              Sign In
            </button>

            <div className="flex text-red">
              {isInput && <h5>An input field cannot be empty.</h5>}
              {isEmail && <h5>Invalid email address.</h5>}
              {isPassword && (
                <h5>
                  Password length must be at least up to 8 to 16 characters that
                  includes lower and uppercase letters, numbers and special
                  characters.
                </h5>
              )}
              {isUnfound && (
                <h5>
                  We could not find your user details.
                  <br />
                  Please sign up.
                </h5>
              )}
              {isWrong && <h5>Please check the password you entered.</h5>}
            </div>

            <div className="my-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <h5>
                Dont have an account?
                <span className="link ml-3">
                  <Link
                    href="/signup"
                    className="font-semibold text-darkerPurple underline"
                  >
                    Signup
                  </Link>
                </span>
              </h5>

              <h5 className=" mt-6 sm:m-0">
                <Link href="/forgotpassword">Forgot Password?</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
