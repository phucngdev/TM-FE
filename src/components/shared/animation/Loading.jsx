import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 z-[99]">
        <div className="flex justify-center items-center h-screen w-screen bg-white bg-opacity-20">
          <Spin size="large" />
        </div>
      </div>
    </>
  );
};

export default Loading;
