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

const StagiairDetailPage = () => {
  return (
    <>
      <section className="grid grid-rows-2 grid-flow-col gap-4 ml-20 mr-20">
        <div className="row-span-2 mt-2 ">
          {/* Back button */}
          <Link href="/users">
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
          <div className="flex justify-between mt-7 ">
            <span className="flex gap-4">
              <VscChecklist className="text-3xl text-blue-400" />
              <h3 className="text-[1.3rem]">Checklist</h3>
            </span>
            <span className="flex ">
              <button
                type="button"
                className="border border-blue-400 w-20  flex justify-center"
              >
                Stagiair
              </button>
              <button
                type="button"
                className=" border-blue-400 w-40 flex justify-center bg-[#002548] text-white"
              >
                Begeleider
              </button>
            </span>
          </div>
          {/* Arrow Left and Arrow Right */}
          <div className="flex justify-center mt ">
            <span className=" bg-[#F9FAFB] ">
              <AiOutlineLeft className="  mr-1 w-8 h-8" />
            </span>
            <span className="bg-[#E5F5F9]">
              <AiOutlineRight className=" mr-1 w-8 h-8" />
            </span>
          </div>
          {/* Sections CheckList */}
          <div className="flex justify-between ">
            <section className="flex">
              <div className="flex">
                <h3>Section 1</h3>
                <span className="text-gray-400 text-xs mt-2 ml-2">2</span>
              </div>
              <div className="mt-7 border border-gray-400 rounded-lg p-2"></div>
            </section>
            <section className="flex justify-items-start">
              <div className="flex align-sub">
                <h3>Section 2</h3>
                <span className="text-gray-400 text-xs mt-2 ml-2">1</span>
              </div>
              <div className="mt-7 border border-gray-400 rounded-lg p-2"></div>
            </section>
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
          <div className="bg-gray-200 mt-11 rounded-lg pb-5 p-5">
            <div className="flex justify-between items-center ml-2 ">
              <h2 className="text-2xl">Beschrijving</h2>
              <button type="button" className="hover:text-gray-400">
                <AiOutlineEdit className="text-2xl mr-7" />
              </button>
            </div>
            <p className="text-gray-600 text-base font-medium leading-relaxed mt-2 ml-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              voluptatum, quibusdam, voluptates, quia doloremque quod nemo
              voluptate voluptas quas nesciunt doloribus? Quisquam, voluptatem
              voluptates. Quisquam, voluptatem voluptates.
            </p>
            <h2 className="text-2xl mt-5 ml-2">Stage begeleider(s)</h2>
            <h3 className="text-gray  ml-2">Steve Jobs, Bill Gates</h3>
            <h2 className="text-2xl mt-5 ml-2">Stage duur</h2>
            <h3 className="text-gray ml-2">08/02/2023 - 12/14/2023</h3>
            <h2 className="text-2xl mt-5 ml-2">School</h2>
            <h3 className="text-gray ml-2">AP Hogeschool</h3>
            <h2 className="text-2xl mt-5 ml-2">Contactpersoon</h2>
            <h3 className="text-gray ml-2">Elon Musk</h3>
            <h3 className="text-gray ml-2">elon.musk@gmail.com</h3>
            <h3 className="text-gray ml-2">+32 2 259 04 70</h3>
          </div>
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
    </>
  );
};

export default StagiairDetailPage;
