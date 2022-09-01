import React from "react";
import SaleBanner from "../component/salebanner";
import Navbar from "../component/navbar";
import Header from "../component/header";

const Home = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <Navbar />
    </React.Fragment>
  );
};

export default Home;
