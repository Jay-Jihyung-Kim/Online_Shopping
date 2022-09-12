import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { small, mobile } from "../util/responsive";
import { productImage, Types } from "../data/productMenData";
import Pagination from "../util/Pagination";
import { paginate } from "../util/paginate";
import CheckBox from "../util/checkbox.jsx";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import Select from "@mui/material/Select";
import { BsXLg } from "react-icons/bs";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1450px;
  margin: 10px auto;
  padding: 0 20px;
  font-family: "Libre Baskerville", serif;
  position: relative;
  ${mobile({ padding: "0 7px" })}
`;

//Page Info (Top)
const PageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 20px 0;
  gap: 18px;
  ${mobile({ margin: "10px 0" })}
`;

const PageLocation = styled.span`
  font-size: 12px;
`;

const PageName = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

const PageSortBy = styled.div`
  ${mobile({ display: "none" })}
`;

const PageRefine = styled.button`
  display: none;
  font-size: 15px;
  font-weight: 700;
  width: 150px;
  padding: 10px 0;
  background-color: #253746;
  border: none;
  color: white;
  ${mobile({
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    alignItems: "center",
  })};
`;

const PageRefineMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  width: ${(props) => (props.status === true ? "60%" : "0%")};
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s;
  z-index: 9999;
  padding: ${(props) => (props.status === true ? "12px" : "0px")};
  margin-top: -77px;
  touch-action: none;
`;

const PageRefineTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid gray;
  padding-bottom: 10px;
`;

const PageBlackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: black;
  opacity: 0.5;
  top: 0;
  z-index: 1001;
  touch-action: none;
  display: ${(props) => (props.status === true ? "block" : "none")};
`;

//Body
const BodyContainer = styled.div`
  display: flex;
  ${mobile({ justifyContent: "center" })}
`;

//Body Filter
const Filter = styled.div`
  min-width: 240px;
  margin-right: 20px;
  ${mobile({ display: "none" })}
`;

const FilterRefine = styled.div`
  display: "none";
  ${mobile({ display: "block" })}
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
  width: 40px;
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
  margin-bottom: 5px;
  gap: 30px;
`;

const ProductItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  grid-gap: 20px;
  ${mobile({ gridTemplateColumns: "repeat(4,1fr)", gap: "10px" })}
  ${small({ gridTemplateColumns: "repeat(2,1fr)", gap: "7px" })}
& > a {
    color: inherit;
    text-decoration: inherit;
  }
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
  ${mobile({ maxHeight: "250px", marginBottom: "5px" })}
`;

const ProductText = styled.span`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
`;

const PaginationContainer = styled.div``;

const minDistance = 10;
const pages = 8;
const products = { productImage };

const ProductMen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceValue, setPriceValue] = useState([10, 50]);
  const [sortBy, setSortBy] = useState("");
  const [filterstatus, setFilterstatus] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handlePages = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
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
    setSortBy("");
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
      setPriceValue([priceValue[0], 50]);
    } else if (e.target.value < 20) {
      setPriceValue([priceValue[0], 20]);
    } else {
      setPriceValue([priceValue[0], parseInt(e.target.value)]);
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleMenuOpen = () => {
    menuOpen === false ? setMenuOpen(true) : setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const typeFilteredList =
    filterstatus.length > 0 ? filtered : products.productImage;

  const priceFilteredList = typeFilteredList.filter(
    (item) => item.price > priceValue[0] && item.price < priceValue[1]
  );

  let sortedList =
    sortBy === "" || sortBy === "featured"
      ? priceFilteredList
      : _.orderBy(priceFilteredList, ["price"], [sortBy]);

  const currentlist = paginate(sortedList, currentPage, pages);

  useEffect(() => {
    if (priceFilteredList.length < pages + 1) setCurrentPage(1);
  }, [priceFilteredList.length]);

  return (
    <React.Fragment>
      <PageBlackBackground status={menuOpen}></PageBlackBackground>
      <Container>
        <PageLocation>/ Clothing / Men</PageLocation>
        <PageInfo>
          <PageName>Men's Tops</PageName>
          <PageSortBy>
            <Box sx={{ width: 160 }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  variant="standard"
                  label="Age"
                  value={sortBy}
                  onChange={handleSortBy}
                  style={{ fontSize: "14px" }}
                >
                  <MenuItem value={"featured"}>Featured</MenuItem>
                  <MenuItem value={"desc"}>Price High to Low</MenuItem>
                  <MenuItem value={"asc"}>Price Low to High</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </PageSortBy>
          <PageRefine onClick={handleMenuOpen}>
            <DisplaySettingsIcon />
            Refine
          </PageRefine>
          <PageRefineMenu status={menuOpen}>
            <PageRefineTop>
              <PageName>Refine</PageName>
              <BsXLg onClick={handleMenuOpen} />
            </PageRefineTop>
            <FormControl
              style={{
                borderBottom: "2px solid gray",
                marginBottom: "20px",
                paddingBottom: "20px",
                width: "100%",
              }}
            >
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Libre Baskerville, serif",
                }}
              >
                Sort By
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={sortBy}
                onChange={handleSortBy}
              >
                <FormControlLabel
                  value="featured"
                  control={<Radio />}
                  label="Featured"
                />
                <FormControlLabel
                  value="desc"
                  control={<Radio />}
                  label="Price High to Low"
                />
                <FormControlLabel
                  value="asc"
                  control={<Radio />}
                  label="Price Low to High"
                />
              </RadioGroup>
            </FormControl>
            <FilterRefine>
              <FilterTop>
                <FilterBy
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Filter By
                </FilterBy>
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
                    width: 175,
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
            </FilterRefine>
          </PageRefineMenu>
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
                  width: 175,
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
                <a href={`/products/${item.id}`}>
                  <ProductItem key={item.id}>
                    <ProductImg src={item.url} />
                    <ProductText>{item.name}</ProductText>
                    <ProductText>${item.price}</ProductText>
                  </ProductItem>
                </a>
              ))}
            </ProductItems>
            <PaginationContainer>
              <Pagination
                currentPage={currentPage}
                pages={pages}
                products={priceFilteredList}
                onClick={handlePages}
              />
            </PaginationContainer>
          </ProductContainer>
        </BodyContainer>
      </Container>
    </React.Fragment>
  );
};

export default ProductMen;
