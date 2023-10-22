"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FormEvent, useEffect, useState, MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import useStagairStore from "@/store";
import useDeletePost from "@/hooks/useDeletePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import { inputFormDater } from "@/lib";
import usePost from "@/hooks/usePost";

interface Props {
  postId: string;
}

const DeletePostModal = ({ postId }: Props) => {
  const [showDiv, setDiv] = useState<boolean>(false);
  // const postId = useStagairStore((s) => s.updatePostId);
  const { data, error, isLoading } = usePost(postId);
  console.log("Fetched Data:", data);

  const doel = useStagairStore((s) => s.updatePost);
  const setDoel = useStagairStore((s) => s.setUpdatePost);

  // const { mutate } = useDeletePost(postId);
  // const { mutate: updatePost } = useUpdatePost(doel, postId);

  useEffect(() => {
    useStagairStore.setState({ updatePost: data });
    // console.log( "deletePost" + doel); // Check the values of doel state here
  }, [data, postId]);

  //! Delete the doel button
  // const HandleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   await mutate();
  //   setDiv(false);
  // };

  //! Update the doel button
  // const HandleUpdate = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await updatePost();
  //   setDiv(false);
  // };

  if (isLoading) {
    return null;
  }

  if (error) {
    <div>{error.message}</div>;
  }

  const handleCloseModal = () => {
    // Reset updatePost state to an empty object

    setDiv(false);

  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex px-4 py-2 text-blue-900 font-semibold bg-gray-200 rounded-md hover:bg-gray-300">
          <button onClick={() => setDiv(true)} className="">
            <AiOutlinePlus className="float-left mt-1"></AiOutlinePlus>
            &nbsp; Edit Post
          </button>
        </div>
      </div>
      {showDiv && (
        <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
            <button
              className="btn btn-sm btn-circle btn-ghost float-right text-xl mr-3 mt-3"
              onClick={handleCloseModal}
            >
              <MdClose />
            </button>
            <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-blue-900 font-semibold text-2xl flex">
                Edit Doel &nbsp;
                {/* Delete button */}
                <button>
                  <BsTrash className="mt-1 text-red-500"></BsTrash>
                </button>
              </h2>
              {/* Form */}
              <form>
                <label htmlFor="titel">Titel</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="titel"
                  id="titel"
                  value={doel.title}
                  onChange={(e) => setDoel({ ...doel, title: e.target.value })}
                />
                <label htmlFor="beschrijving">Beschrijving</label>
                <textarea
                  className="w-full p-3 border-2 rounded-md mb-5"
                  name="beschrijving"
                  id="beschrijving"
                  value={doel.body}
                  onChange={(e) => setDoel({ ...doel, body: e.target.value })}
                ></textarea>
                <label htmlFor="einddatum">Eind datum</label>
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
                <div className="w-full text-right">
                  {/* close button */}
                  <button
                    className="mr-2 px-7 py-2 rounded-md bg-gray-200 text-blue-900 font-semibold"
                    onClick={() => setDiv(false)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2 rounded-md bg-blue-900 text-white font-semibold"
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
