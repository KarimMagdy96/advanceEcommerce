import { FC, useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import React from "react";
import Slider from "react-slick";
import axios from "axios";
interface CategorySliderProps {}

const CategorySlider: FC<CategorySliderProps> = () => {
  const [categorys, setcategorys] = useState<any>([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function getCategores() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setcategorys(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategores();
  }, []);
  return (
    <div className=" py-5">
      <h2 className=" py-4 text-slate-800 text-xl uppercase font-bold  pb-5 text-center ">
        Shop popular categories
      </h2>
      <Slider {...settings}>
        {categorys?.map((item: any) => (
          <div key={item._id} className="">
            <img
              className=" w-full h-[200px]"
              src={item.image}
              alt={item?.name}
            />
            <h3 className=" font-light mt-2">{item.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
