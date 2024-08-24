import React, { FC } from "react";
import Slider from "react-slick";

import slider1 from "../../assets/img/slider-1.webp";
import slider2 from "../../assets/img/slider-2.webp";
import slider3 from "../../assets/img/slider-3.webp";
import slider4 from "../../assets/img/slider-4.webp";
interface MainSliderProps {}

const MainSlider: FC<MainSliderProps> = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="row">
      <div className="w-3/4">
        <Slider {...settings}>
          <img className="w-full h-[500px]" src={slider1} alt="slider" />
          <img className="w-full h-[500px]" src={slider4} alt="slider" />
        </Slider>
      </div>
      <div className="w-1/4">
        <img className="w-full h-[250px]" src={slider2} alt="slider" />
        <img className="w-full h-[250px]" src={slider3} alt="slider" />
      </div>
    </div>
  );
};

export default MainSlider;
