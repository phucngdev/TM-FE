import {
  BugOutlined,
  DownOutlined,
  FileAddOutlined,
  FireOutlined,
  MoreOutlined,
  PlusOutlined,
  ProjectOutlined,
  SearchOutlined,
  SolutionOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Avatar, Input, message, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Information from "../../../components/admin/projects/tasks/Information";
import LeftSide from "../../../components/admin/projects/shared/LeftSide";
import CreateTask from "../../../components/admin/projects/tasks/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { getOneProject } from "../../../services/admin/project.service";

const Projects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const colors = ["#f56a00", "#87d068", "#1677ff", "#51e7c6"];

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getOneProject(id));
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const project = useSelector((state) => state.project.dataEdit);

  return (
    <>
      <CreateTask
        setIsModalCreate={setIsModalCreate}
        isModalCreate={isModalCreate}
      />
      <div className="flex items-start gap-2">
        {loading ? (
          <>
            <Skeleton.Node
              active
              className="!w-[200px] !h-screen"
            ></Skeleton.Node>
            <Skeleton.Node active className="!w-full !h-screen"></Skeleton.Node>
          </>
        ) : (
          <>
            <LeftSide teams={project?.teams} />
            <div className="flex-1">
              <div className="flex items-center justify-between bg-white bg-opacity-5 rounded-md p-3">
                <div className="flex items-center gap-3">
                  <ProjectOutlined className="text-xl text-white p-2 bg-white bg-opacity-50 rounded-lg" />
                  <div className="">
                    <p className="text-base text-white font-jetbrains">
                      {project?.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-[200px] h-1 bg-white bg-opacity-50">
                        <div
                          className={`h-full bg-primary`}
                          style={{ width: `${project?.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-s text-secondary">
                        {project?.progress}% complete
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar.Group
                    max={{
                      count: 3,
                      style: {
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      },
                    }}
                  >
                    {project?.members?.map((member, index) => (
                      <Avatar
                        className="text-white"
                        key={member._id}
                        style={{ backgroundColor: colors[index] }}
                      >
                        {member.name[0]}
                      </Avatar>
                    ))}
                  </Avatar.Group>
                  <button className="bg-primary px-3 py-2 rounded-md fle items-center gap-2 justify-center text-[12px] text-white hover:bg-opacity-70 active:bg-opacity-40">
                    <PlusOutlined /> Add Member
                  </button>
                </div>
              </div>
              <div className="flex items-start justify-between gap-2 mt-2">
                <div className="w-3/4 flex flex-col gap-3 bg-white bg-opacity-5 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <NavLink
                        to={`/projects/${id}/overview`}
                        className={({ isActive }) =>
                          `text-sm text-white px-3 py-1 border-b-2 ${
                            isActive ? "border-primary" : "border-transparent"
                          } cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-t-xl`
                        }
                      >
                        Overview
                      </NavLink>
                      <NavLink
                        to={`/projects/${id}/tasks`}
                        className={({ isActive }) =>
                          `text-sm text-white px-3 py-1 border-b-2 ${
                            isActive ? "border-primary" : "border-transparent"
                          } cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-t-xl`
                        }
                      >
                        Task
                      </NavLink>
                      <NavLink
                        to={`/projects/${id}/notes`}
                        className={({ isActive }) =>
                          `text-sm text-white px-3 py-1 border-b-2 ${
                            isActive ? "border-primary" : "border-transparent"
                          } cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-t-xl`
                        }
                      >
                        Notes
                      </NavLink>
                      <NavLink
                        to={`/projects/${id}/questions`}
                        className={({ isActive }) =>
                          `text-sm text-white px-3 py-1 border-b-2 ${
                            isActive ? "border-primary" : "border-transparent"
                          } cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-t-xl`
                        }
                      >
                        Questions
                      </NavLink>
                    </div>
                    <button
                      onClick={() => setIsModalCreate(true)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-primary text-[12px] text-primary hover:text-white hover:bg-primary active:bg-opacity-60 cursor-pointer"
                    >
                      <FileAddOutlined /> Create task
                    </button>
                  </div>
                  <Outlet />
                </div>
                <Information />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Projects;
