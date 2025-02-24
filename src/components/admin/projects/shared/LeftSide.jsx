import {
  BugOutlined,
  DownOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.data);
  const project = useSelector((state) => state.project.dataEdit);
  const { id } = useParams();

  return (
    <>
      {projects && project && (
        <div className="w-[200px] bg-white bg-opacity-5 rounded-md p-3 sticky top-[80px]">
          <h3 className="text-base text-white font-jetbrains mb-4">Projects</h3>
          <div className="flex flex-col gap-2">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`flex items-center justify-between p-2 border border-border rounded-md text-sm cursor-pointer hover:bg-hover text-secondary hover:text-white ${
                  id == project._id ? "bg-primary text-white" : ""
                }`}
              >
                <div className="flex items-center gap-1 text-[12px]">
                  <BugOutlined /> {project.name}
                </div>
                <div className="">
                  <MoreOutlined />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/projects/new-project")}
            className="w-full flex items-center justify-center cursor-pointer gap-2 p-2 mt-5 border border-primary border-dashed rounded-md text-[12px] text-primary hover:bg-primary hover:text-white active:bg-opacity-60"
          >
            <PlusOutlined /> Add Project
          </button>
          <h3 className="text-base text-white font-jetbrains mt-5">
            Team members
          </h3>
          {project.members.map((member) => (
            <>
              <div className="flex flex-col gap-1 mb-2 mt-2">
                <div
                  key={member._id}
                  className={`flex items-center justify-between px-2 py-1 border border-border rounded-md text-sm cursor-pointer hover:bg-hover text-secondary hover:text-white`}
                >
                  <div className="flex items-center gap-1">
                    <Avatar className="bg-[#fde3cf] text-[#f56a00]">
                      {member.name[0]}
                    </Avatar>
                    <div className="">
                      <p className="text-[12px]">{member.name}</p>
                      <p className="text-s">{member.role}</p>
                    </div>
                  </div>
                  <div className="">
                    <DownOutlined />
                  </div>
                </div>
              </div>
            </>
          ))}

          <h3 className="text-base text-white font-jetbrains mb-4 mt-5">
            Time
          </h3>
          <div className="border border-border rounded-md p-2">
            <p className="text-secondary text-s">
              Time created: 20:15 29/12/2024
            </p>
            <p className="uppercase text-secondary text-[11px] mt-2">
              Total hours
            </p>
            <span className="text-[16px] font-bold text-white">27,3 hours</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSide;
