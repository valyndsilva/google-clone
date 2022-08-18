import React from "react";

function HeaderOption({ Icon, title, selected }) {
  return (
    <div
      className={`flex items-center space-x-1 pb-3 border-b-4 border-transparent hover:border-blue-400 hover:text-blue-400 cursor-pointer ${
        selected && "border-blue-400 text-blue-400"
      }`}
    >
      <Icon className="h-6 w-6" />
      <p className="hidden sm:inline-flex text-center text-xs">{title}</p>
    </div>
  );
}

export default HeaderOption;
