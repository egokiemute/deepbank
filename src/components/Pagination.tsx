import { useVariables } from "@/store/variables";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  pageNumber: number;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  //   pageNumber,
  total,
}) => {
  const { page, setPage, limit } = useVariables(); // Assuming limit is part of useVariables

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const halfRange = 2; // Number of pages to show before and after the current page
    let startPage = Math.max(page - halfRange, 1);
    let endPage = Math.min(page + halfRange, totalPages);

    // Adjust the start and end pages to always display 5 pages
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(endPage - 4, 1);
      }
    }

    // Add ellipsis before the first visible page if needed
    if (startPage > 1) {
      pages.push(
        <span
          key="start-ellipsis"
          className="flex h-7 w-8 items-center justify-center rounded-[2px] border border-[#0000001A] bg-white"
        >
          ...
        </span>,
      );
    }

    // Render page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          onClick={() => setPage(i)}
          key={i}
          className={`flex h-7 w-8 cursor-pointer items-center justify-center rounded-[2px] border ${
            i === page
              ? "border-[#000000] bg-[#0000000F] text-[#000000]"
              : "border-[#0000001A] bg-white"
          }`}
        >
          {i}
        </span>,
      );
    }

    // Add ellipsis after the last visible page if needed
    if (endPage < totalPages) {
      pages.push(
        <span
          key="end-ellipsis"
          className="flex h-7 w-8 items-center justify-center rounded-[2px] border border-[#0000001A] bg-white"
        >
          ...
        </span>,
      );
    }

    return pages;
  };

  return (
    <section className="container mx-auto my-7 flex items-center justify-center gap-4 max-xs:flex-col">
      <p className="text-paragraph-lg text-[#000000A3]">
        {total && `Showing ${startItem} - ${endItem} of ${total}`}
      </p>

      <div className="flex items-center overflow-hidden rounded-[4px] bg-[#0000001A] text-paragraph-sm">
        <span className="flex h-7 w-8 items-center justify-center rounded-[2px] border border-[#0000001A] bg-white">
          <ArrowLeft
            size={16}
            className={`cursor-pointer ${page === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handlePrevPage}
          />
        </span>
        {renderPageNumbers()}
        {/* {totalPages > 5 && (totalPage !== (page -3)) && (
          <span className="flex h-7 w-8 items-center justify-center rounded-[2px] border border-[#0000001A] bg-white">
            ...
          </span>
        )} */}
        <span className="flex h-7 w-8 items-center justify-center rounded-[2px] border border-[#0000001A] bg-white">
          <ArrowRight
            size={16}
            className={`cursor-pointer ${page === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handleNextPage}
          />
        </span>
      </div>
    </section>
  );
};

export default Pagination;
