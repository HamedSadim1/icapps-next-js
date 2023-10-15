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
import Loading from "@/app/components/Loading";
import FetchingError from "@/app/components/FetchingError";
import NoDataError from "@/app/components/NoDataError";
import { formatDate } from "@/lib";
import useStagair from "@/hooks/useStagair";
import Image from "next/image";
import { useState } from "react";
import useStagairStore from "@/store";
import CommentModal from "./CommentModal";

interface Params {
  params: { id: string };
}

const StagiairDetail = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);

  if (isLoading) return <Loading />;

  if (error) return <FetchingError error={error.message} />;

  if (!data && !error) return <NoDataError />;

  const getStagebegeleiderName = () => {
    return data.stagebegeleider
      .map((stagebegeleider) => stagebegeleider.name)
      .join(", ");
  };

  const getComments = () => {
    return data.posts.flatMap((post) =>
      post.comments.map((comment) => comment.comment)
    );
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

          <h1 className="text-2xl mb-10 mt-5"> {data.name} </h1>
          <div className="flex justify-between">
            <div className="flex flex-row">
              <GoGoal className="text-3xl text-blue-500 mr-4 mb-1" />
              <h2 className="font-bold text-2xl mb-1">Doelen</h2>
            </div>
            <GrAdd />
          </div>

          {data.posts.map((post) => (
            <div className="flex flex-col rounded-lg" key={post.id}>
              <h2 className="text-2xl font-bold ">
                {post.title}
                <button type="button" className="hover:text-gray-400">
                  <AiOutlineEdit className="text-2xl ml-2 mt-3" />
                </button>
              </h2>
              <span className="text-gray-400 text-sm">
                {formatDate(post.createdAt)}
              </span>

              <p className="text-gray-600 text-base font-medium leading-relaxed mt-2  ">
                {post.body}
              </p>
            </div>
          ))}
          {/* Commentaar */}

          <div className="flex flex-justify-between mt-3 ">
            {data.user[0].img ? (
              <div className="avatar w-12 h-12 mr-1">
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
              <h3 className="text-1 xl text-blue-500">{data.name}</h3>
              <p>{getComments()}</p>
              <button
                type="button"
                className="flex mt-5"
                // onClick={() => setIsModalOpen(true)}
              >
                <GrAdd className=" mt-1  text-gray-400 " />
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
          <div className="flex justify-between place-items-start">
            <section className="flex">
              <div className="flex">
                <h3>Section 1</h3>
                <span className="text-gray-400 text-xs mt-2 ml-2">2</span>
              </div>
              <div className="mt-7 border border-gray-400 rounded-lg p-2"></div>
            </section>
            <section className="flex justify-items-start place-items-start order-first">
              <div className="flex justify-self-start">
                <h3>Section 3</h3>
                <span className="text-gray-400 text-xs mt-2 ml-2">3</span>
              </div>
              <div className="mt-7 border border-gray-400 rounded-lg p-2"></div>
            </section>
            <section className="flex justify-items-start place-items-start">
              <div className="flex justify-self-start">
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
          {data.stagebeschriving.map((stagebeschriving) => (
            <div
              key={stagebeschriving.id}
              className="bg-gray-200 mt-11 rounded-lg pb-5 p-5"
            >
              <div className="flex justify-between items-center ml-2 ">
                <h2 className="text-2xl">Beschrijving</h2>
                {/* Edit the stage from */}
                <button
                  type="button"
                  className="hover:text-gray-400"
                  onClick={() => setIsModalOpen(true)}
                >
                  <AiOutlineEdit className="text-2xl mr-7" />
                </button>
                <CommentModal id={id} />
              </div>
              <p className="text-gray-600 text-base font-medium leading-relaxed mt-2 ml-2">
                {stagebeschriving.beschrijving}
              </p>
              <h2 className="text-2xl mt-5 ml-2">Stage begeleider(s)</h2>
              <h3 className="text-gray  ml-2">{getStagebegeleiderName()} S</h3>
              <h2 className="text-2xl mt-5 ml-2">Stage duur</h2>
              <h3 className="text-gray ml-2">
                {formatDate(data.startDate)} - {formatDate(data.endDate)}
              </h3>
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
