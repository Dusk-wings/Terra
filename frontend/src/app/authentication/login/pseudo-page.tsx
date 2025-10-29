import FormEnclosure from "@/components/containers/FormEnclosure";
import { LoginForm } from "@/components/login-form";
import React from "react";

function Login() {
  return (
    <FormEnclosure>
      <LoginForm className="lg:w-2/6 md:w-1/2 max-[520px]:w-11/12 w-8/12 gap-2" />
    </FormEnclosure>
  );
}

export default Login;
