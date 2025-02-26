import {
  Avatar,
  DatePicker,
  Input,
  message,
  Modal,
  Select,
  Skeleton,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs"; // ✅ Import dayjs
import { useDispatch, useSelector } from "react-redux";
import { getOneTask } from "../../../../services/admin/task.service";
import {
  DeleteOutlined,
  HolderOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TaskDetail = ({ isModalTask, setIsModalTask, taskId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [taskCase, setTaskCase] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getOneTask(taskId));
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  const taskDetail = useSelector((state) => state.tasks.dataEdit);
  const personnel = useSelector((state) => state.personnel.data);
  const tags = useSelector((state) => state.tags.data);

  const members = useMemo(() => {
    return personnel
      ?.filter((member) => member.role === "Member")
      ?.map((member) => ({
        label: member.name,
        value: member._id,
      }));
  }, [personnel]);

  const tag = useMemo(() => {
    return tags?.map((t) => ({
      label: t.name,
      value: t._id,
    }));
  }, [tags]);

  const handleAddTaskCase = () => {
    setTaskCase([...taskCase, ""]);
  };

  const handleDeleteTaskCase = (index) => {
    setTaskCase(taskCase.filter((_, i) => i !== index));
  };

  return (
    <>
      <Modal
        title={`Task Detail - ${taskDetail?.title}`}
        open={isModalTask}
        onOk={() => setIsModalTask(false)}
        onCancel={() => setIsModalTask(false)}
        footer={null}
      >
        {loading || !taskDetail ? (
          <>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col flex-1 mt-2">
                <label className="text-[12px] text-secondary" htmlFor="">
                  Description:
                </label>
                <Skeleton.Node active className="!w-full !h-12"></Skeleton.Node>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[12px] text-secondary">Deadline</span>
                <Skeleton.Node active className="!w-full !h-12"></Skeleton.Node>
              </div>
              <div className="flex items-start gap-4 mt-2">
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[12px] text-secondary">Assign to</span>
                  <div className="flex items-center gap-1">
                    <Skeleton.Avatar active size="large" />
                    <Skeleton.Avatar active size="large" />
                    <Skeleton.Avatar active size="large" />
                    <Skeleton.Avatar active size="large" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[12px] text-secondary">Tags</span>
                  <div className="flex items-center gap-1">
                    <Skeleton.Button active size="default" />
                    <Skeleton.Button active size="default" />
                    <Skeleton.Button active size="default" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[12px] text-secondary">Task Details</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 justify-between text-secondary">
                    <HolderOutlined />
                    <Skeleton.Input
                      active
                      size="default"
                      className="!flex-1 !w-full"
                    />
                    <button type="button" className="hover:text-white">
                      <DeleteOutlined />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 justify-between text-secondary">
                    <HolderOutlined />
                    <Skeleton.Input
                      active
                      size="default"
                      className="!flex-1 !w-full"
                    />
                    <button type="button" className="hover:text-white">
                      <DeleteOutlined />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 justify-between text-secondary">
                    <HolderOutlined />
                    <Skeleton.Input
                      active
                      size="default"
                      className="!flex-1 !w-full"
                    />
                    <button type="button" className="hover:text-white">
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 mt-8">
                <Skeleton.Button active size="default" className="!w-full" />
                <Skeleton.Button active size="default" className="!w-full" />
                <Skeleton.Button active size="default" className="!w-full" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col flex-1 mt-2">
              <label className="text-[12px] text-secondary" htmlFor="">
                Description:
              </label>
              <TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
                type="text"
                readOnly
                value={taskDetail.description}
                placeholder="description"
                className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[12px] text-secondary">Deadline</span>
              <RangePicker
                placeholder={["Start date", "Due date"]}
                defaultValue={[
                  dayjs(taskDetail.start_date),
                  dayjs(taskDetail.due_date),
                ]}
                className="bg-transparent text-white border-border hover:bg-transparent focus-within:bg-transparent"
              />
            </div>
            <div className="flex items-start gap-4 mt-2">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[12px] text-secondary">Assign to</span>
                <div className="flex items-center gap-1">
                  {taskDetail.assigned_to.map((as) => (
                    <Avatar key={as._id} className="text-white bg-[#349f88]">
                      {as?.name?.[0]}
                    </Avatar>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAddMember(true)}
                    className="text-s size-8 rounded-full bg-primary hover:bg-opacity-70 active:bg-opacity-80 text-white"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[12px] text-secondary">Tags</span>
                <div className="flex items-center gap-1">
                  {taskDetail.tags.map((t) => (
                    <p
                      key={t._id}
                      className="text-s py-1 px-2 rounded-lg bg-primary text-white"
                    >
                      {t.name}
                    </p>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAddTag(true)}
                    className="text-s py-1 px-4 rounded-lg bg-primary text-white"
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-2">
              {addMember && (
                <div className="flex-1">
                  <span className="text-[12px] text-secondary">Members</span>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 flex-col gap-3">
                      <Select
                        id="members"
                        placeholder="members"
                        mode="multiple"
                        // value={formik.values.members}
                        // onChange={(value) => {
                        //   formik.setFieldValue("members", value);
                        // }}
                        options={members}
                        className="w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setAddMember(false)}
                      className="text-secondary hover:text-white"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              )}
              {addTag && (
                <div className="flex-1">
                  <span className="text-[12px] text-secondary">Tags:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 flex-col gap-3">
                      <Select
                        id="tags"
                        placeholder="tags"
                        mode="multiple"
                        // value={formik.values.tags}
                        // onChange={(value) => formik.setFieldValue("tags", value)}
                        options={tag}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setAddTag(false)}
                      className="text-secondary hover:text-white"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[12px] text-secondary">Task Details</span>
              <div className="flex flex-col gap-2">
                {taskDetail.task_case.map((t) => (
                  <div
                    key={t._id}
                    className="flex items-center gap-3 justify-between text-secondary"
                  >
                    <HolderOutlined />
                    <Input
                      placeholder="task case"
                      value={t}
                      className="bg-transparent placeholder:text-secondary text-white border-border hover:bg-transparent focus-within:bg-transparent"
                    />
                    <button type="button" className="hover:text-white">
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
                {taskCase.map((t, index) => (
                  <div className="flex items-center gap-3 justify-between text-secondary">
                    <HolderOutlined />
                    <Input
                      placeholder="task case"
                      value={taskCase[index]}
                      onChange={(e) =>
                        setTaskCase(
                          taskCase.map((task, taskIndex) =>
                            index === taskIndex ? e.target.value : task
                          )
                        )
                      }
                      className="bg-transparent placeholder:text-secondary text-white border-border hover:bg-transparent focus-within:bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteTaskCase(index)}
                      className="hover:text-white"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddTaskCase()}
                  className="text-s py-2 rounded-lg bg-primary hover:bg-opacity-70 active:bg-opacity-80 text-white mt-3"
                >
                  Add New
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-8">
              <button
                type="button"
                className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-white bg-opacity-5 hover:bg-opacity-10 text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-red-600 hover:bg-red-500 active:bg-red-600 text-white"
              >
                Save
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-primary hover:bg-red-500 active:bg-red-600 text-white"
              >
                {taskDetail.status == "todo" && "Accept"}
                {taskDetail.status == "in_progress" && "Review"}
                {taskDetail.status == "review" && "Done"}
                {taskDetail.status == "done" && "Reopen"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TaskDetail;
