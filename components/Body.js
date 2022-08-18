import React from "react";
import Image from "next/image";
import googleImg from "/public/assets/google-logo.png";
import { BsSearch } from "react-icons/bs";
import { TbMicrophone } from "react-icons/tb";
function Body() {
  return (
    <form className="flex flex-col items-center mt-44 flex-grow w-4/5">
      <Image src={googleImg} width={300} height={150} />
      <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
        <BsSearch className="h-5 mr-3 text-gray-500" />
        <input type="text" className="focus:outline-none flex-grow" />
        <TbMicrophone className="h-5 ml-3 text-gray-500" />
      </div>
      <div className="flex flex-col w-1/2 space-y-2  justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
        <button className="button">Google Search</button>
        <button className="button">I'm Feeling Lucky</button>
      </div>
    </form>
  );
}

export default Body;
