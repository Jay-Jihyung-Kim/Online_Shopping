import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import store from "../redux/store";
import axios from "axios";
import ScrollLock from "../util/scrolllock";

//Empty
const EmptyContainer = styled.div`
  display: flex;
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
  cursor: pointer;
  ${mobile({
    marginRight: "0px",
    paddingRight: "10px",
    height: "144px",
    minWidth: "124px",
  })}
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
const ThankyouContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  top: 0;
  display: ${(props) => (props.status === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  touch-action: none;
`;
const ThankyouMessage = styled.span`
  color: white;
  font-size: 36px;
  background-color: #253746;
  padding: 30px;
  text-align: center;
`;

const UserCart = () => {
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [currentItem, setCurrentItem] = useState();
  const [currentCart, setCurrentCart] = useState();
  const [totalPrice, setTotalPrice] = useState([]);
  const [payment, setPayment] = useState(false);
  const currentUser = store.getState().user;
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;

  const handleQuantityChange = (e) => {
    setCurrentQuantity(e.target.value);
  };

  const handleItemIdentify = (name) => {
    setCurrentItem(name);
  };

  const handleDeleteItem = (obj) => {
    const newCart =
      currentCart && currentCart.filter((item) => item.name !== obj);
    setCurrentCart(newCart);
  };

  const handleCheckout = async () => {
    setPayment(true);
    window.scrollTo(0, 0);
    setTimeout(async () => {
      await axios.put(
        baseURL + "api/users/" + currentUser.userId,
        {
          cart: [],
        },
        {
          headers: { "x-auth-token": currentUser.token },
        }
      );

      navigate("/");
    }, 3000);
  };

  const toProduct = (id) => {
    navigate("/products/" + id);
  };

  function toTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const callCurrentCart = async () => {
      const user = await axios.get(
        baseURL + "api/users/" + currentUser.userId,
        {
          headers: { "x-auth-token": currentUser.token },
        }
      );
      const cart = user.data.cart;
      setCurrentCart(cart);
    };
    callCurrentCart();
  }, []);

  useEffect(() => {
    const newCart =
      currentCart &&
      currentCart.map((item) => {
        if (item.name === currentItem) {
          return { ...item, quantity: currentQuantity };
        }
        return item;
      });
    setCurrentCart(newCart);
  }, [currentQuantity]);

  useEffect(() => {
    let subtotal = 0;
    if (currentCart && currentCart.length > 0) {
      currentCart.map((item) => {
        subtotal = subtotal + item.quantity * item.price;
      });
    }
    let estimatedTax = subtotal * 0.0775;
    let total = estimatedTax + subtotal;
    const points = total * 0.05;
    setTotalPrice([
      subtotal,
      estimatedTax.toFixed(2),
      total.toFixed(2),
      points.toFixed(0),
    ]);
  }, [currentCart]);

  useEffect(() => {
    const UpdateCart = async () => {
      await axios.put(
        baseURL + "api/users/" + currentUser.userId,
        {
          cart: currentCart,
        },
        {
          headers: { "x-auth-token": currentUser.token },
        }
      );
    };
    UpdateCart();
  }, [currentCart]);

  return (
    <React.Fragment>
      {currentCart && currentCart.length > 0 ? (
        <React.Fragment>
          <ItemContainer>
            <ItemContainerLeft>
              <LargeText>My Cart ({currentCart.length})</LargeText>
              {currentCart.map((item) => {
                return (
                  <ItemPurchaseContainer
                    onClick={() => handleItemIdentify(item.name)}
                  >
                    <ItemImage
                      src={item.url}
                      onClick={() => toProduct(item.id)}
                    />
                    <DetailContainerRight>
                      <FlexColumn style={{ lineHeight: "1" }}>
                        <MediumText>{item.name}</MediumText>
                        <SmallText
                          style={{
                            fontSize: "13px",
                            color: "gray",
                            marginTop: "2px",
                          }}
                        >
                          Color: {item.color}
                        </SmallText>
                      </FlexColumn>
                      <DetailContainerLeft>
                        <Box sx={{ width: 50 }}>
                          <FormControl fullWidth>
                            <Select
                              variant="standard"
                              value={item.quantity}
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
                      onClick={() => handleDeleteItem(item.name)}
                    />
                  </ItemPurchaseContainer>
                );
              })}
            </ItemContainerLeft>
            <ItemContainerRight>
              <SignInContainer>
                <StyledLink to="/account-login">
                  <FlexColumn onClick={toTop}>
                    <MediumText>Earn Points with this order!</MediumText>
                    <SmallText>
                      You are earning{" "}
                      <b style={{ margin: "0px 4px" }}>{totalPrice[3]}</b>{" "}
                      Points!
                    </SmallText>
                  </FlexColumn>
                </StyledLink>
                <ArrowForwardIosIcon />
              </SignInContainer>
              <SummaryContainer>
                <MediumText>Order Summary</MediumText>
                <FlexRow>
                  <SmallText>Subtotal</SmallText>
                  <SmallText>${totalPrice[0]}.00</SmallText>
                </FlexRow>
                <FlexRow>
                  <SmallText>Standard Shipping</SmallText>
                  <SmallText>Free</SmallText>
                </FlexRow>
                <FlexRow>
                  <SmallText>Estimated Tax</SmallText>
                  <SmallText>${totalPrice[1]}</SmallText>
                </FlexRow>
                <FlexRow>
                  <MediumText>Total</MediumText>
                  <MediumText>${totalPrice[2]}</MediumText>
                </FlexRow>
              </SummaryContainer>
              <CheckOutContainer>
                <CheckOutButton onClick={handleCheckout}>
                  PROCEED TO CHECKOUT
                </CheckOutButton>
                <MediumText>Need Help?</MediumText>
                <SmallText>
                  <CallIcon
                    style={{
                      color: "gray",
                      opacity: "80%",
                      marginRight: "5px",
                    }}
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
                    style={{
                      color: "gray",
                      opacity: "80%",
                      marginRight: "5px",
                    }}
                  />
                  SHIPPING AND RETURNS
                  <ArrowForwardIosIcon style={{ marginLeft: "auto" }} />
                </SmallText>
              </CheckOutContainer>
            </ItemContainerRight>
          </ItemContainer>
          <ThankyouContainer status={payment}>
            <ThankyouMessage>Thank You for your purchase!</ThankyouMessage>
          </ThankyouContainer>
        </React.Fragment>
      ) : (
        <EmptyContainer>
          <IconContainer>
            <ShoppingCartIcon style={{ fontSize: "50px", color: "#253746" }} />
          </IconContainer>
          <LargeText>Your Shopping Cart is Empty</LargeText>
          <SmallText>Did you have items in your bag?</SmallText>
          <StyledLink to="/account-login">
            <BigButton>My Account</BigButton>
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
      )}
    </React.Fragment>
  );
};

export default UserCart;
