import { GoGoal } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";
import GeneratePdf from "./(components)/GeneratePdf";
import { IStagaire } from "@/types";
import { formatDate } from "@/lib";
import getTranslation from "../components/getTranslation";
import { Locale } from "@/i18n-config";

interface DelenProps {
  searchParams: { id: string, lang: string; };
}

const Delen = async ({ searchParams }: DelenProps) => {
  let stagiarData: IStagaire | null = null;
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/stagiair/${searchParams.id}`,
      { cache: "no-cache" }
    );
    const stagiair: IStagaire = await response.json();
    stagiarData = stagiair;
  } catch (error) {
    console.log(error);
  }

  if (!stagiarData) {
    return <h1>No data</h1>;
  }
  const translation = getTranslation(searchParams.lang as Locale)
  return (
    <GeneratePdf>
      <div className="text-white flex justify-center gap-10 p-32 bg-gradient-to-b to-[#002548] from-[#253849] ">
        {stagiarData.stagebeschriving.map((stagebeschrijving) => (
          <div className="flex w-1/2" key={stagebeschrijving.id}>
            <div className=" ml-7 mr-12">
              <h1 className="text-3xl">Icapps {stagebeschrijving.school} </h1>
              <br />
              <h2 className="text-5xl font-bold">{stagiarData?.name}</h2>
              <h3 className="text-[#5ab38a] text-2xl font-bold mt-4">
                {stagiarData && (
                  <span>
                    {formatDate(stagiarData.startDate)} -{" "}
                    {formatDate(stagiarData.endDate)}
                  </span>
                )}
              </h3>
              <br />
              <br />
              <div className="flex gap-8">
                <div className="w-max">
                  <h3 className="text-[#5ab38a]">{translation.detail.supervisor.toUpperCase()}</h3>
                  {stagiarData?.stagebegeleider.map((stagebegeleider) => (
                    <p key={stagebegeleider.id}>{stagebegeleider.name} </p>
                  ))}
                </div>
                <div className="">
                  <h3 className="text-[#5ab38a]">{translation.detail.contactperson.toUpperCase()}</h3>
                  {stagebeschrijving.contactPersoonName}
                </div>
              </div>
            </div>

            <div className=" border-l-2 border-[#315c48]">
              <h3 className="ml-12 text-[#5ab38a]">{translation.detail.description.toUpperCase()}</h3>
              <p className="ml-12">{stagebeschrijving.beschrijving}</p>
              <br />
            </div>

          </div>
        ))}
      </div>
      <div className="text-white mb-24">
        <div className="flex">
          {" "}
          {/*Deze blok is om doelen+icon te centeren*/}
          <div className="w-1/2"></div>
          <div className="text-4xl text-center font-semibold">
            <div className="ml-8 text-6xl text-[#5ab38a]">
              <GoGoal />
            </div>
            <h2 className="mt-3">{translation.detail.goals.toUpperCase()}</h2>
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="flex flex-wrap gap-4 py-10 px-32 mt-16">
          {stagiarData.posts.map((post) => (
            <div key={post.id} className="" style={{flex:"1 1 30%"}}>
              <div className="bg-[#1a3854] p-8 rounded-lg" style={{ height: "100%" }}>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-[#5ab38a]">{formatDate(post.endDate)}</p>
                <br />
                <p className="">{post.body}</p>
              </div>
            </div>
          ))}</div>
      </div>

      <div className="text-white">
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="text-4xl text-center font-semibold">
            <div className="ml-14 text-6xl text-[#5ab38a]">
              <VscChecklist />
            </div>
            <h2 className="mt-3">{translation.detail.checklist.toUpperCase()}</h2>
          </div>
          <div className="w-1/2"></div>
        </div>

        {stagiarData.checklistsection.map((checklistsection, index) => (
          <div
            key={checklistsection.id}
            className="flex justify-center gap-32 mt-24"
          >{index % 2 == 0 &&
            <h3 className="my-auto text-2xl font-medium">
              {checklistsection.sectionTitle}
            </h3>
            }

            <div className="flex-col w-1/3">
              {checklistsection.items.map((checklistitem) => (
                <div
                  key={checklistitem.id}
                  className="flex bg-[#1a3854] rounded-lg p-5 mb-3"
                >
                  <p className="align-left" style={{maxWidth:"70%"}}>{checklistitem.title}</p>
                  <p className="text-[#5ab38a] text-sm ml-auto w-max">
                    {formatDate(checklistitem.date)}
                  </p>
                </div>
              ))}
            </div>
            {index % 2 == 1 &&
            <h3 className="my-auto text-2xl font-medium">
              {checklistsection.sectionTitle}
            </h3>
            }
          </div>
        ))}
      </div>

      <footer className="bg-[#102234] p-8 text-white flex px-24 mt-20">
        <h2 className="text-2xl font-bold text-white ml-8 mr-6">/ ICAPPS</h2>
        <div className="flex ml-auto gap-16">
          <p>info@icapps.com</p>
          <p>Hangar 26/27 - Rijnkaai 100 B16 - 2000 Antwerpen</p>
        </div>
      </footer>
    </GeneratePdf>
  );
};
export default Delen;
