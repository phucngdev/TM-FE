import React from "react";
import PopupChatItem from "./PopupChatItem";
import { useDispatch, useSelector } from "react-redux";
import { resize } from "../../../redux/useSlice/popupchat.useSlice";

const PopupListChat = () => {
  const dispatch = useDispatch();
  const listChat = useSelector((state) => state.popupchat.listChat);
  const handleResize = (chatId, isMinimized) => {
    dispatch(resize({ chatId, isMinimized }));
  };

  return (
    <>
      {/* Phần hiển thị ngang - Chỉ chứa các chat chưa thu nhỏ */}
      <div className="fixed z-[99] right-24 bottom-[30px] flex flex-row gap-5">
        {listChat
          .filter((c) => !c.isMinimized)
          .map((c, index) => (
            <PopupChatItem
              key={c.room._id}
              room={c.room}
              index={index}
              isMinimized={c.isMinimized}
              onResize={handleResize}
            />
          ))}
      </div>

      {/* Phần hiển thị dọc - Chỉ chứa các chat đã thu nhỏ */}
      <div className="fixed z-[99] right-[70px] bottom-10 flex flex-col gap-2">
        {listChat
          .filter((c) => c.isMinimized)
          .map((c) => (
            <PopupChatItem
              key={c.room._id}
              room={c.room}
              index={index}
              isMinimized={c.isMinimized}
              onResize={handleResize}
            />
          ))}
      </div>
    </>
  );
};

export default PopupListChat;
