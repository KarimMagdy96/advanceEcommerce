import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext<any>([]);

export function CartContextProvider({ children }: any) {
  let [CartItemsCount, setCartItemsCount] = useState<any>();

  async function getLoggedUserCart() {
    try {
      let response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      console.log(response);
      setCartItemsCount(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsToCart(productId: any) {
    toast("working on your order", {
      duration: 2000,
    });
    try {
      let response = await axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { productId: productId },
          {
            headers: { token: localStorage.getItem("userToken") },
          }
        )
        .then(() => {
          toast.success("Product added to cart");
          getLoggedUserCart();
        });
      return response;
    } catch (error) {
      console.log(error);
      toast.success("error add product to cart");
    }
  }

  async function removeCartItem(productId: any) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success("Product removed from cart");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCartItem(productId: any, count: any) {
    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success("Product add from cart");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("❌ error ", {});
    }
  }

  async function checkoutHandler(cartId: any, url: any, formValues: any) {
    toast("working on your order", {
      duration: 2000,
    });
    try {
      let response = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
          { shippingAddress: formValues },
          {
            headers: { token: localStorage.getItem("userToken") },
          }
        )
        .then((re) => {
          if (re.data.status == "success") {
            console.log(re.data.session.url);
            window.location.href = re.data.session.url;
          }
          toast.success("Product added to cart");
        });

      return response;
    } catch (error) {
      console.log(error);
      toast.success("error add product to cart");
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        getLoggedUserCart,
        addProductsToCart,
        updateCartItem,
        removeCartItem,
        CartItemsCount,
        checkoutHandler,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
