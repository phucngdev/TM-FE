import {
  EllipsisOutlined,
  EyeOutlined,
  MessageOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskDetail from "./TaskDetail";

const Task = ({ onOpenModal, task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { ...task },
    onPointerDownCapture: (event) => event.preventDefault(),
  });

  const dndkitStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <>
      {task && (
        <div
          ref={setNodeRef}
          style={dndkitStyle}
          {...attributes}
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(task);
          }}
          className="relative p-2 max-h-40 min-h-40 rounded-lg flex flex-col justify-between bg-white bg-opacity-10 cursor-pointer hover:bg-opacity-20 hover:rotate-3 transition duration-150"
        >
          <div
            {...listeners}
            className="absolute top-0 right-0 size-16 rounded-bl-full rounded-tr-lg bg-white bg-opacity-20 hover:bg-opacity-25"
          ></div>
          <div className="">
            <div className="flex items-center justify-between text-secondary ">
              <div className="flex items-center gap-1">
                {task.tags.map((t) => (
                  <p
                    key={t._id}
                    className="text-s py-1 px-2 rounded-lg bg-primary bg-opacity-70 text-white"
                  >
                    {t.name}
                  </p>
                ))}
              </div>
              <VerticalAlignMiddleOutlined />
            </div>
            <h5 className="text-[12px] py-2 text-white">{task.title}</h5>
            <p className="text-s text-secondary max-h-12 overflow-hidden text-ellipsis">
              {task.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Avatar.Group
              max={{
                count: 2,
                style: {
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                },
              }}
              size="small"
            >
              {task.assigned_to.map((m) => (
                <Avatar key={m._id} className="text-white bg-[#349f88]">
                  {m?.name?.[0]}
                </Avatar>
              ))}
            </Avatar.Group>
            <div className="flex items-center gap-3 text-[12px] text-secondary">
              <div className="flex items-center gap-1">
                <EyeOutlined /> {task.viewed.length}
              </div>
              <div className="flex items-center gap-1">
                <MessageOutlined /> {task.comments.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
