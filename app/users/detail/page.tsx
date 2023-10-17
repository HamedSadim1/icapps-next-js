"use client";
import { GoGoal } from "react-icons/go";
import {
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { BiComment, BiUserCircle } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { VscChecklist } from "react-icons/vsc";
import Link from "next/link";
import useStagairs from "@/hooks/useStagairs";
import Loading from "@/app/components/Loading";
import FetchingError from "@/app/components/FetchingError";
import NoDataError from "@/app/components/NoDataError";
import { IStagebeschrijving } from "@/types";
import { getstagebegeleiderName } from "@/lib";

interface Params {
  params: { id: string };
}

const StagiairDetail = ({ params: { id } }: Params) => {
  console.log(id);
  const { data, error, isLoading } = useStagairs();

  if (isLoading) return <Loading />;

  if (error) return <FetchingError error={error.message} />;

  if (!data) return <NoDataError />;

  //! get stagebeschrijving data from data array of stagiair
  const stagebeschrijvingData: IStagebeschrijving[] = data.flatMap(
    (stagiair) => stagiair.stagebeschriving
  );

  const getStageStartAndEnd = (): string => {
    const stageStart = stagebeschrijvingData.map((stage) =>
      data
        .filter((stagiair) => stage.stagiairId.includes(stagiair.id))
        .map((stagiair) => stagiair.startDate || "")
        .join("")
    );

    const stageEnd = stagebeschrijvingData.map((stage) =>
      data
        .filter((stagiair) => stage.stagiairId.includes(stagiair.id))
        .map((stagiair) => stagiair.endDate || "")
        .join("")
    );

    return stageStart.join("") + stageEnd.join("");
  };
  return (
    <>
      <section className="grid grid-rows-2 grid-flow-col gap-4 ml-20 mr-20">
        <div className="row-span-2 mt-2 ">
          {/* Back button */}
          <Link href="/users/stagiair">
            <button
              type="button"
              className="flex items-center  hover:text-gray-600 mr-20"
            >
              <IoIosArrowRoundBack className="text-3xl mr-2 text-blue-500" />
              <h2 className="text-xl ">Terug naar overzicht</h2>
            </button>
          </Link>
          {/* Title */}

          <h1 className="text-2xl mb-10 mt-5">Stagaire X </h1>
          <div className="flex items-center">
            <GoGoal className="text-3xl text-blue-500 mr-4 mb-1" />
            <h2 className="font-bold text-2xl mb-1">Doelen</h2>
          </div>

          <div className="flex flex-col rounded-lg">
            <h2 className="text-2xl font-bold ">
              Doel 1
              <button type="button" className="hover:text-gray-400">
                <AiOutlineEdit className="text-2xl ml-2 mt-3" />
              </button>
            </h2>
            <span className="text-gray-400 text-sm">O1/12/2023</span>

            <p className="text-gray-600 text-base font-medium leading-relaxed mt-2  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              voluptatum, quibusdam, voluptates, quia doloremque quod nemo
              voluptate voluptas quas nesciunt doloribus? Quisquam, voluptatem
            </p>
          </div>
          <div className="flex flex-justify-between mt-3 ">
            <BiUserCircle className="text-4xl text-blue-500" />
            <div>
              <h3 className="text-1 xl text-blue-500">Steve Jobs</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam.
              </p>
              <button type="button" className="flex mt-5">
                <GrAdd className=" mt-1  text-gray-400 " />
                <h3 className="ml-2">Commentaar toevogen</h3>
              </button>
            </div>
          </div>
          {/* Border Line */}
          <div className="border border-b-gray-500-400 mt-4"></div>
          {/* Checklist */}
          <div className="flex justify-between mt-7 mb-5 ">
            <span className="flex gap-3">
              <VscChecklist className="text-3xl text-blue-400" />
              <h3 className="text-[1.3rem] font-medium">Checklist</h3>
            </span>
            <span className="flex ">
              <button
                type="button"
                className="rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium"
              >
                Stagiair
              </button>
              <button
                type="button"
                className=" rounded-r-md border-[#002548] px-4 py-1 flex justify-center font-medium bg-[#002548] text-white"
              >
                Begeleider
              </button>
            </span>
          </div>
          {/* Arrow Left and Arrow Right */}
          <div className="flex justify-center mb-5 gap-3 ">
            <span className=" bg-[#f8f9fa] p-3 rounded-md ">
              <AiOutlineLeft className="w-5 h-5 text-[#bdc1c2]" />
            </span>
            <span className="bg-[#bbebf7] p-3 rounded-md font-extrabold">
              <AiOutlineRight className=" w-5 h-5 text-[#2bd0db]" />
            </span>
          </div>
          {/* Sections CheckList */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-2">
              <span className="flex font-medium">Section 1</span>
              <span className="text-gray-400 text-xs mt-1">2</span>
            </div>
            <div className="flex flex-col justify-start mb-4 gap-3">
              <div className="flex gap-3 border-2 border-gray-500-400 p-2 rounded">
                <input type="checkbox" name="item" />
                <p>consectetur adipisicing elit. Quos
                  voluptatum, quibusdam, voluptates, quia doloremque quod nemo
                  voluptate voluptas quas nesciunt doloribus? Quisquam, voluptatem <br /> <div className="text-sm text-gray-400">01/02/2023</div></p>
                <div className=""><button type="button" className="text-gray-400">
                  <AiOutlineEdit className="text-2xl mr-2 mt-4" />
                </button></div>
              </div>
              <div className="flex gap-3 border-2 border-gray-500-400 p-2 rounded">
                <input type="checkbox" name="item" />
                <p>consectetur adipisicing elit. Quos
                  voluptatum, quibusdam, voluptates, quia doloremque quod nemo
                  voluptate voluptas quas nesciunt doloribus? Quisquam, voluptatem <br /> <div className="text-sm text-gray-400">01/02/2023</div></p>
                  <div className=""><button type="button" className="text-gray-400">
                  <AiOutlineEdit className="text-2xl mr-2 mt-4" />
                </button></div>
              </div>
            </div>
            <div className="flex justify-start px-3">
            <button type="button" className="flex">
                <GrAdd className=" mt-1 text-[#bdc1c2]" />
                <h3 className="ml-2  text-gray-400">Commentaar toevoegen</h3>
              </button>
            </div>
          </div>

          
        </div>
        {/* Beschrijving */}
        <div className="flex flex-col rounded-lg overflow-hidden  mt-10">
          <div className="flex justify-start rounded-lg  ">
            <button
              type="button"
              className="mr-10 flex justify-center items-center w-32 h-10 bg-[#002548] text-white rounded-lg  hover:bg-[#21415f]"
            >
              <AiOutlineShareAlt className=" text-white  mr-3" />
              Delen
            </button>
            <button
              type="button"
              className="bg-[#002548] text-white w-60 h-10 rounded-lg  hover:bg-[#21415f]"
            >
              Evaluatieformulier Invullen
            </button>
          </div>
          {stagebeschrijvingData.map((stagebeschriving) => (
            <div
              key={stagebeschriving.id}
              className="bg-gray-200 mt-11 rounded-lg pb-5 p-5"
            >
              <div className="flex justify-between items-center ml-2 ">
                <h2 className="text-2xl">Beschrijving</h2>
                <button type="button" className="hover:text-gray-400">
                  <AiOutlineEdit className="text-2xl mr-7" />
                </button>
              </div>
              <p className="text-gray-600 text-base font-medium leading-relaxed mt-2 ml-2">
                {stagebeschriving.beschrijving}
              </p>
              <h2 className="text-2xl mt-5 ml-2">
                {getstagebegeleiderName(
                  stagebeschriving.stagebegeleiderIDS,
                  data
                )}
              </h2>
              {/* <h3 className="text-gray  ml-2">Steve Jobs, Bill Gates</h3> */}
              <h2 className="text-2xl mt-5 ml-2">Stage duur</h2>
              <h3 className="text-gray ml-2"> {getStageStartAndEnd()}</h3>
              <h2 className="text-2xl mt-5 ml-2">School</h2>
              <h3 className="text-gray ml-2">{stagebeschriving.school}</h3>
              <h2 className="text-2xl mt-5 ml-2">Contactpersoon</h2>
              <h3 className="text-gray ml-2">
                {stagebeschriving.contactPersoonName}
              </h3>
              <h3 className="text-gray ml-2">
                {stagebeschriving.contactPersoonEmail}
              </h3>
              <h3 className="text-gray ml-2">
                {stagebeschriving.contactPersoonTelefoon}
              </h3>
            </div>
          ))}

          {/* Documenten */}
          <div className="flex-col bg-gray-200  rounded-lg overflow-hidden  mt-10 p-5">
            <h2 className="text-2xl mt-5 ml-2">Documenten</h2>
            <h2 className="text-2xl mt-5 ml-2">Document 1</h2>
            <h3 className="text-gray  ml-2 text-gray-400">
              01/02/2023/ door steve jobs (565kb)
            </h3>
            <div className="flex justify-start text-gray-400 ">
              <BiComment className="mt-1 ml-2" />
              <h3 className="text-gray ml-2 flex ">3 comments</h3>
            </div>
            <h2 className="text-2xl mt-5 ml-2">Document 2</h2>
            <h3 className="text-gray-400  ml-2">
              01/02/2023/ door steve jobs (565kb)
            </h3>
            <h2 className="text-2xl mt-5 ml-2">Document 3</h2>
            <h3 className="text-gray-400  ml-2">
              01/02/2023/ door steve jobs (565kb)
            </h3>

            <button type="button" className="flex mt-5">
              <GrAdd className=" mt-1 ml-2 text-gray-400 " />
              <input type="file" className="text-gray-400 ml-2" />
            </button>
          </div>
        </div>
      </section>
      )
    </>
  );
};

export default StagiairDetail;
