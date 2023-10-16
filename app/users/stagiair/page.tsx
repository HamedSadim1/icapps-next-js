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
    <section className="flex flex-wrap flex-row justify-center  ml-[5rem] overflow-x-auto">
      <table className=" table table-zebra md:w-full bg-white border border-gray-200 mt-12">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left">Naam</th>
            <th className="py-2 px-4 text-left">E-MAIL</th>
            <th className="py-2 px-4 text-left">START DATUM</th>
            <th className="py-2 px-4 text-left">END DATUM</th>
            <th className="py-2 px-4 text-left">STAGEBEGELEIDER(S)</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody className="mt-3">
          {stagiairData.map((stagiair) => (
            <tr key={stagiair.id}>
              <td className="py-2 px-4">
                <button className=" hover:text-blue-500 focus:outline-none  ">
                  <Link href={`/users/detail/${stagiair.id}`}>
                    {stagiair.name}
                  </Link>
                </button>
              </td>
              <td className="py-2 px-4">{stagiair.email}</td>
              <td className="py-2 px-4">{formatDate(stagiair.startDate)}</td>
              <td className="py-2 px-4">{formatDate(stagiair.endDate)}</td>
              <td className="py-2 px-4">
                {getstagebegeleiderName(stagiair.stagebegeleiderId)}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => setIsModelOpen()}
                  className=" hover:text-blue-500 focus:outline-none btn "
                >
                  <BsPencil className="text-l"/>
                </button>
                <span>
                  <StagairForm params={{ id: stagiair.id }} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {stagiairData.length == 0 && (
        <div className="flex flex-wrap flex-row justify-center items-center ">
          <h2 className="text-2xl font-bold mt-12 text-center text-gray-500">
            No result found
          </h2>
        </div>
      )}
    </section>
  );
};

export default StagiairPage;
