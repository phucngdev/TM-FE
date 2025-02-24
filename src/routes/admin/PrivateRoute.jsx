import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/admin/Sidebar";
import Header from "../../layouts/admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "../../services/admin/user.service";
import { message } from "antd";
import { getAllTeams } from "../../services/admin/team.service";
import { getAllPersonnel } from "../../services/admin/personnel.service";
import { getAllProjects } from "../../services/admin/project.service";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(() => {
    return document.cookie.includes("isLogin");
  });

  const fetchData = async () => {
    try {
      await Promise.all([
        dispatch(getAllTeams()),
        dispatch(getAllPersonnel()),
        dispatch(getAllProjects()),
        dispatch(getMyInfo()),
      ]);
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchData();
    } else {
      message.error("Please login!");
      navigate("/login");
    }
  }, [isLogin]);

  return (
    <>
      {isLogin && (
        <div className="relative">
          <Sidebar />
          <Header />
          <main className="ps-[210px] pt-[80px] pe-2 pb-5 min-h-screen">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
