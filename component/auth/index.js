import Signin from "./signin";
import Signup from "./signup";
import ForgotPassword from "./forgotpassword";
import SignUpSuccess from "../../pages/signin";
import ResetPassword from "./resetpassword";
import VerifyEmail from "./verifyemail";

const AuthIndex = ({ page }) => {
  return (
    <div>
      {page == "signin" && <Signin />}

      {page == "signup" && <Signup />}

      {page == "forgotpassword" && <ForgotPassword />}

      {page == "signupsuccess" && <SignUpSuccess />}

      {page == "resetpassword" && <ResetPassword />}

      {page == "verifyemail" && <VerifyEmail />}
    </div>
  );
};

export default AuthIndex;
