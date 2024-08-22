import { FC, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface ProductDetailsProps {}

const ProductDetails: FC<ProductDetailsProps> = () => {
  const [productDetails, setproductDetails] = useState<any>({});
  const [productRelated, setproductRelated] = useState<any>([]);
  let { id, category } = useParams();

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

  return (
    <>
      <div className="row">
        <div className="w-1/4">
          <img
            className=" w-full"
            src={productDetails?.imageCover}
            alt={productDetails?.title}
          />
        </div>
        <div className="w-3/4 px-14  ">
          <div className=" text-lg  text-gray-950">{productDetails?.title}</div>
          <p className=" text-gray-700 mt-3 font-light  mb-3">
            {productDetails.description}
          </p>
          <div className=" flex justify-between mb-3 items-center">
            <div className="price">{productDetails.price} EGP</div>
            <div className="rate">
              {productDetails.ratingsAverage}
              <i className=" fas fa-star mx-1 text-yellow-500"></i>
            </div>
          </div>
          <button className=" bg-slate-400 text-white px-5 py-4 rounded-sm mt-6 hover:bg-slate-700 transition-all  duration-300">
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="row">
        {productRelated.map((item: any) => {
          return (
            <div key={item.id} className="w-1/6 ">
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

export default ProductDetails;
