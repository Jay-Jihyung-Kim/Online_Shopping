import React from "react";
import styled from "styled-components";

const Background = styled.div`
  display: flex;
  justify-content: center;
`;
const BrandName = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 70px;
`;

const Navbar = () => {
  return (
    <Background>
      <BrandName></BrandName>
    </Background>
  );
};

export default Navbar;
