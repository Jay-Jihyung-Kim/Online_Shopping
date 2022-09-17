import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrLocation } from "react-icons/gr";
import { BsSearch, BsPerson, BsCart, BsXLg } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { category } from "../data/category";
import {
  hiddenMenuWomen,
  hiddenMenuMen,
  hiddenMenuKids,
} from "../data/hiddenMenuItems";
import { mobile } from "../util/responsive";
import store from "../redux/store";
import axios from "axios";
import Badge from "@mui/material/Badge";
import MobileFooter from "./mobilefooter";
import { useBeforeunload } from "react-beforeunload";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  font-family: "Libre Baskerville", serif;
`;
//Header
const HeaderBackground = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 25px;
  ${mobile({ padding: "0 15px", boxShadow: "0px 2px 2px lightgrey" })}
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 25%;
  gap: 5px;
  ${mobile({ display: "none" })}
`;
const Text = styled.span`
  font-size: 12px;
`;
const BrandName = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 65px;
  font-weight: 500;
  flex: 15%;
  text-align: center;
  ${mobile({ fontSize: "45px" })}
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  flex: 25%;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBar = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 120px;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    outline: none;
    width: 180px;
  }
`;

const LeftMobile = styled.div`
  display: none;
  font-size: 25px;
  align-items: center;
  gap: 15px;
  flex: 25%;
  ${mobile({ display: "flex" })}
`;

const RightMobile = styled.div`
  display: none;
  font-size: 25px;
  flex-direction: row-reverse;
  align-items: center;
  gap: 15px;
  flex: 25%;
  ${mobile({ display: "flex" })}
`;

//Navbar
const Navbar = styled.div`
  ${mobile({ display: "none" })}
`;
const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  box-shadow: 0px 2px 2px lightgrey;
  padding-bottom: 25px;
`;
const Categories = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
//Hidden Menu
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${(props) => (props.status === null ? "0px" : "40px")};
  padding-bottom: ${(props) => (props.status === null ? "0px" : "40px")};
  gap: 100px;
  box-shadow: 0px 2px 2px lightgrey;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${mobile({
    gap: "12px",
    fontWeight: "bold",
    borderBottom: "1px solid gray",
    paddingBottom: "12px",
    marginLeft: "20px",
    marginRight: "20px",
  })}
`;
const CategoryType = styled.span`
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
  ${mobile({
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: "15px",
    marginTop: "12px",
  })}
`;
const CategoryItem = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  ${mobile({
    fontSize: "13px",
    paddingLeft: "10px",
  })}
`;

//Mobile Menu
const MobileMenu = styled.div`
  position: absolute;
  top: 0;
  background-color: white;
  width: ${(props) => (props.status === "open" ? "100%" : "0%")};
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s;
  z-index: 999;
`;

const MobileMenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  opacity: 80%;
`;
const MobileRegister = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  alignitems: center;
`;

