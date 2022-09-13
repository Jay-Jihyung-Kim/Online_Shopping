import React, { useState } from "react";
import styled from "styled-components";
import { small, mobile } from "../util/responsive";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsXLg } from "react-icons/bs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { productImage } from "../data/productMenData";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

//Empty
const EmptyContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 50px auto;
  padding: 0 10px;
  font-family: "Libre Baskerville", serif;
  gap: 30px;
  ${small({ margin: "30px auto" })}
`;

const IconContainer = styled.div`
  border: 2px solid #253746;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LargeText = styled.h2`
  font-size: 30px;
  ${small({ fontSize: "22px" })}
`;
const MediumText = styled.span`
  font-size: 22px;
  font-weight: 600;
`;
const SmallText = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  ${small({ fontSize: "15px" })}
`;
const BigButton = styled.button`
  background-color: #253746;
  color: white;
  font-weight: bold;
  border: none;
  width: 300px;
  height: 45px;
`;
const SmallButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
  border-top: 1px solid #253746;
`;
const SmallButton = styled.button`
  font-weight: bold;
  border: 1px solid #253746;
  width: 135px;
  font-size: 12px;
  height: 45px;
  background-color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  alignitems: center;
`;

const item = productImage[0];

//Cart with Item
const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 50px;
  ${mobile({
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    padding: "10px 10px",
    maxWidth: "800px",
  })};
`;
const ItemContainerLeft = styled.div``;
const ItemPurchaseContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-right: 80px;
  margin-top: 20px;
  ${mobile({ paddingRight: "0" })}
`;
const DetailContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  ${small({ flexDirection: "column", alignItems: "flex-start" })}
`;

const DetailContainerLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 20px;
  ${small({ marginLeft: "0", alignItems: "flex-start" })}
`;
const ItemImage = styled.img`
  max-width: 124px;
  max-height: 154px;
  margin-right: 20px;
  flex: 40%;
`;

const ItemContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${mobile({ marginTop: "20px" })}
`;

const SignInContainer = styled.div`
  background-color: #fffff0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
`;
const SummaryContainer = styled.div`
  background-color: #fffff0;
  padding: 15px 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
const CheckOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const CheckOutButton = styled.button`
  background-color: #253746;
  border: none;
  color: white;
  width: 100%;
  height: 40px;
`;

const UserCart = () => {
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setCurrentQuantity(e.target.value);
  };

  function toTop() {
    window.scrollTo(0, 0);
  }

  return (
    <React.Fragment>
      <EmptyContainer>
        <IconContainer>
          <ShoppingCartIcon style={{ fontSize: "50px", color: "#253746" }} />
        </IconContainer>
        <LargeText>Your Shopping Cart is Empty</LargeText>
        <SmallText>Did you have items in your bag?</SmallText>
        <StyledLink to="/account-login">
          <BigButton>Sign In</BigButton>
        </StyledLink>
        <SmallButtonContainer>
          <StyledLink to="/products">
            <SmallButton>Shop Men's</SmallButton>
          </StyledLink>
          <StyledLink to="/products">
            <SmallButton>Shop Women's</SmallButton>
          </StyledLink>
        </SmallButtonContainer>
      </EmptyContainer>

      <ItemContainer>
        <ItemContainerLeft>
          <LargeText>My Cart (1)</LargeText>
          <ItemPurchaseContainer>
            <ItemImage src={item.url} />
            <DetailContainerRight>
              <FlexColumn style={{ lineHeight: "1" }}>
                <MediumText>{item.name}</MediumText>
                <SmallText style={{ fontSize: "13px", color: "gray" }}>
                  Color: Cyan
                </SmallText>
              </FlexColumn>
              <DetailContainerLeft>
                <Box sx={{ width: 50 }}>
                  <FormControl fullWidth>
                    <Select
                      variant="standard"
                      value={currentQuantity}
                      onChange={handleQuantityChange}
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        width: "50px",
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
                <MediumText>${item.price}</MediumText>
              </DetailContainerLeft>
            </DetailContainerRight>

            <BsXLg
              style={{
                marginLeft: "20px",
                marginTop: "8px",
                fontSize: "20px",
              }}
            />
          </ItemPurchaseContainer>
        </ItemContainerLeft>
        <ItemContainerRight>
          <SignInContainer>
            <StyledLink to="/account-login">
              <FlexColumn onClick={toTop}>
                <MediumText>Earn Points with this order!</MediumText>
                <SmallText>
                  <u style={{ marginRight: "5px" }}>
                    <b>Sign In</b>
                  </u>
                  with your email
                </SmallText>
              </FlexColumn>
            </StyledLink>
            <ArrowForwardIosIcon />
          </SignInContainer>
          <SummaryContainer>
            <MediumText>Order Summary</MediumText>
            <FlexRow>
              <SmallText>Subtotal</SmallText>
              <SmallText>Price</SmallText>
            </FlexRow>
            <FlexRow>
              <SmallText>Standard Shipping</SmallText>
              <SmallText>Free</SmallText>
            </FlexRow>
            <FlexRow>
              <SmallText>Estimated Tax</SmallText>
              <SmallText>Free</SmallText>
            </FlexRow>
            <FlexRow>
              <MediumText>Total</MediumText>
              <MediumText>Price</MediumText>
            </FlexRow>
          </SummaryContainer>
          <CheckOutContainer>
            <CheckOutButton>PROCEED TO CHECKOUT</CheckOutButton>
            <MediumText>Need Help?</MediumText>
            <SmallText>
              <CallIcon
                style={{ color: "gray", opacity: "80%", marginRight: "5px" }}
              />
              CALL US AT 1-800-000-0000
            </SmallText>
            <SmallText
              style={{
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                padding: "15px 0",
              }}
            >
              <EmailIcon
                style={{
                  color: "gray",
                  opacity: "80%",
                  marginRight: "5px",
                }}
              />
              LEAVE US A MESSAGE
              <ArrowForwardIosIcon style={{ marginLeft: "auto" }} />
            </SmallText>
            <SmallText>
              <LocalShippingIcon
                style={{ color: "gray", opacity: "80%", marginRight: "5px" }}
              />
              SHIPPING AND RETURNS
              <ArrowForwardIosIcon style={{ marginLeft: "auto" }} />
            </SmallText>
          </CheckOutContainer>
        </ItemContainerRight>
      </ItemContainer>
    </React.Fragment>
  );
};

export default UserCart;
