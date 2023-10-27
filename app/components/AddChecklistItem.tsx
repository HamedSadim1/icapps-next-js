import useStagair from '@/hooks/useStagair';
"use client";
import { AiOutlinePlus } from "react-icons/ai";

import { MdClose } from "react-icons/md";
import { FormEvent, useState } from "react";
import { GoGoal } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import useStagairStore from "@/store";
import usePostDoel from "@/hooks/usePostDoel";
import {inputFormDater} from "@/lib"
import usePostChecklistStagiair from '@/hooks/usePostChecklistStagiair';
import {MouseEvent} from "react"

interface AddChecklistProps{
  stagiairId:string;
}
export const AddCheckListItem = ({stagiairId}:AddChecklistProps) => {
  
  const [showDiv, setDiv] = useState(false);

  const item=useStagairStore((s)=>s.checklistStagiair);
  const setItem = useStagairStore((s) => s.setChecklistStagiair);

 const  {mutate} = usePostChecklistStagiair(item, stagiairId)

 const handlePostChecklistStagiair = async (e:FormEvent<HTMLFormElement>) => {
 e.preventDefault ();
  await mutate();
  setDiv(false);
 }


  return (
    <>
    {showDiv == false &&
      <button className="text-gray-500 hover:text-gray-900 z-0" onClick={() => setDiv(true)}> <AiOutlinePlus className="float-left mt-1" /> Item toevoegen</button>
  }{showDiv == true &&(
    <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
    <div className="bg-white shadow-xl w-4/10 h-auto pb-7 text-gray-500 z-2 rounded-md">
   
       <button className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl" onClick={() => setDiv(false)}><MdClose>x</MdClose></button>
       <div className="flex flex-col pt-16 mx-16">
              <h2 className="pb-10 text-[#002548] font-semibold text-2xl flex">
                Sectie toevoegen &nbsp;{" "}
                
              </h2> 
              <form onSubmit={handlePostChecklistStagiair}>
          <label htmlFor="titel">Item</label>
    <input
      type="text"
      className="w-full p-3 border-2 rounded-md mb-5"
      name="titel"
      id="titel"
      onChange={(e) => setItem({ ...item, title: e.target.value })}
    />
    <label htmlFor="einddatum">Datum</label>
    <br />
    <input
      className="p-3 border-2 rounded-md mb-5"
      type="date"
      name="einddatum"
      id="einddatum"
      onChange={(e) => setItem({ ...item,date:e.target.value })}
    />
    <div className="w-full text-right">
      <button
        className="mr-4 px-7 py-2 rounded-md bg-gray-200 text-[#002548] font-semibold"
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
  )
  
}