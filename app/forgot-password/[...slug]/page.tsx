import React from "react";
import ResetPassword from "./PasswordReset";

const page = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const { slug } = params;
  return (
    <ResetPassword />
  );
};

export default page;
