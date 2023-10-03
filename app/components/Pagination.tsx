interface PaginationProps {
  emailPerPage: number;
  totalEmails: number;
  paginate: (number: number) => void;
}

const Pagination = ({
  emailPerPage,
  paginate,
  totalEmails,
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
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none"
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
