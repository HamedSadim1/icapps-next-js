"use client";
import { MdClose } from "react-icons/md";
import { FormEvent, useEffect, MouseEvent, useState } from "react";
import { BsTrash } from "react-icons/bs";
import useStagairStore from "@/store";
import useDeletePost from "@/hooks/useDeletePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { inputFormDater } from "@/lib";
import { IPost } from "@/types";
import getTranslation from "./getTranslation";
import { Locale } from "@/i18n-config";
import { ClipLoader } from "react-spinners";
import { set } from "zod";

interface DeletePostModalProps {
  postId: string;
  post: IPost;
  lang: string;
}

const DeletePostModal = ({ postId, post, lang }: DeletePostModalProps) => {
  console.log(
    "🚀 ~ file: DeletePostModal.tsx:20 ~ DeletePostModal ~ postIdpostId:",
    postId
  );
  const translation = getTranslation(lang as Locale);
  const updatePostId = useStagairStore((s) => s.updatePostId);
  const doel = useStagairStore((s) => s.updatePost);
  const setDoel = useStagairStore((s) => s.setUpdatePost);
  const isPostModal = useStagairStore((s) => s.isPostModal);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);
  const [spinner, setSpinner] = useState(false);//loading

  const { mutate } = useDeletePost(updatePostId);

  const { mutate: updatePost } = useUpdatePost(doel, updatePostId);

  useEffect(() => {
    if (post && postId) {
      useStagairStore.setState({ updatePost: post });
    }
  }, [post, postId]);
  //! Delete the doel button
  const HandleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSpinner(true);//loading
    await mutate();
    setTimeout(() => {
      setSpinner(false);//loading
      setIsPostModal(false);
    }, 7000);
  };

  //! Update the doel button
  const HandleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);//loading
    await updatePost();
    setTimeout(() => {
      setSpinner(false);//loading
      setIsPostModal(false);
    }, 7000);  };

  const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPostModal(false);
  };
  if (typeof window !== "undefined") { // close image if escape is pressed
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setIsPostModal(false);
      }
    })

  }

  return (
    <>
      {isPostModal && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-25 bg-gray-700">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={handleCloseModal}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                {translation.detail.editgoal} &nbsp;
                {/* Delete button */}
                <button onClick={HandleDelete}>
                  <BsTrash className="mt-1 text-red-400 hover:text-red-600"></BsTrash>
                </button>
              </h2>
              {/* Form */}
              <form onSubmit={HandleUpdate}>
                <label className="float-left" htmlFor="titel">
                  {translation.detail.title}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="titel"
                  id="titel"
                  value={doel.title}
                  onChange={(e) => setDoel({ ...doel, title: e.target.value })}
                />
                <label className="float-left" htmlFor="beschrijving">
                  {translation.detail.description}
                </label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={doel.body}
                  onChange={(e) => setDoel({ ...doel, body: e.target.value })}
                ></textarea>
                <div className="float-left">
                  <label className="float-left" htmlFor="einddatum">
                    {translation.detail.enddate}
                  </label>
                  <br />
                  <input
                    className="p-3 border-2 rounded-md mb-5"
                    type="date"
                    name="einddatum"
                    id="einddatum"
                    value={inputFormDater(doel.endDate)}
                    onChange={(e) =>
                      setDoel({ ...doel, endDate: e.target.value })
                    }
                    min={inputFormDater(new Date().toISOString().split("T")[0])}
                  />
                </div>
                <div className="w-full text-right mt-28">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-blue-50 text-[#002548] font-semibold hover:bg-blue-200"
                    onClick={handleCloseModal}
                  >
                    {translation.detail.cancel}
                  </button>
                  {spinner == true ? //loading
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500 pointer-events-none"
                    >
                      <ClipLoader
                        color={"#ffffff"}
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                    :
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                    >
                      {translation.detail.save}
                    </button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeletePostModal;
