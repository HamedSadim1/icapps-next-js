"use client";
import { MdClose } from "react-icons/md";
import { FormEvent, useEffect, MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useStagairStore from "@/store";
import useDeletePost from "@/hooks/useDeletePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { inputFormDater } from "@/lib";
import { IPost } from "@/types";

interface DeletePostModalProps {
  postId: string;
  post: IPost;
}

const DeletePostModal = ({ postId, post }: DeletePostModalProps) => {
  console.log(
    "🚀 ~ file: DeletePostModal.tsx:20 ~ DeletePostModal ~ postIdpostId:",
    postId
  );
  const updatePostId = useStagairStore((s) => s.updatePostId);
  const doel = useStagairStore((s) => s.updatePost);
  const setDoel = useStagairStore((s) => s.setUpdatePost);
  const isPostModal = useStagairStore((s) => s.isPostModal);
  const setIsPostModal = useStagairStore((s) => s.setIsPostModal);

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
    await mutate();
    setIsPostModal(false);
  };

  //! Update the doel button
  const HandleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost();
    setIsPostModal(false);
  };

  const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPostModal(false);
  };

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
                Doel wijzigen &nbsp;
                {/* Delete button */}
                <button onClick={HandleDelete}>
                  <BsTrash className="mt-1 text-red-400 hover:text-red-600"></BsTrash>
                </button>
              </h2>
              {/* Form */}
              <form onSubmit={HandleUpdate}>
                <label className="float-left" htmlFor="titel">
                  Titel
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
                  Beschrijving
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
                    Einddatum
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
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold hover:bg-blue-500"
                  >
                    Opslaan
                  </button>
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
