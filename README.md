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

``

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

```
