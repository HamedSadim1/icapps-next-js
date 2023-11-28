import { GoGoal } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";
import GeneratePdf from "./(components)/GeneratePdf";
import { IStagaire } from "@/types";
import { formatDate } from "@/lib";

interface DelenProps {
  searchParams: { id: string };
}

const Delen = async ({ searchParams }: DelenProps) => {
  console.log(searchParams.id);

  let stagiarData: IStagaire | null = null;
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/stagiair/${searchParams.id}`
    );
    const stagiair: IStagaire = await response.json();
    stagiarData = stagiair;
    console.log(stagiarData);
  } catch (error) {
    console.log(error);
  }

  if (!stagiarData) {
    return;
  }

  return (
    <GeneratePdf>
      <div className="text-white flex justify-center gap-10 p-32 bg-gradient-to-b to-[#002548] from-[#253849] ">
        <div className="w-1/6"></div>
        {stagiarData.stagebeschriving.map((stagebeschrijving) => (
          <div className="mr-20" key={stagebeschrijving.id}>
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
              <div>
                <h3 className="text-[#5ab38a]">STAGEBEGELEIDER(S)</h3>
                {stagiarData?.stagebegeleider.map((stagebegeleider) => (
                  <p key={stagebegeleider.id}>{stagebegeleider.name} </p>
                ))}
              </div>
              <div>
                <h3 className="text-[#5ab38a]">CONTACTPERSOON</h3>
                {stagebeschrijving.contactPersoonName}
              </div>
            </div>

            <hr />
            <div className=" border-l-2 border-[#315c48] w-1/4">
              <h3 className="ml-16 text-[#5ab38a]">BESCHRIJVING</h3>
              <p className="ml-16">{stagebeschrijving.beschrijving}</p>
              <br />
            </div>
            <div className="w-1/6"></div>
          </div>
        ))}
      </div>
      <div className="text-white mb-32">
        <div className="flex">
          {" "}
          {/*Deze blok is om doelen+icon te centeren*/}
          <div className="w-1/2"></div>
          <div className="text-4xl text-center font-semibold">
            <div className="ml-8 text-6xl text-[#5ab38a]">
              <GoGoal />
            </div>
            <h2 className="mt-3">Doelen</h2>
          </div>
          <div className="w-1/2"></div>
        </div>
        {stagiarData.posts.map((post) => (
          <div key={post.id} className="flex flex-wrap ml-96 gap-4 mt-16">
            {/* <div className="bg-[#1a3854] p-8 w-1/4 rounded-lg">
         
              <h3 className="text-xl font-bold">Doel 1</h3>
              <p className="text-[#5ab38a]">27/08/2023</p>
              <br />
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </p>
            </div> */}

            <div className="bg-[#1a3854] p-8 w-1/4 rounded-lg">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-[#5ab38a]">{formatDate(post.endDate)}</p>
              <br />
              <p className="">{post.body}</p>
            </div>
            {/* <div className="bg-[#1a3854] p-8 w-1/4 rounded-lg">
            <h3 className="text-xl font-bold">Doel 1</h3>
            <p className="text-[#5ab38a]">27/08/2023</p>
            <br />
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quod.
            </p>
          </div>
          <div className="bg-[#1a3854] p-8 w-1/4 rounded-lg">
            <h3 className="text-xl font-bold">Doel 1</h3>
            <p className="text-[#5ab38a]">27/08/2023</p>
            <br />
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quod. Quisquam, quod. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quod.
            </p>
          </div> */}
          </div>
        ))}
      </div>

      <div className="text-white">
        <div className="flex">
          {" "}
          {/*Deze blok is om doelen+icon te centeren*/}
          <div className="w-1/2"></div>
          <div className="text-4xl text-center font-semibold">
            <div className="ml-14 text-6xl text-[#5ab38a]">
              <VscChecklist />
            </div>
            <h2 className="mt-3">Checklist</h2>
          </div>
          <div className="w-1/2"></div>
        </div>

        {stagiarData.checklistsection.map((checklistsection) => (
          <div
            key={checklistsection.id}
            className="flex justify-center gap-32 mt-16"
          >
            <h3 className="my-auto text-2xl font-medium">
              {checklistsection.sectionTitle}
            </h3>
            <div className="flex-col w-1/3">
              {checklistsection.items.map((checklistitem) => (
                <div
                  key={checklistitem.id}
                  className="flex bg-[#1a3854] rounded-lg p-5 mb-3"
                >
                  {/*hier checklist secties mappen*/}
                  <p className="align-left">{checklistitem.title}</p>
                  <p className="text-[#5ab38a] text-sm ml-auto">
                    {checklistitem.date}
                  </p>
                </div>
              ))}
              {/* <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div> */}
            </div>
          </div>
        ))}
        {/* <div className="flex justify-center gap-32 mt-16">
          <div className="flex-col w-1/3">
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
          </div>
          <h3 className="my-auto text-2xl font-medium rounded-2xl border-solid-4">
            Eerste dag
          </h3>
        </div> */}

        {/* <div className="flex justify-center gap-32 mt-16">
          <h3 className="my-auto text-2xl font-medium">Eerste week</h3>
          <div className="flex-col w-1/3">
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex justify-center gap-32 mt-16">
          <div className="flex-col w-1/3">
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
          </div>
          <h3 className="my-auto text-2xl font-medium">Tijdens de stage</h3>
        </div> */}

        {/* <div className="flex justify-center gap-32 mt-16">
          <h3 className="my-auto text-2xl font-medium">Laatste dag</h3>
          <div className="flex-col w-1/3">
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">

              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
            <div className="flex bg-[#1a3854] rounded-lg p-5 mb-3">
              <p className="align-left">Item 1</p>
              <p className="text-[#5ab38a] text-sm ml-auto">27/10/2023</p>
            </div>
          </div>
        </div> */}
      </div>

      <footer className="bg-[#102234] p-8 text-white flex px-24 mt-20">
        <h2 className="">iCapps Logo here</h2>
        <div className="flex ml-auto gap-16">
          <p>info@icapps.com</p>
          <p>Hangar 26/27 - Rijnkaai 100 B16 - 2000 Antwerpen</p>
        </div>
      </footer>
    </GeneratePdf>
  );
};
export default Delen;
