import React, { useState } from "react";
import styled from "styled-components";
import { GrLocation } from "react-icons/gr";
import { BsSearch, BsPerson, BsCart } from "react-icons/bs";
import { category } from "../data/category";
import {
  hiddenMenuWomen,
  hiddenMenuMen,
  hiddenMenuKids,
} from "../data/hiddenMenuItems";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: white;
  font-family: "Libre Baskerville", serif;
`;
//Header
const HeaderBackground = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 100px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 25%;
  gap: 5px;
`;
const Text = styled.span``;
const BrandName = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 65px;
  font-weight: 500;
  flex: 15%;
  text-align: center;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  flex: 25%;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBar = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 120px;
  &:focus {
    outline: none;
    width: 180px;
  }
`;
//Navbar
const Navbar = styled.div``;
const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  box-shadow: 0px 1px 1px lightgrey;
  padding-bottom: 25px;
`;
const Categories = styled.span`
  font-size: 20px;
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
`;
const CategoryType = styled.span`
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
const CategoryItem = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Header = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  console.log(currentCategory);

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

  function handleMouseLeave() {
    setCurrentCategory(null);
  }

  return (
    <Container>
      <HeaderBackground>
        <Left>
          <GrLocation />
          <Text>Stores</Text>
        </Left>
        <BrandName>LeveL</BrandName>
        <Right>
          <SearchContainer>
            <SearchBar placeholder="Search" />
            <BsSearch style={{ fontSize: "20px" }} />
          </SearchContainer>
          <BsPerson style={{ fontSize: "25px" }} />
          <BsCart style={{ fontSize: "20px" }} />
        </Right>
      </HeaderBackground>
      <Navbar onMouseLeave={handleMouseLeave}>
        <NavbarContainer status={currentCategory}>
          {category.map((item) => {
            return (
              <Categories
                key={item.id}
                onMouseOver={() => handleCategory(item.name)}
              >
                {item.name}
              </Categories>
            );
          })}
        </NavbarContainer>
        <MenuContainer status={currentCategory}>
          {currentCategory !== null
            ? currentCategory.map((item) => {
                return (
                  <CategoryContainer>
                    <CategoryType>{item.category}</CategoryType>
                    {item.items.map((name) => {
                      return <CategoryItem>{name}</CategoryItem>;
                    })}
                  </CategoryContainer>
                );
              })
            : null}
        </MenuContainer>
      </Navbar>
    </Container>
  );
};

export default Header;
