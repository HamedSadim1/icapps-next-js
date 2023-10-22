"use client";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useEffect, useState, MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useStagairStore from "@/store";
import useDeletePost from "@/hooks/useDeletePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { inputFormDater } from "@/lib";
import usePost from "@/hooks/usePost";

const DeletePostModal = () => {
  const [showDiv, setDiv] = useState<boolean>(false);
  const postId = useStagairStore((s) => s.updatePostId);
  const { data,error,isLoading } = usePost(postId);
  console.log(data);
  console.log(postId);
  const doel = useStagairStore((s) => s.updatePost);

  const setDoel = useStagairStore((s) => s.setUpdatePost);

  const { mutate } = useDeletePost(postId);
  const { mutate: updatePost } = useUpdatePost(doel, postId);

  useEffect(() => {
    if (data || postId) {
      useStagairStore.setState({ doel: data });
    }
  }, [data, postId]);

  //! Delete the doel button
  const HandleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutate();
    setDiv(false);
  };

  //! Update the doel button
  const HandleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost();
    setDiv(false);
  };

  if(isLoading){
    return    <div>Loading...</div>
  }

  if(error){
    <div>{error.message}</div>
  }

  return (
    <>
        <div className="float-left">
          <button onClick={() => setDiv(true)} className="">
          <AiOutlineEdit className="text-2xl mt-3" />
          </button>
        </div>
      {showDiv && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={() => setDiv(false)}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                Doel wijzigen &nbsp;
                {/* Delete button */}
                <button>
                  <BsTrash className="mt-1 text-red-500"></BsTrash>
                </button>
              </h2>
              {/* Form */}
              <form>
                <label className="float-left" htmlFor="titel">Titel</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="titel"
                  id="titel"
                  value={doel.title}
                  onChange={(e) => setDoel({ ...doel, title: e.target.value })}
                />
                <label className="float-left" htmlFor="beschrijving">Beschrijving</label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={doel.body}
                  onChange={(e) => setDoel({ ...doel, body: e.target.value })}
                ></textarea>
                <div className="float-left">
                <label className="float-left" htmlFor="einddatum">Einddatum</label>
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
                />
                </div>
                <div className="w-full text-right mt-28">
                  <button
                    className="mr-4 px-7 py-2 rounded-md bg-gray-200 text-[#002548] font-semibold"
                    onClick={() => setDiv(false)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-[#002548] text-white font-semibold"
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
