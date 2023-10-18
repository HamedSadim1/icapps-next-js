"use client";
import { formatDate } from "@/lib";
import Link from "next/link";
import { MdSystemUpdateAlt } from "react-icons/md";
import StagairForm from "./[id]/page";
import useStagairs from "@/hooks/useStagairs";
import useStagebegeleiders from "@/hooks/useStagebegeleiders";
import Loading from "@/app/components/Loading";
import useStagairStore from "@/store";
import { BsPencil } from "react-icons/bs";

const StagiairPage = () => {
  const {
    data: stagebegeleidersData,
    error,
    isLoading,
  } = useStagebegeleiders();
  const {
    data: stagiairData,
    error: stagiairError,
    isLoading: stagiairLoading,
  } = useStagairs();

  const setIsModelOpen = useStagairStore((state) => state.toggleModal);

  if (error || stagiairError) {
    return <div>{error?.message || stagiairError?.message}</div>;
  }

  if (isLoading || stagiairLoading) {
    return <Loading />;
  }

  if (
    !stagebegeleidersData ||
    stagebegeleidersData.length === 0 ||
    !stagiairData ||
    stagiairData.length === 0
  ) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen w-full">
        No stagebegeleiders found.
      </div>
    );
  }

  //! get stagebegeleider name by id stagiair stagebegeleiderId array
  const getstagebegeleiderName = (stagebegeleidersId: string[]) => {
    const filteredNames = stagebegeleidersData
      .filter((stagebegeleider) =>
        stagebegeleidersId.includes(stagebegeleider.id)
      )
      .map((stagebegeleider) => stagebegeleider.name);

    return filteredNames.length > 0 ? filteredNames.join(", ") : "";
  };

  return (
    <section className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 mt-12">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Naam</th>
              <th className="px-6 py-3 text-left">E-MAIL</th>
              <th className="px-6 py-3 text-left">START DATUM</th>
              <th className="px-6 py-3 text-left">END DATUM</th>
              <th className="px-6 py-3 text-left">STAGEBEGELEIDER(S)</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {stagiairData.map((stagiair) => (
              <tr key={stagiair.id} className="hover:bg-gray-50">
                  <Link key={stagiair.id} href={`/users/detail/${stagiair.id}`}>

                <td className="px-6 py-4">{stagiair.name}</td>
                  </Link>
                  <Link key={stagiair.id} href={`/users/detail/${stagiair.id}`}>
                <td className="px-6 py-4">{stagiair.email}</td>
                </Link>
                <td className="px-6 py-4">{formatDate(stagiair.startDate)}</td>
                <td className="px-6 py-4">{formatDate(stagiair.endDate)}</td>
                <td className="px-6 py-4">
                  {getstagebegeleiderName(stagiair.stagebegeleiderId)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setIsModelOpen()}
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
      </div>
      {stagiairData.length === 0 && (
        <div className="flex justify-center items-center mt-4">
          <h2 className="text-2xl font-bold text-gray-500">No result found</h2>
        </div>
      )}
    </section>
  
  );
};

export default StagiairPage;
