import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../hooks/usePagination";
import { useRouter } from "next/router";

function Pagination({
  className,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 1,
}) {
  const router = useRouter();
  const startIndex = Number(router.query.start || 0);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

//   console.log({ currentPage });
//   console.log({ totalCount });
//   console.log({ siblingCount });
//   console.log({ pageSize });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    router.push(`/search?term=${router.query.term}&start=${startIndex + 10}`);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    router.push(`/search?term=${router.query.term}&start=${startIndex - 10}`);
  };

  const onPageNoClick = (pageNo) => {
    onPageChange(pageNo);
    router.push(`/search?term=${router.query.term}&start=${(pageNo - 1) * 10}`);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    // <h1>Pagination</h1>

    <ul
      className={classnames("pagination-container", {
        [className]: className,
      })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            //   onClick={() => onPageChange(pageNumber)}
            onClick={() => onPageNoClick(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
}

export default Pagination;
