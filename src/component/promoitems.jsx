import React from "react";
import styled from "styled-components";
import { small, mobile } from "../util/responsive";

const Background = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1600px;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 50px auto;
  font-family: "Libre Baskerville", serif;
  ${mobile({
    margin: "30px auto",
    display: "flex",
    flexDirection: "column-reverse",
    padding: "0 20px;",
  })};
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #fffff0;
  width: auto;
  height: auto;
  ${mobile({ padding: "40px 20px" })}
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
  height: 100%;
  object-fit: cover;
`;

const PromoItems = (props) => {
  const { text, img } = props;
  return (
    <Background>
      <Left>
        <PromoText>{text}</PromoText>
        <PromoButton>Shop Now</PromoButton>
      </Left>
      <PromoImage src={img} />
    </Background>
  );
};

export default PromoItems;
