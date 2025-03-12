import { Avatar } from "antd";
import React from "react";

const ListPost = () => {
  return (
    <>
      <div className="flex-1 h-[calc(100vh-150px)] overflow-y-auto p-2 bg-white bg-opacity-5 rounded-md">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <Avatar className="bg-[#fde3cf] text-[#f56a00] cursor-pointer">
                D
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="overflow-hidden text-xs text-white">
                    Dolia Cecelia
                  </div>
                  <div className="overflow-hidden text-s text-secondary">
                    12:30 11/03/2025
                  </div>
                </div>
                <div className="text-color text-xs mt-3 leading-7">
                  🛎️ [RIKKEI ACADEMY] THÔNG BÁO QUY ĐỊNH MẶC ĐỒNG PHỤC ĐỐI VỚI
                  GIẢNG VIÊN VÀ HỌC VIÊN ❗️ <br /> Các Giảng viên và các bạn
                  Học viên nhà Rikkei thân mến, Học viện xin thông báo về quy
                  định mặc đồng phục như sau: <br /> 📌 Bắt đầu từ ngày
                  28/08/2023, yêu cầu Giảng viên và Học viên mặc đồng phục vào
                  THỨ 2 HÀNG TUẦN (Áp dụng với lớp Fulltime).
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPost;
