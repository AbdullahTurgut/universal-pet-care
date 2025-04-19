import React from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  let active = currentPage;
  let items = [];

  for (
    let number = 1;
    number <= Math.ceil(totalItems / itemsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex justify-content-end mt-4 mb-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Paginator;
