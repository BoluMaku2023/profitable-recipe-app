import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const [data, setData] = useState();

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const handleVerify = async () => {
    const response = await fetch(
      `https://backend-theprofittable2022.koyeb.app/api/v1/access/verify-email?email=${email}&token=${token}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));

    if (response?.ok) {
      console.log("Email verified successfully!");
    } else {
      console.log("Email verification failed.");
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-ghostWhite">
      <div>
        {email ? (
          ""
        ) : (
          <>
            <div className="flex flex-col items-center">
              <Icon
                icon={
                  email ? "material-symbols:check-circle" : "ic:baseline-error"
                }
                width="80"
                height="80"
                className={email ? "text-bgPurple" : "text-red"}
              />
              <p>{email ? "User is" : "User is not"} verified</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
