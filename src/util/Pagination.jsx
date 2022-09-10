import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Container = styled.div`
  font-size: 7rem;
`;

const Pagination = (props) => {
  const pageNumber = Math.ceil(props.products.length / props.pages);
  if (pageNumber === 1) return null;
  const pagerange = _.range(1, pageNumber + 1);

  return (
    <Container>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pagerange.map((page) => (
            <li
              className={
                props.currentPage === page ? "page-item active" : "page-item"
              }
              key={page}
            >
              <button className="page-link" onClick={() => props.onClick(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
};

export default Pagination;
