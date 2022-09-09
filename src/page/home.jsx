import React from "react";
import SaleBanner from "../component/salebanner";
import Header from "../component/header";
import CarouselSlide from "../component/carousel";
import Subscribe from "../component/subscribe";
import Footer from "../component/footer";
import BestSeller from "../component/bestseller";
import PromoItems from "../component/promoitems";

const Home = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <CarouselSlide />
      <BestSeller />
      <PromoItems />
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
