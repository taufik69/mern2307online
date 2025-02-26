import React, { useEffect, useState } from "react";
import login from "../../../assets/login/login.gif";
import { useFormik } from "formik";
import { loginSchema } from "../../../Validation/Schema/LoginSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosinsance } from "../../../helpers/axios";
import { ToastSucess } from "../../../helpers/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValue = {
    emailorphone: "",
    Password: "",
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: loginSchema,
    onSubmit: async (value, action) => {
      try {
        setLoading(true);
        const { Password, emailorphone } = value;
        const response = await axiosinsance.post(
          "/login",
          {
            emailOrPhone: emailorphone,
            password: Password,
          },
          { withCredentials: true }
        );

        if (response?.data) {
          ToastSucess(response.data?.data.name + "Login Success");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("errom from login", error);
      } finally {
        setLoading(false);
        action.resetForm();
      }
    },
  });
  return (
    <div className="py-[140px]">
      <div className="container">
        <div className="flex items-center gap-x-10">
          <div className="w-[50%] ">
            <img src={login} alt="" />
          </div>

          <div className="w-[40%]">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-[36px] font-medium font-inter text-text_black000000">
                Log in to Exclusive
              </h2>
              <p className="text-[16px] font-normal font-popins text-text_black000000">
                Enter your details below
              </p>
              <form action="" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="emailorphone"
                  id="emailorphone"
                  placeholder="Email or Phone Number"
                  className="border-b-2 border-b-gray-200 w-[60%] py-3"
                  onChange={formik.handleChange}
                  value={formik.values.emailorphone}
                />

                {formik.touched.emailorphone && formik.errors.emailorphone ? (
                  <span className="block mt-4 text-red-500">
                    {formik.errors.emailorphone}
                  </span>
                ) : null}

                <div className="relative">
                  <input
                    type={eye ? "text" : "password"}
                    name="Password"
                    id="Password"
                    placeholder="Password"
                    className="border-b-2 border-b-gray-200 w-[60%] py-3"
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                  />
                  <span
                    className="absolute right-[41%] top-1/2 -translate-y-1/2"
                    onClick={() => setEye(!eye)}
                  >
                    {eye ? (
                      <FaEyeSlash className="cursor-pointer text-xl" />
                    ) : (
                      <FaEye className="cursor-pointer text-xl" />
                    )}
                  </span>
                </div>

                {formik.touched.Password && formik.errors.Password ? (
                  <span className="block mt-4 text-red-500">
                    {formik.errors.Password}
                  </span>
                ) : null}

                <div className="flex items-center gap-x-[87px] mt-[30px]">
                  {loading ? (
                    <button
                      type="submit"
                      className="py-4 px-[48px] bg-redDB4444 font-popins font-medium text-white_FFFFFF text-[16px] rounded"
                    >
                      Loadin..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="py-4 px-[48px] bg-redDB4444 font-popins font-medium text-white_FFFFFF text-[16px] rounded"
                    >
                      Log In
                    </button>
                  )}

                  <Link
                    to="/forgotpassword"
                    className="text-redDB4444 font-popins font-medium  text-[16px] cursor-pointer"
                  >
                    Forget Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
