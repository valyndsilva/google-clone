import React from "react";
import Head from "next/head";
import { SearchHeader } from "../components";
import Response from "../Response";
function Search({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>term - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchHeader />
    </div>
  );
}

export default Search;

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
