import {
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  SolutionOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useMemo, useState } from "react";
import Task from "../../../components/admin/projects/tasks/Task";
import { Input, message, Result, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTasks } from "../../../services/admin/task.service";
import CreateTask from "../../../components/admin/projects/tasks/CreateTask";

const Tasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [activeId, setActiveId] = useState(null);
  const [status, setStatus] = useState(null);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getAllTasks(id));
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const tasks = useSelector((state) => state.tasks.data);

  const isAllTasksEmpty = useMemo(() => {
    return Object.values(tasks).every(
      (arr) => Array.isArray(arr) && arr.length === 0
    );
  }, [tasks]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  const handleOpenModal = (status) => {
    setIsModalCreate(true);
    setStatus(status);
  };

  return (
    <>
      <CreateTask
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
        status={status}
      />
      <div className="flex items-center justify-between mt-3">
        <Input
          placeholder="Search tasks"
          className="w-3/5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
          prefix={<SearchOutlined className="text-secondary" />}
        />
        <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
          <SolutionOutlined /> My tasks
        </div>
        <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
          <UndoOutlined /> Recent
        </div>
        <div className="flex items-center gap-1 text-[12px] text-secondary cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1">
          <SwapOutlined /> All filters
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {loading && !tasks ? (
          <Skeleton.Node active className="!w-full !h-20"></Skeleton.Node>
        ) : (
          [
            { label: "To Do", color: "bg-red-600", key: "todo" },
            { label: "In Progress", color: "bg-blue-600", key: "in_progress" },
            { label: "Need Review", color: "bg-yellow-600", key: "review" },
            { label: "Done", color: "bg-green-600", key: "done" },
          ].map(({ label, color, key }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] text-white">
                <div className={`size-2 rounded-full ${color}`}></div>
                {label}
                <div className="size-5 rounded-full flex items-center justify-center bg-white bg-opacity-15">
                  {tasks[key]?.length}
                </div>
              </div>
              <MoreOutlined className="text-white bg-white bg-opacity-10 p-1 rounded-lg" />
            </div>
          ))
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {["todo", "in_progress", "review", "done"].map((status) => (
          <button
            type="button"
            key={status}
            onClick={() => handleOpenModal(status)}
            className="flex items-center gap-2 text-primary text-xs cursor-pointer border border-dashed border-primary justify-center py-2 rounded-lg hover:bg-primary hover:text-white active:bg-opacity-70"
          >
            <PlusOutlined />
            Add New Task
          </button>
        ))}
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((ske) => (
            <div key={ske} className="flex flex-col gap-3">
              <Skeleton.Node active className="!w-full !h-36"></Skeleton.Node>
              <Skeleton.Node active className="!w-full !h-36"></Skeleton.Node>
              <Skeleton.Node active className="!w-full !h-36"></Skeleton.Node>
            </div>
          ))}
        </div>
      )}
      {isAllTasksEmpty && (
        <div className="flex items-center justify-center">
          <Result
            icon={<SmileOutlined className="!text-primary" />}
            title={
              <>
                <span className="text-white">
                  Great, let's get started with your first project!
                </span>
              </>
            }
            extra={
              <button
                onClick={() => setIsModalCreate(true)}
                className="bg-primary text-white hover:bg-opacity-60 px-3 py-2 rounded-md"
              >
                New Task
              </button>
            }
          />
        </div>
      )}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(tasks).map(([status, taskList]) => (
            <SortableContext
              key={status}
              items={taskList.map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {taskList.map((task) => (
                  <Task task={task} key={task._id} />
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default Tasks;
