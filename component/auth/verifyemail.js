import { useRouter } from "next/router";
import React from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const { email, token } = router.query;
  return (
    <div className="flex flex-col bg-ghostWhite">
      <div>VerifyEmail</div>
    </div>
  );
};

export default VerifyEmail;
