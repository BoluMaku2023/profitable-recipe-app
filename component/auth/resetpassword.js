import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../pages/AppContext";
import LogoText from "../general/logotext";

const ResetPassword = () => {
  const initialState = { password: "", confirm_password: "" };
  const value = AppContext();
  const [userData, setUserData] = useState(initialState);
  const [isInput, setIsInput] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [emails, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState();

  const router = useRouter();

  const { email, token } = router.query;

  console.log(email);
  console.log(token);

  const data = JSON.stringify({
    email: email,
    password: userData.password,
    confirmPassword: userData.confirm_password,
    token: token,
  });

  const handleReset = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://backend-theprofittable2022.koyeb.app/api/v1/access/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    )
      .then((response) => response.text())
      .then((result) => {
        setIsSuccess(result);
        router.push("/signin")
      })
      .catch((error) => console.log("error", error));

    if (response?.ok) {
      console.log("Email verified successfully!");
    } else {
      console.log("Email verification failed.");
    }
  };

  // useEffect(() => {
  //   handleReset();
  // });

  const showValidInput = () => {
    setIsInput(true);
  };

  const hideValidInput = () => {
    setIsInput(false);
  };

  const showValidPassword = () => {
    setIsPassword(true);
  };

  const hideValidPassword = () => {
    setIsPassword(false);
  };

  const showConfirmPassword = () => {
    setConfirmPassword(true);
  };

  const hideConfirmPassword = () => {
    setConfirmPassword(false);
  };

  const doResetPassword = async (e) => {
    e.preventDefault();
    //     hideValidInput();

    //     hideValidPassword();

    //     hideConfirmPassword();

    //     value.setBlockingLoading(true);

    //     let pRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/;

    //     try {
    //       if (userData.password === "" || userData.confirm_password === "") {
    //         showValidInput();
    //         value.setBlockingLoading(false);
    //       } else if (!pRegex.test(userData.password)) {
    //         showValidPassword();
    //         value.setBlockingLoading(false);
    //       } else if (!(userData.password === userData.confirm_password)) {
    //         showConfirmPassword();
    //         value.setBlockingLoading(false);
    //       } else {
    //         router.push("./signin");

    //         value.setBlockingLoading(false);
    //       }
    //     } catch (err) {
    //       value.setBlockingLoading(false);
    //       console.log(err);
    //     }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-darkPurple">
      <form
        className="flex w-full max-w-md flex-col gap-4"
        onSubmit={handleReset}
      >
        <div className="w-full">
          <LogoText width={50} height={50} cssStyles=" text-bgYellow text-lg" />
          <h2 className="mt-6 text-2xl font-bold text-ghostWhite">
            Reset Password
          </h2>
          <div>
            {isInput && <h5>An input field cannot be empty.</h5>}
            {isPassword && (
              <h5>
                Password length must be at
                <br />
                least up to 8 to 16 with numbers.
              </h5>
            )}
            {confirmPassword && <h5>Password does not match.</h5>}
          </div>
        </div>

        <div className="w-full">
          <label
            className="text-sm font-medium lowercase text-ghostWhite"
            htmlFor="newpassword"
          >
            Enter New Password
          </label>
          <input
            value={userData.password}
            id="newpassword"
            type="password"
            name="password"
            className=" h-14 w-full border border-bgPurple px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
            placeholder="Enter password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="w-full">
          <label
            className="text-sm font-medium lowercase text-ghostWhite"
            htmlFor="confirmpassword"
          >
            Confirm New Password
          </label>
          <input
            value={userData.confirm_password}
            type="password"
            id="confirmpassword"
            name="confirm_password"
            className=" h-14 w-full border border-bgPurple px-4 placeholder:text-xs focus:border-dogwoodRose
			  focus:outline-none"
            placeholder="Enter password again"
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="bg-xiketic text-ghostWhite">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
