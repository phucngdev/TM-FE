import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Input, message } from "antd";
import { Helmet } from "react-helmet";
import frieren from "../../../public/frieren.jpeg";
import frieren2 from "../../../public/frieren2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";

import {
  AliyunOutlined,
  EyeInvisibleOutlined,
  EyeInvisibleTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { login } from "../../services/admin/auth.service";
import Loading from "../../components/shared/animation/Loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRef = useRef();
  const [loading, setLoading] = useState(false);

  // const checkLogin = useCookie("user_info", false);
  // useEffect(() => {
  //   if (checkLogin) {
  //     message.warning(language.login.notify.warning);
  //     navigate("/");
  //     return;
  //   }
  // }, [checkLogin]);

  useEffect(() => {
    currentRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("* Invalid email")
        .required("* Email cannot be empty"),
      password: Yup.string().required("* Password cannot be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataUser = {
        email: values.email,
        password: values.password,
      };
      // Mã hóa dữ liệu trước khi gửi
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataUser),
        import.meta.env.VITE_SECRET_KEY
      ).toString();

      const payload = { encryptedData }; // Gửi object chứa dữ liệu mã hóa

      setLoading(true);
      // Hàm timeout sau 5 giây
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      );

      try {
        // Chạy cả hai Promise (login request và timeout)
        const response = await Promise.race([
          dispatch(login(payload)),
          timeout,
        ]);

        if (response.payload?.status === 200) {
          navigate("/");
        } else if (response.payload?.response?.status === 500) {
          message.error("Invalid email or password");
        }
      } catch (error) {
        message.error(error.message); // Hiển thị lỗi khi timeout
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {loading && <Loading />}
      <section className="">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={frieren}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <Link className="block text-white" to="/overview">
                <span className="sr-only">Home</span>
                <AliyunOutlined className="text-5xl" />
              </Link>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Task Manager 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem quam aperiam, aliquid delectus, officia id assumenda
                dolor quo voluptas pariatur optio alias rem repudiandae? Natus
                ipsum veritatis eligendi rerum itaque.
              </p>
            </div>
          </section>

          <main className="relative flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            {/* <img
              src={frieren2}
              alt=""
              className="absolute inset-0 h-full w-full object-cover -z-10 blur-xl"
            /> */}
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <Link
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  to="/overview"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Task Manager 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                  quis laborum saepe quae accusantium officiis adipisci
                  accusamus iusto corporis distinctio, nisi itaque repellendus
                  harum sit eaque quam illo corrupti ipsa.
                </p>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 text-3xl text-white font-semibold flex items-center justify-center">
                  {/* <img src={logo} alt="" /> */}
                  Login
                </div>
                <h2 className="text-xl text-white text-center col-span-6">
                  Enjoy Your Youth!
                </h2>
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-white"
                  >
                    {" "}
                    Email
                  </label>

                  <input
                    ref={currentRef}
                    type="email"
                    id="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Your email"
                    className="mt-1 w-full rounded-md border py-2 px-2 text-[12px] shadow-sm bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-[12px] ">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-white"
                  >
                    {" "}
                    Password
                  </label>

                  <Input.Password
                    placeholder="Your password"
                    type="password"
                    id="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="mt-1 w-full rounded-md border py-2 px-2 text-[12px] shadow-sm bg-transparent hover:bg-transparent active:bg-transparent text-white focus-within:bg-transparent placeholder:text-secondary border-border"
                    iconRender={(visible) =>
                      visible ? (
                        <EyeTwoTone twoToneColor="#fff" />
                      ) : (
                        <EyeInvisibleTwoTone twoToneColor="#fff" />
                      )
                    }
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-[12px] ">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 border-border text-sm text-white flex gap-3 items-center justify-center">
                  <div className="h-[2px] flex-1 bg-border"></div>
                  OR
                  <div className="h-[2px] flex-1 bg-border"></div>
                </div>
                <div className="col-span-6">
                  <button
                    type="button"
                    // onClick={() => loginWithGoogle()}
                    className="mt-1 flex items-center justify-center gap-3 w-full rounded-md border border-border py-2 text-sm text-white shadow-sm hover:bg-white hover:bg-opacity-10 active:bg-opacity-15"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 496 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                    Github
                  </button>
                </div>

                <div className="col-span-6">
                  <p className="text-[12px] text-secondary">
                    By logging into your account, you agree to our terms and
                    privacy policy.
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-[12px] font-medium text-white transition hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary active:bg-white active:bg-opacity-10"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-[12px] text-secondary sm:mt-0">
                    Forgot password?{" "}
                    <Link to="#" className="text-white underline">
                      Click here
                    </Link>
                    .
                  </p>
                </div>
                <div className="col-span-6 text-center">
                  <p className="mt-4 text-[12px] text-secondary sm:mt-0">
                    Don't have an account?{" "}
                    <Link to="/dang-ky" className="text-white underline">
                      Click here
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Login;
