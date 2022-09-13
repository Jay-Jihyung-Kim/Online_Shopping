import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";
import SaleBanner from "../component/salebanner";
import UserCart from "../component/userCart";

const Cart = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <UserCart />
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
