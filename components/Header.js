import Link from "next/link";
import React from "react";
import { TbGridDots } from "react-icons/tb";
import { BsFillMoonFill } from "react-icons/bs";
import Avatar from "./Avatar";

function Header() {
  return (
    <header className="flex w-full p-5 justify-between text-sm text-gray-700">
      <div className="flex space-x-4 items-center">
        <Link href="#">
          <span className="link">About</span>
        </Link>
        <Link href="#">
          <span className="link">Store</span>
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link href="#">
          <span className="link">Gmail</span>
        </Link>
        <Link href="#">
          <span className="link">Images</span>
        </Link>
        <TbGridDots className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer" />
        <Link href="#">
          <Avatar url="https://lh3.googleusercontent.com/ogw/AOh-ky0_ZbGfAH4d4A1w4omxd6kkWjqoIm9_PktzJqFs=s32-c-mo" />
        </Link>

        <BsFillMoonFill className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
