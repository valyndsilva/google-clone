import React from "react";
import HeaderOption from "./HeaderOption";
import { BiSearchAlt2, BiNews } from "react-icons/bi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { VscLocation } from "react-icons/vsc";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
function HeaderOptions() {
  return (
    <section className="flex w-full text-gray-700 justify-evenly text-sm lg:text-base lg:justify-start lg:space-x-36 lg:pl-52 border-b-[1px]">
      <div className="flex space-x-6">
        <HeaderOption Icon={BiSearchAlt2} title="All" selected />
        <HeaderOption Icon={HiOutlinePhotograph} title="Images" />
        <HeaderOption Icon={BiNews} title="News" />
        <HeaderOption Icon={VscLocation} title="Maps" />
        <HeaderOption Icon={AiOutlinePlaySquare} title="Videos" />
        <HeaderOption Icon={FiMoreVertical} title="More" />
      </div>
      <div className="hidden md:inline-flex space-x-6">
        <p className="link">Settings</p>
        <p className="link">Tools</p>
      </div>
    </section>
  );
}

export default HeaderOptions;
