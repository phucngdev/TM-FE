import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Input, Skeleton, message } from "antd";
import {
  AudioOutlined,
  CloseOutlined,
  CoffeeOutlined,
  ControlOutlined,
  LikeOutlined,
  MinusOutlined,
  PictureOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeChatItem } from "../../../redux/useSlice/popupchat.useSlice";
import {
  getAllRoomChat,
  getOneRoomChat,
} from "../../../services/admin/room.service";
import Message from "./Message";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../../hooks/useSocket";
import { getMessagesByRoom } from "../../../services/admin/message.service";
import { addMessage } from "../../../redux/useSlice/popupchat.useSlice";

const PopupChatItem = ({ room, index, isMinimized, onResize }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const messagesEnd = useRef();
  const socketRef = useRef();
  const messageContainerRef = useRef(null);
  const user = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(true);
  const [messageChat, setMessageChat] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listMessage, setListMessage] = useState([]);
  console.log("🚀 ~ PopupChatItem ~ listMessage:", listMessage);
  const [errorMessage, setErrorMessage] = useState(null);

  const scrollToBottom = () => {
    if (messagesEnd.current && messageContainerRef.current) {
      setTimeout(() => {
        messagesEnd.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 500);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        getMessagesByRoom({ roomId: room._id, page: room[room._id]?.page || 1 })
      );
      console.log("🚀 ~ fetchData ~ res:", res);
      setListMessage(res.payload.messages);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [room._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messageChat]);

  const otherMember = useMemo(() => {
    const otherMember = room.members.find((member) => member._id !== user._id);
    return otherMember;
  }, []);

  const handleClose = () => {
    dispatch(closeChatItem(room._id));
  };

  const handleResize = () => {
    onResize(room._id, !isMinimized);
  };

  const handleTyping = () => {
    // Gửi thông báo đang gõ đến server
    socketRef.current.emit("userTyping", {
      user_id: user._id,
      room_id: room._id,
      isTyping: true,
    });

    // Hủy bỏ timeout trước đó nếu có
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Thiết lập timeout mới để gửi thông báo đã ngừng gõ sau 2 giây
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("userTyping", {
        user_id: user._id,
        room_id: room._id,
        isTyping: false,
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageChat == "") {
      message.warning("Please enter a message");
      return;
    }
    const mesSocket = {
      sender: { _id: user._id },
      room: room._id,
      content: messageChat,
    };
    socketRef.current.emit("sendMessage", mesSocket);
    setMessageChat("");
  };

  useEffect(() => {
    socketRef.current = socketIOClient.connect(
      import.meta.env.VITE_HOST_SOCKET
    );

    socketRef.current.on("messageError", (data) => {
      setErrorMessage(data); // Lưu lỗi vào state để hiển thị
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // lấy tin nhắn mới nhất
  useEffect(() => {
    socketRef.current = socketIOClient.connect(
      import.meta.env.VITE_HOST_SOCKET
    );

    // // Tham gia vào room
    // socketRef.current.emit("joinRoom", { roomId: room._id });

    socketRef.current.on("sendMessage", (data) => {
      console.log("abc");

      if (data.room === room._id) {
        setListMessage((prev) => [...prev, data]);
      }
    });
    // Nhận thông báo người dùng khác đang gõ

    scrollToBottom();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

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
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              {loading ? (
                <>
                  <Skeleton.Avatar active size="large" />
                  <Skeleton.Node active className="!w-28 !h-8"></Skeleton.Node>
                </>
              ) : (
                <>
                  <Avatar
                    size={30}
                    className="bg-[#fde3cf] text-[#f56a00] cursor-pointer"
                  >
                    {otherMember.name[0]}
                  </Avatar>
                  <div>
                    <div className="text-xs text-white">{otherMember.name}</div>
                    <div className="text-xs text-secondary flex items-center gap-1">
                      <div className="size-2 rounded-full bg-green-600"></div>
                      Active
                    </div>
                  </div>
                </>
              )}
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

          <div className="flex-1 mb-10 overflow-y-auto flex flex-col text-white text-sm py-2">
            <div className="mb-10 mt-6 flex flex-col items-center justify-center">
              <div className="size-16 text-xl mb-2 border border-border rounded-full flex items-center justify-center">
                <CoffeeOutlined />
              </div>
              <span className="text-xs">Let's start chatting. Yehhhhhhh!</span>
            </div>
            <div
              ref={messageContainerRef}
              className="flex-1 flex flex-col gap-0"
            >
              {listMessage?.map((msg, index) => (
                <Message
                  key={index}
                  content={msg.content}
                  sender={msg.sender._id}
                  isFirst={
                    index === 0 ||
                    listMessage[index - 1].sender._id !== msg.sender._id
                  }
                  isLast={
                    index === listMessage.length - 1 ||
                    listMessage[index + 1].sender._id !== msg.sender._id
                  }
                  type={"success"}
                />
              ))}
              {errorMessage && (
                <Message
                  content={errorMessage.data.content}
                  sender={user._id}
                  isFirst={false}
                  isLast={true}
                  type={"error"}
                />
              )}
              <div ref={messagesEnd} className=""></div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="absolute z-[99] left-0 right-0 bottom-0 h-5 my-2 flex items-center justify-between text-secondary focus-within:text-white"
          >
            {messageChat ? (
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
                value={messageChat}
                onChange={(e) => setMessageChat(e.target.value)}
                placeholder="Hihi"
                className="rounded-full bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-20 text-white focus-within:bg-white focus-within:bg-opacity-20 placeholder:text-secondary border-none"
              />
            </div>
            {messageChat ? (
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
            {otherMember.name[0]}
          </Avatar>
        </div>
      )}
    </motion.div>
  );
};

export default PopupChatItem;
