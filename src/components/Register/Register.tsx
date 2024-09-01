import { FC, useContext, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";
interface RegisterProps {}
interface formValuesinterface {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

const Register: FC<RegisterProps> = () => {
  let { setuserLogin } = useContext(userContext);
  let [apiErrors, setApiErrors] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let validInput = Yup.object().shape({
    name: Yup.string()
      .min(3, "name minimum length  is 3")
      .max(30, "name max length  is 30")
      .required("name is required "),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(
      /^01[0125][0-9]{8}$/,
      "Invalid Egyptian phone number"
    ),
    password: Yup.string().matches(
      /^[A-Z][a-z]{5,10}$/,
      "password must be between 5 and 10 characters, must start with a capital letter"
    ),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  async function handleSubmit(formValues: formValuesinterface) {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((apiResponse) => {
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validInput,
    onSubmit: handleSubmit,
  });
  return (
    <div className=" py-6 max-w-xl  mx-auto  px-5 ">
      <Helmet>
        <title>E-commerceShop-Register</title>
      </Helmet>
      {apiErrors ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
          role="alert"
        >
          {apiErrors}
        </div>
      ) : (
        ""
      )}

      <h2 className=" text-3xl font-bold mb-6 text-gray-700">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
            role="alert"
          >
            {formik.errors.name}
          </div>
        ) : (
          ""
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none        focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50       "
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="string"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none          focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Phone Number
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50       "
            role="alert"
          >
            {formik.errors.phone}
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none          focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50       "
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none          focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-focus:    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re Enter Password
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50       "
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center    "
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
