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
      <PromoItems
        text={"Must-Haves"}
        img={
          "https://images.unsplash.com/photo-1597633244018-0201d0158aab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        }
      />
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
