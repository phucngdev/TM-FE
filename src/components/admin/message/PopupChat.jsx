import {
  EllipsisOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Input, message, Skeleton } from "antd";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import PopupChatItem from "./PopupChatItem";
import PopupListChat from "./PopupListChat";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomChat } from "../../../services/admin/room.service";
import {
  closePopupChat,
  addChat,
} from "../../../redux/useSlice/popupchat.useSlice";

const PopupChat = () => {
  const dispatch = useDispatch();
  const isPopupChatOpen = useSelector(
    (state) => state.popupchat.isPopupChatOpen
  );
  const popupChatRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getAllRoomChat());
    } catch (error) {
      message.error("Please check your network connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rooms = useSelector((state) => state.rooms.data);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupChatRef.current &&
        !popupChatRef.current.contains(event.target)
      ) {
        dispatch(closePopupChat());
      }
    };

    // Thêm event listener khi component được mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Xóa event listener khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupChatOpen]);

  const handleClickChat = (room) => {
    dispatch(addChat(room));
    dispatch(closePopupChat());
  };

  return (
    <>
      <motion.div
        ref={popupChatRef}
        initial={{ x: "100%" }} // Bắt đầu từ ngoài màn hình bên phải
        animate={{ x: isPopupChatOpen ? 0 : "110%" }} // Hover vào thì hiển thị, không hover thì lệch một chút
        exit={{ x: "100%" }} // Khi đóng thì trượt ra phải
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed z-[999] top-[80px] right-3 bottom-[30px] w-[300px] overflow-y-auto bg-gradient-to-br from-redish via-bluish to-darkblue p-2 rounded-md shadow-lg"
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
          {loading && (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton.Avatar active size="large" />
                  <Skeleton.Node
                    active
                    className="!w-full !h-10"
                  ></Skeleton.Node>
                </div>
              ))}
            </>
          )}
          {!loading &&
            rooms?.map((m) => {
              const otherMember = m.members.find(
                (member) => member._id !== user._id
              );
              return (
                <div
                  key={m._id}
                  onClick={() => {
                    handleClickChat(m);
                  }}
                  className="group cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-white hover:bg-opacity-15"
                >
                  <Avatar
                    size={40}
                    className="bg-[#fde3cf] text-[#f56a00] cursor-pointer"
                  >
                    {otherMember.name[0]}
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-xs text-white">{otherMember.name}</div>
                    <div className="text-s text-secondary">{m.lastMessage}</div>
                  </div>
                  <button className="hidden text-white group-hover:flex items-center justify-center p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-15">
                    <EllipsisOutlined />
                  </button>
                </div>
              );
            })}
        </div>
      </motion.div>
    </>
  );
};

export default PopupChat;
