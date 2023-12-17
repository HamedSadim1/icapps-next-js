import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface PaginationProps {
  spinner:boolean,
  emailPerPage: number;
  totalEmails: number;
  paginate: (number: number) => void;
  currentPage: number;
}

const Pagination = ({
  spinner,
  paginate,
  totalEmails,
  currentPage,
}: PaginationProps) => {

  //? create page numbers
  const pageNumbers: number[] = [];
  const [idPage,setIdPage] = useState(0);

  //? loop through total number of emails
  //? and push the page number to the array
  for (let i = 1; i <= totalEmails; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex flex-row justify-center items-center mt-8 w-full">
      <ul className="flex flex-row justify-center items-center">
        {pageNumbers.map((number,index) => (
          <li key={number}>
            {spinner && index == idPage ? 
          <button
          className={`py-2 px-4 bg-gray-200 hover:bg-gray-400 ${
            currentPage === number && "bg-slate-900 text-white"
          }`}
        >
          <ClipLoader
                        color={"white"}
                        loading={true}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
        </button>
        :<button
        onClick={() => (setIdPage(index),paginate(number))}
        className={`py-2 px-4 bg-gray-200 hover:bg-gray-400 ${
          currentPage === number && "bg-slate-900 text-white"
        }`}
      >
        {number}
      </button>  
          }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
