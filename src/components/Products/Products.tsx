import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequist from "../../Hooks/useRequist";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  let { data } = useRequist();
  let { addProductsToCart } = useContext(cartContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [filtersearch, setFiltersearch] = useState("");
  let [filterOpen, setfilterOpen] = useState(false);
  let filter = (category: string) => {
    if (category == "All") {
      setFilterProduct(data);
    } else {
      let filter = data.filter((item: any) => {
        return item.category.name == category;
      });
      setFilterProduct(filter);
    }
  };

  let handelfilterEvolution = (ratingsAverage: any) => {
    let filter = data.filter((item: any) => {
      return item.ratingsAverage < ratingsAverage
        ? item.ratingsAverage == ratingsAverage
        : item.ratingsAverage < ratingsAverage + 1;
    });
    setFilterProduct(filter);
  };
  let handelfilterPrice = (price: any) => {
    let filter = data.filter((item: any) => {
      return item.price < price;
    });
    setFilterProduct(filter);
  };
  let handelSearchInputvale = (e: any) => {
    setFiltersearch(e);
    if (e == "") {
      setFilterProduct(data);
    }
  };
  let handelfiltersearch = (search: any) => {
    setFilterProduct(data);
    if (search == "") {
      setFilterProduct(data);
    }

    let filter = data.filter((item: any) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filter);
    if (filter.length == 0) {
      setFilterProduct(data);
      toast.error("No result found");
    } else {
      setFilterProduct(filter);
    }
  };

  useEffect(() => {
    setFilterProduct(data);
  }, [data]);

  return (
    <div className="flex px-5 min-h-[120vh]  justify-between relative">
      <div
        className={`w-11/12 lg:w-2/5 xl:1/4    absolute lg:static ${
          filterOpen ? "left-0" : "-left-full"
        }  bg-white  z-10
        } h-full pe-8  pt-5 p-4`}
      >
        <div className="flex justify-end">
          <div className=" lg:hidden">
            <button
              onClick={() => setfilterOpen(false)}
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
            >
              <i className="fa-solid text-2xl text-white fa-xmark"></i>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-7  px-5 border-2  p-5 mb-5">
          <div className=" font-semibold">FILTER</div>
          <div>
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </div>
        </div>

        <div className="max-w-md mx-auto mb-5">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only  "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              onChange={(e) => handelSearchInputvale(e.target.value)}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-blue-500            "
              placeholder="Search By Name..."
              required
            />
            <button
              onClick={() => handelfiltersearch(filtersearch)}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </div>

        <ul
          className="space-y-2 text-sm border-b-2 pb-9"
          aria-labelledby="dropdownDefault"
        >
          <li className="flex items-center">
            <input
              onChange={() => filter("All")}
              id="All"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="All"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              All
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => filter("Men's Fashion")}
              id="Men's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Men's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Men's Fashion
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => filter("Women's Fashion")}
              id="Women's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Women's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Women's Fashion
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => filter("Electronics")}
              id="Electronics"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Electronics"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Electronics
            </label>
          </li>
        </ul>
        <ul
          className="space-y-2 mt-4 text-sm border-b-2 pb-9"
          aria-labelledby="dropdownDefault"
        >
          <li className="flex items-center">
            <input
              onChange={() => filter("All")}
              id="All"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="All"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              All Ratings
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterEvolution(5)}
              id="All"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="All"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterEvolution(4)}
              id="Men's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Men's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterEvolution(3)}
              id="Women's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Women's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterEvolution(2)}
              id="Electronics"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Electronics"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </label>
          </li>
        </ul>
        <ul
          className="space-y-2 mt-4 text-sm border-b-2 pb-9"
          aria-labelledby="dropdownDefault"
        >
          <li className="flex items-center">
            <input
              onChange={() => filter("All")}
              id="All"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="All"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              All Prices
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterPrice(200)}
              id="All"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="All"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Less Than 200$
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterPrice(1000)}
              id="Men's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Men's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Less Than 1000$
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterPrice(3000)}
              id="Women's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Women's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Less Than 3000$
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={() => handelfilterPrice(5000)}
              id="Women's Fashion"
              type="radio"
              name="input-name"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500         focus:ring-2        "
            />
            <label
              htmlFor="Women's Fashion"
              className="ml-2 text-sm font-medium text-gray-900   "
            >
              Less Than 5000$
            </label>
          </li>
        </ul>
      </div>
      <div className="  w-full">
        <div className="  items-center flex justify-between px-10 p-4 pt-10">
          <div className=" font-bold text-lg text-slate-700 uppercase">
            All Prodacts
          </div>
          <div>
            <button
              onClick={() => setfilterOpen(!filterOpen)}
              className=" lg:hidden text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
            >
              filter {filterOpen ? "open" : "close"}{" "}
              <i className="text-white fa-solid fa-filter"></i>
            </button>
          </div>
        </div>
        <div className="row ">
          {filterProduct?.map((item: any) => {
            return (
              <div key={item.id} className="w-full md:w-1/3 lg:w-1/4 px-4">
                <div className="product py-4 relative overflow-hidden group  hover:drop-shadow-lg">
                  <Link
                    to={`/Productdetails/${item.id}/ ${item.category.name}`}
                  >
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
                      <div className="price my-2 font-bold">
                        {item.price} EGP
                      </div>
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
      </div>
    </div>
  );
};
export default Products;
