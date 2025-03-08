import {
  BorderlessTableOutlined,
  ClusterOutlined,
  DownOutlined,
  MailOutlined,
  MessageOutlined,
  MobileOutlined,
  SearchOutlined,
  SolutionOutlined,
  UndoOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatJoinDate } from "../../../utils/formatJoinDate";
import {
  addChat,
  openPopupChat,
} from "../../../redux/useSlice/popupchat.useSlice";
import {
  createRoom,
  handleCheckRoom,
} from "../../../services/admin/room.service";

const ManagerPersonnel = () => {
  const dispatch = useDispatch();
  const [personnels, setPersonnels] = useState([]);
  const data = useSelector((state) => state.personnel.data);
  const user = useSelector((state) => state.user.data);
  const listChat = useSelector((state) => state.popupchat.listChat);

  useEffect(() => {
    if (data.length > 0) {
      setPersonnels(data);
    }
  }, [data]);

  const handleClickChat = async (userData) => {
    // Tìm phòng chat đã tồn tại giữa hai người
    const existingChat = await dispatch(handleCheckRoom(userData._id));

    if (existingChat?.payload?.status === 200) {
      // Nếu đã có phòng chat, chỉ cần mở lại
      dispatch(addChat(existingChat.payload.room));
    } else {
      // Nếu chưa có phòng, tạo mới
      const newRoom = await dispatch(
        createRoom({
          members: [user._id, userData._id],
          type: "private",
        })
      );

      if (newRoom) {
        dispatch(addChat(newRoom));
      }
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-white font-jetbrains">
            Manage Personnel
          </h3>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search..."
              className="w-52 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
              prefix={<SearchOutlined className="text-secondary" />}
            />
            <div className="flex items-center gap-2 text-[12px] text-secondary cursor-pointer bg-white bg-opacity-10 rounded-md px-2 py-1">
              <UngroupOutlined />
              Type
              <Dropdown
                menu={{
                  items: [
                    { key: "1", label: "Active" },
                    { key: "2", label: "Inactive" },
                    { key: "3", label: "All" },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <DownOutlined className="text-[12px] p-1 bg-white bg-opacity-10 rounded-md" />
              </Dropdown>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-secondary cursor-pointer bg-white bg-opacity-10 rounded-md px-2 py-1">
              <ClusterOutlined />
              Role
              <Dropdown
                menu={{
                  items: [
                    { key: "1", label: "PM" },
                    { key: "2", label: "Leader" },
                    { key: "3", label: "Member" },
                    { key: "4", label: "All" },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <DownOutlined className="text-[12px] p-1 bg-white bg-opacity-10 rounded-md" />
              </Dropdown>
            </div>
            <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
              <UndoOutlined /> Recent
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {personnels.map((p) => (
            <div
              key={p._id}
              className="group relative p-3 rounded-md bg-white bg-opacity-10 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                    {p.name[0]}
                  </Avatar>
                  <div className="text-[12px] text-white">{p.name}</div>
                </div>
                <div className="group-hover:hidden p-1 rounded-full text-[10px] text-white bg-green-600">
                  active
                </div>
                <div
                  onClick={() => handleClickChat(p)}
                  className="group-hover:block hidden py-1 px-3 text-white bg-white bg-opacity-20 hover:bg-opacity-15 active:bg-opacity-20 rounded-md"
                >
                  <MessageOutlined />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 rounded-md bg-white bg-opacity-10 p-2 text-[11px] text-secondary">
                <div className="flex items-center gap-2">
                  <BorderlessTableOutlined /> {p.role}
                </div>
                <div className="flex items-center gap-2">
                  <MobileOutlined /> {p.phone}
                </div>
                <div className="flex items-center gap-2 max-w-full overflow-hidden">
                  <MailOutlined /> {p.email}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-secondary text-[11px]">
                <span>{formatJoinDate(p.createdAt)}</span>
                <Link to="" className="border-b border-secondary">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagerPersonnel;
