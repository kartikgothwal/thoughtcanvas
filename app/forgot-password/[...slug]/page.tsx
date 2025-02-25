import React from "react";
import ResetPassword from "./PasswordReset";

const page = async ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  const { slug } = await params;
  return <ResetPassword slug={slug} />;
};

export default page;
