import {
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SmileOutlined,
  SolutionOutlined,
  SwapOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useMemo, useState } from "react";
import Task from "../../../components/admin/projects/tasks/Task";
import { Input, message, Result, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllMyTasks,
  getAllTasks,
  swapTaskStatus,
  swapTaskStatusLocal,
} from "../../../services/admin/task.service";
import CreateTask from "../../../components/admin/projects/tasks/CreateTask";
import TaskDetail from "../../../components/admin/projects/tasks/TaskDetail";
import Loading from "../../../components/shared/animation/Loading";

const STATUS_LIST = ["todo", "in_progress", "review", "done"];

const Column = ({ status, children }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="flex flex-col gap-3">
      {children}
    </div>
  );
};

const Tasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [status, setStatus] = useState(null);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);
  const [isMyTask, setIsMyTask] = useState(false);

  const handleOpenModalTask = (task) => {
    setSelectedTask(task);
    setIsModalTask(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        dispatch(getAllTasks(id)),
        dispatch(getAllMyTasks(id)),
      ]);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const tasks = useSelector((state) => state.tasks.data);
  const myTask = useSelector((state) => state.tasks.myTask);

  const itemSortTable = useMemo(() => {
    let items = [];
    if (tasks) {
      STATUS_LIST.forEach((status) => {
        items.push(...(tasks[status]?.map((task) => task._id) || []));
      });
    }
    return items;
  }, [tasks]);

  const isAllTasksEmpty = useMemo(() => {
    return Object.values(tasks).every(
      (arr) => Array.isArray(arr) && arr.length === 0
    );
  }, [tasks]);

  const handleDragStart = (event) => {
    setActiveData(event.active.data.current);
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    console.log("🚀 ~ handleDragOver ~ event:", event);
    // event.preventDefault();
  };

  const handleDragEnd = async (event) => {
    try {
      setSpin(true);
      const { id: activeId, data: activeData } = event.active;
      const { id: overId, data: overData } = event.over;
      const overIndex = overData.current.order;
      const activeIndex = activeData.current.order;
      const activeStatus = activeData.current.status;
      const overStatus = overData.current.status;

      if (!activeId || !overId) return;

      // dispatch(
      //   swapTaskStatusLocal({
      //     activeId,
      //     overId,
      //     activeIndex,
      //     overIndex,
      //     activeStatus,
      //     overStatus,
      //   })
      // );
      const response = await dispatch(
        swapTaskStatus({ activeId, overIndex, activeStatus, overStatus })
      );
      if (response.payload.status !== 200) throw new Error("Swap failed!");
    } catch (error) {
      message.error(error.message);
    } finally {
      fetchData();
      setSpin(false);
      setActiveData(null);
      setActiveId(null);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

  const handleOpenModal = (status) => {
    setIsModalCreate(true);
    setStatus(status);
  };

  return (
    <>
      {spin && <Loading />}
      <CreateTask
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
        status={status}
      />
      <TaskDetail
        taskId={selectedTask?._id}
        isModalTask={isModalTask}
        setIsModalTask={setIsModalTask}
      />
      <div className="flex items-center justify-between mt-3">
        <Input
          placeholder="Search tasks"
          className="w-3/5 bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
          prefix={<SearchOutlined className="text-secondary" />}
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMyTask(true)}
            className="flex items-center gap-1 text-[12px] text-color cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1"
          >
            <SolutionOutlined /> My tasks
          </button>
          <button
            type="button"
            onClick={() => setIsMyTask(false)}
            className="flex items-center gap-1 text-[12px] text-color cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1"
          >
            <UndoOutlined /> Recent
          </button>
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
      {/* <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(tasks).map(([status, taskList]) => (
            <SortableContext
              key={status}
              items={taskList.map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {taskList.map((task) => (
                  <Task
                    task={task}
                    key={task._id}
                    onOpenModal={handleOpenModalTask}
                  />
                ))}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext> */}
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <div className="grid grid-cols-4 gap-4">
          {STATUS_LIST.map((status) => (
            <SortableContext
              key={status}
              items={itemSortTable}
              strategy={verticalListSortingStrategy}
            >
              <Column status={status}>
                {(isMyTask ? myTask?.[status] : tasks?.[status])?.map(
                  (task) => (
                    <Task
                      key={task._id}
                      task={task}
                      onOpenModal={handleOpenModalTask}
                    />
                  )
                )}
              </Column>
              <DragOverlay dropAnimation={dropAnimation}>
                {activeId ? (
                  <Task task={activeData} onOpenModal={handleOpenModalTask} />
                ) : null}
              </DragOverlay>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default Tasks;
