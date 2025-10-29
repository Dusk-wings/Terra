import AuthenticationFrom from "@/components/authentication-form";
import FormEnclosure from "@/components/containers/FormEnclosure";
import AuthValidator from "@/components/validateAuthentication/Validate";
import React from "react";

async function Authentication() {
  return (
    <FormEnclosure>
      <AuthValidator />
      <AuthenticationFrom className="lg:w-2/6 md:w-1/2 max-[520px]:w-11/12 w-8/12 gap-6" />
    </FormEnclosure>
  );
}

export default Authentication;
