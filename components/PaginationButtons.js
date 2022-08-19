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
