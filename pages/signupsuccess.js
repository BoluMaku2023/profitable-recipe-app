import Head from "next/head";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const SignupSuccess = () => {
  const router = useRouter();

  const successSignupAndNavigate = async () => {
    router.push("/signin");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-ghostWhite px-7 text-center">
      <Head>
        <title>Success page</title>
      </Head>
      <di className="flex w-96 max-w-800 flex-col items-center rounded-lg px-12 py-8 shadow-lg lg:w-500">
        <div className=" text-aquaMarine">
          <h3 className=" flex items-center justify-center">
            <Icon icon="icon-park-outline:success" className="text-6xl" />
          </h3>

          <h1 className="text-2xl font-bold">Success</h1>
        </div>
        <div className="my-6">
          <h3>
            You have successfully signed up.
            <br />
            We sent you an email to the -----email address you entered.
          </h3>
          <h3 className="my-6">
            Please follow the link in the email to activate your account.
          </h3>
        </div>
        <button
          onClick={successSignupAndNavigate}
          className=" bg-aquaMarine/70 px-20 text-primary outline-none transition-colors ease-in-out hover:bg-aquaMarine"
        >
          Login
        </button>
      </di>
    </div>
  );
};

export default SignupSuccess;
