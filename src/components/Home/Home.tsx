import { FC } from "react";
import styles from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import useRequist from "../../Hooks/useRequist";
import { MoonLoader } from "react-spinners";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  let { isLoading } = useRequist();

  if (isLoading) {
    return (
      <div className=" w-full h-screen flex justify-center items-center ">
        <MoonLoader className=" text-9xl" />
      </div>
    );
  }

  return (
    <div className={styles.Home}>
      <div className=" overflow-hidden">
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
      </div>
    </div>
  );
};

export default Home;
