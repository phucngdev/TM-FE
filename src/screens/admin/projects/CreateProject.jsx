import {
  CloseOutlined,
  FireOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Checkbox,
  DatePicker,
  Input,
  message,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProject } from "../../../services/admin/project.service";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateProject = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.data);
  const personnel = useSelector((state) => state.personnel.data);
  const user = useSelector((state) => state.user.data);

  const members = useMemo(() => {
    return personnel
      ?.filter((member) => member.role === "Member")
      ?.map((member) => ({
        label: member.name,
        value: member._id,
      }));
  }, [personnel]);

  const leaders = useMemo(() => {
    return personnel
      ?.filter((leader) => leader.role === "Lead")
      ?.map((leader) => ({
        label: leader.name,
        value: leader._id,
      }));
  }, [personnel]);

  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [requests, setRequests] = useState([""]);
  const [documents, setDocuments] = useState([{ title: "", docs: [""] }]);

  const handleAddReq = () => {
    setRequests([...requests, ""]);
  };

  const handleChangeReq = (event, selectedReqIndex) => {
    setRequests(
      requests.map((req, index) =>
        index === selectedReqIndex ? event.target.value : req
      )
    );
  };

  const handleRemoveReq = (index) => {
    if (index === 0) return;
    setRequests(requests.filter((_, i) => i !== index));
  };

  const handleAddDocs = (indexCurrent) => {
    setDocuments((prevDocuments) => {
      return prevDocuments.map((doc, index) =>
        index === indexCurrent ? { ...doc, docs: [...doc.docs, ""] } : doc
      );
    });
  };

  const handleAddTitle = () => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      { title: "", docs: [""] },
    ]);
  };

  const handleRemoveDocs = (indexCurrent, indexDoc) => {
    if (indexCurrent === 0 && indexDoc === 0) return;
    setDocuments(
      documents.map((doc, index) =>
        index === indexCurrent
          ? {
              ...doc,
              docs: doc.docs.filter((_, i) => i !== indexDoc),
            }
          : doc
      )
    );
  };

  const handleRemoveTitle = (index) => {
    if (index === 0) return;
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleChangeTitle = (e, indexCurrent) => {
    setDocuments(
      documents.map((doc, index) =>
        index === indexCurrent
          ? {
              ...doc,
              title: e.target.value,
            }
          : doc
      )
    );
  };

  const handleChangeDocs = (e, indexCurrent, indexDoc) => {
    setDocuments(
      documents.map((doc, index) =>
        index === indexCurrent
          ? {
              ...doc,
              docs: doc.docs.map((doc, i) =>
                i === indexDoc ? e.target.value : doc
              ),
            }
          : doc
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      client: "",
      budget: null,
      start_date: null,
      due_date: null,
      team: null,
      leader: null,
      members: [],
      requests: [],
      documents: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* Name cannot be empty"),
      description: Yup.string().required("* Description cannot be empty"),
      client: Yup.string().required("* Client cannot be empty"),
      budget: Yup.number()
        .typeError("* Budget must be a number") // Kiểm tra nếu nhập không phải là số
        .required("* Budget cannot be empty")
        .positive("* Budget must be a positive number"), // (Tuỳ chọn) Kiểm tra số dương
      start_date: Yup.date().required("* Start date cannot be empty"),
      due_date: Yup.date().required("* Due date cannot be empty"),
      // team: Yup.object({
      //   _id: Yup.string().required("* Team cannot be empty"),
      // }),
      // members: Yup.array(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataProject = {
        name: values.name,
        description: values.description,
        client: values.client,
        budget: values.budget,
        start_date: values.start_date,
        due_date: values.due_date,
        team: values.team,
        leader: values.leader,
        members: values.members,
        requests: requests,
        documents: documents,
        created_by: user._id,
        PM: user._id,
      };
      console.log("🚀 ~ onSubmit: ~ dataProject:", dataProject);

      // Mã hóa dữ liệu trước khi gửi
      // const encryptedData = CryptoJS.AES.encrypt(
      //   JSON.stringify(dataUser),
      //   import.meta.env.VITE_SECRET_KEY
      // ).toString();

      // const payload = { encryptedData }; // Gửi object chứa dữ liệu mã hóa

      // setLoading(true);

      try {
        await dispatch(createProject(dataProject));
      } catch (error) {
        message.error(error.message); // Hiển thị lỗi khi timeout
      } finally {
        // setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white bg-opacity-5 rounded-md p-3"
      >
        <div className="sticky top-[80px] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white font-jetbrains mb-4">
              New Project
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center font-jetbrains cursor-pointer gap-2 py-2 px-3 rounded-md text-sm text-white bg-white bg-opacity-20 hover:bg-opacity-50 active:bg-opacity-45"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center font-jetbrains cursor-pointer gap-2 py-2 px-3 rounded-md text-sm text-white bg-primary hover:bg-opacity-50 active:bg-opacity-45"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-start gap-5 justify-between">
            <div className="flex-[2] flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Name project
                </label>
                <Input
                  type="text"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="project name"
                  className="bg-transparent focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Description
                </label>
                <TextArea
                  id="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="bg-transparent focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                  placeholder="description"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Client
                </label>
                <Input
                  type="text"
                  id="client"
                  value={formik.values.client}
                  onChange={formik.handleChange}
                  placeholder="client"
                  className="bg-transparent focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                />
                {formik.touched.client && formik.errors.client ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.client}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Budget
                </label>
                <Input
                  type="text"
                  id="budget"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  placeholder="budget"
                  className="bg-transparent focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                />
                {formik.touched.budget && formik.errors.budget ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.budget}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-secondary">
                  Start date - Due date
                </span>
                <RangePicker
                  placeholder={["Start date", "Due date"]}
                  onChange={(dates) => {
                    formik.setFieldValue("start_date", dates[0].$d);
                    formik.setFieldValue("due_date", dates[1].$d);
                  }}
                  className="bg-transparent text-secondary border-border hover:bg-transparent focus-within:bg-transparent"
                />
                {formik.touched.start_date && formik.errors.start_date ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.start_date}
                  </div>
                ) : null}
                {formik.touched.due_date && formik.errors.due_date ? (
                  <div className="text-red-500 text-s ">
                    {formik.errors.due_date}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Requests
                </label>
                {requests.map((req, index) => (
                  <div className="flex items-center justify-between gap-2">
                    <TextArea
                      key={index}
                      autoSize={{
                        minRows: 1,
                        maxRows: 5,
                      }}
                      value={req}
                      onChange={(event) => handleChangeReq(event, index)}
                      placeholder="+ request"
                      className="mb-3 bg-transparent !border-t-transparent !border-e-transparent !rounded-none focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                    />
                    {index !== 0 && (
                      <button
                        onClick={() => handleRemoveReq(index)}
                        type="button"
                        className="flex items-center justify-center p-1 rounded-full text-secondary text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                      >
                        <CloseOutlined />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddReq()}
                  type="button"
                  className="mt-2 flex items-center justify-center gap-1 px-2 py-1 rounded-md w-28 border border-border cursor-pointer text-secondary text-s hover:text-white hover:bg-white hover:bg-opacity-20"
                >
                  <PlusOutlined /> Add requests
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[11px] text-secondary">
                  Document
                </label>
                <div className="flex flex-col gap-4">
                  {documents.map((d, index) => (
                    <>
                      <div
                        key={index}
                        className="flex items-start justify-between gap-1"
                      >
                        <div className="flex-1 flex items-center gap-1">
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={documents[index].title}
                              onChange={(event) =>
                                handleChangeTitle(event, index)
                              }
                              placeholder="+ title"
                              className="flex-1 bg-transparent !border-t-transparent !border-e-transparent !rounded-none focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                            />
                            {index !== 0 && (
                              <button
                                onClick={() => handleRemoveTitle(index)}
                                type="button"
                                className="flex items-center justify-center p-1 rounded-full text-secondary text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                              >
                                <CloseOutlined />
                              </button>
                            )}
                          </div>
                          <SwapRightOutlined className="text-secondary" />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          {d.docs.map((ds, indexDocs) => (
                            <div className="flex items-center justify-between gap-2">
                              <Input
                                key={indexDocs}
                                value={d.docs[indexDocs]}
                                onChange={(event) =>
                                  handleChangeDocs(event, index, indexDocs)
                                }
                                type="text"
                                placeholder="+ docs"
                                className=" bg-transparent !border-t-transparent !border-e-transparent !rounded-none focus-within:bg-transparent hover:bg-transparent placeholder:text-secondary placeholder:text-s"
                              />
                              {indexDocs !== 0 && (
                                <button
                                  onClick={() =>
                                    handleRemoveDocs(index, indexDocs)
                                  }
                                  type="button"
                                  className="flex items-center justify-center p-1 rounded-full text-secondary text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                                >
                                  <CloseOutlined />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => handleAddDocs(index)}
                            type="button"
                            className="mt-2 flex items-center justify-center gap-1 px-2 py-1 rounded-md w-28 border border-border cursor-pointer text-secondary text-s hover:text-white hover:bg-white hover:bg-opacity-20"
                          >
                            <PlusOutlined /> Add docs
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <button
                  onClick={() => handleAddTitle()}
                  type="button"
                  className="mt-2 flex items-center justify-center gap-1 px-2 py-1 rounded-md w-28 border border-border cursor-pointer text-secondary text-s hover:text-white hover:bg-white hover:bg-opacity-20"
                >
                  <PlusOutlined /> Add title
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-secondary">Leader</span>
                <div className="flex flex-col gap-3">
                  <Select
                    id="leaders"
                    placeholder="leader"
                    value={formik.values.leader}
                    onChange={(value) => {
                      formik.setFieldValue("leader", value);
                    }}
                    options={leaders}
                    className="w-full"
                  />
                </div>
                <span className="text-[11px] text-secondary mt-4">Members</span>
                <div className="flex flex-col gap-3">
                  <Select
                    id="members"
                    placeholder="members"
                    mode="multiple"
                    value={formik.values.members}
                    onChange={(value) => {
                      formik.setFieldValue("members", value);
                    }}
                    options={members}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 my-2">
                  <div className="flex-1 h-[1px] bg-border"></div>
                  <span className="text-secondary text-s">OR</span>
                  <div className="flex-1 h-[1px] bg-border"></div>
                </div>
                <span className="text-[11px] text-secondary">Teams</span>
                <div className="flex flex-col gap-3">
                  {teams.map((t) => (
                    <div
                      key={t._id}
                      className={`flex items-center justify-between p-2 rounded-md text-[11px] text-secondary 
                        ${
                          formik.values.team === t._id
                            ? "bg-white bg-opacity-20"
                            : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{t.name}</span>-
                        <span>Leader: {t.leader.name}</span>
                      </div>
                      <div>
                        <Checkbox
                          id="team"
                          checked={formik.values.team === t._id}
                          onChange={() => formik.setFieldValue("team", t._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 border-s border-border ps-5">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-secondary">Infomation</span>
                <table className="text-s text-secondary border-separate border-spacing-y-2">
                  <tbody>
                    <tr>
                      <td className="">PM:</td>
                      <td className="text-white">Front-end</td>
                    </tr>
                    <tr>
                      <td className="">Status:</td>
                      <td className="text-[#d69e3b] flex items-center gap-1">
                        <FireOutlined />{" "}
                        <p className="px-[6px] py-[1px] rounded-xl bg-[#d69e3b] bg-opacity-20">
                          Progress
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="">PM:</td>
                      <td className="flex items-center gap-1 text-white">
                        <Avatar size={15} className="bg-[#3b50d6]">
                          T
                        </Avatar>{" "}
                        Tony Start
                      </td>
                    </tr>
                    <tr>
                      <td className="">Created by:</td>
                      <td className="flex items-center gap-1 text-white">
                        <Avatar size={15} className="bg-[#1c5c1d]">
                          A
                        </Avatar>{" "}
                        Adison Tombell
                      </td>
                    </tr>

                    <tr>
                      <td className="">Created at:</td>
                      <td className="text-white">Dec 31, 2024 - 8:49 AM</td>
                    </tr>
                    {/* <tr>
                      <td className="">Updated:</td>
                      <td className="text-white">Dec 31, 2024 - 8:49 AM</td>
                    </tr>
                    <tr>
                      <td className="">Deadline:</td>
                      <td className="text-white">-</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProject;
