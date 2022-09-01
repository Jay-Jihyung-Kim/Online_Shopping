import React from "react";
import SaleBanner from "../component/salebanner";
import Navbar from "../component/navbar";
import Header from "../component/header";
import CarouselSlide from "../component/carousel";

const Home = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <CarouselSlide />
    </React.Fragment>
  );
};

export default Home;
