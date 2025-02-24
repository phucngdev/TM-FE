import {
  EditOutlined,
  LockOutlined,
  MoreOutlined,
  ProfileOutlined,
  SearchOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Avatar, Checkbox, Drawer, Dropdown, Input, Splitter } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDate } from "../../../utils/formatJoinDate";
import DrawerProfile from "../../../components/admin/profile/Drawer";

const items = [
  {
    key: "1",
    label: <Checkbox>Active</Checkbox>,
  },
  {
    key: "2",
    label: <Checkbox>UnActive</Checkbox>,
  },
];

const Members = () => {
  const context = useOutletContext();
  const [open, setOpen] = useState(false);
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  const showLoading = () => {
    setOpenDrawer(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const view = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-1 text-secondary"
          onClick={() => showLoading()}
        >
          <ProfileOutlined />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-1 text-secondary">
          <ProfileOutlined />
          <span>Profile</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <DrawerProfile
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        loading={loading}
      />
      <div className="">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search members"
            className="w-2/5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
            prefix={<SearchOutlined className="text-secondary" />}
          />
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg px-3 py-1">
              <UndoOutlined /> Recent
            </div>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              onOpenChange={handleOpenChange}
              open={open}
            >
              <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg px-3 py-1">
                <SwapOutlined /> All filters
              </div>
            </Dropdown>
          </div>
        </div>
        <Splitter className="border border-border rounded-md mt-3">
          <Splitter.Panel defaultSize="15%" min="15%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Name
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                <Avatar
                  size="small"
                  className="bg-[#f98989] text-white text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {member.name[0]}
                </Avatar>
                {member.name}
              </div>
            ))}
          </Splitter.Panel>
          <Splitter.Panel defaultSize="20%" min="10%" max="30%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Email
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {member.email}
              </div>
            ))}
          </Splitter.Panel>
          <Splitter.Panel defaultSize="15%" min="5%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Phone
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {member.phone}
              </div>
            ))}
          </Splitter.Panel>
          <Splitter.Panel defaultSize="10%" min="5%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Status
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {member.status}
              </div>
            ))}
          </Splitter.Panel>
          <Splitter.Panel defaultSize="10%" min="5%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Position
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] lowercase p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {member.role}
              </div>
            ))}
          </Splitter.Panel>

          <Splitter.Panel defaultSize="10%" min="5%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Created
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {formatDate(member.createdAt)}
              </div>
            ))}
          </Splitter.Panel>
          <Splitter.Panel defaultSize="10%" min="5%" max="20%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Last active
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis"
                key={member._id}
              >
                {formatDate(member.createdAt)}
              </div>
            ))}
          </Splitter.Panel>

          <Splitter.Panel defaultSize="10%" min="10%" max="10%">
            <div className="text-secondary text-[12px] flex items-center gap-1 h-10 p-2 border-b border-border">
              Action
            </div>
            {context.members.map((member) => (
              <div
                className="text-secondary text-[12px] p-2 h-10 flex items-center gap-2"
                key={member._id}
              >
                <Dropdown
                  menu={{ items: view }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <MoreOutlined className="p-1 text-xl bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20" />
                </Dropdown>
                <LockOutlined className="p-1 text-xl bg-white bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20" />
              </div>
            ))}
          </Splitter.Panel>
        </Splitter>
      </div>
    </>
  );
};

export default Members;
