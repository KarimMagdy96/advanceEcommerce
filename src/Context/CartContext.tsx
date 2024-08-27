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
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
