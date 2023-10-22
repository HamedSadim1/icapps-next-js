"use client";
import {
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiComment, BiUserCircle } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { VscChecklist } from "react-icons/vsc";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import FetchingError from "@/app/components/FetchingError";
import NoDataError from "@/app/components/NoDataError";
import { formatDate } from "@/lib";
import useStagair from "@/hooks/useStagair";
import Image from "next/image";
import useStagairStore from "@/store";
import Doel from "@/app/components/Doel";
import Upload from "@/app/components/Upload";
import StageBeschrijvingModal from "./StageBeschrijvingModal";
import DeletePostModal from "@/app/components/DeletePostModal";
import CommentModal from "@/app/components/CommentModal";
import UploadDocument from "@/app/components/UploadDocument";

interface Params {
  params: { id: string };
}

const StagiairDetail = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setCommentId = useStagairStore((s) => s.setCommentId);
  const setUpdatePostId = useStagairStore((s) => s.setUpdatePostId )

  if (isLoading) return <Loading />;

  if (error) return <FetchingError error={error.message} />;

  if (!data && !error) return <NoDataError />;

  const getStagebegeleiderName = () => {
    return data.stagebegeleider
      .map((stagebegeleider) => stagebegeleider.name)
      .join(", ");
  };

  const handlePostId = (id: string) => {
    
  };

  const handleCommentId = (id: string) => {
    setCommentId(id);
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
              <IoIosArrowRoundBack className="text-3xl mr-2 text-blue-400" />
              <h2 className="text-l ">Terug naar overzicht</h2>
            </button>
          </Link>
          {/* Name of the user */}
          <h1 className="text-3xl text-[#002548] font-semibold mb-10 mt-5"> {data.name} </h1>
          {/* Pop up Doel   */}
          <Doel stagiarId={id} />
          {/* Post and comment loop over the array */}
          {data.posts.map((post) => (
            <div key={post.id}>
              <div className="flex flex-col rounded-lg mt-6 mx-6">
                <h2 className="text-xl font-bold ">{post.title}</h2>
                {/* Edit button for post */}
                <button
                  type="button"
                  onClick={() => handlePostId(post.id)}
                  className="hover:text-gray-400 w-6"
                >
                <DeletePostModal />
                </button>
                <span className="text-gray-400 text-sm">
                  {formatDate(post.createdAt)}
                </span>

                <p className="text-gray-600 text-base font-medium leading-relaxed mt-2  ">
                  {post.body}
                </p>
              </div>
              {/* Commentaar */}

              <div className="flex flex-justify-between mt-3 mx-6">
                {data.user[0].img ? (
                  <div className="avatar w-12 h-12 mr-3 mt-1">
                    <Image
                      src={data.user[0].img}
                      alt="User avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <BiUserCircle className="text-4xl text-blue-500" />
                )}
                {/* Comment button */}
                <div>
                  <h3 className="text-1 xl text-blue-400">{data.name}</h3>
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      <div className="flex flex-col rounded-lg">
                        <p className="text-gray-600 text-base font-medium leading-relaxed mt-2  ">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleCommentId(post.id)}
                type="button"
                className="flex mt-3"
              >
              <CommentModal />
              </button>
              {/* Border Line */}
              <div className="border border-b-gray-500-400 mt-4"></div>
            </div>
          ))}

          {/* Checklist */}
          <div className="flex justify-between mt-7 mb-5 ">
            <span className="flex gap-3">
              <VscChecklist className="text-3xl text-blue-400" />
              <h3 className="text-[1.3rem] font-medium">Checklist</h3>
            </span>
            <span className="flex ">
              <button
                type="button"
                className="rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium "
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
          {data.checkListStagiair.map((checkListStagiair) => (
            <div key={checkListStagiair.id} className="flex flex-col">
              <div className="flex gap-2 mb-2">
                <span className="flex font-medium">Section 1</span>
                <span className="text-gray-400 text-xs mt-1">2</span>
              </div>
              <div className="flex flex-col justify-start mb-4 gap-3">
                <div className="flex gap-3 border-2 border-gray-500-400 p-2 rounded">
                  <input
                    value={checkListStagiair.isChecked.toString()}
                    type="checkbox"
                    name="item"
                  />
                  <p>
                    {checkListStagiair.title} <br />
                    <div className="text-sm text-gray-400">
                      {formatDate(checkListStagiair.date)}
                    </div>
                  </p>
                  <div className="">
                    <button type="button" className="text-gray-400">
                      <AiOutlineEdit className="text-2xl mr-2 mt-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-start px-3">
            <button type="button" className="flex">
            <AiOutlinePlus className="float-left mt-1" />
              <h3 className="ml-2  text-gray-400 hover:text-gray-500">Commentaar toevoegen</h3>
            </button>
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
          {data.stagebeschriving.map((stagebeschriving) => (
            <div
              key={stagebeschriving.id}
              className="bg-gray-200 mt-11 rounded-lg pb-5 p-5"
            >
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-2xl font-semibold text-[#002548]">Beschrijving</h2>
                {/* Edit the stage from */}
                <button
                  type="button"
                  className="hover:text-gray-400"
                  onClick={() => setIsModalOpen(true)}
                >
                  <AiOutlineEdit className="text-2xl" />
                </button>
                <StageBeschrijvingModal
                  stagairId={id}
                  id={stagebeschriving.id}
                />
              </div>
              <p className="text-gray-600 text-base leading-relaxed mt-2 ml-2 mr-10">
                {stagebeschriving.beschrijving}
              </p>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">Stage begeleider(s)</h2>
              <h3 className="text-gray-600 ml-2">{getStagebegeleiderName()}</h3>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">Stage duur</h2>
              <h3 className="text-gray-600 ml-2">
                {formatDate(data.startDate)} - {formatDate(data.endDate)}
              </h3>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">School</h2>
              <h3 className="text-gray-600 ml-2">{stagebeschriving.school}</h3>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">Contactpersoon</h2>
              <h3 className="text-gray-600 ml-2">
                {stagebeschriving.contactPersoonName}
              </h3>
              <h3 className="text-gray-600 ml-2 mt-1">
                {stagebeschriving.contactPersoonEmail}
              </h3>
              <h3 className="text-gray-600 ml-2 mt-1">
                {stagebeschriving.contactPersoonTelefoon}
              </h3>
            </div>
          ))}

          {/* Documenten */}
          <div className="flex-col bg-gray-200  rounded-lg overflow-hidden  mt-10 p-5">
            {data.documents.map((document) => (
              <div key={document.id}>
                <h2 className="text-2xl mt-5 ml-2">
                  {document.original_filename}
                </h2>
                <h3 className="text-gray  ml-2 text-gray-400">
                  {formatDate(document.created_at)} door {data.name} (
                  {document.bytes}
                  kb)
                </h3>
                <div className="flex justify-start text-gray-400 ">
                  <BiComment className="mt-1 ml-2" />
                  <h3 className="text-gray ml-2 flex ">3 comments</h3>
                </div>
              </div>
            ))}

            {/* <button type="button" className="flex mt-5">
              <GrAdd className=" mt-1 ml-2 text-gray-400 " />
              <input type="file" className="text-gray-400 ml-2" />
            </button> */}
            <UploadDocument stagiairId={id} />
          </div>
        </div>
      </section>
      )
    </>
  );
};

export default StagiairDetail;
