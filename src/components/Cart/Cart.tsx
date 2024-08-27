import { FC, useContext, useEffect, useState } from "react";

import { cartContext } from "../../Context/CartContext";

interface CartProps {}

const Cart: FC<CartProps> = () => {
  let { getLoggedUserCart, updateCartItem, removeCartItem } =
    useContext(cartContext);
  let [cartDetails, setCartDetails] = useState<any>();

  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartDetails(response?.data?.data);
  }
  useEffect(() => {
    getCartItems();
  }, [cartDetails]);

  if (cartDetails == undefined) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (cartDetails?.products.length == 0) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <i className="text-5xl text-slate-700 fa-solid fa-cart-shopping"></i>
          <p className="text-center text-gray-600 uppercase pt-4">
            no items in your Cart...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-10 px-3 md:p-10 ">
        <div className="  text-center text-3xl text-slate-800 font-bold ">
          Shopping cart
        </div>
        <h3 className="my-4 text-center font-semibold text-lg text-gray-600 ">
          TOTAL PRICE : {cartDetails?.totalCartPrice} EGP
        </h3>
        <table className="w-full mx-auto my-6 text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products?.map((product: any) => {
              return (
                <tr
                  key={product?.product?.id}
                  className="bg-white border-b  hover:bg-gray-50 "
                >
                  <td className="p-2">
                    <img
                      src={product?.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product?.product?.title}
                    />
                  </td>
                  <td className="px-2 py-4 font-semibold text-gray-900  ">
                    <div className="  line-clamp-2 ">
                      {product?.product.title}
                    </div>
                    <div className="flex items-center   py-4">
                      <button
                        onClick={() =>
                          product.count > 1
                            ? updateCartItem(
                                product?.product?.id,
                                product?.count - 1
                              )
                            : removeCartItem(product?.product?.id)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product?.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          updateCartItem(
                            product?.product?.id,
                            product?.count + 1
                          )
                        }
                        className=" inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={() => removeCartItem(product?.product?.id)}
                      className="font-medium text-red-600 "
                    >
                      Remove
                    </button>
                  </td>

                  <td className=" text-center font-semibold text-gray-900 ">
                    {product?.price} EGP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Cart;
