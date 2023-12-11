"use client";
import useStagairs from "@/hooks/useStagairs";
import { formatDate } from "@/lib";
import useStagairStore from "@/store";
import { BsPencil } from "react-icons/bs";
import Loading from "@/app/[lang]/components/Loading";
import { useRouter } from "next/navigation";
import { usePrefetchStagairDetails } from "@/hooks/usePrefetchData";
import { useEffect, useMemo, useState } from "react";
import AuthorizedRole from "@/app/[lang]/components/AuthorizedRole";
import { UserRole } from "@/types";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";
import SearchStagiair from "./SearchStagiair";
import useOneSignalNotification from "@/hooks/useOneSignalNotification";
import Pagination from "@/app/[lang]/components/Pagination";
import { Locale } from "@/i18n-config";
import getTranslation from "./getTranslation";
import StagairForm from "./StagairForm";
import useMediaQuery from "@/hooks/useMediaQuery";

const StagiairOverzicht = ({ lang }: { lang: string }) => {
  // Fetch stagiair data using a custom hook (assuming it's for fetching data)
  const { data: stagiairData, error, isLoading } = useStagairs();
  // Get a function to set the modal state from the store
  const setIsModelOpen = useStagairStore((state) => state.toggleModal);
  // Get the role from the store
  const role = useStagairStore((s) => s.role);
  // Get the Next.js router object
  const router = useRouter();
  // Get authorization details using a custom hook
  const auth = useCheckAuthorizeUser();
  // Set up state for search term
  const [searchStagiair, setsearchStagiair] = useState<string>("");
  const isDesktop = useMediaQuery('(min-width: 650px)');

  // Trigger a notification using the OneSignalNotification hook
  useOneSignalNotification();

  // Set the initial state for the current page using the useState hook
  const [currentPage, setCurrentPage] = useState(1);
  // Set the initial state for the number of emails per page using the useState hook
  const [emailPerPage, setEmailPerPage] = useState(5);

  // Calculate the index of the last email on the current page
  const indexOfLastEmail = currentPage * emailPerPage;

  // Get the slice of emails to be displayed on the current page
  const currentEmails = stagiairData?.slice(
    (currentPage - 1) * emailPerPage, // Calculate the index of the first email on the current page
    currentPage * emailPerPage // Use the index of the last email to get the slice
  );

  // Function to change the current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // ? filter data based on search
  //?
  const filteredStagiair = useMemo(() => {
    // Convert the search term to lowercase for case-insensitive comparison
    const searchTerm = searchStagiair.toLowerCase();

    // Check if the search term has more than 3 letters
    if (searchTerm.length > 3) {
      // Apply the filter when the search term is longer than 3 letters
      return currentEmails?.filter(
        (item) =>
          // Check if the name or email includes the search term
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm)
      );
    } else {
      // If the search term is less than or equal to 3 letters, return the unfiltered data
      return currentEmails;
    }
  }, [searchStagiair, currentEmails]);

  //? if the role is stagebegeleider, show only stagiair that are assigned to the stagebegeleider make a new array with stagiair that are assigned to the stagebegeleider
  const stagiairAssignedToStagebegeleider =
  role === UserRole.STAGEBEGELEIDER
    ? stagiairData?.filter((stagiair) =>
        stagiair.stagebegeleider.some(
          (stagebegeleider) => stagebegeleider.email === auth.userEmail
        )
      )
    : filteredStagiair;
        

      console.log('stagiairData:', stagiairData);
      console.log('filteredStagiair:', filteredStagiair);
      console.log('stagiairAssignedToStagebegeleider:', stagiairAssignedToStagebegeleider);

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

  if (!stagiairData || stagiairData.length === 0  ) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen w-full">
        No stagebegeleiders found.
      </div>
    );
  }
  //? handle router to detail page and prefetch data for detail page and navigate to detail page when clicked on stagiair
  const handleRouter = (id: string) => {
    // Prefetch the route in the background
    router.prefetch(`${lang}/detail/${id}`);
    prefetchStagairDetails.prefetchData(id);
    // Navigate to the route when clicked
    router.push(`${lang}/detail/${id}`);
  };
  const translation = getTranslation(lang as Locale);
  return (
    <section className="xs:mx-8 md:mx-auto xs:px-0 md:px-20">
      <AuthorizedRole 
      role={
        role === UserRole.STAGEBEGELEIDER
          ? UserRole.STAGEBEGELEIDER
          : UserRole.ADMIN
      }
  
        userRole={role} 
        >
        <SearchStagiair
          lang={lang}
          search={searchStagiair}
          setSearch={setsearchStagiair}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-12">
            <thead className="text-transform: uppercase text-[#6F7784]">
            {isDesktop ? <tr>
                <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["name"]}</th>
                <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["e-mail"]}</th>
                <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["startingdate"]}</th>
                <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["endingdata"]}</th>
                <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["internshipsupervisors"]}</th>
                <th className="px-6 py-1"></th>
              </tr> : <th className="px-6 py-1 text-left font-normal">{translation.userStagiair["name"]}</th>}
            </thead>
            <tbody className="border text-[#002548]">
              
              {stagiairAssignedToStagebegeleider?.map((stagiair) => (
                <tr
                  key={stagiair.id}
                  className="hover:bg-gray-200 cursor-pointer even:bg-[#FFFFFF]  odd:bg-slate-100"
                >
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.name}
                  </td>

                  {isDesktop ?<td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.email}
                  </td> : <td></td>}
                  {isDesktop ?<td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {formatDate(stagiair.startDate)}
                  </td> : <td></td>}
                  {isDesktop ?<td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {formatDate(stagiair.endDate)}
                  </td> : <td></td>}
                  {isDesktop ?<td
                    className="px-6 py-4"
                    onClick={() => handleRouter(stagiair.id)}
                  >
                    {stagiair.stagebegeleider
                      .map((stagebegeleider) => stagebegeleider.name)
                      .join(",")}
                  </td> : <td></td>}
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
                      <StagairForm params={{ lang: lang }} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
          {stagiairAssignedToStagebegeleider?.length === 0 ? (
            <div className="flex justify-center items-center mt-4">
              <h2 className="text-xl font-semibold text-gray-500">
                {translation.userStagiair["noresultfound"]}
              </h2>
            </div>
          ) : (
            //? Pagination component
            <Pagination
              currentPage={currentPage}
              emailPerPage={emailPerPage}
              paginate={paginate}
              totalEmails = {
               // Check if the role is STAGEBEGELEIDER   // If true, use the length of stagiairAssignedToStagebegeleider  // If false, use the length of stagiairData
                (role === UserRole.STAGEBEGELEIDER ? stagiairAssignedToStagebegeleider?.length : stagiairData?.length) ||
                  // If both lengths are falsy, default to the length of stagiairData or 0
                stagiairData?.length || 0
              } // Use the length of filteredStagiair
            />
          )}
        </div>
       </AuthorizedRole> 
    </section>
  );
};

export default StagiairOverzicht;
