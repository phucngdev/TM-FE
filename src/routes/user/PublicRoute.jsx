import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";

const PublicRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
