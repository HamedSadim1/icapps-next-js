"use client";
import useStagairs from "@/hooks/useStagairs";
import { formatDate } from "@/lib";
import useStagairStore from "@/store";
import { BsPencil } from "react-icons/bs";
import StagairForm from "../stagiair/[id]/StagairForm";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
import { usePrefetchStagairDetails } from "@/hooks/usePrefetchData";
import { useEffect, useMemo, useState } from "react";
import AuthorizedRole from "@/app/components/AuthorizedRole";
import { UserRole } from "@/types";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";
import SearchStagiair from "./SearchStagiair";
import useOneSignalNotification from "@/hooks/useOneSignalNotification";
import Pagination from "@/app/components/Pagination";

const StagiairOverzicht = () => {
  const { data: stagiairData, error, isLoading } = useStagairs();
  const setIsModelOpen = useStagairStore((state) => state.toggleModal);
  const role = useStagairStore((s) => s.role);
  const router = useRouter();
  const auth = useCheckAuthorizeUser();
  const [searchStagiair, setsearchStagiair] = useState<string>("");
  //? send notification
  useOneSignalNotification();

  const [currentPage, setCurrentPage] = useState(1);
  const [emailPerPage, setEmailPerPage] = useState(10);
  //? get last email
  const indexOfLastEmail = currentPage * emailPerPage;
  //? get first email
  const indexOfFirstEmail = indexOfLastEmail - emailPerPage;
  //? get current emails
  const currentEmails = stagiairData?.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );
  //? change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // ? filter data based on search
  const filteredStagiair = useMemo(() => {
    const searchTerm =
      searchStagiair.toLowerCase().length > 3
        ? currentEmails?.filter((item) =>
            item.name.toLowerCase().includes(searchStagiair.toLowerCase())
          )
        : currentEmails;

    return searchTerm;
  }, [searchStagiair, currentEmails]);

  //? if the role is stagebegeleider, show only stagiair that are assigned to the stagebegeleider make a new array with stagiair that are assigned to the stagebegeleider
  const stagiairAssignedToStagebegeleider =
    role === UserRole.STAGEBEGELEIDER
      ? filteredStagiair?.filter((stagiair) =>
          stagiair.stagebegeleider.map(
            (stagebegeleider) => stagebegeleider.name
          )
        )
      : filteredStagiair;

  const prefetchStagairDetails = usePrefetchStagairDetails();

  useEffect(() => {
    //? prefetch stagiair details
    // if (stagiairData && stagiairData.length > 0 && auth.role)
    //   stagiairData.map((stagiair) => {
    //     router.prefetch(`/detail/${stagiair.id}`);
    //     prefetchStagairDetails.prefetchData(stagiair.id);
    //   });
    //? set role in store
    useStagairStore.setState({ role: auth.role });

    //? if user is stagiair redirect to detail page
    if (role === UserRole.STAGIAIR) {
      stagiairData?.map((stagiair) => {
        if (stagiair.email === auth.userEmail) {
          router.replace(`/detail/${stagiair.id}`);
        }
      });
    }
  }, [
    stagiairData,
    prefetchStagairDetails,
    router,
    auth.role,
    auth.userEmail,
    role,
  ]);

  if (error) {
    return <div>{error?.message}</div>;
  }
  if (isLoading || !role) {
    return <Loading />;
  }

  if (!stagiairData || stagiairData.length === 0) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen w-full">
        No stagebegeleiders found.
      </div>
    );
  }

  const handleRouter = (id: string) => {
    // Prefetch the route in the background
    router.prefetch(`/detail/${id}`);
    prefetchStagairDetails.prefetchData(id);
    // Navigate to the route when clicked
    router.push(`/detail/${id}`);
  };

  return (
    <section className="container mx-auto p-4">
      <AuthorizedRole
        role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
        userRole={role}
      >
        <SearchStagiair search={searchStagiair} setSearch={setsearchStagiair} />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-12">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Naam</th>
                <th className="px-6 py-3 text-left">E-mail</th>
                <th className="px-6 py-3 text-left">Startdatum</th>
                <th className="px-6 py-3 text-left">Einddatum</th>
                <th className="px-6 py-3 text-left">Stagebegeleider(s)</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredStagiair?.map((stagiair) => (
                <tr
                  key={stagiair.id}
                  className="hover:bg-blue-100 cursor-pointer"
                >
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.name}
                  </td>

                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.email}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {formatDate(stagiair.startDate)}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {formatDate(stagiair.endDate)}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.stagebegeleider
                      .map((stagebegeleider) => stagebegeleider.name)
                      .join(",")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setIsModelOpen();
                        useStagairStore.setState({ stagairId: stagiair.id });
                        useStagairStore.setState({ stagaires: stagiair });
                      }}
                      className="hover:text-blue-500 focus:outline-none"
                    >
                      <BsPencil className="text-lg" />
                    </button>
                    <span>
                      <StagairForm params={{ id: stagiair.id }} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStagiair?.length === 0 ? (
            <div className="flex justify-center items-center mt-4">
              <h2 className="text-xl font-semibold text-gray-500">
                No results found
              </h2>
            </div>
          ) : (
            <Pagination
              currentPage={currentPage}
              emailPerPage={emailPerPage}
              paginate={paginate}
              totalEmails={indexOfLastEmail}
            />
          )}
        </div>
      </AuthorizedRole>
    </section>
  );
};

export default StagiairOverzicht;
