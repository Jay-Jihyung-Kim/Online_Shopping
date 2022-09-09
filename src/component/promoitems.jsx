import React from "react";
import styled from "styled-components";
import { small, mobile } from "../util/responsive";

const Background = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1600px;
  margin: 100px auto;
  font-family: "Libre Baskerville", serif;
  ${mobile({ margin: "30px auto" })};
  ${small({ display: "flex", flexDirection: "column-reverse" })}
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #fffff0;
  ${small({ padding: "40px 20px" })}
`;

const PromoText = styled.span`
  font-size: 70px;
  font-weight: 700;
  @media (max-width: 1000px) {
    font-size: 50px;
  }
  @media (max-width: 800px) {
    font-size: 35px;
  }
`;

const PromoButton = styled.button`
  width: 120px;
  height: 100%:
  padding: 5px;
  border: none;
  color: white;
  background-color: #cc641b;
  @media (max-width: 500px) {
    font-size: 12px;
    width: 100px;
  }
`;

const PromoImage = styled.img`
  width: 100%;
  flex: 50%;
`;

const PromoItems = () => {
  return (
    <Background>
      <Left>
        <PromoText>Must-Haves</PromoText>
        <PromoButton>Shop Now</PromoButton>
      </Left>
      <PromoImage src="https://images.unsplash.com/photo-1597633244018-0201d0158aab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" />
    </Background>
  );
};

export default PromoItems;
