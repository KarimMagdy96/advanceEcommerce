import { createContext, useEffect, useState } from "react";

let initialValue = {
  userLogin: "",
  setuserLogin: () => {},
};
interface userContextInterface {
  userLogin: string;
  setuserLogin: (value: string) => void;
}
export let userContext = createContext<userContextInterface>(initialValue);

export default function UserContextProvider({ children }: any) {
  const [userLogin, setuserLogin] = useState<any>("");

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setuserLogin(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <userContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </userContext.Provider>
  );
}
