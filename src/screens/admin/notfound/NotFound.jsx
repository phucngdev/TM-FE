import { Button, Result } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Task Manager</title>
      </Helmet>
      <Result
        status="404"
        title={
          <>
            <span className="text-white">404</span>
          </>
        }
        subTitle={
          <>
            <span className="text-secondary">
              Sorry, the page you visited does not exist.
            </span>
          </>
        }
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
