"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//!

const CustomLoginPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function postData() {
      try {
        if (session) {
          const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session.user!.name,
              email: session.user!.email,
            }),
          });
          const data = await res.json();
          console.log(data);
        }
      } catch (error) {
        console.error("Error CustomLoginPage:", error);
        setError("Er is iets misgegaan, probeer het later opnieuw");
        //! Handle  error message
      }
    }

    try {
      postData();

      if (session) {
        window.location.href = "/users/stagiair";
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      //! Handle  error message
    }
  }, [status, session]);

  const handleSignin = () => {
    signIn("google");
  };
  return (
    <>
      {status === "loading" && (
        <div
          role="status"
          className="flex items-center justify-center h-screen"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {status === "unauthenticated" && (
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
              {error && <p className="text-red-500">{error}</p>}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomLoginPage;
