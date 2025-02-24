import React, { useEffect, useState } from "react";
import LeftSide from "../../../components/admin/teams/shared/LeftSide";
import {
  CaretDownOutlined,
  PlusOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Dropdown, message, Skeleton } from "antd";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Room from "../room/Room";
import AddMember from "../../../components/admin/teams/create/AddMember";
import { getOneTeam } from "../../../services/admin/team.service";
import { useDispatch, useSelector } from "react-redux";

const items = [
  {
    key: "1",
    label: (
      <div className="flex items-center gap-2">
        <VideoCameraOutlined />
        <span>Meet now</span>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex items-center gap-2">
        <VideoCameraAddOutlined />
        <span>Scehdule a meeting</span>
      </div>
    ),
  },
];
const Teams = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [team, setTeam] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getOneTeam(id));
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const data = useSelector((state) => state.teams.dataEdit);

  useEffect(() => {
    if (data) {
      setTeam(data);
    }
  }, [data]);

  const handleClickMeetNow = () => {
    const meetingId = uuidv4();
    navigate(`room/${meetingId}`);
  };

  if (!team || loading)
    return (
      <>
        <div className="flex items-center gap-2 h-screen">
          <Skeleton.Node active={true} className="!w-[200px] !h-full" />
          <Skeleton.Node active={true} className="!w-full !h-full" />
        </div>
      </>
    );

  return (
    <>
      <AddMember
        title={"Add Member"}
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
        newPersonnel={false}
      />
      <div className="flex items-start gap-2">
        <LeftSide team={team} />
        <div className="flex-1 flex flex-col gap-2 p-3 bg-white bg-opacity-5 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 text-white">
              <NavLink
                to={`/teams/${id}/`}
                className={({ isActive }) =>
                  `text-base text-white font-jetbrains px-2 pb-1 cursor-pointer border-b-2 ${
                    isActive
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  }`
                }
              >
                Members
              </NavLink>
              <NavLink
                to={`/teams/${id}/tasks`}
                className={({ isActive }) =>
                  `text-base text-white font-jetbrains px-2 pb-1 cursor-pointer border-b-2 ${
                    isActive
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  }`
                }
              >
                Tasks
              </NavLink>
            </div>
            <div className="flex items-center gap-1 text-white">
              <button
                onClick={() => setIsModalCreate(true)}
                className="bg-primary px-3 py-2 rounded-md fle items-center gap-2 justify-center text-[12px] text-white hover:bg-opacity-70 active:bg-opacity-40"
              >
                <PlusOutlined /> Add Member
              </button>
              <VideoCameraOutlined
                onClick={() => handleClickMeetNow()}
                className="text-xl p-2 rounded-md cursor-pointer hover:bg-opacity-20 bg-white bg-opacity-15"
              />
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <CaretDownOutlined className="text-xl p-2 rounded-md cursor-pointer hover:bg-opacity-20 bg-white bg-opacity-15" />
              </Dropdown>
            </div>
          </div>
          <div className="mt-5">
            <Outlet context={team} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
