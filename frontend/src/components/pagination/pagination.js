import React from 'react';
import ReactPaginate from 'react-paginate';

export default function PaginationComponent({ handlePageChange, count, ...props }) {
	return <ReactPaginate previousLabel={'<<'} nextLabel={'>>'} breakLabel={'...'} breakClassName={'break-me'} pageCount={count} marginPagesDisplayed={0} pageRangeDisplayed={3} onPageChange={handlePageChange} breakLinkClassName={'page-link'} containerClassName={'pagination'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'} />;
}
