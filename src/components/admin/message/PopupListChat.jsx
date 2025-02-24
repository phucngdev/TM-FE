import React from "react";
import PopupChatItem from "./PopupChatItem";

const PopupListChat = ({ listChat, setListChat }) => {
  const handleResize = (chatId, isMinimized) => {
    setListChat((prev) =>
      prev.map((c) => (c.chat._id === chatId ? { ...c, isMinimized } : c))
    );
  };

  return (
    <>
      {/* Phần hiển thị ngang - Chỉ chứa các chat chưa thu nhỏ */}
      <div className="fixed z-[99] right-24 bottom-[30px] flex flex-row gap-5">
        {listChat
          .filter((c) => !c.isMinimized)
          .map((c) => (
            <PopupChatItem
              key={c.chat._id}
              chat={c.chat}
              isMinimized={c.isMinimized}
              setListChat={setListChat}
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
              key={c.chat._id}
              chat={c.chat}
              isMinimized={c.isMinimized}
              setListChat={setListChat}
              onResize={handleResize}
            />
          ))}
      </div>
    </>
  );
};

export default PopupListChat;
