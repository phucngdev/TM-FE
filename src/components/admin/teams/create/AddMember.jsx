import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeInvisibleTwoTone,
  EyeTwoTone,
  UserAddOutlined,
} from "@ant-design/icons";
import { Input, message, Modal, Select } from "antd";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { createPersonnel } from "../../../../services/admin/personnel.service";
import { formatDate } from "../../../../utils/formatJoinDate";

const AddMember = ({
  title,
  isModalCreate,
  setIsModalCreate,
  newPersonnel,
  oldMember,
}) => {
  const dispatch = useDispatch();
  const personnel = useSelector((state) => state.personnel.data);
  const user = useSelector((state) => state.user.data);

  const members = useMemo(() => {
    return personnel
      ?.filter(
        (member) =>
          member.role === "Member" &&
          (newPersonnel || !oldMember?.some((old) => old._id === member._id))
      )
      ?.map((member) => ({
        label: member.name,
        value: member._id,
      }));
  }, [personnel, oldMember, newPersonnel]);

  const leaders = useMemo(() => {
    return (
      personnel &&
      personnel
        ?.filter((member) => member.role === "Lead")
        ?.map((member) => ({
          label: member.name,
          value: member._id,
        }))
    );
  }, [personnel]);

  const PMs = useMemo(() => {
    return personnel
      ?.filter((member) => member.role === "PM")
      ?.map((member) => ({
        label: member.name,
        value: member._id,
      }));
  }, [personnel]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: null,
      role: "Member",
      members: [],
      leader: null,
      PM: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* Username cannot be empty"),
      email: Yup.string()
        .email("* Invalid email")
        .required("* Email cannot be empty"),
      password: Yup.string().required("* Password cannot be empty"),
      phone: Yup.string().required("* Phone cannot be empty"),
      role: Yup.string().required("* Role cannot be empty"),
      Leader: Yup.string().required("* Leader cannot be empty"),
      PM: Yup.string().required("* PM cannot be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        role: values.role,
        admin: user._id,
      };
      // Mã hóa dữ liệu trước khi gửi
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataUser),
        import.meta.env.VITE_SECRET_KEY
      ).toString();

      const payload = { encryptedData }; // Gửi object chứa dữ liệu mã hóa
      let response;

      if (newPersonnel) {
        response = await dispatch(createPersonnel(payload));
      }

      if (response.payload.status === 201) {
        message.success(response.payload.message);
      } else {
        message.error(response.payload.message);
      }
      resetForm();
      setIsModalCreate(false);
    },
  });

  return (
    <>
      <Modal
        title={title}
        open={isModalCreate}
        onOk={() => setIsModalCreate(false)}
        onCancel={() => setIsModalCreate(false)}
        footer={null}
      >
        {!newPersonnel && (
          <>
            <div className="flex flex-col text-white mt-4 mb-8">
              <span className="text-[12px] text-secondary">Members:</span>
              <Select
                id="members"
                placeholder="members"
                mode="multiple"
                value={formik.values.members}
                onChange={(value) => formik.setFieldValue("members", value)}
                options={members}
                className="w-full"
              />
            </div>
            <h4 className="text-base text-white font-bold">New Member</h4>
          </>
        )}
        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="flex flex-col flex-1">
              <label className="text-[12px] text-secondary" htmlFor="">
                Username:
              </label>
              <Input
                id="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="username"
                className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-s ">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col flex-1 text-white">
              <label className="text-[12px] text-secondary" htmlFor="">
                Password:
              </label>
              <Input.Password
                id="password"
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone twoToneColor="#fff" />
                  ) : (
                    <EyeInvisibleTwoTone twoToneColor="#fff" />
                  )
                }
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="password"
                className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-s ">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-[12px] text-secondary" htmlFor="">
              Email:
            </label>
            <Input
              id="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="email"
              className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-s ">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-[12px] text-secondary" htmlFor="">
              Phone:
            </label>
            <Input
              id="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="phone"
              className="hover:bg-transparent active:bg-transparent focus-within:bg-transparent placeholder:text-secondary bg-transparent border border-border text-s text-white rounded-lg p-2 placeholder:text-s"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-s ">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="flex items-start justify-between gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <span className="text-[12px] text-secondary">Role:</span>
              <Select
                defaultValue="member"
                className="w-full"
                onChange={(value) => formik.setFieldValue("role", value)}
                options={[
                  {
                    value: "Member",
                    label: "member",
                  },
                  {
                    value: "Lead",
                    label: "leader",
                  },
                  {
                    value: "PM",
                    label: "PM",
                  },
                ]}
              />
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-500 text-s ">{formik.errors.role}</div>
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
          {formik.values.role == "Member" && (
            <div className="flex-1 flex flex-col mt-4">
              <span className="text-[12px] text-secondary">Leader:</span>
              <Select
                defaultValue="leader"
                className="w-full"
                onChange={(value) => formik.setFieldValue("leader", value)}
                options={leaders}
              />
              {formik.touched.leader && formik.errors.leader ? (
                <div className="text-red-500 text-s ">
                  {formik.errors.leader}
                </div>
              ) : null}
            </div>
          )}
          {formik.values.role == "Lead" && (
            <div className="flex-1 flex flex-col mt-4">
              <span className="text-[12px] text-secondary">PM:</span>
              <Select
                defaultValue="pm"
                className="w-full"
                onChange={(value) => formik.setFieldValue("PM", value)}
                options={PMs}
              />
              {formik.touched.PM && formik.errors.PM ? (
                <div className="text-red-500 text-s ">{formik.errors.PM}</div>
              ) : null}
            </div>
          )}
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

export default AddMember;
