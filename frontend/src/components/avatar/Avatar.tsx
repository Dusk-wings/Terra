import Image from "next/image";
import React from "react";

interface Props {
  src?: string | null;
  alt?: string | null;
  email: string;
  userName?: string;
}

function Avatar({ src = null, alt = null, email, userName }: Props) {
  const colorSet: Record<string, string> = {
    A: "bg-gradient-to-r from-red-800 to-pink-700 text-white",
    B: "bg-gradient-to-r from-blue-800 to-indigo-700 text-white",
    C: "bg-gradient-to-r from-green-800 to-emerald-700 text-white",
    D: "bg-gradient-to-r from-yellow-800 to-orange-700 text-black",
    E: "bg-gradient-to-r from-purple-800 to-fuchsia-700 text-white",
    F: "bg-gradient-to-r from-teal-800 to-cyan-700 text-white",
    G: "bg-gradient-to-r from-pink-800 to-rose-700 text-white",
    H: "bg-gradient-to-r from-indigo-800 to-violet-700 text-white",
    I: "bg-gradient-to-r from-amber-800 to-yellow-700 text-black",
    J: "bg-gradient-to-r from-lime-800 to-green-700 text-black",
    K: "bg-gradient-to-r from-rose-800 to-pink-700 text-white",
    L: "bg-gradient-to-r from-cyan-800 to-sky-700 text-white",
    M: "bg-gradient-to-r from-fuchsia-800 to-purple-700 text-white",
    N: "bg-gradient-to-r from-emerald-800 to-teal-700 text-white",
    O: "bg-gradient-to-r from-orange-800 to-amber-700 text-black",
    P: "bg-gradient-to-r from-sky-800 to-blue-700 text-white",
    Q: "bg-gradient-to-r from-violet-800 to-indigo-700 text-white",
    R: "bg-gradient-to-r from-yellow-800 to-lime-700 text-black",
    S: "bg-gradient-to-r from-blue-800 to-cyan-700 text-white",
    T: "bg-gradient-to-r from-purple-800 to-pink-700 text-white",
    U: "bg-gradient-to-r from-green-800 to-lime-700 text-black",
    V: "bg-gradient-to-r from-rose-800 to-red-700 text-white",
    W: "bg-gradient-to-r from-indigo-800 to-blue-700 text-white",
    X: "bg-gradient-to-r from-amber-800 to-orange-700 text-black",
    Y: "bg-gradient-to-r from-teal-800 to-emerald-700 text-white",
    Z: "bg-gradient-to-r from-fuchsia-800 to-rose-700 text-white",
  };

  const key =
    userName && userName != ""
      ? userName.charAt(0).toLocaleUpperCase()
      : email.charAt(0).toUpperCase();
  const className = colorSet[key] || "bg-gray-800 text-white";

  return (
    <div className="hover:bg-green-900/30 p-1 rounded-full cursor-pointer select-auto">
      {src && alt ? (
        <Image
          src={src}
          alt={alt}
          height={50}
          width={50}
          className="w-10 h-10 rounded-full"
          title={email}
        />
      ) : (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${className}`}
          title={email}
        >
          <p className=" font-semibold ">
            {userName != "" && userName
              ? userName.charAt(0).toUpperCase()
              : email.charAt(0).toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}

export default Avatar;
