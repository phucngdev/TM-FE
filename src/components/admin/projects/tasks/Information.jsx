import { FireOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../../../utils/formatJoinDate";

const Information = () => {
  const project = useSelector((state) => state.project.dataEdit);

  return (
    <>
      {project && (
        <div className="flex-1  bg-white bg-opacity-5 rounded-xl p-3 sticky top-[88px]">
          <h3 className="text-[12px] font-jetbrains text-white">
            project information
          </h3>
          <div className="flex flex-col gap-2 mt-5">
            <table className="text-s text-color border-separate border-spacing-y-2">
              <tbody>
                <tr className="">
                  <td colSpan={2} className="text-white">
                    DETAILS
                  </td>
                </tr>
                <tr>
                  <td className="">Team:</td>
                  <td className="text-white">{project?.team}</td>
                </tr>
                <tr>
                  <td className="">Status:</td>
                  <td className="text-[#d69e3b] flex items-center gap-1">
                    <FireOutlined />{" "}
                    <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20">
                      {project.status}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="">Lead:</td>
                  <td className="flex items-center gap-1 text-white">
                    <Avatar size={15} className="bg-[#3b50d6]">
                      {project.leader.name[0]}
                    </Avatar>{" "}
                    {project.leader.name}
                  </td>
                </tr>
                <tr>
                  <td className="">PM:</td>
                  <td className="flex items-center gap-1 text-white">
                    <Avatar size={15} className="bg-[#1c5c1d]">
                      {project.PM.name[0]}
                    </Avatar>{" "}
                    {project.PM.name}
                  </td>
                </tr>

                <tr className="">
                  <td colSpan={2} className="text-white pt-5">
                    DATES
                  </td>
                </tr>
                <tr>
                  <td className="">Created:</td>
                  <td className="text-white">
                    {formatDateTime(project.createdAt)}
                  </td>
                </tr>
                <tr>
                  <td className="">Updated:</td>
                  <td className="text-white">
                    {formatDateTime(project.updatedAt)}
                  </td>
                </tr>
                <tr>
                  <td className="">Deadline:</td>
                  <td className="text-white">
                    {formatDateTime(project.due_date)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <span className=" text-s text-white">DESCRIPTION</span>
            <p className="text-s text-color mt-1">{project.description}</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <span className=" text-s text-white">NOTES</span>
            <input
              type="text"
              placeholder="note ..."
              className="text-s text-white placeholder:text-color p-2 bg-transparent border border-border rounded-lg"
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {project.notes.map((n) => (
              <div key={n._id} className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-s text-white">
                    <Avatar size="small" className="bg-blue-400 text-white">
                      T
                    </Avatar>
                    Tony Start
                  </div>
                  <p className="text-[8px] text-color">
                    FEB 1, 2025 - 19:59 PM
                  </p>
                </div>
                <p className="text-s text-color mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                  doloribus itaque, vero numquam ut facere suscipit possimus
                  fuga.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Information;
