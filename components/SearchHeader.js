import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import googleImg from "/public/assets/google-logo.png";
import { GrClose } from "react-icons/gr";
import { HiMicrophone } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";
function SearchHeader() {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;
    if (!term) return;
    router.push(`/search?term=${term}`);
  };
  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center">
        <Image
          src={googleImg}
          width={100}
          height={50}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <form className="flex flex-grow max-w-3xl items-center px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg ">
          <input
            type="text"
            ref={searchInputRef}
            className="flex-grow w-full focus:outline-none"
          />
          <GrClose
            className="h-5 w-5 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125"
            onClick={() => (searchInputRef.current.value = "")}
          />
          <span className="border-l-2 pl-2 border-gray-300">
            <HiMicrophone className="h-5 w-5 mr-3 text-blue-400 hidden sm:inline-flex" />
          </span>
          <IoIosSearch className="h-6 w-6 mr-3 text-blue-400 hidden sm:inline-flex " />
          <button hidden type="submit" onClick={search}>
            Search
          </button>
        </form>
        <Avatar
          url="https://lh3.googleusercontent.com/ogw/AOh-ky0_ZbGfAH4d4A1w4omxd6kkWjqoIm9_PktzJqFs=s32-c-mo"
          className="ml-auto"
        />
      </div>

      <HeaderOptions />
    </header>
  );
}

export default SearchHeader;
