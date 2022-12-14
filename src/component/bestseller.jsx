import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { bestsellerlist } from "../data/homeCategoryImage";
import { mobile } from "../util/responsive";

const Background = styled.div`
  font-family: "Libre Baskerville", serif;
  margin-bottom: 100px;
`;
const MidText = styled.span`
  font-size: 50px;
  display: flex;
  justify-content: center;
  margin: 50px auto;
  max-width: 600px;
  font-weight: 700;
  line-height: 1.1;
  ${mobile({ fontSize: "30px", margin: "50px auto 25px" })}
`;
const BestCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  flex-wrap: wrap;
  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    gap: 12px;
  }
`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  object-fit: cover;
  max-width: 303px;
`;
const CategoryImage = styled.img`
  width: 100%;
  max-width: 246px;
  height: 100%;
  max-height: 282px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 170px;
    height: 226px;
  }
`;
const CategoryName = styled.span`
  font-weight: 100;
  margin-top: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
  ${mobile({ fontSize: "12px" })}
`;

const BestSeller = () => {
  const navigate = useNavigate();

  function toProduct() {
    navigate("/products");
    window.scrollTo(0, 0);
  }
  return (
    <Background>
      <MidText>Shop by Category</MidText>
      <BestCategoryContainer>
        {bestsellerlist.map((item) => {
          return (
            <CategoryCard key={item.id}>
              <CategoryImage src={item.image} onClick={toProduct} />
              <CategoryName>{item.category}</CategoryName>
            </CategoryCard>
          );
        })}
      </BestCategoryContainer>
    </Background>
  );
};

export default BestSeller;
