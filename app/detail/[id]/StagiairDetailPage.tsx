"use client";
import {
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { formatDate } from "@/lib";
import useStagair from "@/hooks/useStagair";
import useStagairStore from "@/store";
import { useEffect, useState } from "react";
import { UserRole } from "@/types";
import useCheckAuthorizeUser from "@/hooks/useCheckAuthorizeUser";
import {
  AddCheckListItem,
  Doel,
  FetchingError,
  UploadDocument,
  NoDataError,
  Loading,
  StageBeschrijvingModal,
} from "@/app/components";

import EditStageBeschrijving from "@/app/components/EditButton/EditStageBeschrijving";
import LinkToStagiairOverzciht from "@/app/components/LinkToStagiairOverzicht";
import DocumentDetail from "@/app/components/DocumentDetail";
import Post from "@/app/components/Post";
import CheckList from "@/app/components/UI/Checklist";

interface Params {
  params: { id: string };
}

const StagiairDetailPage = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setCommentId = useStagairStore((s) => s.setCommentId);
  const setUpdatePostId = useStagairStore((s) => s.setUpdatePostId);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);
  const setClickedPostId = useStagairStore((s) => s.setUpdatePostId);
  const [checkListName, setCheckListName] =
    useState<string>("checkListStagiair");
  const { role, isLoading: loading } = useCheckAuthorizeUser();
  const geenGegevensBeschikbaarVoorStageBeschrijving: string =
    "Geen gegevens beschikbaar";

  console.log(role);
  if (role !== null) {
    console.log("User Role:", UserRole[role]);
  }
  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [selectedSectionId,setSelectedSectionId] = useState<string>("");

  useEffect(() => {
    if(data){
      if (data.checklistsection.length > 0) {
      setSelectedSectionId(data!.checklistsection[0].id);
    }
    }
  }, [data]); 

  const navigateToNextSection = () => {
    if (selectedSection < data!.checklistsection.length - 1) {
      setSelectedSection(selectedSection + 1);
      setSelectedSectionId(data!.checklistsection[selectedSection + 1].id);
    }
  };

  const navigateToPreviousSection = () => {
    if (selectedSection > 0) {
      setSelectedSection(selectedSection - 1);
      setSelectedSectionId(data!.checklistsection[selectedSection - 1].id);
    }
  };
  // 1 is the first section

  if (isLoading || loading || role == null) return <Loading />;

  if (error) return <FetchingError error={error.message} />;

  if ((!data && !error) || !id) return <NoDataError />;

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
            href="/"
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
              <Post
                key={post.id}
                role={role}
                post={post}
                setClickedPostId={setClickedPostId}
                setIsPostModal={setIsPostModal}
                handleCommentId={handleCommentId}
              />
            ))
          ) : (
            <div className="text-gray-600 text-base mt-4">
              Er zijn geen berichten gevonden.
            </div>
          )}

          {/* Checklist */}
          <CheckList
            checkListName={checkListName}
            setCheckListName={setCheckListName}
          />

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
          {data.checklistsection && checkListName === "checkListStagiair" ? (
            data.checklistsection.map((checklist, index: number) => (
              <div
                key={index}
                style={{
                  display: index === selectedSection ? "block" : "none",
                }}
              >
                <div className="flex flex-col">
                  <div className="flex gap-2 mb-2">
                    <span className="flex font-medium">
                      {checklist.sectionTitle}
                    </span>
                    {/* shows the number of items in the section */}
                    <span className="text-gray-400 text-xs mt-1">
                      {checklist.items.length}
                    </span>
                  </div>

                  <div className="flex flex-col justify-start mb-4 gap-3">
                    {checklist.items &&
                      checklist.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 border-2 border-gray-500-400 p-2 rounded"
                        >
                          <input
                            value={item.isChecked.toString()}
                            type="checkbox"
                            name="item"
                          />
                          <p>
                            {item.title} <br />
                            <div className="text-sm text-gray-400">
                              {formatDate(item.createdAt)}
                            </div>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <AddCheckListItem checklistItemId={selectedSectionId} />
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

          {/* {checkListName === "checkListStagiair" ? (
            <AddCheckListItem stagiairId={id} />
          ) : (
            <div></div>
          )} */}
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
              className="bg-blue-50  mt-11 rounded-lg pb-5 p-5"
            >
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-2xl font-semibold text-[#002548]">
                  Beschrijving
                </h2>
                {/* Edit Stagebeschrijving */}
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
          <div className="flex-col bg-blue-50  rounded-lg overflow-hidden  mt-10 pl-7 py-3 text-[#002548]">
            <h2 className="text-2xl mt-5 font-semibold text-[#002548]">
              Documenten
            </h2>
            {data.documents.map((document) => (
              <div key={document.id}>
                <DocumentDetail document={document} />
              </div>
            ))}
            <UploadDocument stagiairId={id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default StagiairDetailPage;
