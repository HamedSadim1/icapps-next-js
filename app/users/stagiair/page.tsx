import { formatDate } from "@/lib";
import { IStagaire, IStagebegeleider } from "@/types";
import Link from "next/link";
import Edit from "@/app/components/Edit";

const StagiairPage = async () => {
  const respStagebegeleiders = await fetch(
    "http://localhost:3000/api/stagebegeleider",
    {
      cache: "no-cache",
    }
  );
  const stagebegeleidersData: IStagebegeleider[] =
    await respStagebegeleiders.json();

  const respStagaire = await fetch("http://localhost:3000/api/users/stagiair", {
    cache: "no-cache",
  });
  const stagiairData: IStagaire[] = await respStagaire.json();

  const getstagebegeleiderName = (stagebegeleidersId: string[]) => {
    return stagebegeleidersData
      .map((stagebegeleider) => {
        if (stagebegeleidersId.includes(stagebegeleider.id)) {
          return stagebegeleider.name;
        }
      })
      .join(", ");
  };

  return (
    <>
      <section className="flex flex-wrap flex-row justify-center  ml-[5rem] overflow-hidden">
        <table className="md:w-full bg-white border border-gray-200 mt-12">
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
                    <Link
                      href={`/users/stagair${stagiair.id}?name=${stagiair.name}`}
                    >
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
                  <button className=" hover:text-blue-500 focus:outline-none  ">
                    {/* <Link href={`/users/stagiair/${stagiair.id}`}> */}
                    <Edit params={{ id: stagiair.id }} />
                    {/* </Link> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stagiairData.length == 0 && (
          <tr className="flex flex-wrap flex-row justify-center items-center ">
            <h2 className="text-2xl font-bold mt-12 text-center text-gray-500">
              No result found
            </h2>
          </tr>
        )}
      </section>
    </>
  );
};

export default StagiairPage;
