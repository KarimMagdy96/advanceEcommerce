import { FC, useContext, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";

interface LoginProps {}
interface formValuesinterface {
  email: string;
  password: string;
}

const Login: FC<LoginProps> = () => {
  let { setuserLogin } = useContext(userContext);
  let [apiErrors, setApiErrors] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let validInput = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string().matches(
      /^[A-Z][a-z]{5,10}$/,
      "password must be between 5 and 10 characters, must start with a capital letter"
    ),
  });

  async function handleSubmit(formValues: formValuesinterface) {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((apiResponse) => {
        console.log(apiResponse?.data?.message);
        apiResponse && setLoading(false);
        if (apiResponse.data.message == "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setuserLogin(apiResponse.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        setApiErrors(error?.response?.data?.message);
        error && setLoading(false);
      });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validInput,
    onSubmit: handleSubmit,
  });
  return (
    <div className=" py-6 max-w-xl  mx-auto  px-5 ">
      {apiErrors ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiErrors}
        </div>
      ) : (
        ""
      )}

      <h2 className=" text-3xl font-bold mb-6 text-gray-700">Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-950 dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
