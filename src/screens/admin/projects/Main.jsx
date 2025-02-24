import {
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Result, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../services/admin/project.service";
import { formatDate } from "../../../utils/formatJoinDate";
// import CreateProject from "./CreateProject";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getAllProjects());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = useSelector((state) => state.project.data);

  useEffect(() => {
    if (data.length > 0) {
      setProjects(data);
    }
  }, [data]);

  return (
    <>
      <div className="bg-white bg-opacity-5 rounded-md p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-white font-jetbrains mb-4">Projects</h3>
          <button
            onClick={() => navigate("/projects/new-project")}
            className="flex items-center justify-center font-jetbrains cursor-pointer gap-2 p-2 border border-primary border-dashed rounded-md text-sm text-primary hover:bg-primary hover:text-white"
          >
            <PlusOutlined /> Add project
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <Input
            placeholder="Search tasks"
            className="w-2/5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
            prefix={<SearchOutlined className="text-secondary" />}
          />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
              <UndoOutlined /> Recent
            </div>
            <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
              <SwapOutlined /> All filters
            </div>
          </div>
        </div>
        <table className="w-full mt-5 border border-separate border-border border-spacing-y-5 px-2">
          {projects.length > 0 && (
            <thead className="text-white text-[12px] font-jetbrains text-left">
              <tr>
                <th>Project Name</th>
                <th>PM</th>
                <th>Leader</th>
                <th>Members</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
          )}
          <tbody className="text-[12px] text-secondary">
            {loading ? (
              <>
                <tr>
                  <td colSpan={7}>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                    <Skeleton.Node
                      active
                      className="!w-full mb-2 !h-12"
                    ></Skeleton.Node>
                  </td>
                </tr>
              </>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer active:bg-opacity-20"
                  onClick={() => navigate(`/projects/${project._id}/overview`)}
                >
                  <td className="ps-2 py-3">{project.name}</td>
                  <td>{project.PM.name}</td>
                  <td>{project.leader.name}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{project.members.length}</span>
                    </div>
                  </td>
                  <td>{formatDate(project.start_date)}</td>
                  <td>{formatDate(project.due_date)}</td>
                  <td>
                    <button className="text-sm text-blue-500 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-110 active:bg-opacity-30">
                      <EllipsisOutlined />
                    </button>
                    <button className="text-sm text-red-500 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-110 active:bg-opacity-30 ml-2">
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="">
                  <td colSpan={7}>
                    <Result
                      icon={<SmileOutlined className="!text-primary" />}
                      title={
                        <>
                          <span className="text-white">
                            Great, let's get started with your first project!
                          </span>
                        </>
                      }
                      extra={
                        <button
                          onClick={() => navigate("/projects/new-project")}
                          className="bg-primary text-white hover:bg-opacity-60 px-3 py-2 rounded-md"
                        >
                          New Project
                        </button>
                      }
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;
