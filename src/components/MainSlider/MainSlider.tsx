import { FC } from "react";
import Slider from "react-slick";

import slider1 from "../../assets/img/slider-1.webp";
import slider4 from "../../assets/img/slider-4.webp";
interface MainSliderProps {}

const MainSlider: FC<MainSliderProps> = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1600,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className=" ">
      <div className="w-full relative ">
        <Slider {...settings}>
          <img className="w-full h-[500px]" src={slider1} alt="slider" />
          <img className="w-full h-[500px]" src={slider4} alt="slider" />
        </Slider>
        <div className=" absolute text-4xl flex justify-center items-center  font-bold text-center text-white  w-full  bg-tra  top-0 left-0 right-0 bottom-0">
          <div className="mx-auto max-w-screen-xl px-4  lg:flex h-fit lg:items-center ">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Understand User Flow.
                <strong className="font-extrabold  sm:block text-yellow-500">
                  {" "}
                  Increase Conversion.{" "}
                </strong>
              </h1>

              <p className="mt-4 text-base sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-700 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto">
                  Get Started
                </button>

                <button className="block w-full rounded px-12 py-3 text-sm font-medium text-white border shadow hover:text-gray-700 focus:outline-none focus:ring  sm:w-auto">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
