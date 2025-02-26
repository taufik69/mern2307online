import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { axiosinsance } from "../../helpers/axios";
import { setLocale } from "yup";
import { ToastError, ToastSucess } from "../../helpers/Toast";
const Otp = () => {
  const { email } = useParams();
  const [otp, setopt] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  //   handleOpt funtion implement
  const handleOpt = async () => {
    try {
      setloading(true);
      const response = await axiosinsance.post("/verifyotp", {
        email: email,
        otp: otp,
      });
      const { data } = response;

      navigate("/login");
      ToastSucess(data.message);
    } catch (error) {
      ToastError(error.response.data?.message);
      console.log("error from otp page");
    } finally {
      setloading(false);
    }
  };

  //   handleresendOtp funtion implement
  const handleresendOtp = async () => {
    try {
      setloading(true);
      const response = await axiosinsance.post("/resendOtp", {
        email: email,
      });
      const { data } = response;
      ToastSucess(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div class="max-w-md mx-auto border my-32 ">
        <form
          class="bg-white shadow-md rounded px-8 py-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 text-center"
              for="otp"
            >
              OTP
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setopt(e.target.value)}
            />
          </div>
          <div class="flex items-center justify-between">
            {loading ? (
              <button
                class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                loading ...
              </button>
            ) : (
              <button
                class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOpt}
              >
                Verify
              </button>
            )}

            <button
              class="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
              onClick={handleresendOtp}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Otp;
