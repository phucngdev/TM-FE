import React from "react";
import task from "../../assets/user/task.png";
import icon_communicate from "../../assets/user/icon-communicate.svg";
import icon_profile from "../../assets/user/icon-profile.svg";
import icon_simplify from "../../assets/user/icon-simplify.svg";
import icon_sort from "../../assets/user/icon-sort.svg";

const Overview = () => {
  return (
    <>
      <section className="container px-20 mx-auto h-screen flex items-center justify-center">
        <div className="flex items-center gap-10">
          <div className="w-2/5">
            <h2 className="text-5xl font-bold text-white leading-[70px]">
              One tool for <br /> doing it all, <br /> together
            </h2>
            <p className="text-3xl text-white font-bold leading-[50px] mt-10">
              Task Manager is the issue management tool for creators
            </p>
            <div className="flex items-center gap-10 mt-8">
              <button className="text-white bg-primary border border-primary px-7 py-2 rounded-md hover:bg-opacity-80 active:bg-opacity-90">
                Try it free
              </button>
              <button className="text-primary bg-transparent border border-primary px-7 py-2 rounded-md hover:text-white hover:bg-primary active:bg-primary active:bg-opacity-90">
                View prices
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img src={task} alt="" />
          </div>
        </div>
      </section>
      <section className="container px-20 mx-auto mb-20">
        <div className="flex justify-center">
          <h2 className="text-5xl font-bold text-white leading-[70px] max-w-[70%] text-center">
            Issue tracking, bug tracking, and code review in one
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-20 mt-20">
          <div className="">
            <img src={icon_communicate} alt="" />
            <h3 className="text-4xl font-bold text-white max-w-[65%] mt-4">
              Quickly communicate statuses visually
            </h3>
            <p className="text-white font-thin mt-6 max-w-[90%]">
              Kanban-style boards keep everyone in the loop, so issues don’t get
              lost in the shuffle.
            </p>
          </div>
          <div className="">
            <img src={icon_profile} alt="" />
            <h3 className="text-4xl font-bold text-white max-w-[65%] mt-4">
              Create accountability when collaborating
            </h3>
            <p className="text-white font-thin mt-6 max-w-[90%]">
              Assign each issue to a team member, so tasks always have someone
              responsible for moving them forward.
            </p>
          </div>
          <div className="">
            <img src={icon_sort} alt="" />
            <h3 className="text-4xl font-bold text-white max-w-[65%] mt-4">
              Easily sort and prioritize work
            </h3>
            <p className="text-white font-thin mt-6 max-w-[90%]">
              With robust search and filters, you can see all unresolved issues
              and quickly prioritize what matters most.
            </p>
          </div>
          <div className="">
            <img src={icon_simplify} alt="" />
            <h3 className="text-4xl font-bold text-white max-w-[65%] mt-4">
              Simplify collaborating on code
            </h3>
            <p className="text-white font-thin mt-6 max-w-[90%]">
              With Git and SVN built right in, you can review and comment on
              code in Backlog.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
