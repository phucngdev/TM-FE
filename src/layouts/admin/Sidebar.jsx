import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  AliyunOutlined,
  SignatureOutlined,
  CodeOutlined,
  NotificationOutlined,
  LogoutOutlined,
  AndroidOutlined,
  AppleOutlined,
  Html5Outlined,
  ConsoleSqlOutlined,
  FundProjectionScreenOutlined,
  BgColorsOutlined,
  HighlightOutlined,
  FormOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    key: "dashboard",
    icon: <AppstoreOutlined />,
    label: (
      <>
        <NavLink to="/">Dashboard</NavLink>
      </>
    ),
  },
  {
    key: "projects",
    icon: <AppstoreOutlined />,
    label: (
      <>
        <NavLink to="/projects">Projects</NavLink>
      </>
    ),
  },
  {
    key: "issues",
    icon: <AppstoreOutlined />,
    label: (
      <>
        <NavLink to="/issues">Issues</NavLink>
      </>
    ),
  },
  {
    key: "boards",
    icon: <AppstoreOutlined />,
    label: (
      <>
        <NavLink to="/boards">Boards</NavLink>
      </>
    ),
  },
  {
    key: "calendar",
    icon: <AppstoreOutlined />,
    label: (
      <>
        <NavLink to="/calendar">Calendar</NavLink>
      </>
    ),
  },
  {
    key: "personnel",
    icon: <ContactsOutlined />,
    label: (
      <>
        <NavLink to="/personnel/manager-personnel">Personnel</NavLink>
      </>
    ),
    children: null,
  },
  {
    key: "0",
    icon: <TeamOutlined />,
    label: (
      <>
        <NavLink to="/teams/">M.Teams</NavLink>
      </>
    ),
    children: null,
  },
  {
    key: "1",
    icon: <CodeOutlined />,
    label: (
      <>
        <span className="text-white">Teams</span>
      </>
    ),
    type: "group",
    children: [
      {
        key: "1-1",
        icon: <SignatureOutlined />,
        label: "Design",
        children: [
          {
            key: "1-1-1",
            icon: <BgColorsOutlined />,
            label: (
              <>
                <NavLink to="/teams/ui-ux/members">UI/UX</NavLink>
              </>
            ),
          },
          {
            key: "1-1-2",
            icon: <FormOutlined />,
            label: (
              <>
                <NavLink to="/teams/iiiustrators/members">Iustrators</NavLink>
              </>
            ),
          },
          {
            key: "1-1-3",
            icon: <HighlightOutlined />,
            label: (
              <>
                <NavLink to="/teams/branding/members">Branding</NavLink>
              </>
            ),
          },
          {
            key: "1-1-4",
            icon: <ThunderboltOutlined />,
            label: (
              <>
                <NavLink to="/teams/motion/members">Motion</NavLink>
              </>
            ),
          },
        ],
      },
      {
        key: "1-2",
        icon: <CodeOutlined />,
        label: "Development",

        children: [
          {
            key: "1-2-1",
            label: (
              <>
                <span className="">Mobile</span>
              </>
            ),
            type: "group",
            children: [
              {
                key: "1-2-1-1",
                icon: <AndroidOutlined />,
                label: (
                  <>
                    <NavLink to="/teams/development/mobile/android">
                      Android
                    </NavLink>
                  </>
                ),
              },
              {
                key: "1-2-1-2",
                icon: <AppleOutlined />,
                label: (
                  <>
                    <NavLink to="/teams/development/mobile/ios">IOS</NavLink>
                  </>
                ),
              },
            ],
          },
          {
            key: "1-2-2",
            label: (
              <>
                <span className="">Web</span>
              </>
            ),
            type: "group",
            children: [
              {
                key: "241",
                icon: <Html5Outlined />,
                label: (
                  <>
                    <NavLink to="/teams/development/web/front-end">
                      Front-end
                    </NavLink>
                  </>
                ),
              },
              {
                key: "242",
                icon: <ConsoleSqlOutlined />,
                label: (
                  <>
                    <NavLink to="/teams/development/web/back-end">
                      Back-end
                    </NavLink>
                  </>
                ),
              },
              {
                key: "243",
                icon: <FundProjectionScreenOutlined />,
                label: (
                  <>
                    <NavLink to="/teams/development/web/devops">DevOps</NavLink>
                  </>
                ),
              },
            ],
          },
        ],
      },
      {
        key: "1-3",
        icon: <CodeOutlined />,
        label: "Orther",

        children: [],
      },
    ],
  },

  // {
  //   key: "3",
  //   icon: <NotificationOutlined />,
  //   label: "Marketing",
  //   children: [
  //     {
  //       key: "31",
  //       label: "Social Media",
  //     },
  //     {
  //       key: "32",
  //       label: "SEO & SEM",
  //     },
  //     {
  //       key: "33",
  //       label: "Digital",
  //     },
  //     {
  //       key: "34",
  //       label: "Content",
  //     },
  //   ],
  // },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const Sidebar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 bottom-0 w-[200px] py-3 flex flex-col justify-between overflow-y-auto bg-white bg-opacity-5">
        <div className="">
          <div className="flex items-center ps-5 gap-2 text-white font-jetbrains font-bold mb-6">
            <AliyunOutlined className="text-5xl" /> Task
          </div>
          <div className="flex flex-col gap-2 px-2 mt-5">
            <Menu
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              openKeys={stateOpenKeys}
              onOpenChange={onOpenChange}
              style={{
                width: 184,
              }}
              items={items}
            />
          </div>
        </div>
        <div className="px-2">
          <div className="hover:bg-hover cursor-pointer hover:text-white px-3 py-2 text-secondary text-sm rounded-xl flex items-center gap-[10px]">
            <LogoutOutlined /> Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
