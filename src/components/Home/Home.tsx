import { FC } from "react";
import styles from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className={styles.Home}>
    <div className=" overflow-hidden">
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </div>
  </div>
);

export default Home;
