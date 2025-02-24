import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeInvisibleTwoTone,
  EyeTwoTone,
  UserAddOutlined,
} from "@ant-design/icons";
import { Input, message, Modal, Select } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../utils/formatJoinDate";
import { createTeam } from "../../../../services/admin/team.service";

const { TextArea } = Input;
const AddTeam = ({ isModalCreate, setIsModalCreate }) => {
  const dispatch = useDispatch();
  const personnel = useSelector((state) => state.personnel.data);
  const user = useSelector((state) => state.user.data);

  const [members, setMembers] = useState(() => {
    return personnel
      ? personnel
          .filter((member) => member.role === "Member")
          .map((member) => ({
            label: member.name,
            value: member._id,
          }))
      : [];
  });
  const [leader, setLeader] = useState(() => {
    return personnel
      ? personnel
          .filter((lead) => lead.role === "Lead")
          .map((lead) => ({
            label: lead.name,
            value: lead._id,
          }))
      : [];
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      members: [],
      status: "active",
      leader: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Team name cannot be empty"),
      description: Yup.string().required("Description cannot be empty"),
      members: Yup.array()
        .of(Yup.string().required("Each member must have an ID")) // Kiểm tra từng phần tử
        .min(1, "At least one member is required") // Kiểm tra tổng thể
        .required("At least one member is required"), // Kiểm tra nếu không có giá trị nào
      status: Yup.string().required("Status cannot be empty"),
      leader: Yup.string().required("Leader cannot be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataTeam = {
        name: values.name,
        description: values.description,
        members: values.members,
        status: values.status,
        leader: values.leader,
        createdBy: user._id,
      };
      const res = await dispatch(createTeam(dataTeam));
      if (res.payload.status === 201) {
        message.success(res.payload.message);
      } else {
        // message.error(res.payload.message);
      }
      resetForm();
      setIsModalCreate(false);
    },
  });
  return (
    <>
      <Modal
        title="Add team"
        open={isModalCreate}
        onOk={() => setIsModalCreate(false)}
        onCancel={() => setIsModalCreate(false)}
        footer={null}
      >
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-start justify-between gap-4 mt-4">
            <div className="flex flex-col flex-1">
              <label className="text-[12px] text-secondary" htmlFor="">
                Team name:
              </label>
              <Input
                id="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="team name"
                className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-s ">
                  *{formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col flex-1 text-white">
              <label className="text-[12px] text-secondary" htmlFor="">
                Status:
              </label>
              <Select
                id="status"
                placeholder="status"
                defaultValue="active"
                value={formik.values.status}
                onChange={(value) => formik.setFieldValue("status", value)}
                options={[
                  {
                    value: "active",
                    label: "active",
                  },
                  {
                    value: "inactive",
                    label: "inactive",
                  },
                ]}
              />
              {formik.touched.status && formik.errors.status ? (
                <div className="text-red-500 text-s ">
                  *{formik.errors.status}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-col flex-1">
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

          <div className="flex items-start justify-between gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <span className="text-[12px] text-secondary">Leader:</span>
              <Select
                id="leader"
                placeholder="leader"
                value={formik.values.leader}
                onChange={(value) => formik.setFieldValue("leader", value)}
                options={leader}
              />
              {formik.touched.leader && formik.errors.leader ? (
                <div className="text-red-500 text-s ">
                  *{formik.errors.leader}
                </div>
              ) : null}
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[12px] text-secondary">More:</span>
              <div className="flex items-center gap-2 text-secondary text-s">
                <UserAddOutlined /> Created by: {user.name}
              </div>
              <div className="flex items-center gap-2 text-secondary text-s">
                <ClockCircleOutlined /> Created at: {formatDate(new Date())}
              </div>
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
              type="submit"
              className="flex-1 flex items-center justify-center border cursor-pointer border-border rounded-md py-1 bg-red-600 hover:bg-red-500 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTeam;
