import { FC } from "react";
import styles from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className={styles.Home}>
    Home Component
    <div>
      <RecentProducts />
    </div>
  </div>
);

export default Home;
