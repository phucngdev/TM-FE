import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Input } from "antd";
import {
  AudioOutlined,
  CloseOutlined,
  ControlOutlined,
  LikeOutlined,
  MinusOutlined,
  PictureOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRef } from "react";

const PopupChatItem = ({ chat, isMinimized, setListChat, onResize }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleClose = () => {
    setListChat((prev) => prev.filter((c) => c.chat._id !== chat._id));
  };

  const handleResize = () => {
    onResize(chat._id, !isMinimized);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={
        isMinimized
          ? { width: "4rem", height: "4rem", bottom: "10px", right: "10px" }
          : { width: "300px", height: "400px", x: 0 }
      }
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      onClick={() => {
        inputRef?.current?.focus();
      }}
      className={`p-2 rounded-md shadow-lg ${
        isMinimized
          ? "bg-gray-600"
          : "bg-gradient-to-br from-redish via-bluish to-darkblue"
      }`}
    >
      {!isMinimized ? (
        <div className="flex flex-col h-full relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                size={30}
                className="bg-[#fde3cf] text-[#f56a00] cursor-pointer"
              >
                {chat.name[0]}
              </Avatar>
              <div>
                <div className="text-xs text-white">{chat.name}</div>
                <div className="text-xs text-secondary flex items-center gap-1">
                  <div className="size-2 rounded-full bg-green-600"></div>
                  Active
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div
                onClick={handleResize}
                className="p-1 size-7 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 text-white text-sm cursor-pointer"
              >
                <MinusOutlined />
              </div>
              <div
                onClick={handleClose}
                className="p-1 size-7 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 text-white text-sm cursor-pointer"
              >
                <CloseOutlined />
              </div>
            </div>
          </div>

          <div className="flex-1 text-white text-sm p-2 overflow-y-auto"></div>
          <form
            onSubmit={handleSubmit}
            className="absolute left-0 right-0 bottom-0 h-5 flex items-center justify-between text-secondary focus-within:text-white"
          >
            {message ? (
              <div className="cursor-pointer p-1 rounded-full size-7 hover:bg-white hover:bg-opacity-20 flex items-center justify-center">
                <PlusCircleOutlined />
              </div>
            ) : (
              <>
                <div className="cursor-pointer p-1 rounded-full size-7 hover:bg-white hover:bg-opacity-20 flex items-center justify-center">
                  <AudioOutlined />
                </div>
                <div className="cursor-pointer p-1 rounded-full size-7 hover:bg-white hover:bg-opacity-20 flex items-center justify-center">
                  <PictureOutlined />
                </div>
              </>
            )}
            <div className="mx-2 flex-1 transition-all duration-150">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hihi"
                className="rounded-full bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-20 text-white focus-within:bg-white focus-within:bg-opacity-20 placeholder:text-secondary border-none"
              />
            </div>
            {message ? (
              <div className="cursor-pointer p-1 rounded-full size-7 hover:bg-white hover:bg-opacity-20 flex items-center justify-center">
                <SendOutlined />
              </div>
            ) : (
              <div className="cursor-pointer p-1 rounded-full size-7 hover:bg-white hover:bg-opacity-20 flex items-center justify-center">
                <LikeOutlined />
              </div>
            )}
          </form>
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-full h-full cursor-pointer"
          onClick={handleResize}
        >
          <Avatar size={40} className="bg-[#fde3cf] text-[#f56a00]">
            {chat.name[0]}
          </Avatar>
        </div>
      )}
    </motion.div>
  );
};

export default PopupChatItem;
