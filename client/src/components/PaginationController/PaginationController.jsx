// eslint-disable-next-line react/prop-types
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-3">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`lg:px-4 lg:py-2 py-1 px-3 text-base  lg:text-lg bg-black text-white rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`lg:px-4 lg:py-2 py-1 px-3 text-base lg:text-lg bg-black text-white rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>

      {/* Page Number Display */}
      <span className="lg:px-4 lg:py-2 p-2 text-sm lg:text-base text-gray-800 bg-gray-200 rounded-md font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`lg:px-4 lg:py-2 py-1 px-3 text-base lg:text-lg bg-black text-white rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`lg:px-4 lg:py-2 py-1 px-3 text-base lg:text-lg  bg-black text-white rounded-md shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Last
      </button>
    </div>
  );
};

export default PaginationControls;
