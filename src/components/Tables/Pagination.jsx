import ReactPaginate from "react-paginate";

/**
 * Pagination component. 
 * 
 * @param {number} totalPages - The total number of pages.
 * @param {function} handlePageClick - The function to call when a page is clicked.
 * @returns {ReactElement} The pagination component.
 */
const Pagination = ({ totalPages, handlePageClick }) => {

    return (
      <ReactPaginate
      previousLabel={"السابق"}
      nextLabel={"التالي"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages} 
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick} 
      containerClassName={"pagination"} 
      activeClassName={"active"} 
    />

    );
  };
  
  export default Pagination;