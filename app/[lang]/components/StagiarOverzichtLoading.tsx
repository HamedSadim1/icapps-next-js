import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const TableSkeleton = () => {
  return (
    <div role="status" className="max-w-full overflow-x-auto animate-pulse">
      <section className="flex xs:flex-col sm:flex-row mt-9 flex-wrap justify-start ">
        <div className="ml-20">
          <h1 className="xs:text-2xl sm:text-4xl xs:mb-8 sm:mb-0 font-medium text-[#002548] ">
            Stagiair
          </h1>
        </div>
        <div className="flex xs:justify-start sm:justify-center items-center flex-auto sm:pr-[5rem] xs:w-full sm:w-auto">
          <div className="xs:w-full sm:w-auto flex items-center xs:px-3 text-gray-700 rounded border">
            <AiOutlineSearch className="w-5 h-5" />
            <input
              type="text"
              placeholder="Zoek stagiar"
              className="px-4 py-2 text-gray-700 bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>
      </section>
      <table className="min-w-full bg-white border border-gray-200 mt-12">
        <thead className="text-transform: uppercase text-[#6F7784]">
          <tr>
            <th className="px-6 py-1 text-left font-normal">
              NAAM
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </th>
            <th className="px-6 py-1 text-left font-normal">
              E-MAIL
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            </th>
            <th className="px-6 py-1 text-left font-normal">
              STARTDATUM
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </th>
            <th className="px-6 py-1 text-left font-normal">
              EINDDATUM
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            </th>
            <th className="px-6 py-1 text-left font-normal">
              STAGESUPERVISOR(S)
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            </th>
            <th className="px-6 py-1">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </th>
          </tr>
        </thead>
        <tbody className="border text-[#002548]">
          {Array.from({ length: 10 }, (_, index) => (
            <tr
              key={index}
              className="hover:bg-gray-200 cursor-pointer even:bg-[#FFFFFF]  odd:bg-slate-100"
            >
          <td className="px-6 py-4 p-10">
           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 "></div>
            </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]">
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
