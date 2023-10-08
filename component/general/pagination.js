import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, pageCount, currentPage }) => {
  return pageCount > 0 ? (
    <div className="mt-6">
      <div className="">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          forcePage={currentPage}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="flex items-center"
          containerClassName="flex items-center"
          previousClassName="flex justify-center items-center rounded-md ml-3 list-none"
          previousLinkClassName="flex justify-center items-center rounded-md px-4"
          nextClassName="flex justify-center items-center rounded-md ml-3 list-none"
          nextLinkClassName="flex justify-center items-center rounded-md px-4"
          pageClassName="flex max-h-14 justify-center items-center ml-3 list-none h-14"
          pageLinkClassName="rmax-h-14 ounded-md flex justify-center items-center h-14"
          activeClassName="flex items-center justify-center rounded-md list-none ml-3"
          activeLinkClassName=" h-14 max-h-14 flex justify-center items-center "
          breakClassName="flex	 ml-3 list-none"
          breakLinkClassName="flex no-underline"
          disabledClassName="ml-3 list-none"
          disabledLinkClassName="bg-grayish/50 flex justify-center items-center p-2"
        />
      </div>

      <div className="hidden">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="rpPagination"
          containerClassName="rpPagination"
          previousClassName="rectangleButtonSecondary sidePadding paginationLink"
          nextClassName="rectangleButtonSecondary sidePadding paginationLink"
          pageClassName="max-h-14 paginationLink"
          pageLinkClassName="max-h-14 paginationLink"
          activeClassName="squareButtonPrimary list-none ml-3"
          activeLinkClassName="squareButtonPrimary list-none ml-3"
          breakClassName="paginationBreak paginationLink"
          breakLinkClassName="paginationBreak no-link list-none ml-3"
          disabledClassName="rectangleButtonGrey list-none ml-3"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
