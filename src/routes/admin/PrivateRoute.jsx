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
import PopupListChat from "../../components/admin/message/PopupListChat";
import useNetwork from "../../hooks/useNetwork";
import { Button, Divider, notification, Space } from "antd";
import { SmileOutlined, WifiOutlined } from "@ant-design/icons";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnline = useNetwork();
  const [isLogin, setIsLogin] = useState(() => {
    return document.cookie.includes("isLogin");
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.destroy();
    api.info({
      key: "network_status",
      message: isOnline
        ? "Internet connection restored"
        : "No network connection",
      description:
        !isOnline && "Please check your network connection and try again.",
      placement: "bottomLeft",
      icon: (
        <WifiOutlined
          style={{
            color: isOnline ? "#52c41a" : "#dd2434",
          }}
        />
      ),
      duration: isOnline ? 4 : 0,
    });
  };

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

  const [prevOnlineStatus, setPrevOnlineStatus] = useState(isOnline);

  useEffect(() => {
    if (isOnline !== prevOnlineStatus) {
      openNotification();
      setPrevOnlineStatus(isOnline);
    }
  }, [isOnline]);

  // Kiểm tra đăng nhập và fetch dữ liệu
  useEffect(() => {
    if (isOnline && isLogin) {
      fetchData();
    } else if (!isLogin) {
      message.error("Please login!");
      navigate("/login");
    }
  }, [isLogin, isOnline]);

  return (
    <>
      {isLogin && (
        <div className="relative">
          <Sidebar />
          <Header />
          <main className="ps-[210px] pt-[80px] pe-2 pb-5 min-h-screen">
            <Outlet />
          </main>
          <PopupListChat />
        </div>
      )}
      {contextHolder}
    </>
  );
};

export default PrivateRoute;
