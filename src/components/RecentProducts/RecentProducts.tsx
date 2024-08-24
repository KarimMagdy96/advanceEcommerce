import { FC } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import useRequist from "../../Hooks/useRequist";

interface RecentProductsProps {}
interface productInterface {
  brand: any;
  id: number;
  title: string;
  imageCover: string;
  images: any;
  price: number;
  quantity: number;
  description: string;
  category: any;
  subCategory: string;
  slug: string;
  sold: number;
  subcategory: any;
  updatedAt: string;
  createdAt: string;
  ratingsQuantity: number;
  ratingsAverage: string;
}

const RecentProducts: FC<RecentProductsProps> = () => {
  let { data, isError, error, isLoading, isFetching } = useRequist();

  if (isLoading) {
    return (
      <div className=" w-full h-screen flex justify-center items-center ">
        <MoonLoader className=" text-9xl" />
      </div>
    );
  }
  return (
    <>
      <div className="row">
        {data?.map((item: any) => {
          return (
            <div key={item.id} className="w-full md:w-1/3 lg:w-1/5 px-4">
              <div className="product py-4 relative overflow-hidden group  hover:drop-shadow-lg">
                <Link to={`/Productdetails/${item.id}/ ${item.category.name}`}>
                  <img
                    className=" w-full"
                    src={item.imageCover}
                    alt={item.title}
                  />
                  <div className=" font-light text-sm text-gray-400">
                    {item.category.name}
                  </div>
                  <h3 className=" line-clamp-2 font-semibold mb-3  ">
                    {item.title}
                  </h3>
                  <div className=" flex justify-between mb-3 items-center">
                    <div className="price">{item.price} EGP</div>
                    <div className="rate">
                      {item.ratingsAverage}
                      <i className=" fas fa-star mx-1 text-yellow-500"></i>
                    </div>
                  </div>
                </Link>
                <button className="group-hover:right-3  bg-yellow-500 px-5 py-4  absolute top-10 right-[-150px] transition-all duration-300">
                  <i className=" fas fa-shopping-cart text-slate-700"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentProducts;
