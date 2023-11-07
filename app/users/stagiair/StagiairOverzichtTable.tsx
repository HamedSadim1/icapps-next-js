"use client";
import useStagairs from "@/hooks/useStagairs";
import { formatDate } from "@/lib";
import useStagairStore from "@/store";
import { BsPencil } from "react-icons/bs";
import StagairForm from "./[id]/StagairForm";
import loading from "./../../components/Loading";
import AuthorizedRole from "@/app/components/AuthorizedRole";
import { UserRole } from "@/types";

const StagiairOverzichtTable = () => {
  const { data: stagiairData, error, isLoading } = useStagairs();
  const setIsModelOpen = useStagairStore((state) => state.toggleModal);
  const role = useStagairStore((s) => s.role);

  if (error) {
    return <div>{error?.message}</div>;
  }

  if (!stagiairData || stagiairData.length === 0) {
    return (
      <div className="flex flex-wrap justify-center items-center h-screen w-full">
        No stagebegeleiders found.
      </div>
    );
  }

  if (isLoading) {
    // return <Loading/>;
  }



  if (!role) {
    return null;
  }

  return (
    <>
      <AuthorizedRole
        role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
        userRole={role}
      >
        {stagiairData.map((stagiair) => (
          <tr key={stagiair.id} className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4">{stagiair.name}</td>

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
        {/* {stagiairData.length === 0 && (
        <div className="flex justify-center items-center mt-4">
          <h2 className="text-2xl font-bold text-gray-500">No result found</h2>
        </div>
      )} */}
      </AuthorizedRole>
    </>
  );
};

export default StagiairOverzichtTable;
