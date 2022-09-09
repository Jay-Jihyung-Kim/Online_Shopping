import React from "react";
import Footer from "../component/footer";
import Header from "../component/header";
import Page404 from "../component/page404";
import SaleBanner from "../component/salebanner";
import Subscribe from "../component/subscribe";

const NotFound = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <Page404 />
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
