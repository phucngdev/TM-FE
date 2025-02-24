import { FireOutlined, HistoryOutlined } from "@ant-design/icons";
import { Avatar, Skeleton } from "antd";
import React from "react";

const LeftSide = ({ team }) => {
  return (
    <>
      <div className="w-[200px] bg-white bg-opacity-5 rounded-md p-3 sticky top-[88px]">
        <h3 className="text-base text-white font-jetbrains mb-4">
          Teams - {team.name}
        </h3>
        <table className="text-s text-secondary border-separate border-spacing-y-2">
          <tbody>
            <tr className="">
              <td colSpan={2} className="text-white">
                DETAILS
              </td>
            </tr>
            <tr>
              <td className="">Team:</td>
              <td className="ps-2 text-white">{team.name}</td>
            </tr>
            <tr>
              <td className="">Status:</td>
              <td className="ps-2 text-[#d69e3b] flex items-center gap-1">
                <FireOutlined />{" "}
                <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20">
                  {team.status}
                </p>
              </td>
            </tr>
            <tr>
              <td className="">Lead:</td>
              <td className="ps-2 flex items-center gap-1 text-white">
                <Avatar size={15} className="bg-[#3b50d6]">
                  {team.leader.name[0]}
                </Avatar>{" "}
                {team.leader.name}
              </td>
            </tr>

            <tr className="">
              <td colSpan={2} className="text-white pt-5">
                MORE
              </td>
            </tr>

            <tr className="cursor-pointer">
              <td className="">History:</td>
              <td className="ps-2 text-[#d69e3b] flex items-center gap-1 ">
                <HistoryOutlined />
                <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20 hover:bg-white hover:bg-opacity-10">
                  Projects
                </p>
              </td>
            </tr>
            <tr className="cursor-pointer">
              <td className=""></td>
              <td className="ps-2 text-[#d69e3b] flex items-center gap-1 ">
                <HistoryOutlined />
                <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20 hover:bg-white hover:bg-opacity-10">
                  Leader
                </p>
              </td>
            </tr>
            <tr className="cursor-pointer">
              <td className=""></td>
              <td className="ps-2 text-[#d69e3b] flex items-center gap-1 ">
                <HistoryOutlined />
                <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20 hover:bg-white hover:bg-opacity-10">
                  Members
                </p>
              </td>
            </tr>
            <tr className="cursor-pointer">
              <td className=""></td>
              <td className="ps-2 text-[#d69e3b] flex items-center gap-1 ">
                <HistoryOutlined />
                <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20 hover:bg-white hover:bg-opacity-10">
                  Meet
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeftSide;
