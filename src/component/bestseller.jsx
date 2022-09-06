import React from "react";
import styled from "styled-components";
import { bestsellerlist } from "../data/homeCategoryImage";

const Background = styled.div`
  font-family: "Libre Baskerville", serif;
`;
const MidText = styled.span`
  font-size: 50px;
  display: flex;
  justify-content: center;
  margin: 50px auto;
  max-width: 600px;
  font-weight: 700;
  line-height: 1.1;
`;
const BestCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;

  object-fit: cover;
`;
const CategoryImage = styled.img`
  width: 100%;
  max-width: 246px;
  height: 100%;
  max-height: 282px;
  object-fit: cover;
`;
const CategoryName = styled.span`
  font-weight: 100;
  margin-top: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const BestSeller = () => {
  return (
    <Background>
      <MidText>Shop by Category</MidText>
      <BestCategoryContainer>
        {bestsellerlist.map((item) => {
          return (
            <CategoryCard>
              <CategoryImage src={item.image} />
              <CategoryName>{item.category}</CategoryName>
            </CategoryCard>
          );
        })}
      </BestCategoryContainer>
    </Background>
  );
};

export default BestSeller;
