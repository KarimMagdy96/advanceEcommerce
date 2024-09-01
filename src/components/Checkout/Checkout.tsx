import { FC, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";

interface LoginProps {}

const Checkout: FC<LoginProps> = () => {
  let [loading, setLoading] = useState(false);
  let [cartId, setCartId] = useState("");

  let { checkoutHandler, getLoggedUserCart } = useContext(cartContext);
  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartId(response?.data?.cartId);
  }
  useEffect(() => {
    getCartItems();
  }, []);
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
      handleSubmit(cartId, `http://localhost:5173`);
    },
  });
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1611272585334-6477b935b0c5?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-10 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Enjoy our Products 🛒
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-screen">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Enjoy our Products 🛒
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
            <h2 className=" mt-3 text-3xl font-bold mb-6 text-gray-700">
              Checkout Now
            </h2>
            <form
              className="mt-8  grid grid-cols-6 gap-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="col-span-6 relative z-0 w-full mb-5 group">
                <textarea
                  name="details"
                  rows={4}
                  cols={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.details}
                  id="details"
                  className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none            focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="details"
                  className="peer-focus:font-medium absolute text-sm text-gray-500     duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  your Street name and nearest landmark ?
                </label>
              </div>
              <div className="col-span-6  relative z-0 w-full mb-5 group">
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
                  city name
                </label>
              </div>

              <div className="col-span-6  relative z-0 w-full mb-5 group">
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

              <button
                type="submit"
                className=" col-span-6  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center     "
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Checkout;
