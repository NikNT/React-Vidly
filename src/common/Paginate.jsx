import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Paginate({ pageSize, itemsCount, currentPage, onPageChange }) {
  const pageNumber = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageNumber + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Paginate.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginate;
