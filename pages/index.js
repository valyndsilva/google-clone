import Head from "next/head";
import { Header, Body, Footer } from "../components";
const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
    
      <Head>
        <title>Google Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <Body></Body>
      <Footer />
    </div>
  );
};

export default Home;
