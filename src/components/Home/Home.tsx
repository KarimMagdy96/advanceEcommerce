import { FC } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import useRequist from "../../Hooks/useRequist";
import { MoonLoader } from "react-spinners";
import { Helmet } from "react-helmet";
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
    <div>
      <Helmet>
        <title>E-commerceShop-Home</title>
      </Helmet>
      <div className=" overflow-hidden">
        <MainSlider />
        <CategorySlider />
        <RecentProducts />
      </div>
    </div>
  );
};

export default Home;
