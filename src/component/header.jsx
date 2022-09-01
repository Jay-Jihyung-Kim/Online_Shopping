import React from "react";
import styled from "styled-components";
import { GrLocation } from "react-icons/gr";
import { BsSearch, BsPerson, BsCart } from "react-icons/bs";
import { category } from "../data/category";

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;
//Header
const HeaderBackground = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 25%;
`;
const Text = styled.span``;
const BrandName = styled.span`
  font-family: "Qwitcher Grypen", cursive;
  font-size: 70px;
  font-weight: 500;
  flex: 50%;
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
const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  margin-top: 20px;
  font-size: 20px;
`;
const Categories = styled.span``;

const Header = () => {
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
      <NavbarContainer>
        {category.map((item) => {
          return <Categories key={item.id}>{item.name}</Categories>;
        })}
      </NavbarContainer>
    </Container>
  );
};

export default Header;
