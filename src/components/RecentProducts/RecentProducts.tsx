import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import useRequist from "../../Hooks/useRequist";
import { cartContext } from "../../Context/CartContext";

interface RecentProductsProps {}

const RecentProducts: FC<RecentProductsProps> = () => {
  let { data } = useRequist();
  let { addProductsToCart } = useContext(cartContext);

  return (
    <>
      <div className="row">
        {data?.map((item: any) => {
          return (
            <div key={item.id} className="w-full md:w-1/3 lg:w-1/5 px-4">
              <div className="product py-4 relative overflow-hidden group  hover:drop-shadow-lg">
                <Link to={`/Productdetails/${item.id}/ ${item.category.name}`}>
                  <img
                    className=" w-full rounded  border-2  object-cover"
                    src={item.imageCover}
                    alt={item.title}
                  />
                  <div className=" font-light text-sm text-gray-400">
                    {item.category.name}
                  </div>
                  <h3 className=" line-clamp-1 font-semibold mb-3  ">
                    {item.title}
                  </h3>
                  <div className=" ">
                    <div className="rate">
                      {[...Array(Math.floor(item.ratingsAverage)).keys()].map(
                        (item: any) => {
                          return (
                            <i
                              key={item}
                              className=" fas fa-star mx-1 text-yellow-500"
                            ></i>
                          );
                        }
                      )}
                      {Number(item.ratingsAverage) % 1 ? (
                        <i className="fa-solid fa-star-half text-yellow-500"></i>
                      ) : (
                        ""
                      )}
                      {item.ratingsAverage} /
                      <span className=" text-gray-500">5</span>
                    </div>
                    <div className="price my-2 font-bold">{item.price} EGP</div>
                  </div>
                </Link>
                <button
                  onClick={() => addProductsToCart(item?.id)}
                  className="group-hover:right-3  bg-yellow-500 px-5 py-4  absolute top-10 right-[-150px] transition-all duration-300"
                >
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
