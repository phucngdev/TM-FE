import React, { useEffect, useMemo } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOneProject } from "../../../services/admin/project.service";

const Overview = () => {
  const project = useSelector((state) => state.project.dataEdit);

  return (
    <>
      {project && (
        <div className="">
          <div className="">
            <h4 className="text-sm text-white font-jetbrains mb-3">Request</h4>
            <ul className="text-[11px] text-secondary list-disc list-inside marker:text-secondary">
              {project.requests.map((req) => (
                <li key={req._id}>{req.request}</li>
              ))}
            </ul>
          </div>
          <h4 className="text-sm text-white font-jetbrains mt-5 mb-3">
            Task Status
          </h4>
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-[12px] text-white p-3 rounded-lg bg-white bg-opacity-10">
              <div className="size-2 rounded-full bg-red-600"></div>
              To Do
              <div className="px-2 py-1 rounded-full flex items-center justify-center bg-white bg-opacity-15">
                {project?.todo || 0}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white p-3 rounded-lg bg-white bg-opacity-10">
              <div className="size-2 rounded-full bg-blue-600"></div>
              In Progress
              <div className="px-2 py-1 rounded-full flex items-center justify-center bg-white bg-opacity-15">
                {project?.in_progress || 0}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white p-3 rounded-lg bg-white bg-opacity-10">
              <div className="size-2 rounded-full bg-yellow-600"></div>
              Need Review
              <div className="px-2 py-1 rounded-full flex items-center justify-center bg-white bg-opacity-15">
                {project?.review || 0}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white p-3 rounded-lg bg-white bg-opacity-10">
              <div className="size-2 rounded-full bg-green-600"></div>
              Done
              <div className="px-2 py-1 rounded-full flex items-center justify-center bg-white bg-opacity-15">
                {project?.done || 0} / {project?.task_total || 0}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="">
              <h4 className="text-sm text-white font-jetbrains">Tech</h4>
              {project.documents.map((docs) => (
                <div className="mt-3" key={docs._id}>
                  <h5 className="text-[11px] text-white mb-2">{docs.title}</h5>
                  <ul className="text-[11px] text-secondary list-disc list-inside marker:text-secondary leading-5">
                    {docs.docs.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="">
              <h4 className="text-sm text-white font-jetbrains mb-3">
                Target Users
              </h4>
              <div className="mt-3">
                <h5 className="text-[11px] text-white mb-2">Startups</h5>
                <h5 className="text-[11px] text-white mb-2">
                  Mid-size companies
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
