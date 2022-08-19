import Link from "next/link";
import React, { useState, useMemo } from "react";
import PaginationButtons from "./PaginationButtons";
import Pagination from "./Pagination";

function SearchResults({ results }) {
  // usePagination Hook Implementation:
  const data = results.items;
  let PageSize = 10;
  let totalResultsCount = Number(results.searchInformation?.totalResults);
  // console.log({ totalResultsCount });

  const [currentPage, setCurrentPage] = useState(1);

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
