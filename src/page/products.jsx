import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";
import ProductMen from "../component/productMen";
import Product from "../component/product";
import SaleBanner from "../component/salebanner";

const Products = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <Product />
      <Footer />
    </React.Fragment>
  );
};

export default Products;
