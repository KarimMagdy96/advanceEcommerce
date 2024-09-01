import { FC, useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const [userOrders, setUserOrders] = useState([]);
  let id: any = jwtDecode(localStorage.getItem("userToken") as string);

  useEffect(() => {
    getUserOrders(id.id);
  }, []);
  async function getUserOrders(id: any) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,

        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      console.log("order suc", response.data);

      setUserOrders(response.data);
    } catch (error) {
      console.error("order err", error); // Log the error
      return { status: "error", message: "Failed to update count from cart" };
    }
  }

  if (userOrders.length === 0 && localStorage.getItem("cartId") == null) {
    return (
      <div className=" w-full h-screen flex justify-center items-center ">
        <MoonLoader className=" text-9xl" />
      </div>
    );
  }

  if (userOrders?.length == 0 || localStorage.getItem("cartId") == undefined) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <i className="text-5xl text-slate-700 fa-solid fa-cart-shopping"></i>
          <p className="text-center text-gray-600 uppercase pt-4">
            you don't have any orders...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto w-[90%]">
        <h2 className=" text-3xl font-bold mt-8 capitalize text-gray-700">
          orders History
        </h2>

        {userOrders?.map((order: any) => {
          return (
            <>
              <div key={order?.id} className=" orderItem pt-8">
                <Helmet>
                  <title>E-commerceShop-orders History</title>
                </Helmet>
                <div className="history border-b w-full text-xl font-bold text-gray-700    pb-5">
                  {order.createdAt.slice(0, 7)}
                </div>
                <div className=" pt-5 font-semibold capitalize">
                  {" "}
                  order Number : {order.id}
                </div>
                <div className=" flex gap-10 mt-4 mb-10">
                  <div>
                    <div className=" font-bold capitalize text-gray-800">
                      Date Of Order
                    </div>
                    <div className=" text-gray-700 text-sm">
                      {order.createdAt.slice(0, 10)}
                    </div>
                  </div>
                  <div>
                    <div className=" font-bold capitalize text-gray-800">
                      total Cost
                    </div>
                    <div className=" text-gray-700 text-sm">
                      {order.totalOrderPrice} Egp
                    </div>
                  </div>
                  <div>
                    <div className=" font-bold capitalize text-gray-800">
                      Delivery Status
                    </div>
                    <div className=" text-gray-700 text-sm">
                      {order.isDelivered ? "Delivered ✅ " : "Not Delivered ❌"}
                    </div>
                  </div>
                  <div>
                    <div className=" font-bold capitalize text-gray-800">
                      payment Method Type
                    </div>
                    <div className=" text-gray-700 text-sm">
                      {order.paymentMethodType}
                    </div>
                  </div>
                </div>
                <div className="grid gap-5  items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 border-b-2 pb-10 ">
                  {order.cartItems.map((item: any) => {
                    return (
                      <>
                        <div
                          key={item?.product?.id}
                          className="     flex md:block  justify-star gap-5"
                        >
                          <div className="w-52 p-2   mb-3  ">
                            <img
                              src={item?.product?.imageCover}
                              alt={item?.Product?.title}
                            />
                          </div>
                          <div className="  w-1/2 md:w-full md:m-auto">
                            <div className="   line-clamp-1">
                              {item?.product?.title}.
                            </div>
                            <div className=" text-gray-700 text-sm">
                              may/2024
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
