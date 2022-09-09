import React from "react";
import Header from "../component/header";
import Registration from "../component/registration";
import Footer from "../component/footer";
import SaleBanner from "../component/salebanner";

const Login = () => {
  return (
    <React.Fragment>
      <SaleBanner />
      <Header />
      <Registration />
      <Footer />
    </React.Fragment>
  );
};

export default Login;
