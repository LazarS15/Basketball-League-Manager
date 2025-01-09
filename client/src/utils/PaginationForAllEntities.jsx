import React from "react";

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  
  if (currentPage > 1) pageNumbers.push(currentPage - 1);  
  pageNumbers.push(currentPage);  
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1);  

  return (
    <nav aria-label="Pagination" className="mt-6 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          <button
            className="px-4 py-2 text-sm bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First Page
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === number
                  ? "bg-orange-500 text-white"
                  : "bg-orange-200 hover:bg-gray-300"
              } transition`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-4 py-2 text-sm bg-orange-200 rounded-lg hover:bg-orange-300 disabled:opacity-50"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last Page
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
