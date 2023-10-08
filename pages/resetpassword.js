import AuthIndex from "../component/auth/index";
import withNoAuth from "../utils/withNoAuth";
import Head from "next/head";

const ResetPassword = () => {
  return (
    <div>
      <Head>
        <title>Reset passowrd</title>
      </Head>
      <AuthIndex page={"resetpassword"} />
    </div>
  );
};

export default withNoAuth(ResetPassword);
