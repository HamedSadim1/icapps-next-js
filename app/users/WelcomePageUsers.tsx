"use client";
import {
  usePrefetchData,
  usePrefetchStagairDetails,
} from "@/hooks/usePrefetchData";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useStagairs from "@/hooks/useStagairs";

const WelcomePageUsers = () => {
  const { prefetchData } = usePrefetchData();
  const { data: stagairs } = useStagairs();
  const { data: session } = useSession();
  const stagair = stagairs?.find(
    (stagair) => stagair.email === session?.user?.email
  );
  const   stagairDetail  = usePrefetchStagairDetails();

  useEffect(() => {
    prefetchData();
    if(stagair && stagair.id){
      stagairDetail.prefetchData(stagair.id);
    }
  },[
    prefetchData,
    stagair,
    stagairDetail,
  ] );
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Welcome </h1>
      </div>
    </div>
  );
};

export default WelcomePageUsers;
