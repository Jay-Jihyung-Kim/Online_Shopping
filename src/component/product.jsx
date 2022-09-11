import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../util/responsive";
import { productImage, Types } from "../data/productMenData";
import Pagination from "../util/Pagination";
import { paginate } from "../util/paginate";
import CheckBox from "../util/checkbox.jsx";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: "Libre Baskerville", serif;
`;

//Page Info (Top)
const PageInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 18px;
`;

const PageLocation = styled.span`
  font-size: 12px;
`;

const PageName = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

//Body
const BodyContainer = styled.div`
  display: flex;
`;

//Body Filter
const Filter = styled.div`
  min-width: 240px;
  margin-right: 20px;
`;

const FilterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterBy = styled.span`
  font-size: 12px;
`;

const FilterButton = styled.button`
  font-size: 12px;
  border: 1px solid black;
  background-color: white;
  padding: 5px 13px;
`;

const FilterTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FilterTitle = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;

const FilterItem = styled.span``;

const FilterInput = styled.input`
  border: none;
  width: 30px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const MinMaxPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const FilterPriceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 70px;
  align-items: center;
  border: 1px solid black;
  padding: 4px;
  opacity: 80%;
`;

const FilterPriceText = styled.span`
  font-size: 11px;
`;

//Body Product
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 83.5px;
  gap: 30px;
`;
const ProductItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  grid-gap: 20px;
`;

const ProductItem = styled.div`
display: flex;
flex-direction: column;
width: 100%:
height: 100%;
flex: 1;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 300px;
  max-width: 240px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductText = styled.span`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
`;

const PaginationContainer = styled.div``;

const minDistance = 5;

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceValue, setPriceValue] = useState([10, 50]);
  const [pages, setPages] = useState(8);
  const [filterstatus, setFilterstatus] = useState([]);
  const [products, setProducts] = useState({ productImage });
  const [filtered, setFiltered] = useState([]);

  const handlePages = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (status) => {
    filterstatus.includes(status)
      ? filterstatus.splice(filterstatus.indexOf(status), 1)
      : filterstatus.push(status);
    setFilterstatus(filterstatus);

    const filternumber = _.range(0, filterstatus.length);
    const filteredItem = filternumber.map((item) =>
      products.productImage.filter((m) => m.type === filterstatus[item])
    );

    const newfilterlist = filteredItem.flat();
    setFiltered(newfilterlist);

    if (newfilterlist.length < pages) {
      setCurrentPage(1);
    }
  };

  function clearFilter() {
    setPriceValue([10, 50]);
    setFilterstatus([]);
    setCurrentPage(1);
  }

  const handleSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceValue([
        Math.min(newValue[0], priceValue[1] - minDistance),
        priceValue[1],
      ]);
    } else {
      setPriceValue([
        priceValue[0],
        Math.max(newValue[1], priceValue[0] + minDistance),
      ]);
    }
  };

  const handleMin = (e) => {
    if (e.target.value > 45) {
      setPriceValue([45, priceValue[1]]);
    } else if (e.target.value < 0) {
      setPriceValue([0, priceValue[1]]);
    } else {
      setPriceValue([parseInt(e.target.value), priceValue[1]]);
    }
  };

  const handleMax = (e) => {
    if (e.target.value > 50) {
      setPriceValue([50, priceValue[1]]);
    } else if (e.target.value < 0) {
      setPriceValue([15, priceValue[1]]);
    } else {
      setPriceValue([priceValue[0], parseInt(e.target.value)]);
    }
  };

  console.log(priceValue);

  const newList = filterstatus.length > 0 ? filtered : products.productImage;

  const sortList = _.orderBy(newList, [`price`], ["asc"]);

  const currentlist = paginate(newList, currentPage, pages);

  return (
    <Container>
      <PageInfo>
        <PageLocation>/ Clothing / Men</PageLocation>
        <PageName>Men's Top</PageName>
      </PageInfo>
      <BodyContainer>
        <Filter>
          <FilterTop>
            <FilterBy>Filter By</FilterBy>
            <FilterButton onClick={clearFilter}>Clear All</FilterButton>
          </FilterTop>
          <FilterTypeContainer>
            <FilterTitle>Item Type</FilterTitle>
            <FilterItem>
              {Types.map((item) => {
                return (
                  <CheckBox
                    item={item.type}
                    onClick={handleFilter}
                    filterStatus={filterstatus}
                    key={item.type}
                  />
                );
              })}
            </FilterItem>
          </FilterTypeContainer>
          <FilterTypeContainer>
            <FilterTitle>Price</FilterTitle>
            <MinMaxPrice>
              <FilterPriceContainer>
                <FilterPriceText>Min Price</FilterPriceText>
                <FilterPriceText>$</FilterPriceText>
                <FilterInput
                  type="number"
                  onChange={handleMin}
                  value={priceValue[0]}
                />
              </FilterPriceContainer>
              <FilterPriceText>To</FilterPriceText>
              <FilterPriceContainer>
                <FilterPriceText>Max Price</FilterPriceText>
                <FilterPriceText>$</FilterPriceText>
                <FilterInput
                  type="number"
                  onChange={handleMax}
                  value={priceValue[1]}
                />
              </FilterPriceContainer>
            </MinMaxPrice>
            <Box
              sx={{
                width: 150,
                "& .MuiSlider-thumb": {
                  color: "white",
                  border: "2px solid black",
                },
                marginLeft: "10px",
              }}
            >
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={priceValue}
                min={10}
                max={50}
                onChange={handleSlider}
                valueLabelDisplay="auto"
                disableSwap
                style={{ color: "grey" }}
              />
            </Box>
          </FilterTypeContainer>
        </Filter>
        <ProductContainer>
          <ProductItems>
            {currentlist.map((item) => (
              <ProductItem key={item.id}>
                <ProductImg src={item.url} />
                <ProductText>{item.name}</ProductText>
                <ProductText>${item.price}</ProductText>
              </ProductItem>
            ))}
          </ProductItems>
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              pages={pages}
              products={newList}
              onClick={handlePages}
            />
          </PaginationContainer>
        </ProductContainer>
      </BodyContainer>
    </Container>
  );
};

export default Product;
