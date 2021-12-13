import React from "react";
import propTypes from "prop-types";
import "./styles.css";

const Pagination = ({ count, onSet, curPage }) => {
  const pages = [];
  for (let i = 1; i <= count / 10; i++) {
    pages.push(i);
  }

  return (
    <ul className="Pagination">
      {pages.map((page) => (
        <li
          className={
            curPage === page ? "Pagination__page Pagination__page-current" : "Pagination__page"
          }
          key={page}
          onClick={curPage === page ? () => false : () => onSet(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  onSet: propTypes.func.isRequired,
};

Pagination.defaultProps = {
  count: 0,
  onSet: () => {},
};

export default React.memo(Pagination);
