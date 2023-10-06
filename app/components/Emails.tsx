"use client";
import { StagaireFakeData } from "@/data";
import { sortDate } from "@/lib";
import Email from "@/app/components/Email";
import { useMemo, useState } from "react";
import Pagination from "@/app/components/Pagination";

interface EmailsProps {
  search: string;
}

const Emails = ({ search }: EmailsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [emailPerPage] = useState<number>(10);

  //? sort and paginate filtered data
  const sortedData = sortDate(StagaireFakeData);

  const indexOfLastEmail: number = currentPage * emailPerPage;
  const indexOfFirstEmail: number = indexOfLastEmail - emailPerPage;
  const currentEmail = sortedData.slice(indexOfFirstEmail, indexOfLastEmail);

  // //? filter data based on search
  const filteredDate = useMemo(() => {
    const searchTerm =
      search.toLowerCase().length > 3 ? search.toLowerCase() : "";
    return currentEmail.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }, [search, currentEmail]);

  return (
    <>
      <section className="flex flex-wrap flex-row justify-center  ml-[5rem]">
        <table className="md:w-full bg-white border border-gray-200 mt-12">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {/* {filteredDate.map((item) => (
              <Email key={item.id} item={item} />
            ))} */}
          </tbody>
        </table>
        {filteredDate.length == 0 && (
          <tr className="flex flex-wrap flex-row justify-center items-center ">
            <h2 className="text-2xl font-bold mt-12 text-center text-gray-500">
              No result found
            </h2>
          </tr>
        )}
      </section>

      {filteredDate.length !== 0 && (
        <Pagination
          emailPerPage={emailPerPage}
          totalEmails={sortedData.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Emails;
