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

  useEffect(() => {
    // const user = users?.find((user) => user.email === session?.user?.email);
    const stagair = stagairs?.find(
      (stagair) => stagair.email === session?.user?.email
    );

    prefetchData();
    if (stagair && stagair.id) {
      stagiairDetail.prefetchData(stagair.id);
    }
    const fetchData = async () => {
      try {
        if (isSuccess) {
          // const res = await fetch("http://localhost:3000/api/users", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     name: session!.user!.name,
          //     email: session!.user!.email,
          //     img: session!.user!.image,
          //   }),
          // });

          await mutateAsync();

          if (isSuccess) {
            // const data = await res.json();
            // console.log(data);

            if (role === UserRole.STAGIAIR) {
              router.push("/users/detail/" + stagair?.id);
            } else {
              router.push("/users/stagiair");
            }
          } else {
            console.error("Error in API request:");
            setError("Er is iets misgegaan, probeer het later opnieuw");
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        // setError("Er is iets misgegaan, probeer het later opnieuw");
      }
    };

    if (role && stagair) {
      if (role === UserRole.STAGIAIR) {
        router.push("/users/detail/" + stagair.id);
      } else {
        router.push("/users/stagiair");
      }
    }
    fetchData();
  }, [
    session,
    stagairs,
    router,
    users,
    isSuccess,
    data,
    mutateAsync,
    role,
    prefetchData,
    stagiairDetail,
  ]);

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
