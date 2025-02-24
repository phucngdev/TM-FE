import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AddMember from "../../../components/admin/teams/create/AddMember";
import { useDispatch, useSelector } from "react-redux";
import { message, Skeleton, Spin } from "antd";
import { getAllPersonnel } from "../../../services/admin/personnel.service";

const Personnel = () => {
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getAllPersonnel());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AddMember
        title={"Add Personnel"}
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
        newPersonnel={true}
      />
      <div className="bg-white bg-opacity-5 rounded-md p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <NavLink
              to="/personnel/manager-personnel"
              className={({ isActive }) =>
                `px-3 py-1 border-b-2 text-white text-[12px] hover:bg-white hover:bg-opacity-10 cursor-pointer ${
                  isActive ? "border-primary" : "border-transparent"
                }`
              }
            >
              Manager Personnel
            </NavLink>
            <NavLink
              to="/personnel/organization-chart"
              className={({ isActive }) =>
                `px-3 py-1 border-b-2 text-white text-[12px] hover:bg-white hover:bg-opacity-10 cursor-pointer ${
                  isActive ? "border-primary" : "border-transparent"
                }`
              }
            >
              Organization Chart
            </NavLink>
          </div>
          <button
            onClick={() => setIsModalCreate(true)}
            className="flex items-center justify-center font-jetbrains cursor-pointer gap-2 p-2 border border-primary border-dashed rounded-md text-sm text-primary hover:bg-primary hover:text-white"
          >
            <PlusOutlined /> Add personnel
          </button>
        </div>
        {loading ? (
          <>
            <div className="grid grid-cols-5 gap-3 mt-5">
              {[...Array(15)].map((_, index) => (
                <Skeleton.Node
                  key={index}
                  active={true}
                  className="!w-full !h-[179px]"
                />
              ))}
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default Personnel;
