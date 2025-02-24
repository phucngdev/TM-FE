import {
  EllipsisOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const PopupNotify = ({ popupNotify, setPopupNotify }) => {
  const popupNotifyRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupNotifyRef.current &&
        !popupNotifyRef.current.contains(event.target)
      ) {
        setPopupNotify(false);
      }
    };

    // Thêm event listener khi component được mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Xóa event listener khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupNotify]);
  return (
    <>
      <motion.div
        ref={popupNotifyRef}
        initial={{ x: "100%" }} // Bắt đầu từ ngoài màn hình bên phải
        animate={{ x: popupNotify ? 0 : "110%" }} // Hover vào thì hiển thị, không hover thì lệch một chút
        exit={{ x: "100%" }} // Khi đóng thì trượt ra phải
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed z-[99] top-[80px] right-3 bottom-[30px] w-[300px] overflow-y-auto bg-gradient-to-br from-redish via-bluish to-darkblue p-2 rounded-md shadow-lg"
      >
        <div className="p-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-bold">Notifycation</h3>
            <EllipsisOutlined className="p-2 rounded-md text-secondary hover:bg-white hover:bg-opacity-15 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 px-2">
          <div className="text-sm py-1 px-3 rounded-full bg-primary text-white">
            All
          </div>
          <div className="text-sm py-1 px-3 rounded-full bg-white bg-opacity-20 text-white">
            Unread
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(() => (
            <div className="group max-h-20 overflow-hidden text-xs text-ellipsis text-secondary cursor-pointer flex items-center justify-between p-2 rounded-md hover:bg-white hover:bg-opacity-15">
              <div className="max-w-[90%]">
                <p className="">
                  <span className="text-sm text-white">Title here: </span>
                  Lorem ipsum dolor sit amet consectetur elit. Ab non dolor
                  quibusdam minima aperiam quas, et aspernatur ipsa temporibus
                </p>
              </div>
              <div className="size-2 rounded-full bg-primary"></div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default PopupNotify;
