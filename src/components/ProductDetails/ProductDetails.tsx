import { FC, useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { cartContext } from "../../Context/CartContext";

interface ProductDetailsProps {}

const ProductDetails: FC<ProductDetailsProps> = () => {
  const [productDetails, setproductDetails] = useState<any>({});
  const [productRelated, setproductRelated] = useState<any>([]);
  let { id, category } = useParams();
  let { addProductsToCart } = useContext(cartContext);
  function getProductDetails(id: any) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setproductDetails(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (document.readyState !== "complete") {
    return (
      <div className=" w-full h-screen flex justify-center items-center ">
        <MoonLoader className=" text-9xl" />
      </div>
    );
  }
  function getRelatedProduct(category: any) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        console.log(data.data);
        let relatedProduct = data.data.filter((item: any) =>
          category.includes(item.category.name)
        );
        console.log(relatedProduct);
        setproductRelated(relatedProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row justify-center  flex-col md:flex-row ">
        <div className="w-3/4 lg:w-1/4   rounded-lg  p-5">
          <Slider {...settings}>
            {productDetails?.images?.map((img: any) => (
              <img
                key={img}
                className=" w-full rounded-lg   "
                src={img}
                alt={productDetails?.title}
              />
            ))}
          </Slider>
        </div>
        <div className="w-fit  p-10">
          <div className=" text-3xl mb-3 font-bold  text-gray-950">
            {productDetails?.title}
          </div>
          <div className="rate">
            {productDetails.ratingsAverage}
            <i className=" fas fa-star mx-1 text-yellow-500"></i>
          </div>
          <p className=" text-gray-700 mt-3 font-light  mb-3">
            {productDetails.description}
          </p>
          <div className="">
            <div className="price text-2xl">{productDetails.price} EGP</div>
          </div>
          <button
            onClick={() => {
              addProductsToCart(productDetails?.id);
            }}
            className=" bg-slate-400 text-white px-5 py-4 rounded-sm mt-6 hover:bg-slate-700 transition-all  duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="text-3xl   font-bold text-center uppercase  mt-5  text-gray-700">
        related Products 🛒
      </div>
      <div className="row">
        {productRelated.map((item: any) => {
          return (
            <div key={item.id} className="w-full md:w-1/3 lg:w-1/5 px-4">
              <div className="product py-4 px-2 relative overflow-hidden group  hover:drop-shadow-lg">
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

export default ProductDetails;
