# Google Clone

- npx create-next-app -e with-tailwindcss project-name
- cd project-name
- npm run dev
- npm install react-icons --save
  -npm install classnames
- npm install @tailwindcss/line-clamp
  (https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp)

## Get Google API Key:

https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key
https://developers.google.com/custom-search/v1/using_rest
"Get a key" button -> Select or Create a New Project

## Get CSE ID:

To create a new search engine context - https://cse.google.com/cse/create/new OR https://programmablesearchengine.google.com/controlpanel/create

"Create a new search engine" button -> Enter Name: Google and Site to search: www.google.com -> Create

## Using dummy data to avoid exhausting the daily quota limit

Google Search API gives a certain limited quota of 100 requests per day.

### Get dummy data:

```
export async function getServerSideProps(context) {
  const useDummyData = false;
  // https://developers.google.com/custom-search/v1/using_rest
  const data = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${context.query.term}`
  ).then((res) => res.json());

  // After Server has rendered pass the results to the client as props
  return {
    props: { results: data },
  };
}
```

Console log the object "results" to the console in Dev tools and right-click "Copy object" and save it in a response.js file in the root directory.

```
export default (and paste the object here)
```

### Use dummy data:

Change useDummyData to true and update the data conditional.

```
import Response from "../Response";
...
export async function getServerSideProps(context) {
  const useDummyData = true;
  // https://developers.google.com/custom-search/v1/using_rest
  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${context.query.term}`
      ).then((res) => res.json());

  // After Server has rendered pass the results to the client as props
  return {
    props: { results: data },
  };
}
```

## Pagination

In search.js add the data that needs to be pre-fetched from the server and pass it as prop to the parent:

```
export async function getServerSideProps(context) {
//Pagination Logic
const startIndex = Number(context.query.start || 0);

const useDummyData = true;
// https://developers.google.com/custom-search/v1/using_rest
const data = useDummyData
? Response
: await fetch(
`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${context.query.term}&start=${startIndex}`
).then((res) => res.json());

// After Server has rendered pass the results to the client as props
return {
props: { results: data },
};
}

```

### Create usePagination.js Hook in hooks folder in the root directory:

```
import React from "react";
import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    // Our implementation logic will go here
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // console.log({totalPageCount});

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};


```

### Pagination Component with usePagination Hook:

```

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


```

### Use PaginationButtons Component without usePagination Hook:

```
import React from "react";
import { useRouter } from "next/router";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";

function PaginationButtons() {
  const router = useRouter();
  const startIndex = Number(router.query.start || 0);
  return (
    <section className="flex max-w-lg justify-between text-blue-700 mb-10">
      {startIndex >= 10 && (
        <Link
          href={`/search?term=${router.query.term}&start=${startIndex - 10}`}
        >
          <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
            <BsChevronLeft className="h-5" />
            <span>Previous</span>
          </div>
        </Link>
      )}
      <Link href={`/search?term=${router.query.term}&start=${startIndex + 10}`}>
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <BsChevronRight className="h-5" />
          <span>Next</span>
        </div>
      </Link>
    </section>
  );
}

export default PaginationButtons;

```

### Use the Pagination or PaginationButtons Component:

```
 import Link from "next/link";
import React, { useState, useMemo } from "react";
import PaginationButtons from "./PaginationButtons";
import Pagination from "./Pagination";

function SearchResults({ results }) {
  // usePagination Hook Implementation:
  const [currentPage, setCurrentPage] = useState(1);
  const data = results.items;
  let PageSize = 10;
  let totalResultsCount = Number(results.searchInformation?.totalResults);
  // console.log({ totalResultsCount });


  return (
    <section className="mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
      <p className="text-gray-600 text-sm mb-5 mt-3">
        About {results.searchInformation?.formattedTotalResults} results (
        {results.searchInformation?.formattedSearchTime} seconds)
      </p>
      {data?.map((result) => (
        <div key={result.link} className="max-w-xl mb-8">
          <div className="group">
            <Link href={result.link} className="text-sm">
              {result.formattedUrl}
            </Link>
            <Link href={result.link} className="text-sm">
              <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
                {result.title}
              </h2>
            </Link>
          </div>
          <p className="line-clamp-2">{result.snippet}</p>
        </div>
      ))}

      {/* Pagination with Prev and Next buttons: */}
      {/* <PaginationButtons /> */}

      {/* Pagination with Prev, Page No and Next buttons using usePagination Hook: */}
      <Pagination
        className="w-full flex justify-center"
        currentPage={currentPage}
        totalCount={totalResultsCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}

export default SearchResults;


```
