import { AliyunOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="h-[100px] py-6 fixed top-0 left-0 right-0 backdrop-blur-md flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-jetbrains">
            <AliyunOutlined className="text-5xl" /> Task Manager
          </div>
          <div className="flex items-center gap-10 text-white">
            <Link
              to="/overview"
              className="border-b border-transparent hover:border-white"
            >
              Contact us
            </Link>
            <Link
              to="/login"
              className="border-b border-transparent hover:border-white"
            >
              Log in
            </Link>
            <button className="px-7 py-2 bg-primary text-white hover:bg-opacity-80 active:bg-opacity-90 cursor-pointer">
              Try it free
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
