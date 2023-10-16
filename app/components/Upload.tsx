"use client"
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai"
import { FaRegCircleUser } from "react-icons/fa6"
import { MdClose} from "react-icons/md"
import { useState } from "react";
import { authOption } from "../api/auth/[...nextauth]/route";


const Upload = () => {
    const [showDiv, setDiv] = useState(false);
    const [docText,setDocText] = useState("Bestand kiezen");
    const date = new Date();
    

    return (
        <>
            {showDiv == false &&
                <button className="text-gray-500 hover:text-gray-900 z-0" onClick={() => setDiv(true)}> + Document toevoegen</button>
            }{showDiv == true &&
                <div className="h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-75 bg-gray-900">
                    <div className="bg-white shadow-xl w-1/3 h-auto pb-7 text-gray-500 z-2 rounded-md">
                        <button className="btn btn-sm btn-circle btn-ghost float-right mt-3 mr-3 text-xl" onClick={() => setDiv(false)}><MdClose></MdClose></button>
                        <div className="flex pt-16 mx-16">
                            <label htmlFor="docKiezen" className="w-full text-xl bg-zinc-100 py-3 px-3 text-blue-900 font-medium">{(docText.substring(0,40))}{(docText != "Bestand kiezen") ? <AiOutlineDownload className="float-right text-3xl mx-auto bg-gray-100 top-0 right-0"></AiOutlineDownload> : <AiOutlineUpload className="float-right text-3xl mx-auto bg-gray-100 top-0 right-0"></AiOutlineUpload>}</label>
                            <input onChange={(e)=>setDocText(e.target.value)}  id="docKiezen" className="invisible w-0" type="file" name="document" />
                                {/* <input className="bg-cyan-600" type="file" name="document" id="Document" /> */}
                        </div>
                        {(docText != "Bestand kiezen") && <p className="bg-gray-100 mx-16 px-3 pb-3">{date.getDate()}/{date.getMonth()}/{date.getFullYear()} door Steve Jobs</p>}
                        <div className="mx-6 pt-5">
                            <FaRegCircleUser className="text-cyan-600 text-3xl float-left w-8 h-16"></FaRegCircleUser>
                            <b className="text-cyan-600 ml-4 text-sm font-semibold">Steve Jobs</b>
                            <p className="text-blue-900 pl-12">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
                            <button className="bg-white text-gray-500 hover:text-gray-900 border-none pl-1 ml-10 mt-2">+ Commentaar toevoegen</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Upload