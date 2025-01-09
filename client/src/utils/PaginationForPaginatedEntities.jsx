import React from "react";

const Pagination = ({ currentPage, totalPages, paginate, disableButtons }) => {
  const pageNumbers = [];

  if (currentPage > 1) {
    pageNumbers.push(currentPage - 1);
  }

  pageNumbers.push(currentPage);

  if (currentPage < totalPages) {
    pageNumbers.push(currentPage + 1);
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-4">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(1)}
            className="px-4 py-2 text-sm bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
            disabled={currentPage === 1 || disableButtons}
          >
            First Page
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 text-sm rounded-lg ${
                currentPage === number
                  ? "bg-orange-500 text-white"
                  : "bg-orange-200 hover:bg-gray-300"
              }`}
              disabled={disableButtons}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(totalPages)}
            className="px-4 py-2 text-sm bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
            disabled={currentPage === totalPages || disableButtons}
          >
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
