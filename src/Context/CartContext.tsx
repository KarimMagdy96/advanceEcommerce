import axios from "axios";
import { createContext, useEffect } from "react";

export const cartContext = createContext<any>([]);

export function CartContextProvider({ children }: any) {
  async function getLoggedUserCart() {
    try {
      let response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        getLoggedUserCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
