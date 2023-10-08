import AuthIndex from "../component/auth/index";
import withNoAuth from "../utils/withNoAuth";
import Message from "../component/general/message";
import { useState } from "react";
import Head from "next/head";

const SignIn = () => {
  const [message, setMessage] = useState({
    visible: false,
    message: "",
    title: "",
    type: "",
  });

  return (
    <div>
      <Head>
        <title>Profitable | Login</title>
      </Head>
      <AuthIndex message={message} setMessage={setMessage} page={"signin"} />

      {message.visible && <Message setMessage={setMessage} message={message} />}
    </div>
  );
};

export default withNoAuth(SignIn);
