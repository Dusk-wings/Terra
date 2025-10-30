import React from "react";

function EditorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full  dark">
      {children}
    </div>
  );
}

export default EditorLayout;
