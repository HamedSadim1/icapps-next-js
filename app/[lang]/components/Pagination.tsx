interface PaginationProps {
  emailPerPage: number;
  totalEmails: number;
  paginate: (number: number) => void;
  currentPage: number;
}

const Pagination = ({
  emailPerPage,
  paginate,
  totalEmails,
  currentPage,
}: PaginationProps) => {
  //? create page numbers
  const pageNumbers: number[] = [];
  //? loop through total number of emails
  //? and push the page number to the array
  for (let i = 1; i <= Math.ceil(totalEmails / emailPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex flex-row justify-center items-center mt-8 w-full">
      <ul className="flex flex-row justify-center items-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`py-2 px-4 bg-gray-200 ${
                currentPage === number && "bg-slate-900 text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
