"use client";
import {
  AiOutlineShareAlt,
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
  AddSection,
} from "@/app/[lang]/components";

import LinkToStagiairOverzciht from "@/app/[lang]/components/LinkToStagiairOverzicht";
import DocumentDetail from "@/app/[lang]/components/DocumentDetail";
import Post from "@/app/[lang]/components/Post";
import CheckList from "@/app/[lang]/components/UI/Checklist";
import Link from "next/link";
import useUpdateChecklistItem from "@/hooks/useUpdateCheckListItem";
import EditChecklistItem from "@/app/[lang]/components/EditButton/EditChecklistItem";
import StageBeschrijving from "@/app/[lang]/components/StageBeschrijving";
import getTranslation from "../../components/getTranslation";
import { Locale } from "@/i18n-config";
import { AddCheckListItemBegleider } from "../../components/AddCheckListItemBegleider";
import EditButtonBegleider from "../../components/EditButton/EditButtonBegleider";
import useUpdateBegeleiderChecklistItem from "@/hooks/useUpdateBegeleiderChecklistItem";
import { IoIosInformationCircleOutline } from "react-icons/io";
import AddSectionBegeleider from "../../components/Section/AddSectionBegeleider";
import EditChecklistSectionStagairTitle from "../../components/EditButton/EditChecklistSectionStagairTitle";
import EditChecklistSectionBegeleiderTitle from "../../components/EditButton/EditChecklistSectionBegeleiderTitle";
import { ClipLoader } from "react-spinners";

interface Params {
  params: { id: string; lang: string };
}

