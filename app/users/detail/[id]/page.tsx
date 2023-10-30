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
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import { AddCheckListItem } from "@/app/components/AddChecklistItem";
import { useSession } from "next-auth/react";
import useUsers from "@/hooks/useUsers";
import { UserRole } from "@/types";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";

interface Params {
  params: { id: string };
}

const StagiairDetail = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setCommentId = useStagairStore((s) => s.setCommentId);
  const setUpdatePostId = useStagairStore((s) => s.setUpdatePostId);
  const { data: users } = useUsers();

  const isPostLModalOpen = useStagairStore((s) => s.isPostModal);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);

  const [clickedPostId, setClickedPostId] = useState<string>("");
  const [checkListName, setCheckListName] =
    useState<string>("checkListStagiair");

  const role = useCheckAuthorizeUser(id);

  const navigateToNextSection = () => {
    if (selectedSection < data!.checkListStagiair.length - 1) {
      setSelectedSection(selectedSection + 1);
    }
  };
  const navigateToPreviousSection = () => {
    if (selectedSection > 1) {
      setSelectedSection(selectedSection - 1);
    }
  };
  const [selectedSection, setSelectedSection] = useState<number>(1); // 1 is the first section

  const { data: session, status, update } = useSession();

  const checkAuthorization = (): boolean => {
    // check what is role of the user if users is admin or stagebegeleider than he can see the page else he can see if he is has the same id as the stagiair
    if (session && session.user && session.user.email && users) {
      const user = users.find((user) => user.email === session.user!.email);
      if (user && user.role === UserRole.ADMIN) {
        return true;
      } else if (user && user.role === UserRole.STAGEBEGELEIDER) {
        return true;
      } else if (user && user.id === data?.user[0].id) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  if (isLoading) return <Loading />;

  if (error) return <FetchingError error={error.message} />;

  if (!data && !error) return <NoDataError />;

  const getStagebegeleiderName = () => {
    return data.stagebegeleider
      .map((stagebegeleider) => stagebegeleider.name)
      .join(", ");
  };

  if (status === "loading") return <Loading />;

  const handlePostId = (id: string) => {};

  const handleCommentId = (id: string) => {
    setCommentId(id);
  };

  return (
    <>
      {checkAuthorization() && (
        <section className="grid grid-rows-2 grid-flow-col gap-4 ml-20 mr-20">
          <div className="row-span-2 mt-2">
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
            <h1 className="text-3xl text-[#002548] font-semibold mb-10 mt-5">
              {" "}
              {data.name}{" "}
            </h1>
            {/* Pop up Doel   */}
            <Doel stagiarId={id} />
            {/* Post and comment loop over the array */}
            {data.posts.map((post) => (
              <div key={post.id} className="">
                <div className="flex flex-col rounded-lg mt-6">
                  <div className="flex">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    {/* Edit button for post */}
                    {/* check if the user role is admin or stagebegeleider */}
                    {role === UserRole.ADMIN ||
                      (UserRole.STAGEBEGELEIDER && (
                        <button
                          type="button"
                          onClick={() => {
                            setUpdatePostId(post.id);
                            setClickedPostId(post.id);
                            setIsPostModal(true);
                          }}
                          className="hover:text-gray-400 w-6 ml-2"
                        >
                          <BsPencil className="text-xl" />
                        </button>
                      ))}
                    {/* Delete button for post */}
                    {/* check if the user role is admin or stagebegeleider */}
                    {clickedPostId === post.id && (
                      <DeletePostModal postId={post.id} />
                    )}
                  </div>
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
                  onClick={() => setCheckListName("checkListStagiair")}
                  className={`rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium  ${
                    checkListName === "checkListStagiair" &&
                    "bg-[#002548] text-white"
                  }`}
                >
                  Stagiair
                </button>
                <button
                  onClick={() => setCheckListName("checklistStagebegeleider")}
                  type="button"
                  className={`rounded-l-md border-[#002548] border-2 px-6 py-1 flex justify-center font-medium ${
                    checkListName === "checklistStagebegeleider" &&
                    "bg-[#002548] text-white"
                  }`}
                >
                  Begeleider
                </button>
              </span>
            </div>
            {/* Arrow Left and Arrow Right */}
            <div className="flex justify-center mb-5 gap-3 ">
              <span className=" bg-[#f8f9fa] p-3 rounded-md ">
                <AiOutlineLeft
                  className="w-5 h-5 text-[#bdc1c2]"
                  onClick={navigateToPreviousSection}
                />
              </span>
              <span className="bg-[#bbebf7] p-3 rounded-md font-extrabold">
                <AiOutlineRight
                  className=" w-5 h-5 text-[#2bd0db]"
                  onClick={navigateToNextSection}
                />
              </span>
            </div>

            {/* Sections CheckList */}
            {checkListName === "checkListStagiair" ? (
              data.checkListStagiair.map((checkListStagiair) => (
                <div key={checkListStagiair.id} className="flex flex-col">
                  <div className="flex gap-2 mb-2">
                    <span className="flex font-medium">
                      Section {selectedSection}
                    </span>
                    {/* shows all two checklist, navigate if you want to see other section */}
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
              ))
            ) : (
              // checklistStagebegeleider
              <div className="flex flex-col ">
                {data.checkliststagebegeleider.map(
                  (checklistStagebegeleider) => (
                    <div
                      key={checklistStagebegeleider.id}
                      className="flex flex-col"
                    >
                      <div className="flex gap-2 mb-2">
                        <span className="flex font-medium">
                          Section {selectedSection}
                        </span>
                        {/* shows all two checklist, navigate if you want to see other section */}
                        <span className="text-gray-400 text-xs mt-1">2</span>
                      </div>
                      <div className="flex flex-col justify-start mb-4 gap-3">
                        <div className="flex gap-3 border-2 border-gray-500-400 p-2 rounded">
                          <input
                            value={checklistStagebegeleider.isChecked.toString()}
                            type="checkbox"
                            name="item"
                          />
                          <p>
                            {checklistStagebegeleider.title} <br />
                            <div className="text-sm text-gray-400">
                              {formatDate(checklistStagebegeleider.createdAt)}
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
                  )
                )}
              </div>
            )}
            {/* Add new item to checklist */}

            {checkListName === "checkListStagiair" ? (
              <AddCheckListItem stagiairId={id} />
            ) : (
              <div></div>
            )}
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
                  <h2 className="text-2xl font-semibold text-[#002548]">
                    Beschrijving
                  </h2>
                  {/* Edit the stage from */}
                  <button
                    type="button"
                    className="hover:text-gray-400"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <BsPencil className="text-xl" />
                  </button>
                  <StageBeschrijvingModal
                    stagairId={id}
                    id={stagebeschriving.id}
                  />
                </div>
                <p className="text-gray-600 text-base leading-relaxed mt-2 ml-2 mr-10">
                  {stagebeschriving.beschrijving}
                </p>
                <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                  Stage begeleider(s)
                </h2>
                <h3 className="text-gray-600 ml-2">
                  {getStagebegeleiderName()}
                </h3>
                <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                  Stage duur
                </h2>
                <h3 className="text-gray-600 ml-2">
                  {formatDate(data.startDate)} - {formatDate(data.endDate)}
                </h3>
                <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                  School
                </h2>
                <h3 className="text-gray-600 ml-2">
                  {stagebeschriving.school}
                </h3>
                <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                  Contactpersoon
                </h2>
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
                  <a
                    href={
                      "https://res.cloudinary.com/dhjblvbsd/image/upload/f_auto,q_auto/" +
                      document.public_id
                    }
                  >
                    <h2 className="text-2xl mt-5 ml-2">
                      {document.original_filename}
                    </h2>
                  </a>
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
      )}
    </>
  );
};

export default StagiairDetail;
