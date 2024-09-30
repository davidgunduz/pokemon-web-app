"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Supports dynamic page numbers and ellipsis for better navigation
  const updatePage = (newPageNumber: number) => {
    if (newPageNumber < 1 || newPageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams?.toString());
    if (newPageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPageNumber));
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : "/";
    router.push(url);
  };

  const previous = () => {
    updatePage(currentPage - 1);
  };

  const next = () => {
    updatePage(currentPage + 1);
  };

  // Generate page numbers to display
  const pageNumbersToShow = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbersToShow.push(i);
    }
  } else {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }
  }

  return (
    <div className="my-8 flex justify-center items-center w-full flex-wrap gap-2">
      {/* Previous Button */}
      <button
        className={`flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full ${
          currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700"
        }`}
        onClick={previous}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={16} />
      </button>

      {/* First Page and Ellipsis */}
      {currentPage > 3 && totalPages > 5 && (
        <>
          <button
            className="flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700"
            onClick={() => updatePage(1)}
          >
            <span className="sm:text-base text-sm">1</span>
          </button>
          {currentPage > 4 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Number Buttons */}
      {pageNumbersToShow.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => updatePage(pageNumber)}
          className={`flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full ${
            pageNumber === currentPage ? "bg-blue-500 text-white dark:bg-blue-700" : "text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700"
          }`}
        >
          <span className="sm:text-base text-sm">{pageNumber}</span>
        </button>
      ))}

      {/* Last Page and Ellipsis */}
      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2">...</span>}
          <button
            className="flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700"
            onClick={() => updatePage(totalPages)}
          >
            <span className="sm:text-base text-sm">{totalPages}</span>
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className={`flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full ${
          currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-700"
        }`}
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
