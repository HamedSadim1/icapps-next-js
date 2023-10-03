"use client";
import { AiOutlineSearch } from "react-icons/ai";
import Emails from "./Emails";
import { useState } from "react";

const WelcomePage = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <section className="flex flex-row mt-9 flex-wrap justify-start ">
        <div className="pl-[5rem]">
          <h1 className="text-4xl font-bold text-gray-800 ">Stagair</h1>
        </div>
        <div className="flex items-center justify-center justify-self-center rounded-none-full flex-auto pr-[5rem] ">
          <div className="flex items-center justify-center  px-4 py-1 space-x-4 text-gray-700 rounded-none-full border">
            <AiOutlineSearch className="w-5 h-5" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Zoek stagairs"
              className="px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </section>
      <Emails search={search} />
    </>
  );
};

export default WelcomePage;
