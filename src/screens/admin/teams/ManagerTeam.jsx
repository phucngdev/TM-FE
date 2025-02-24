import {
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, message, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { list_teams, teams } from "../../../data/mocks/teams";
import AddTeam from "../../../components/admin/teams/create/AddTeam";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../../services/admin/team.service";
import { formatDate } from "../../../utils/formatJoinDate";

const ManagerTeam = () => {
  const navigate = useNavigate();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(getAllTeams());
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = useSelector((state) => state.teams.data);

  useEffect(() => {
    if (data) {
      setTeamList(data);
    }
  }, [data]);

  return (
    <>
      <AddTeam
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
      />
      <div className="bg-white bg-opacity-5 rounded-md p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-white font-jetbrains mb-4">
            Manager Teams
          </h3>
          <button
            onClick={() => setIsModalCreate(true)}
            className="flex items-center justify-center font-jetbrains cursor-pointer gap-2 p-2 border border-primary border-dashed rounded-md text-sm text-primary hover:bg-primary hover:text-white"
          >
            <PlusOutlined /> Add team
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
          {teamList.length > 0 && (
            <thead className="text-white text-[12px] font-jetbrains text-left">
              <tr>
                <th>Team Name</th>
                <th>Leader</th>
                <th>Projects</th>
                <th>Members</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
          )}
          <tbody className="text-[12px] text-secondary">
            {teamList.length > 0 ? (
              <>
                {teamList?.map((team) => (
                  <tr
                    key={team._id}
                    className="hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer active:bg-opacity-20"
                    onClick={() => navigate(`/teams/${team._id}/members`)}
                  >
                    <td className="ps-2 py-3">{team.name}</td>
                    <td>{team.leader.name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {team.projects.length > 0 ? (
                          team.projects.map((team) => (
                            <span className="text-sm" key={team._id}>
                              {team.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm">Empty</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{team.members.length}</span>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-full bg-green-600 text-white">
                        {team.status}
                      </span>
                    </td>
                    <td>{formatDate(team.createdAt)}</td>
                    <td>{formatDate(team.updatedAt)}</td>
                    <td>
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
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-blue-500 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-110 active:bg-opacity-30"
                        >
                          <EllipsisOutlined />
                        </button>
                      </Dropdown>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-red-500 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-110 active:bg-opacity-30 ml-2"
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <tr className="">
                  <td colSpan={8}>
                    <Result
                      icon={<SmileOutlined className="!text-primary" />}
                      title={
                        <>
                          <span className="text-white">
                            Great, Let's start with your first team!
                          </span>
                        </>
                      }
                      extra={
                        <button
                          onClick={() => setIsModalCreate(true)}
                          className="bg-primary text-white hover:bg-opacity-60 px-3 py-2 rounded-md"
                        >
                          New Team
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

export default ManagerTeam;
