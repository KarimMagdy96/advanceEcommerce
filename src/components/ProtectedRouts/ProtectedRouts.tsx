import { FC, ReactNode } from "react";

import { Navigate } from "react-router-dom";

interface ProtectedRoutsProps {
  children: ReactNode;
}

const ProtectedRouts: FC<ProtectedRoutsProps> = ({ children }) => {
  if (localStorage.getItem("userToken")) {
    //navigate to compnent
    return children;
  } else {
    return <Navigate to={"/login"} />;
    //navigate to login page
  }
};

export default ProtectedRouts;
