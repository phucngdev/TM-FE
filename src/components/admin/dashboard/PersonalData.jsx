import { ExclamationCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PersonalData = () => {
  const [list, setList] = useState([
    {
      title: "Ant Design Title 1",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
      due_date: "2025-01-11",
    },

    {
      title: "Ant Design Title 2",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
      due_date: "2025-01-11",
    },
    {
      title: "Ant Design Title 3",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team",
      due_date: "2025-01-11",
    },
  ]);
  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 text-color rounded-md border border-border">
            <p className="text-sm">Total task</p>
            <div className="flex items-center gap-3 mt-2">
              <ExclamationCircleOutlined />
              <p className="text-sm">10</p>
            </div>
          </div>
          <div className="p-3 text-color rounded-md border border-border">
            <p className="text-sm">Total task</p>
            <div className="flex items-center gap-3 mt-2">
              <ExclamationCircleOutlined />
              <p className="text-sm">10</p>
            </div>
          </div>
          <div className="p-3 text-color rounded-md border border-border">
            <p className="text-sm">Total task</p>
            <div className="flex items-center gap-3 mt-2">
              <ExclamationCircleOutlined />
              <p className="text-sm">10</p>
            </div>
          </div>
          <div className="p-3 text-color rounded-md border border-border">
            <p className="text-sm">Total task</p>
            <div className="flex items-center gap-3 mt-2">
              <ExclamationCircleOutlined />
              <p className="text-sm">10</p>
            </div>
          </div>
        </div>
        <div className="border border-border rounded-md p-4 mt-4">
          <h3 className="text-white">Deadline</h3>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link className="!text-white text-xs hover:underline" to="">
                      {item.title}
                    </Link>
                  }
                  description={
                    <>
                      <span className="text-xs text-color">
                        {item.due_date}
                      </span>
                      <br />
                      <span className="text-xs text-color">
                        {item.description}
                      </span>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalData;
