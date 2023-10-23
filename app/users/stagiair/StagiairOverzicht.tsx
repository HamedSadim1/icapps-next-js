"use client";
import { formatDate } from "@/lib";
import Link from "next/link";
import StagairForm from "./[id]/page";
import useStagairs from "@/hooks/useStagairs";
import Loading from "@/app/components/Loading";
import useStagairStore from "@/store";
import { BsPencil } from "react-icons/bs";

const StagiairOverzicht = () => {
  const { data: stagiairData, error, isLoading } = useStagairs();

  const setIsModelOpen = useStagairStore((state) => state.toggleModal);

  if (error) {
    return <div>{error?.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!stagiairData || stagiairData.length === 0) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen w-full">
        No stagebegeleiders found.
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 mt-12">
        <thead className="bg-gray-100">
          <tr className="">
            <th className="px-6 py-3 text-left">Naam</th>
            <th className="px-6 py-3 text-left">E-mail</th>
            <th className="px-6 py-3 text-left">Startdatum</th>
            <th className="px-6 py-3 text-left">Einddatum</th>
            <th className="px-6 py-3 text-left">Stagebegeleider(s)</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {stagiairData.map((stagiair) => (

              <tr key={stagiair.id} className="hover:bg-gray-50">
                            <Link key={stagiair.id} href={`/users/detail/${stagiair.id}`}>

                <td className="px-6 py-4">{stagiair.name}</td>
                </Link>

                <td className="px-6 py-4">{stagiair.email}</td>
                <td className="px-6 py-4">{formatDate(stagiair.startDate)}</td>
                <td className="px-6 py-4">{formatDate(stagiair.endDate)}</td>
                <td className="px-6 py-4">
                  {stagiair.stagebegeleider
                    .map((stagebegeleider) => stagebegeleider.name)
                    .join(",")}
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
      {stagiairData.length === 0 && (
        <div className="flex justify-center items-center mt-4">
          <h2 className="text-2xl font-bold text-gray-500">No result found</h2>
        </div>
      )}
    </section>
  );
};

export default StagiairOverzicht;
