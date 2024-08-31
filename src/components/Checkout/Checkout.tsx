import { FC, useContext, useState } from "react";

import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

interface LoginProps {}
interface formValuesinterface {
  details: string;
  phone: string;
  city: string;
}

const Checkout: FC<LoginProps> = () => {
  let [apiErrors, setApiErrors] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { checkoutHandler } = useContext(cartContext);
  async function handleSubmit(cartid: any, url: any) {
    checkoutHandler(cartid, url, formik.values);
    console.log(cartid, url, formik.values);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: () => {
      handleSubmit("66ccbb7baed51dbc628113d3", `http://localhost:5173`);
    },
  });
  return (
    <div className=" py-6 max-w-xl  mx-auto  px-5 ">
      {apiErrors ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50        "
          role="alert"
        >
          {apiErrors}
        </div>
      ) : (
        ""
      )}

      <h2 className=" text-3xl font-bold mb-6 text-gray-700">Checkout Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none            focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none            focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city
          </label>
        </div>
        {formik.errors.city && formik.touched.city ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50        "
            role="alert"
          >
            {formik.errors.city}
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none            focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50        "
            role="alert"
          >
            {formik.errors.phone}
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center     "
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
