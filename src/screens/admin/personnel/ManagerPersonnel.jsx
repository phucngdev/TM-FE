import {
  BorderlessTableOutlined,
  ClusterOutlined,
  DownOutlined,
  MailOutlined,
  MobileOutlined,
  SearchOutlined,
  SolutionOutlined,
  UndoOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatJoinDate } from "../../../utils/formatJoinDate";

const ManagerPersonnel = () => {
  const [personnels, setPersonnels] = useState([]);
  const data = useSelector((state) => state.personnel.data);

  useEffect(() => {
    if (data.length > 0) {
      setPersonnels(data);
    }
  }, [data]);

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
            <div key={p._id} className="p-3 rounded-md bg-white bg-opacity-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                    {p.name[0]}
                  </Avatar>
                  <div className="text-[12px] text-white">{p.name}</div>
                </div>
                <div className="p-1 rounded-full text-[10px] text-white bg-green-600">
                  active
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
