import {
  ArrowUpOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  ExclamationCircleOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, List, Skeleton, Statistic } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListOnline from "../../components/admin/dashboard/ListOnline";
import ListPost from "../../components/admin/dashboard/ListPost";
import PersonalData from "../../components/admin/dashboard/PersonalData";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

const Dashboard = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <>
      <div className="bg-white bg-opacity-5 rounded-md p-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex-1 text-lg text-white font-jetbrains">
            {getGreeting()}, {user.name}
          </h3>
          <h3 className="flex-1 text-lg text-white font-jetbrains">
            General Notice
          </h3>
          <div className="w-[200px] text-lg text-white font-jetbrains">
            Online
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <PersonalData />
          <ListPost />
          <ListOnline />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
