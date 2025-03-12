import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Message = ({ content, sender, isLast, isFirst, type }) => {
  const user = useSelector((state) => state.user.data);

  const isMe = sender === user._id;

  return (
    <>
      <div
        className={`group flex ${
          isMe ? "flex-row-reverse" : ""
        } items-end gap-2 my-[2px] ${isLast && "mb-2"}`}
      >
        {!isMe && (
          <div className="size-5">
            {isLast ? (
              <div className="size-5 flex items-center justify-center bg-white bg-opacity-20 text-white text-s rounded-full">
                T
              </div>
            ) : (
              <div className="size-5"></div>
            )}
          </div>
        )}
        <div
          className={`text-s px-3 py-2 ${
            type === "error" ? "bg-red-500" : "bg-white"
          } text-color bg-opacity-20 max-w-[70%] rounded-md
            ${
              isMe
                ? `${isFirst ? "rounded-t-2xl" : "rounded-tl-2xl"} 
                    ${isLast ? "rounded-b-2xl" : "rounded-bl-2xl"}`
                : `${isFirst ? "rounded-t-2xl" : "rounded-tr-2xl"} ${
                    isLast ? "rounded-b-2xl" : "rounded-br-2xl"
                  }`
            }`}
        >
          {content}
        </div>
        <div className="hidden group-hover:flex items-center justify-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center size-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-15 active:bg-opacity-20 cursor-pointer"
          >
            <EllipsisOutlined />
          </button>
        </div>
      </div>
      {type === "error" && (
        <div className="text-s text-right text-red-500">
          Error sending message
        </div>
      )}
    </>
  );
};

export default Message;
