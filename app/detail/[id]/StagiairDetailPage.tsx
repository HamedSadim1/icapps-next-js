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
import Link from "next/link";
import useUpdateChecklistItem from "@/hooks/useUpdateCheckListItem";
import CheckListItemModal from "./CheckListItemModal";
import EditChecklistItem from "@/app/components/EditButton/EditChecklistItem";
import StageBeschrijving from "@/app/components/StageBeschrijving";

interface Params {
  params: { id: string };
}

const StagiairDetailPage = ({ params: { id } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const updateChecklistItemMutation = useUpdateChecklistItem();
  const setChecklistItemUpdate = useStagairStore(
    (s) => s.setChecklistItemUpdate
  );
  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const setChecklistModal = useStagairStore((state) => state.setChecklistModal);

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
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");

  const [selectedSectionBegleider, setSelectedSectionBegleider] = useState<number>(0);
  const [selectedSectionIdBegleider, setSelectedSectionIdBegleider] = useState<string>("");

  useEffect(() => {
    if (data) {
      if (data.checklistsection.length > 0) {
        setSelectedSectionId(data!.checklistsection[0].id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.checklistSectionStagebegeleider.length > 0) {
        setSelectedSectionIdBegleider(data!.checklistSectionStagebegeleider[0].id);
      }
    }
  }, [data]);

  const navigateToNextSectionStagiair = () => {
    if (selectedSection < data!.checklistsection.length - 1) {
      setSelectedSection(selectedSection + 1);
      setSelectedSectionId(data!.checklistsection[selectedSection + 1].id);
    }
  };

  const navigateToPreviousSectionStagiair = () => {
    if (selectedSection > 0) {
      setSelectedSection(selectedSection - 1);
      setSelectedSectionId(data!.checklistsection[selectedSection - 1].id);
    }
  };

  const navigateToNextSectionBegleider = () => {
    if (selectedSectionBegleider < data!.checklistSectionStagebegeleider.length - 1) {
      setSelectedSectionBegleider(selectedSectionBegleider + 1);
      setSelectedSectionIdBegleider(data!.checklistSectionStagebegeleider[selectedSectionBegleider + 1].id);
    }
  };

  const navigateToPreviousSectionBegleider = () => {
    if (selectedSectionBegleider > 0) {
      setSelectedSectionBegleider(selectedSectionBegleider - 1);
      setSelectedSectionIdBegleider(data!.checklistSectionStagebegeleider[selectedSectionBegleider - 1].id);
    }
  };

  //ArrowNavigation: call for whos is selected
  const navigateToNextSection = checkListName === "checkListStagiair" ? navigateToNextSectionStagiair : navigateToNextSectionBegleider;
  const navigateToPreviousSection = checkListName === "checkListStagiair" ? navigateToPreviousSectionStagiair : navigateToPreviousSectionBegleider;
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
  const handleCheckboxChange = (itemId: any, newCheckedValue: any) => {
    //update setChecklistItemUpdate
    // Update the state locally
    setChecklistItemUpdate({
      id: itemId,
      isChecked: newCheckedValue,
      title: "",
      createdAt: "",
      date: "",
      updatedAt: "",
    });

    // Trigger the mutation to update the database
    updateChecklistItemMutation.mutate({
      id: itemId,
      isChecked: newCheckedValue,
    });
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
            <div className="text-gray-600 text-base mt-4 flex">
              Er werden nog geen doelen gedefinieerd
            </div>
          )}

          {/* Checklist buttons */}
          <CheckList
            checkListName={checkListName}
            setCheckListName={setCheckListName}
            role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
            userRole={role}
          />

          {/* Arrow Left and Arrow Right */}
          <div className="flex justify-center mb-5 gap-3 ">
            <button
             onClick={navigateToPreviousSection}
              type="button"
              className={`bg-[#f8f9fa] p-3 rounded-md transition-colors hover:bg-[#bbebf7]`}
            >
              <AiOutlineLeft
                className=" w-5 h-5 text-[#2bd0db]"
               
              />
            </button>
            <button
            onClick={navigateToNextSection}
              type="button"
              className={`bg-[#f8f9fa] p-3 rounded-md transition-colors hover:bg-[#bbebf7]`}
            >
              <AiOutlineRight
                className=" w-5 h-5 text-[#2bd0db]"
                
              />
            </button>
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
                            checked={item.isChecked}
                            type="checkbox"
                            name="item"
                            onChange={() =>
                              handleCheckboxChange(item.id, !item.isChecked)
                            }
                          />
                          <p className={`text-sm ${item.isChecked ? 'text-gray-400' : 'text-black'}`}>
                            {item.title} <br />
                            <div >
                              {formatDate(item.date)}
                            </div>
                          </p>
                          <button className="ml-auto"
                            onClick={() =>
                              useStagairStore.setState({
                                checklistItemStagiair: item,
                              })
                            }
                          >
                            <EditChecklistItem
                              role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                              userRole={role}
                              setIsModalOpen={setChecklistModal}
                            />
                          </button>
                          <CheckListItemModal
                            checklistItem={item}
                            id={item.id}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mb-10">
                  {/* add checklistitem give id of the checklistItem  */}
                  <AddCheckListItem checklistItemId={selectedSectionId} />
                </div>
              </div>
            ))
          ) : (
            // Adjusted code for stagebegeleider
            <div className="flex flex-col">
              {data.checklistSectionStagebegeleider.map(
                (checklist, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: index === selectedSectionBegleider ? "block" : "none",
                    }}
                  >
                    <div className="flex gap-2 mb-2">
                      <span className="flex font-medium">
                        {checklist.sectionTitle}
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        {checklist.checklistItem.length}
                      </span>
                    </div>
                    <div className="flex flex-col justify-start mb-4 gap-3">
                      {checklist.checklistItem &&
                        checklist.checklistItem.map((item) => (
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
                    <div className="mb-10">
                    <AddCheckListItem checklistItemId={selectedSectionIdBegleider} />
                    </div>
                  </div>
                )
              )}
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
            <Link
              href={{
                pathname: "/delen",
                query: { id: id },
              }}
            >
              <button
                type="button"
                className="mr-10 flex justify-center items-center w-32 h-10 bg-[#002548] text-white rounded-lg  hover:bg-[#21415f]"
              >
                <AiOutlineShareAlt className=" text-white  mr-3" />
                Delen
              </button>
            </Link>
            <button
              type="button"
              className="bg-[#002548] text-white w-60 h-10 rounded-lg  hover:bg-[#21415f]"
            >
              Evaluatieformulier Invullen
            </button>
          </div>
          {data.stagebeschriving.length > 0 ? (
            data.stagebeschriving.map((stagebeschriving) => (
              <StageBeschrijving
                key={stagebeschriving.id}
                role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                userRole={role}
                setIsModalOpen={setIsModalOpen}
                id={id}
                data={data}
                stagebeschriving={stagebeschriving}
                getStagebegeleiderName={getStagebegeleiderName}
              />
            ))
          ) : (
            <div className="text-gray-600 text-base mt-4 flex">
              <p>nog geen gegevens beschikbaar</p>
            </div>
          )}
          {/* Documenten */}
          <div className="flex-col bg-blue-50  rounded-lg overflow-hidden  mt-10 pl-7 py-3 text-[#002548]">
            <h2 className="text-2xl mt-5 font-semibold text-[#002548]">
              Documenten
            </h2>
            {data.documents.length > 0 ? (
              data.documents.map((document) => (
                <div key={document.id}>
                  <button
                    type="button"
                    onClick={() =>
                      useStagairStore.setState({ documentId: document.id })
                    }
                  >
                    <DocumentDetail document={document} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex">
                <p>Er werden nog geen documenten gedeeld in deze stage</p>
              </div>
            )}
            <UploadDocument stagiairId={id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default StagiairDetailPage;
