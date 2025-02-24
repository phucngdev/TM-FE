import {
  BellOutlined,
  ControlOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PopupChat from "../../components/admin/message/PopupChat";
import PopupChatItem from "../../components/admin/message/PopupChatItem";
import PopupNotify from "../../components/admin/notifycation/PopupNotify";
import DrawerProfile from "../../components/admin/profile/Drawer";

const Header = () => {
  const user = useSelector((state) => state.user.data);
  const [popupChat, setPopupChat] = useState(false);
  const [popupNotify, setPopupNotify] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickPopupChat = () => {
    setPopupChat((prev) => !prev);
  };

  const handleClickPopupNotify = () => {
    setPopupNotify((prev) => !prev);
  };

  const showLoading = () => {
    setOpenDrawer(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <PopupChat popupChat={popupChat} setPopupChat={setPopupChat} />
      <PopupNotify popupNotify={popupNotify} setPopupNotify={setPopupNotify} />
      <DrawerProfile
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        loading={loading}
      />
      <header className="fixed z-[99] top-0 right-2 left-[210px] h-[80px] py-5 flex items-center justify-between pe-5 backdrop-blur-md">
        <div className="flex-1">
          <Input
            placeholder="Search people, projects or tasks"
            addonAfter={<ControlOutlined className="text-secondary" />}
            className="w-3/5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
            prefix={<SearchOutlined className="text-secondary" />}
          />
        </div>
        <div className="flex items-center text-secondary">
          <div
            onClick={() => handleClickPopupChat()}
            className="py-2 px-3 cursor-pointer rounded-xl hover:text-white hover:bg-white hover:bg-opacity-20 relative"
          >
            <MessageOutlined />
            <div className="absolute top-1/4 right-1/4 size-2 rounded-full bg-red-600"></div>
          </div>
          <div
            onClick={() => handleClickPopupNotify()}
            className="py-2 px-3 cursor-pointer rounded-xl hover:text-white hover:bg-white hover:bg-opacity-20 relative"
          >
            <BellOutlined />
            <div className="absolute top-1/4 right-1/4 size-2 rounded-full bg-red-600"></div>
          </div>
          <div className="h-7 w-[1px] bg-border mx-3"></div>
          <div className="py-2 px-3 cursor-pointer rounded-xl hover:text-white hover:bg-white hover:bg-opacity-20">
            <SettingOutlined />
          </div>
          <div className="py-2 px-3 cursor-pointer rounded-xl hover:text-white hover:bg-white hover:bg-opacity-20">
            <QuestionCircleOutlined />
          </div>

          <div className="h-7 w-[1px] bg-border mx-3"></div>
          <div
            onClick={() => showLoading()}
            className="flex items-center gap-1 cursor-pointer hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-md"
          >
            <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
              {user?.name?.[0]}
            </Avatar>
            <div className="ms-2 text-sm font-jetbrains">{user.name}</div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
