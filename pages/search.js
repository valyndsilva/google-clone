import React from "react";
import Head from "next/head";
import { SearchHeader, SearchResults } from "../components";
import Response from "../Response";
import { useRouter } from "next/router";
function Search({ results }) {
  // console.log(results);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchHeader />
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  //Pagination Logic
  const startIndex = Number(context.query.start || 0);

  const useDummyData = false;
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
