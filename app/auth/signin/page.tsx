"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/users";
    }
  }, [status, session]);
  const handleSignin = () => {
    signIn("google");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#E4E9F0]">
      <div className="flex flex-col items-center justify-center w-3/6 h-3/6 bg-white">
        <h1 className="text-2xl font-bold tracking-tighter leading-tight md:text-6xl lg:text-6xl">
          / CAPPS
        </h1>
        <h2 className="text-cyan-500 m-1">Stage begeleiding</h2>

        <>
          <div className="bg-[#E4E9F0] rounded-lg shadow-md p-4 mt-5">
            <button
              onClick={handleSignin}
              className="text-2xl flex items-center"
            >
              Verdergaan met Google
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default LoginPage;
