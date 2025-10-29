import FormEnclosure from "@/components/containers/FormEnclosure";
import { SignupForm } from "@/components/signup-form";
import React from "react";

function Register() {
  return (
    <FormEnclosure>
      <SignupForm className="lg:w-2/6 md:w-1/2 max-[520px]:w-11/12 w-8/12 gap-2" />
    </FormEnclosure>
  );
}

export default Register;
