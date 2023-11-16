"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { UserRole } from "@/types";
import Loading from "./Loading";
import useStagairs from "@/hooks/useStagairs";
import useUsers from "@/hooks/useUsers";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import usePostUser from "@/hooks/usePostUser";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";
import {
  usePrefetchData,
  usePrefetchStagairDetails,
} from "@/hooks/usePrefetchData";
import useStagairStore from "@/store";

const CustomLoginPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");
  const { data: stagairs } = useStagairs();
  const { data: users } = useUsers();
  const { prefetchData } = usePrefetchData();
  const router = useRouter();

  const { mutateAsync, isSuccess, data } = usePostUser(session!);
  const { role } = useCheckAuthorizeUser();

  const stagiairDetail = usePrefetchStagairDetails();
  console.log("Role:", role);
  console.log("Session Data:", session);
  console.log("Stagairs Data:", stagairs);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSuccess) {
          await mutateAsync();
          console.log("User successfully logged in. Mutating data...");

          // if (isSuccess) {
          //   // User is successfully logged in
          //   if (role === UserRole.STAGIAIR) {
          //     // If the user's role is Stagiair, redirect to the detail page
          //     if (stagairs && stagairs.length > 0) {
          //       const stagair = stagairs.find(
          //         (st) => st.email === session?.user?.email
          //       );
          //       if (stagair && stagair.id) {
          //         await prefetchData();
          //         await router.push(`/users/detail/${stagair.id}`);
          //       }
          //     }
          //   } else {
          //     await router.push("/users/stagiair");
          //   }
          // } else {

          //   setError("Er is iets misgegaan, probeer het later opnieuw");
          // }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Er is iets misgegaan, probeer het later opnieuw");
      }
    };
    const PrefetchData = async () => {
      try {
        await prefetchData();
        console.log("Prefetching data...");
      } catch (error) {
        console.error("Error in PrefetchData:", error);
      }
    };
    PrefetchData();
    fetchData();
  }, [
    session,
    stagairs,
    router,
    isSuccess,
    data,
    mutateAsync,
    role,
    prefetchData,
  ]);

  useEffect(() => {
    if (status === "authenticated" && role) {
      if (role === UserRole.STAGIAIR && stagairs && stagairs.length > 0) {
        const stagair = stagairs.find(
          (st) => st.email === session?.user?.email
        );
        const user = users?.find((u) => u.email === session?.user?.email);

        if (stagair && stagair.id && user) {
          useStagairStore.setState({ role: user.role });
          stagiairDetail.prefetchData(stagair.id);
          router.push(`/users/detail/${stagair.id}`);
          console.log("Navigating to:", `/users/detail/${stagair.id}`);
        }
      } else {
        router.push("/users/stagiair");
        console.log("Navigating to:", "/users/stagiair");
      }
    }
  }, [status, role, stagairs, session, router, stagiairDetail, users]);

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
                  <FcGoogle className="mr-2" />
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
