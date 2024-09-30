"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
};

// Pagination component to navigate between pages.
function Pagination({ currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if it's the first page
  const isFirstPage = currentPage <= 1;

  const updatePage = (newPageNumber: number) => {
    if (newPageNumber < 1) return; // Prevent negative page numbers

    const params = new URLSearchParams(searchParams?.toString());
    if (newPageNumber <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPageNumber));
    }

    const queryString = params.toString();

    // If params.toString() returns an empty string, we set url to '/' instead of '?'.
    const url = queryString ? `?${queryString}` : "/";
    router.push(url);
  };

  const previous = () => {
    updatePage(currentPage - 1);
  };

  const next = () => {
    updatePage(currentPage + 1);
  };

  return (
    <div className="my-4 flex justify-between w-full">
      {!isFirstPage && (
        <button className="flex items-center gap-2 rounded-md bg-sky-200 px-4 py-2 hover:bg-sky-300 dark:bg-slate-800 dark:hover:bg-sky-700" onClick={previous}>
          <FaLongArrowAltLeft /> Previous
        </button>
      )}
      <button className="ml-auto flex items-center gap-2 rounded-md bg-sky-200 px-4 py-2 hover:bg-sky-300 dark:bg-slate-800 dark:hover:bg-sky-700" onClick={next}>
        Next <FaLongArrowAltRight />
      </button>
    </div>
  );
}

export default Pagination;
