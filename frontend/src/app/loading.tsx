import React from "react";

function MinimalLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="h-10 w-10 border-4 border-zinc-600 border-t-white rounded-full animate-spin" />
      <p className="mt-4 text-zinc-400 text-sm">Loading...</p>
    </div>
  );
}

export default MinimalLoader;
