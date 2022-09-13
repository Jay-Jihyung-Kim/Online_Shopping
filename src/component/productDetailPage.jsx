import React, { useState } from "react";
import { small, mobile } from "../util/responsive";
import { productImage } from "../data/productMenData";
import Box from "@mui/material/Box";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PromoItems from "./promoitems";
import Subscribe from "./subscribe";

const Container = styled.div`
  font-family: "Libre Baskerville", serif;
  max-width: 1280px;
  margin: 0 auto;
`;
const PageLocation = styled.span`
  font-size: 12px;
`;

const PageBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
  gap: 100px;
  ${mobile({
    flexDirection: "column",
    margin: "15px auto",
    gap: "30px",
    alignItems: "center",
  })}
`;
const ProductImage = styled.img`
  width: 500px;
  height: 600px;
  object-fit: cover;
  ${mobile({ maxWidth: "500px" })}
  ${small({ maxWidth: "400px", maxHeight: "450px" })}
`;
const ProductDetail = styled.div`
  ${small({ padding: "0 15px" })}
`;
const ProductName = styled.h1`
  font-size: 32px;
  ${small({ fontSize: "25px" })}
`;
const ProductPrice = styled.h3`
  font-size: 18px;
  display: flex;
  margin-top: 4px;
  font-weight: 200;
  color: #5c5c5c;
  ${small({ fontSize: "15px", marginTop: "0" })};
`;
const ProductDetailCategory = styled.div`
  margin: 50px 0;
`;
const FlexContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const ProductColor = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;
const ProductSize = styled.button`
  background-color: ${(props) => (props.status === true ? "#141414" : "white")};
  color: ${(props) => (props.status === true ? "white" : "black")};
  border: 1px solid #141414;
  width: 52px;
  padding: 5px 0;
`;
const ProductCategory = styled.h2`
  font-size: 22px;
  ${small({ fontSize: "17px" })}
`;
const ProductAddtoCart = styled.button`
  background-color: #141414;
  color: white;
  border: none;
  width: 200px;
  padding: 7px 0;
  ${small({ width: "150px" })}
`;
const RecommendationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
`;
const RecommendationFlexContainer = styled.div`
  display: flex;
  gap: 15px;
  & > a {
    color: inherit;
    text-decoration: inherit;
  }
  ${mobile({ display: "grid", gridTemplateColumns: "repeat(2,1fr)" })}
`;
const RecommendationTitle = styled.span`
  font-size: 36px;
  font-weight: bold;
`;
const RecommendationImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RecommendationImage = styled.img`
  height: 270px;
  width: 216px;
  ${small({ maxWidth: "160px", maxHeight: "200px" })}
`;
const RecommendationText = styled.span``;

const colors = [
  { color: "#C3979F", name: "Pink-Red", id: 1 },
  { color: "#253746", name: "Dark Blue", id: 2 },
  { color: "#31AFD4", name: "Cyan", id: 3 },
  { color: "#78FFD6", name: "Turquoise", id: 4 },
  { color: "#9B1D20", name: "Red", id: 5 },
  { color: "#000", name: "Black", id: 6 },
];

const sizes = [
  { size: "XS", id: 1 },
  { size: "S", id: 2 },
  { size: "M", id: 3 },
  { size: "L", id: 4 },
  { size: "XL", id: 5 },
  { size: "XXL", id: 6 },
];

const ProductDetailPage = (props) => {
  const [currentColor, setCurrentColor] = useState("Pink-Red");
  const [currentSize, setCurrentSize] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState();

  const { item } = props;
  const currentItem = item[0];
  const excludedList = productImage.filter(
    (item) => item.id !== currentItem.id
  );
  const filteredItem = excludedList.filter(
    (item) => item.type === currentItem.type
  );
  const salePrice = Math.round(currentItem.price * 0.8 * 100) / 100;
  const salePriceDecimal =
    salePrice.toString().length > 3 ? salePrice + "0" : salePrice;
  console.log(salePrice.toString().length);

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleSizeChange = (size) => {
    setCurrentSize(size);
  };

  const handleQuantityChange = (e) => {
    setCurrentQuantity(e.target.value);
  };

  return (
    <Container>
      <PageLocation>/ Clothing / Men / {currentItem.name}</PageLocation>
      <PageBody>
        <ProductImage src={currentItem.url} />
        <ProductDetail>
          <ProductName>{currentItem.name}</ProductName>
          <ProductPrice>${currentItem.price}</ProductPrice>
          <ProductPrice style={{ color: "#9e3533" }}>
            ${salePriceDecimal} Price for first time subscribers!
          </ProductPrice>
          <ProductDetailCategory>
            <FlexContainer>
              <ProductCategory>Color: </ProductCategory>
              <ProductPrice>{currentColor}</ProductPrice>
            </FlexContainer>
            <FlexContainer>
              {colors.map((item) => {
                return (
                  <ProductColor
                    key={item.id}
                    color={item.color}
                    onClick={() => handleColorChange(item.name)}
                  />
                );
              })}
            </FlexContainer>
          </ProductDetailCategory>
          <ProductDetailCategory>
            <FlexContainer>
              <ProductCategory>Size:</ProductCategory>
              <ProductPrice>{currentSize}</ProductPrice>
            </FlexContainer>
            <FlexContainer>
              {sizes.map((item) => {
                return (
                  <ProductSize
                    key={item.id}
                    onClick={() => handleSizeChange(item.size)}
                    status={item.size === currentSize}
                  >
                    {item.size}
                  </ProductSize>
                );
              })}
            </FlexContainer>
          </ProductDetailCategory>
          <ProductDetailCategory>
            <FlexContainer>
              <Box sx={{ width: 160 }}>
                <FormControl fullWidth>
                  <InputLabel>Quantity</InputLabel>
                  <Select
                    variant="standard"
                    value={currentQuantity}
                    onChange={handleQuantityChange}
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      width: "120px",
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <ProductAddtoCart>Add to Cart</ProductAddtoCart>
            </FlexContainer>
          </ProductDetailCategory>
        </ProductDetail>
      </PageBody>

      <RecommendationContainer>
        <RecommendationTitle>You May Also Like</RecommendationTitle>
        <RecommendationFlexContainer>
          {filteredItem.length > 4
            ? filteredItem.slice(0, 4).map((item) => {
                return (
                  <a href={`/products/${item.id}`}>
                    <RecommendationImageContainer>
                      <RecommendationImage src={item.url} />
                      <RecommendationText>{item.name}</RecommendationText>
                      <RecommendationText>${item.price}</RecommendationText>
                    </RecommendationImageContainer>
                  </a>
                );
              })
            : filteredItem.map((item) => {
                return (
                  <a href={`/products/${item.id}`}>
                    <RecommendationImageContainer>
                      <RecommendationImage src={item.url} />
                      <RecommendationText>{item.name}</RecommendationText>
                      <RecommendationText>${item.price}</RecommendationText>
                    </RecommendationImageContainer>
                  </a>
                );
              })}
        </RecommendationFlexContainer>
      </RecommendationContainer>

      <PromoItems
        text={"New Products"}
        img={
          "https://images.unsplash.com/photo-1511401677968-feade623d58d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }
      />
      <Subscribe />
    </Container>
  );
};

export default ProductDetailPage;
