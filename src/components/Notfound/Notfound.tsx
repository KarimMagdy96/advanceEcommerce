import React, { FC } from "react";
import styles from "./Notfound.module.css";
import { Link } from "react-router-dom";

interface NotfoundProps {}

const Notfound: FC<NotfoundProps> = () => (
  <section className="bg-white ">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-600 ">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500   ">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{"{"}" "{"}"}
        </p>
        <Link
          to="/"
          className="inline-flex text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  </section>
);

export default Notfound;
