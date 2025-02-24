import { FireOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const Information = () => {
  return (
    <>
      <div className="flex-1  bg-white bg-opacity-5 rounded-xl p-3 sticky top-[88px]">
        <h3 className="text-[12px] font-jetbrains text-white">
          project information
        </h3>
        <div className="flex flex-col gap-2 mt-5">
          <table className="text-s text-secondary border-separate border-spacing-y-2">
            <tbody>
              <tr className="">
                <td colSpan={2} className="text-white">
                  DETAILS
                </td>
              </tr>
              <tr>
                <td className="">Team:</td>
                <td className="text-white">Front-end</td>
              </tr>
              <tr>
                <td className="">Status:</td>
                <td className="text-[#d69e3b] flex items-center gap-1">
                  <FireOutlined />{" "}
                  <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20">
                    Progress
                  </p>
                </td>
              </tr>
              <tr>
                <td className="">Lead:</td>
                <td className="flex items-center gap-1 text-white">
                  <Avatar size={15} className="bg-[#3b50d6]">
                    T
                  </Avatar>{" "}
                  Tony Start
                </td>
              </tr>
              <tr>
                <td className="">Assignee:</td>
                <td className="flex items-center gap-1 text-white">
                  <Avatar size={15} className="bg-[#1c5c1d]">
                    A
                  </Avatar>{" "}
                  Adison Tombell
                </td>
              </tr>

              <tr className="">
                <td colSpan={2} className="text-white pt-5">
                  DATES
                </td>
              </tr>
              <tr>
                <td className="">Created:</td>
                <td className="text-white">Dec 31, 2024 - 8:49 AM</td>
              </tr>
              <tr>
                <td className="">Updated:</td>
                <td className="text-white">Dec 31, 2024 - 8:49 AM</td>
              </tr>
              <tr>
                <td className="">Deadline:</td>
                <td className="text-white">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <span className=" text-s text-white">DESCRIPTION</span>
          <p className="text-s text-secondary mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum modi
            itaque distinctio aut fuga.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <span className=" text-s text-white">NOTES</span>
          <input
            type="text"
            placeholder="note ..."
            className="text-s text-white placeholder:text-secondary p-2 bg-transparent border border-border rounded-lg"
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-s text-white">
                <Avatar size="small" className="bg-blue-400 text-white">
                  T
                </Avatar>
                Tony Start
              </div>
              <p className="text-[8px] text-secondary">
                FEB 1, 2025 - 19:59 PM
              </p>
            </div>
            <p className="text-s text-secondary mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
              doloribus itaque, vero numquam ut facere suscipit possimus fuga.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
