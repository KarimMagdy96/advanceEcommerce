import { FC } from "react";
import styles from "./Orders.module.css";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  return <div className={styles.Orders}>Orders Component</div>;
};

export default Orders;
