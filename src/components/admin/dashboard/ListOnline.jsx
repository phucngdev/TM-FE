import { Avatar } from "antd";
import React from "react";

const ListOnline = () => {
  return (
    <>
      <div className="w-[200px] h-[calc(100vh-150px)] overflow-y-auto bg-white bg-opacity-5 rounded-md flex flex-col gap-4 p-2">
        <div className="flex flex-col gap-2">
          <div className="text-white">
            <p className="text-xs">ADMIN - 2</p>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia Alpha Betaa
            </div>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="text-white">
            <p className="text-xs">PM - 2</p>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia Alpha Betaa
            </div>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="text-white">
            <p className="text-xs">LEADER - 2</p>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia Alpha Betaa
            </div>
          </div>
          <div className="flex items-center gap-2 text-secondary relative">
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              D
            </Avatar>
            <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
            <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
              Dolia Cecelia
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="text-white">
            <p className="text-xs">MEMBER - 2</p>
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-secondary relative"
            >
              <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                D
              </Avatar>
              <div className="size-3 absolute bottom-0 left-0 rounded-full bg-green-500"></div>
              <div className="overflow-hidden text-xs text-ellipsis text-nowrap text-color">
                Dolia Cecelia Alpha Betaa
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOnline;
