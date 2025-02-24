import {
  EllipsisOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import PopupChatItem from "./PopupChatItem";
import PopupListChat from "./PopupListChat";

const PopupChat = ({ popupChat, setPopupChat }) => {
  const popupChatRef = useRef(null);
  const [chats, setChats] = useState([
    {
      _id: "1",
      name: "Tony Start",
      lastMessage: "Hello",
      lastMessageTime: "10:00 AM",
    },
    {
      _id: "2",
      name: "Jessica",
      lastMessage: "How are you?",
      lastMessageTime: "09:30 AM",
    },
    {
      _id: "3",
      name: "Hary Mano",
      lastMessage: "What's up?",
      lastMessageTime: "08:45 AM",
    },
    {
      _id: "4",
      name: "Cusoir Pasi",
      lastMessage: "I'm fine, thank you",
      lastMessageTime: "08:15 AM",
    },
  ]);
  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupChatRef.current &&
        !popupChatRef.current.contains(event.target)
      ) {
        setPopupChat(false);
      }
    };

    // Thêm event listener khi component được mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Xóa event listener khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupChat]);

  const handleClickChat = (room) => {
    setListChat((prevChat) => {
      const exists = prevChat.find((c) => c.chat._id === room._id);
      if (exists) return prevChat;
      const updatedChat = [...prevChat, { chat: room, isMinimized: false }];
      return updatedChat.length > 2 ? updatedChat.slice(1) : updatedChat;
    });
  };

  return (
    <>
      <PopupListChat listChat={listChat} setListChat={setListChat} />
      <motion.div
        ref={popupChatRef}
        initial={{ x: "100%" }} // Bắt đầu từ ngoài màn hình bên phải
        animate={{ x: popupChat ? 0 : "110%" }} // Hover vào thì hiển thị, không hover thì lệch một chút
        exit={{ x: "100%" }} // Khi đóng thì trượt ra phải
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed z-[99] top-[80px] right-3 bottom-[30px] w-[300px] overflow-y-auto bg-gradient-to-br from-redish via-bluish to-darkblue p-2 rounded-md shadow-lg"
      >
        <div className="p-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-bold">Chat</h3>
            <div className="flex items-center gap-1">
              <EllipsisOutlined className="p-2 rounded-md text-secondary hover:bg-white hover:bg-opacity-15 hover:text-white cursor-pointer" />
              <FormOutlined className="p-2 rounded-md text-secondary hover:bg-white hover:bg-opacity-15 hover:text-white cursor-pointer" />
            </div>
          </div>
          <Input
            placeholder="Search..."
            className="mt-5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
            prefix={<SearchOutlined className="text-secondary" />}
          />
        </div>
        <div className="flex flex-col gap-1 mt-5">
          {chats.map((m) => (
            <div
              key={m._id}
              onClick={() => {
                handleClickChat(m);
                setPopupChat(false);
              }}
              className="group cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-white hover:bg-opacity-15"
            >
              <Avatar
                size={40}
                className="bg-[#fde3cf] text-[#f56a00] cursor-pointer"
              >
                {m.name[0]}
              </Avatar>
              <div className="flex-1">
                <div className="text-sm text-white">{m.name}</div>
                <div className="text-xs text-secondary">{m.lastMessage}</div>
              </div>
              <button className="hidden text-white group-hover:flex items-center justify-center p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-15">
                <EllipsisOutlined />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default PopupChat;
