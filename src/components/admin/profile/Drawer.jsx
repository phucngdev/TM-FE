import React from "react";
import { Avatar, Drawer } from "antd";
import { EditOutlined } from "@ant-design/icons";

const DrawerProfile = ({ openDrawer, setOpenDrawer, loading }) => {
  return (
    <Drawer
      closable
      destroyOnClose
      title={<p className="text-white">Profile</p>}
      placement="right"
      open={openDrawer}
      loading={loading}
      onClose={() => setOpenDrawer(false)}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Avatar className="text-white bg-[#835aff]">T</Avatar>
            <div className="">
              <p className="text-white">John Doe</p>
              <p className="text-s text-secondary">Member since 2022</p>
            </div>
          </div>
          <div className="size-7 flex items-center justify-center cursor-pointer text-lg text-secondary rounded-md bg-white bg-opacity-10 hover:bg-opacity-15 active:bg-opacity-20">
            <EditOutlined />
          </div>
        </div>
        <span className="text-[12px] text-white font-jetbrains font-medium mt-4 mb-3">
          Personal Information
        </span>
        <table className="">
          <tbody>
            <tr>
              <td className="text-secondary text-s py-1">Name:</td>
              <td className="text-secondary text-s py-1">John Doe</td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Email:</td>
              <td className="text-secondary text-s py-1">
                john.doe@example.com
              </td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Phone:</td>
              <td className="text-secondary text-s py-1">+1 (123) 456-7890</td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Status:</td>
              <td className="text-secondary text-s">
                <div className="p-1 inline-flex rounded-xl border border-green-500 items-center gap-1">
                  <div className="size-2 rounded-full bg-green-500"></div>
                  Active
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Position:</td>
              <td className="text-secondary text-s py-1">Software Engineer</td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Created:</td>
              <td className="text-secondary text-s py-1">2022-01-01</td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">Last active:</td>
              <td className="text-secondary text-s py-1">2022-12-31</td>
            </tr>
          </tbody>
        </table>

        <span className="text-[12px] text-white font-jetbrains font-medium mt-4 mb-3">
          Projects Participated
        </span>
        <table>
          <thead>
            <tr>
              <th className="text-secondary text-s text-left font-normal">
                Project Name:
              </th>
              <th className="text-secondary text-s text-left font-normal">
                Total tasks
              </th>
              <th className="text-secondary text-s text-left font-normal">
                Completed
              </th>
              <th className="text-secondary text-s text-left font-normal">
                Late
              </th>
              <th className="text-secondary text-s px-1 font-normal text-center">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-secondary text-s py-1">
                E-commerce Platform
              </td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">0</td>
              <td className="text-blue-500 text-s p-1 cursor-pointer hover:text-blue-600 hover:bg-white hover:bg-opacity-15 rounded-md  text-center">
                view
              </td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">
                E-commerce Platform
              </td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">0</td>
              <td className="text-blue-500 text-s p-1 cursor-pointer hover:text-blue-600 hover:bg-white hover:bg-opacity-15 rounded-md  text-center">
                view
              </td>
            </tr>
            <tr>
              <td className="text-secondary text-s py-1">
                E-commerce Platform
              </td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">100</td>
              <td className="text-secondary text-s py-1">0</td>
              <td className="text-blue-500 text-s p-1 cursor-pointer hover:text-blue-600 hover:bg-white hover:bg-opacity-15 rounded-md  text-center">
                view
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Drawer>
  );
};

export default DrawerProfile;
