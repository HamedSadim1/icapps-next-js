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
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";

interface Props {
  lang: string
}

const CustomLoginPage = ({lang}:Props) => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");
  const { data: stagairs } = useStagairs();
  const { data: users } = useUsers();
  const { prefetchData } = usePrefetchData();
  const translation = getTranslation(lang as Locale)
  const router = useRouter();

  const { mutate, isSuccess, data } = usePostUser();
  const { role } = useCheckAuthorizeUser();

  const stagiairDetail = usePrefetchStagairDetails();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
 
         mutate();
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
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Er is iets misgegaan, probeer het later opnieuw");
      }
    };
    // const PrefetchData = async () => {
    //   try {
    //     await prefetchData();
    //     console.log("Prefetching data...");
    //   } catch (error) {
    //     console.error("Error in PrefetchData:", error);
    //   }
    // };
    // PrefetchData();
    fetchData();
  }, [session, stagairs, router, isSuccess, data, mutate, role]);

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
          router.push(`http://localhost:3000/${lang}/detail/${stagair.id}`);

        }
      } else {
        router.push(`/${lang}`);
     
      }
    }
  }, [status, role, stagairs, session, router, stagiairDetail, users,lang]);

  const handleSignin = () => {
    signIn("google");
  };

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "unauthenticated" && (
        <div className="flex items-center justify-center w-full h-screen bg-[#E4E9F0]">
          <div className="flex flex-col items-center justify-center shadow-md xs:w-5/6 sm:w-4/6 md:w-3/6 xs:h-48 sm:h-3/6 xs:mb-80 sm:mb-0 bg-white">
            <h1 className="text-[#002548] font-bold tracking-widest leading-tight xs:text-3xl  sm:text-5xl xs:-mt-2 sm:mt-0">
              / CAPPS
            </h1>
            <h2 className="text-[#009AC7] font-nova font-semibold mt-3 xs:text-xl sm:text-3xl m-1">{translation.login.stagebegeleiding}</h2>

            <>
              <div className="bg-[#E4E9F0] rounded-lg xs: py-2 sm:py-4 px-6 xs: mt-5 sm:mt-12">
                <button
                  onClick={handleSignin}
                  className="xs:text-lg sm:text-2xl font-medium flex items-center"
                >
                  <FcGoogle className="mr-2" />
                  {translation.login.verdergaanmetgoogle}
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
