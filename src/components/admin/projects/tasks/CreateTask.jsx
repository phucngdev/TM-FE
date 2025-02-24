import React, { useEffect, useMemo, useState } from "react";
import { Modal, Select, Input, DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTag, getAllTags } from "../../../../services/admin/tag.service";
import { useParams } from "react-router-dom";
import { createTask } from "../../../../services/admin/task.service";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const statusOption = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];
const CreateTask = ({ setIsModalCreate, isModalCreate, status }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const project = useSelector((state) => state.project.dataEdit);
  const user = useSelector((state) => state.user.data);
  const tags = useSelector((state) => state.tags.data);
  const [disabled, setDisabled] = useState(false);
  const [isNewTag, setIsNewTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  const fetchData = async () => {
    try {
      await dispatch(getAllTags(id));
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const members = useMemo(() => {
    return project?.members?.map((member) => ({
      label: member.name,
      value: member._id,
    }));
  }, [project]);

  const tag = useMemo(() => {
    return tags?.map((t) => ({
      label: t.name,
      value: t._id,
    }));
  }, [tags]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      members: [],
      tags: [],
      status: status,
      start_date: null,
      due_date: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title cannot be empty"),
      description: Yup.string().required("Description cannot be empty"),
      members: Yup.array()
        .of(Yup.string().required("Each member must have an ID")) // Kiểm tra từng phần tử
        .min(1, "At least one member is required") // Kiểm tra tổng thể
        .required("At least one member is required"), // Kiểm tra nếu không có giá trị nào
      tags: Yup.array()
        .of(Yup.string().required("Each tag must have an ID")) // Kiểm tra từng phần tử
        .min(1, "At least one tag is required") // Kiểm tra tổng thể
        .required("At least one tag is required"), // Kiểm tra nếu không có giá trị nào
      start_date: Yup.date().required("* Deadline cannot be empty"),
      due_date: Yup.date().required("* Deadline cannot be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setDisabled(true);
      const newTask = {
        title: values.title,
        description: values.description,
        status: status ? status : values.status,
        start_date: values.start_date,
        due_date: values.due_date,
        assigned_to: values.members,
        project: id,
        tags: values.tags,
        created_by: user._id,
      };
      await dispatch(createTask(newTask));
      resetForm();
      setIsModalCreate(false);
      setDisabled(false);
    },
  });

  const handleSubmitNewTag = async () => {
    if (newTag.trim() === "") return;
    const newTagData = {
      name: newTag,
      project: project._id,
      created_by: user._id,
    };
    try {
      await dispatch(createTag(newTagData));
      setIsNewTag(false);
      setNewTag("");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Modal
        title="New Task"
        open={isModalCreate}
        onOk={() => setIsModalCreate(false)}
        onCancel={() => setIsModalCreate(false)}
        footer={null}
      >
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-center gap-4 mt-4">
            <div className="flex flex-col flex-1">
              <label className="text-[12px] text-secondary" htmlFor="">
                Title:
              </label>
              <Input
                id="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="title"
                className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500 text-s ">
                  *{formik.errors.title}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-[12px] text-secondary" htmlFor="">
                Status:
              </label>
              <Select
                id="status"
                placeholder="status"
                defaultValue={formik.values.status}
                value={formik.values.status}
                onChange={(value) => formik.setFieldValue("status", value)}
                options={statusOption}
              />
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <label className="text-[12px] text-secondary" htmlFor="">
                Tags:
              </label>
              <Select
                id="tags"
                placeholder="tags"
                mode="multiple"
                value={formik.values.tags}
                onChange={(value) => formik.setFieldValue("tags", value)}
                options={tag}
              />
              {formik.touched.tags && formik.errors.tags ? (
                <div className="text-red-500 text-s ">
                  *{formik.errors.tags}
                </div>
              ) : null}
            </div>
            <div className="w-20 flex flex-col">
              <label className="text-[12px] text-transparent" htmlFor="">
                New Tags:
              </label>
              <button
                type="button"
                onClick={() => setIsNewTag(true)}
                className="hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-15 bg-transparent border border-border text-s text-secondary rounded-lg p-2"
              >
                New Tag
              </button>
            </div>
          </div>
          {isNewTag && (
            <div className="flex flex-col flex-1 mt-4">
              <label className="text-[12px] text-secondary" htmlFor="">
                New Tag:
              </label>
              <div className="flex items-center gap-4">
                <Input
                  id="new_tag"
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="new tag"
                  className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
                />
                <button
                  type="button"
                  onClick={() => handleSubmitNewTag()}
                  className="w-20 text-s bg-red-600 hover:bg-red-500 active:bg-red-600 text-white rounded-lg p-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewTag(false)}
                  className="w-20 hover:bg-white hover:bg-opacity-20 active:bg-white active:bg-opacity-15 bg-transparent border border-border text-s text-secondary rounded-lg p-2"
                >
                  Cancel
                </button>
              </div>
              {newTag === "" ? (
                <div className="text-red-500 text-s ">
                  * New tag cannot be empty
                </div>
              ) : null}
            </div>
          )}
          <div className="flex flex-col flex-1 mt-4">
            <label className="text-[12px] text-secondary" htmlFor="">
              Description:
            </label>
            <TextArea
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
              id="description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="description"
              className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-s ">
                *{formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-[12px] text-secondary" htmlFor="">
              Members:
            </label>
            <Select
              id="members"
              placeholder="members"
              mode="multiple"
              value={formik.values.members}
              onChange={(value) => formik.setFieldValue("members", value)}
              options={members}
            />
            {formik.touched.members && formik.errors.members ? (
              <div className="text-red-500 text-s ">
                *{formik.errors.members}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <span className="text-[12px] text-secondary">Deadline</span>
            <RangePicker
              placeholder={["Start date", "Due date"]}
              onChange={(dates) => {
                formik.setFieldValue("start_date", dates[0].$d);
                formik.setFieldValue("due_date", dates[1].$d);
              }}
              className="bg-transparent text-secondary border-border hover:bg-transparent focus-within:bg-transparent"
            />
            {formik.touched.start_date &&
            formik.errors.start_date &&
            formik.touched.due_date &&
            formik.errors.due_date ? (
              <div className="text-red-500 text-s ">
                {formik.errors.start_date}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                setIsModalCreate(false);
                formik.resetForm();
              }}
              className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-white bg-opacity-5 hover:bg-opacity-10 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={disabled}
              className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-red-600 hover:bg-red-500 active:bg-red-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateTask;
