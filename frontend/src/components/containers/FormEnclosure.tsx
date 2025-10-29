import React from "react";

interface Props {
  children: React.ReactNode;
}

function FormEnclosure({ children }: Props) {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
}

export default FormEnclosure;
