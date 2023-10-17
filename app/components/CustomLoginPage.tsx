"use client";
import useUsers from "@/hooks/useUsers";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserRole } from "@/types";
import Loading from "./Loading";

const CustomLoginPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");
  const { data: users } = useUsers();

  useEffect(() => {
    async function fetchData() {
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
              img: session.user!.image,
            }),
          });

          if (res.ok) {
            if (session && session.user && session.user.email && users) {
              const user = users.find(
                (user) => user.email === session.user?.email
              );

              if (user && user.role === UserRole.STAGIAIR) {
                window.location.href = "/users/detail";
              } else {
                window.location.href = "/users/stagiair";
              }
            }
          }
          // fetchData();
          // } else {
          //   setError("Je kan enkel inloggen met je icapss e-mail adres");
          // }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Er is iets misgegaan, probeer het later opnieuw");
        return;
      }
    }

    fetchData();
  }, [status, session, users]);

  const handleSignin = () => {
    signIn("google");
  };

  return (
    <>
      {status === "loading" && <Loading />}
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