const Header = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [mobileCategory, setMobileCategory] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState("closed");
  const [currentCart, setCurrentCart] = useState();
  const currentUser = store.getState().user;
  const baseURL = process.env.REACT_APP_API_URL;

  useBeforeunload((event) => {
    store.dispatch({
      type: "REMOVE_SELECTED_USERS",
    });
    event.preventDefault();
    return "Are you sure you want to exit?";
  });

  const handleCategory = (category) => {
    if (category === "Women") {
      setCurrentCategory(hiddenMenuWomen);
    } else if (category === "Men") {
      setCurrentCategory(hiddenMenuMen);
    } else if (category === "Kids") {
      setCurrentCategory(hiddenMenuKids);
    } else {
      setCurrentCategory(null);
    }
  };

  const handleMobileCategory = (category) => {
    mobileCategory !== category
      ? setMobileCategory(category)
      : setMobileCategory(null);
  };

  function handleMobileMenu() {
    openMobileMenu === "open"
      ? setOpenMobileMenu("closed")
      : setOpenMobileMenu("open");
    setMobileCategory(null);
  }

  function handleMouseLeave() {
    setCurrentCategory(null);
  }

  function toTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (currentUser !== undefined) {
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
    }
  }, []);

  return (
    <Container>
      <HeaderBackground>
        <Left>
          <GrLocation />
          <Text>Stores</Text>
        </Left>
        <LeftMobile>
          <BiMenu style={{ fontSize: "30px" }} onClick={handleMobileMenu} />
          <Link
            to="/account-login"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BsPerson onClick={toTop} />
          </Link>
        </LeftMobile>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <BrandName>LeveL</BrandName>
        </Link>
        <Right>
          <SearchContainer>
            <SearchBar placeholder="Search" />
            <BsSearch style={{ fontSize: "20px" }} />
          </SearchContainer>
          <Link to="/account-login">
            <BsPerson
              style={{ fontSize: "25px", color: "black" }}
              onClick={toTop}
            />
          </Link>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Badge
              badgeContent={currentCart && currentCart.length}
              color="primary"
            >
              <BsCart style={{ fontSize: "20px" }} onClick={toTop} />
            </Badge>
          </Link>
        </Right>
        <RightMobile>
          <StyledLink to="/cart">
            <Badge
              badgeContent={currentCart && currentCart.length}
              color="primary"
            >
              <BsCart onClick={toTop} />
            </Badge>
          </StyledLink>
          <BsSearch style={{ fontSize: "23px" }} />
        </RightMobile>
      </HeaderBackground>
      <Navbar onMouseLeave={handleMouseLeave}>
        <NavbarContainer status={currentCategory}>
          {category.map((item) => {
            return (
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "black" }}
                key={item.id}
              >
                <Categories onMouseOver={() => handleCategory(item.name)}>
                  {item.name}
                </Categories>
              </Link>
            );
          })}
        </NavbarContainer>
        <MenuContainer status={currentCategory}>
          {currentCategory !== null
            ? currentCategory.map((item) => {
                return (
                  <CategoryContainer>
                    <CategoryType key={item.id}>{item.category}</CategoryType>
                    {item.items.map((name) => {
                      return (
                        <Link
                          to="/products"
                          style={{ textDecoration: "none", color: "black" }}
                          key={name}
                        >
                          <CategoryItem>{name}</CategoryItem>{" "}
                        </Link>
                      );
                    })}
                  </CategoryContainer>
                );
              })
            : null}
        </MenuContainer>
      </Navbar>
      <MobileMenu status={openMobileMenu}>
        <MobileMenuTop>
          <Link
            to="/account-login"
            style={{ textDecoration: "none", color: "black" }}
            onClick={handleMobileMenu}
          >
            <MobileRegister onClick={toTop}>
              <u>Sign In</u> or <u>Register</u>
            </MobileRegister>
          </Link>
          <BsXLg onClick={handleMobileMenu} />
        </MobileMenuTop>
        <CategoryContainer style={{ borderTop: "1px solid gray" }}>
          <CategoryType>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              New
            </Link>
          </CategoryType>
        </CategoryContainer>
        <CategoryContainer>
          <CategoryType onClick={() => handleMobileCategory("Women")}>
            Women
          </CategoryType>
          {mobileCategory === "Women"
            ? hiddenMenuWomen.map((item) => {
                return (
                  <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CategoryItem>{item.category}</CategoryItem>
                  </Link>
                );
              })
            : null}
        </CategoryContainer>
        <CategoryContainer>
          <CategoryType onClick={() => handleMobileCategory("Men")}>
            Men
          </CategoryType>
          {mobileCategory === "Men"
            ? hiddenMenuMen.map((item) => {
                return (
                  <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CategoryItem>{item.category}</CategoryItem>
                  </Link>
                );
              })
            : null}
        </CategoryContainer>
        <CategoryContainer>
          <CategoryType onClick={() => handleMobileCategory("Kids")}>
            Kids
          </CategoryType>
          {mobileCategory === "Kids"
            ? hiddenMenuKids.map((item) => {
                return (
                  <Link
                    to="/products"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CategoryItem>{item.category}</CategoryItem>
                  </Link>
                );
              })
            : null}
        </CategoryContainer>
        <CategoryContainer>
          <CategoryType>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              Sale
            </Link>
          </CategoryType>
        </CategoryContainer>
        <MobileFooter />
      </MobileMenu>
    </Container>
  );
};

export default Header;
