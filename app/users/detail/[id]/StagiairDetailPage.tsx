"use client";
import {
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { VscChecklist } from "react-icons/vsc";
import { formatDate } from "@/lib";
import useStagair from "@/hooks/useStagair";
import Image from "next/image";
import useStagairStore from "@/store";
import { useEffect, useState } from "react";
import { UserRole } from "@/types";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";
import {
  AddCheckListItem,
  CommentModal,
  DeletePostModal,
  Doel,
  FetchingError,
  UploadDocument,
  NoDataError,
  Loading,
  StageBeschrijvingModal,
} from "@/app/components";
import EditDoelButton from "@/app/components/EditButton/EditDoelButton";
import EditStageBeschrijving from "@/app/components/EditButton/EditStageBeschrijving";
import LinkToStagiairOverzciht from "@/app/components/LinkToStagiairOverzicht";

interface Params {
  params: { id: string };
}

const StagiairDetailPage = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);


  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setCommentId = useStagairStore((s) => s.setCommentId);
  const setUpdatePostId = useStagairStore((s) => s.setUpdatePostId);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);
  const [checkListName, setCheckListName] =
    useState<string>("checkListStagiair");

  const { role, isLoading: loading } = useCheckAuthorizeUser();
   const geenGegevensBeschikbaarVoorStageBeschrijving :string = "Geen gegevens beschikbaar";


  console.log(role);
  if (role !== null) {
    console.log("User Role:", UserRole[role]);
  }

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

  if (isLoading || loading || role == null) return <Loading />;

  if (error ) return <FetchingError error={error.message} />;

  if (!data && !error ) return <NoDataError />;

  const getStagebegeleiderName = () => {
    return data.stagebegeleider
      .map((stagebegeleider) => stagebegeleider.name)
      .join(", ");
  };

  const handleCommentId = (id: string) => {
    setCommentId(id);
  };

  return (
    <>
      <section className="grid grid-rows-2 grid-flow-col gap-4 ml-20 mr-20">
        <div className="row-span-2 mt-2">
          <LinkToStagiairOverzciht
            role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
            userRole={role}
            href="/users/stagiair"
            title="Terug naar overzicht"
          />
          {/* Name of the user */}
          <h1 className="text-3xl text-[#002548] font-semibold mb-10 mt-5">
            {data.name}
          </h1>
          {/* Pop up Doel   */}
          <Doel stagiarId={id} />
          {/* Post and comment loop over the array */}
          {role !== null && data.posts.length > 0 ? (
            data.posts.map((post) => (
              <div key={post.id}>
                {/* Post */}
                <div className="flex flex-col rounded-lg mt-6">
                  <div className="flex">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    {/* Edit button for post */}
                    {/* check if the user role is admin or stagebegeleider */}

                    {/* {role === UserRole.ADMIN ? (
                      // Render the edit button for admins and stagebegeleiders
                      <button
                        type="button"
                        onClick={() => {
                          setUpdatePostId(post.id);
                          // setClickedPostId(post.id);
                          useStagairStore.setState({ updatePost: post });
                          setIsPostModal(true);
                        }}
                        className="hover:text-gray-400 w-6 ml-2"
                      >
                        <BsPencil className="text-xl" />
                      </button>
                    ) : null} */}
                    <EditDoelButton
                      role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                      userRole={role}
                      setUpdateGoalId={setUpdatePostId}
                      goal={post}
                      setIsGoalModal={setIsPostModal}
                    />
                    {/* Delete button for post */}
                    {/* check if the user role is admin or stagebegeleider */}
                    {/* {clickedPostId === post.id && ( */}
                    <DeletePostModal postId={post.id} post={post} />
                    {/* )} */}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {formatDate(post.createdAt)}
                  </span>
                  <p className="text-gray-600 text-base font-medium leading-relaxed mt-2">
                    {post.body}
                  </p>
                </div>
                {/* Comment Section */}
                <div className="flex flex-justify-between mt-3 mx-6">
                  <div>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start mb-3">
                        {/* Comment Avatar */}
                        <div className="avatar w-12 h-12 mr-3 mt-1">
                          {comment.img && (
                            <Image
                              src={comment.img}
                              alt="User avatar"
                              className="rounded-full"
                              sizes="70%"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                        {/* Comment Content */}
                        <div>
                          <h3 className="text-1 xl text-blue-400 mb-1">
                            {comment.commentatorName || ""}
                          </h3>
                          <div className="flex flex-col rounded-lg">
                            <p className="text-gray-600 text-base font-medium leading-relaxed">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Comment Button and Border Line */}
                <button
                  onClick={() => handleCommentId(post.id)}
                  type="button"
                  className="flex mt-3"
                >
                  <CommentModal />
                </button>
                <div className="border border-b-gray-500-400 mt-4"></div>
              </div>
            ))
          ) : (
            //? if there no doel show this message
            <div className="text-gray-600 text-base mt-4">
              Er werden nog geen doelen gedefinieerd
            </div>
          )}
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
                    {checkListStagiair.title} <br />
                    <div className="text-sm text-gray-400">
                      {formatDate(checkListStagiair.date)}
                    </div>
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
              {data.checkliststagebegeleider.map((checklistStagebegeleider) => (
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
              ))}
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
                {/* <button
                  type="button"
                  className="hover:text-gray-400"
                  onClick={() => setIsModalOpen(true)}
                >
                  <BsPencil className="text-xl" />
                </button> */}
                <EditStageBeschrijving
                  role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                  userRole={role}
                  setIsModalOpen={setIsModalOpen}
                />
                <StageBeschrijvingModal
                  stagairId={id}
                  id={stagebeschriving.id}
                  stagebeshrijving={stagebeschriving}
                  stagair={data}
                />
              </div>
              <p className="text-gray-600 text-base leading-relaxed mt-2 ml-2 mr-10">
                {stagebeschriving.beschrijving}
              </p>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                Stage begeleider(s)
              </h2>
              <h3 className="text-gray-600 ml-2">{getStagebegeleiderName()}</h3>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                Stage duur
              </h2>
              <h3 className="text-gray-600 ml-2">
                {formatDate(data.startDate)} - {formatDate(data.endDate)}
              </h3>
              <h2 className="text-2xl mt-5 ml-2 font-semibold text-[#002548]">
                School
              </h2>
              <h3 className="text-gray-600 ml-2">{stagebeschriving.school}</h3>
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
    </>
  );
};

export default StagiairDetailPage;