const StagiairDetailPage = ({ params: { id, lang } }: Params) => {
  const { data, error, isLoading } = useStagair(id);

  const updateChecklistItemMutation = useUpdateChecklistItem();
  const setChecklistItemUpdate = useStagairStore(
    (s) => s.setChecklistItemUpdate
  );

  const updateChecklistBegeleiderItemMutation =
    useUpdateBegeleiderChecklistItem(); //new begeleider
  const setChecklistBegeleiderUpdate = useStagairStore(
    //new begeleider
    (s) => s.setChecklistBegeleiderUpdate
  );

  const setIsModalOpen = useStagairStore((state) => state.setCommentModal);
  const [spinner, setSpinner] = useState(false); //loading
  const setCommentId = useStagairStore((s) => s.setCommentId);
  const setUpdatePostId = useStagairStore((s) => s.setUpdatePostId);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);
  const setClickedPostId = useStagairStore((s) => s.setUpdatePostId);
  const [checkListName, setCheckListName] =
    useState<string>("checkListStagiair");
  const { role, isLoading: loading } = useCheckAuthorizeUser();

  const [selectedSection, setSelectedSection] = useState<number>(0);
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");

  const [selectedSectionBegleider, setSelectedSectionBegleider] =
    useState<number>(0);
  const [selectedSectionIdBegleider, setSelectedSectionIdBegleider] =
    useState<string>("");
  const [stagiairLoadingStateId, setStagiairLoadingStateId] =
    useState<string>("");

  useEffect(() => {
    if (data) {
      if (data.checklistsection.length > 0) {
        setSelectedSectionId(data.checklistsection[0].id);
      }

      if (data.checklistSectionStagebegeleider.length > 0) {
        setSelectedSectionIdBegleider(
          data.checklistSectionStagebegeleider[0].id
        );
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
    if (
      selectedSectionBegleider <
      data!.checklistSectionStagebegeleider.length - 1
    ) {
      setSelectedSectionBegleider(selectedSectionBegleider + 1);
      setSelectedSectionIdBegleider(
        data!.checklistSectionStagebegeleider[selectedSectionBegleider + 1].id
      );
    }
  };

  const navigateToPreviousSectionBegleider = () => {
    if (selectedSectionBegleider > 0) {
      setSelectedSectionBegleider(selectedSectionBegleider - 1);
      setSelectedSectionIdBegleider(
        data!.checklistSectionStagebegeleider[selectedSectionBegleider - 1].id
      );
    }
  };
  const translation = getTranslation(lang as Locale);

  //ArrowNavigation: call for whos is selected
  const navigateToNextSection =
    checkListName === "checkListStagiair"
      ? navigateToNextSectionStagiair
      : navigateToNextSectionBegleider;
  const navigateToPreviousSection =
    checkListName === "checkListStagiair"
      ? navigateToPreviousSectionStagiair
      : navigateToPreviousSectionBegleider;
  // 1 is the first section

  if (isLoading || loading || role == null)
    return (
      <>
        <div className="flex mt-96 justify-center text-gray-500">
          <h2 className="text-2xl">{translation.fetchingData.fetchingData}</h2>

          <ClipLoader
            color={"gray-500"}
            loading={true}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );

  // if (error) return <FetchingError error={error.message} />;
  if (error) {
    throw new Error(error.message);
  }

  if ((!data && !error) || !id) return <NoDataError />;

  const getStagebegeleiderName = () => {
    return data.stagebegeleider
      .map((stagebegeleider) => stagebegeleider.name)
      .join(", ");
  };

  const handleCommentId = (id: string) => {
    setCommentId(id);
  };

  const handleCheckboxChange = (itemId: string, newCheckedValue: any) => {
    //update setChecklistItemUpdate
    // Update the state locally
    setStagiairLoadingStateId(itemId);
    try {
      setSpinner(true); //loading

      setChecklistItemUpdate({
        id: itemId,
        isChecked: newCheckedValue,
        title: "",
        createdAt: "",
        date: "",
        updatedAt: "",
      });
      setTimeout(() => {
        setSpinner(false); //loading
      }, 8000);
      // Trigger the mutation to update the database
      updateChecklistItemMutation.mutate({
        id: itemId,
        isChecked: newCheckedValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChangeBeg = (itemId: any, newCheckedValue: any) => {
    //new begeleider
    //update setChecklistItemUpdate
    // Update the state locally
    try {
      setSpinner(true); //loading
      setStagiairLoadingStateId(itemId);

      setChecklistBegeleiderUpdate({
        id: itemId,
        isChecked: newCheckedValue,
        title: "",
        createdAt: "",
        date: "",
        updatedAt: "",
      });
      setTimeout(() => {
        setSpinner(false); //loading
      }, 8000);
      // Trigger the mutation to update the database
      updateChecklistBegeleiderItemMutation.mutate({
        id: itemId,
        isChecked: newCheckedValue,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-8 xs:mx-8 md:mx-auto xs:px-0 md:px-20 ">
        <LinkToStagiairOverzciht
          role={
            role === UserRole.STAGEBEGELEIDER
              ? UserRole.STAGEBEGELEIDER
              : UserRole.ADMIN
          }
          userRole={role}
          href={"/" + lang}
          title={translation.detail.back}
        />
      </div>
      <section className="flex xs:flex-col l:flex-row l:gap-32 xs:mx-8 l:mx-20 px-0 mb-5">
        <div className="row-span-2 mt-2 order-1 ">
          {/* Name of the user */}
          <h1 className="hidden l:flex text-3xl text-[#002548] font-semibold my-8">
            {data.name}
          </h1>
          <div className=" l:hidden flex mt-4 text-3xl text-blue-400">
            <IoIosInformationCircleOutline />
            <h2 className="text-2xl font-medium text-[#002548] ml-3">
              {translation.detail.stageInfo}
            </h2>
          </div>
          <div className="l:hidden flex flex-col rounded-lg mb-14 ">
            {data.stagebeschriving.length > 0 ? (
              data.stagebeschriving.map((stagebeschriving) => (
                <StageBeschrijving
                  key={stagebeschriving.id}
                  role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                  userRole={role}
                  id={id}
                  data={data}
                  stagebeschriving={stagebeschriving}
                  getStagebegeleiderName={getStagebegeleiderName}
                  lang={lang}
                />
              ))
            ) : (
              <div className="text-gray-600 text-base mt-4 flex">
                <p>{translation.detail.nodata}</p>
              </div>
            )}
          </div>
          {/* Pop up Doel   */}
          <Doel stagiarId={id} lang={lang} />
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
                lang={lang}
              />
            ))
          ) : (
            <div className="text-gray-600 text-base mt-4 flex">
              {translation.detail.nogoals}
            </div>
          )}
          {/* Checklist buttons */}
          <CheckList
            checkListName={checkListName}
            setCheckListName={setCheckListName}
            role={
              role === UserRole.STAGEBEGELEIDER
                ? UserRole.STAGEBEGELEIDER
                : UserRole.ADMIN
            }
            userRole={role}
            lang={lang}
          />

          {/* Arrow Left and Arrow Right */}
          <div className="flex justify-center mb-5 gap-3 ">
            <button
              onClick={navigateToPreviousSection}
              type="button"
              className={`p-3 rounded-md transition-colors hover:bg-[#002548] bg-blue-50`}
            >
              <AiOutlineLeft className=" w-5 h-5 text-blue-400" />
            </button>
            <button
              onClick={navigateToNextSection}
              type="button"
              className={`p-3 rounded-md transition-colors hover:bg-[#002548] bg-blue-50`}
            >
              <AiOutlineRight className=" w-5 h-5 text-blue-400" />
            </button>
          </div>

          {/* Sections CheckList */}
          {data.checklistsection && checkListName === "checkListStagiair" ? (
            <>
              {data.checklistsection.map((checklist, index: number) => (
                <div
                  key={index}
                  style={{
                    display: index === selectedSection ? "block" : "none",
                  }}
                >
                  {/* Existing Section */}
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-4 mb-2">
                      <div className="flex gap-2">
                        <div className="flex font-medium">
                          {checklist.sectionTitle}
                        </div>
                        <div>
                          <EditChecklistSectionStagairTitle
                            role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                            userRole={role}
                            lang={lang}
                            item={checklist}
                          />
                        </div>
                      </div>
                      <div>
                        {role === UserRole.STAGEBEGELEIDER ||
                        role === UserRole.ADMIN ? (
                          <AddSection lang={lang} stagairId={data.id} />
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col justify-start mb-4 gap-3">
                      {checklist.items &&
                        checklist.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 border-2 border-gray-300 p-2 rounded"
                          >
                            {" "}
                            {spinner == true &&
                            stagiairLoadingStateId === item.id ? ( //loading
                              <div className="mt-3">
                                <ClipLoader
                                  color={"black"}
                                  loading={true}
                                  size={16}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              </div>
                            ) : (
                              <input
                                className="w-4"
                                checked={item.isChecked}
                                type="checkbox"
                                name="item"
                                onChange={() =>
                                  handleCheckboxChange(item.id, !item.isChecked)
                                }
                              />
                            )}
                            <p
                              className={`text-sm ${
                                item.isChecked ? "text-gray-400" : "text-black"
                              }`}
                            >
                              {item.title} <br />
                              <div>{formatDate(item.date)}</div>
                            </p>
                            <EditChecklistItem lang={lang} item={item} />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="mb-10">
                    <AddCheckListItem
                      checklistItemId={checklist.id}
                      lang={lang}
                    />
                  </div>
                </div>
              ))}

              {/* Render AddSection only if there are no existing sections */}
              {role === UserRole.ADMIN ? (
                <div>
                  {/* Render AddSection only if there are no existing sections */}
                  {data.checklistsection.length === 0 &&
                    checkListName === "checkListStagiair" && (
                      <AddSection lang={lang} stagairId={data.id} />
                    )}
                </div>
              ) : null}
            </>
          ) : (
            // Render AddSectionBegeleider for stagebegeleider
            checkListName === "checklistStagebegeleider" && (
              <div className="flex flex-col">
                {data.checklistSectionStagebegeleider.map(
                  (checklist, index: number) => (
                    <div
                      key={index}
                      style={{
                        display:
                          index === selectedSectionBegleider ? "block" : "none",
                      }}
                    >
                      {/* Existing Section for Stagebegeleider */}
                      <div
                        className="flex justify-between mb-2"
                        style={{ width: "100%" }}
                      >
                        <div className="flex gap-2">
                          <div className="font-medium">
                            {checklist.sectionTitle}
                          </div>
                          <div>
                            <EditChecklistSectionBegeleiderTitle
                              role={UserRole.ADMIN || UserRole.STAGEBEGELEIDER}
                              userRole={role}
                              lang={lang}
                              item={checklist}
                            />
                          </div>
                        </div>
                        <div className="float-right">
                          {role === UserRole.STAGEBEGELEIDER ||
                          role === UserRole.ADMIN ? (
                            <AddSectionBegeleider
                              lang={lang}
                              stagairId={data.id}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col justify-start mb-4 gap-3">
                        {checklist.checklistItem &&
                          checklist.checklistItem.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 border-2 border-gray-500-400 p-2 rounded"
                            >
                              {" "}
                              {spinner == true &&
                              stagiairLoadingStateId === item.id ? ( //loading
                                <div className="mt-3">
                                  <ClipLoader
                                    color={"black"}
                                    loading={true}
                                    size={16}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                  />
                                </div>
                              ) : (
                                <input
                                  className="w-4"
                                  checked={item.isChecked}
                                  type="checkbox"
                                  name="item"
                                  onChange={() =>
                                    handleCheckboxChangeBeg(
                                      item.id,
                                      !item.isChecked
                                    )
                                  }
                                />
                              )}
                              <p>
                                {item.title} <br />
                                <div className="text-sm text-gray-400">
                                  {formatDate(item.date)}
                                </div>
                              </p>
                              <EditButtonBegleider
                                role={
                                  UserRole.ADMIN || UserRole.STAGEBEGELEIDER
                                }
                                userRole={role}
                                lang={lang}
                                item={item}
                              />
                            </div>
                          ))}
                      </div>
                      <div className="mb-10">
                        <AddCheckListItemBegleider
                          checklistItemId={checklist.id}
                          lang={lang}
                        />
                      </div>
                    </div>
                  )
                )}

                {/* Render AddSectionBegeleider only if there are no existing sections */}
                {role === UserRole.STAGEBEGELEIDER ||
                role === UserRole.ADMIN ? (
                  <div>
                    {/* Render AddSection only if there are no existing sections */}
                    {data.checklistSectionStagebegeleider.length === 0 &&
                      checkListName === "checklistStagebegeleider" && (
                        <AddSectionBegeleider lang={lang} stagairId={data.id} />
                      )}
                  </div>
                ) : null}
              </div>
            )
          )}
        </div>

        {/* Beschrijving */}

        <div className="flex flex-col order-2">
          <div className="xs:hidden l:flex flex-col rounded-lg mt-10 ">
            <div className="flex justify-start rounded-lg  ">
              <Link
                target="_blank"
                href={{
                  pathname: `/${lang}/delen`,
                  query: { id: id, lang: lang },
                }}
              >
                <button
                  type="button"
                  className="mr-10 flex justify-center items-center w-32 h-10 bg-[#002548] text-white rounded-lg  hover:bg-[#21415f]"
                >
                  <AiOutlineShareAlt className=" text-white  mr-3" />
                  {translation.detail.share}
                </button>
              </Link>
              <button
                type="button"
                className="bg-[#002548] text-white w-60 h-10 rounded-lg  hover:bg-[#21415f]"
              >
                {translation.detail.writeevaluationform}
              </button>
            </div>
            {data.stagebeschriving.length > 0 ? (
              data.stagebeschriving.map((stagebeschriving) => (
                <StageBeschrijving
                  key={stagebeschriving.id}
                  role={
                    role === UserRole.STAGEBEGELEIDER
                      ? UserRole.STAGEBEGELEIDER
                      : UserRole.ADMIN
                  }
                  userRole={role}
                  id={id}
                  data={data}
                  stagebeschriving={stagebeschriving}
                  getStagebegeleiderName={getStagebegeleiderName}
                  lang={lang}
                />
              ))
            ) : (
              <div className="text-gray-600 text-base mt-4 flex">
                <p>{translation.detail.nodata}</p>
              </div>
            )}
          </div>
          {/* Documenten */}
          <div className="flex flex-col rounded-lg  mt-0 l:mt-10">
            <div className="bg-blue-50  rounded-lg overflow-hidden  mt-10 px-7 py-3 text-[#002548] w-full">
              <h2 className="text-2xl mt-5 font-semibold text-[#002548]">
                {translation.detail.documents}
              </h2>
              {data.documents.length > 0 ? (
                data.documents.map((document) => (
                  <div key={document.id} className="flex justify-start w-full">
                    <button
                      type="button"
                      onClick={() =>
                        useStagairStore.setState({ documentId: document.id })
                      }
                    >
                      <DocumentDetail document={document} lang={lang} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex">
                  <p>{translation.detail.nodocuments}</p>
                </div>
              )}
              <UploadDocument stagiairId={id} lang={lang} />
            </div>
            <div className="l:hidden gap-2 py-3 flex justify-center rounded-lg">
              <Link
                target="_blank"
                href={{
                  pathname: `/${lang}/delen`,
                  query: { id: id, lang: lang },
                }}
              >
                <button
                  type="button"
                  className="flex justify-center items-center p-3 h-16 bg-[#002548] text-white rounded-lg  hover:bg-[#21415f]"
                >
                  <AiOutlineShareAlt className=" text-white  mr-2" />
                  {translation.detail.share}
                </button>
              </Link>
              <button
                type="button"
                className="bg-[#002548] text-white w-2/3 p-3 h-16 rounded-lg  hover:bg-[#21415f]"
              >
                {translation.detail.writeevaluationform}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StagiairDetailPage;
