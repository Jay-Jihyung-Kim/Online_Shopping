import React from "react";
import SaleBanner from "../component/salebanner";
import Header from "../component/header";
import CarouselSlide from "../component/carousel";
import Subscribe from "../component/subscribe";
import Footer from "../component/footer";

const Home = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <CarouselSlide />
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
