import React from "react";
import { productImage } from "../data/productMenData";
import Footer from "../component/footer";
import Header from "../component/header";
import SaleBanner from "../component/salebanner";
import ProductDetailPage from "../component/productDetailPage.jsx";

const currentURL = window.location.pathname;
const id = currentURL.substring(currentURL.lastIndexOf("/") + 1);
const currentItem = productImage.filter((item) => item.id === parseInt(id));

const ProductDetail = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <ProductDetailPage item={currentItem} />
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetail;
