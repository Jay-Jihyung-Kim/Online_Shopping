import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../util/responsive";
import { productImage, Types } from "../data/productMenData";
import Pagination from "../util/Pagination";
import { paginate } from "../util/paginate";
import CheckBox from "../util/checkbox.jsx";
import CloseIcon from "@mui/icons-material/Close";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding: 10px 10px;
  ${mobile({ padding: "0 10px" })}
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  ${mobile({ display: "flex", flexDirection: "column" })}
`;

const LocationContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f1f5f8;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const Location = styled.span`
  font-size: 18px;
  color: black;
  opacity: 80%;
`;

const FilterContainer = styled.div`
  @media screen and (max-width: 720px) {
    height: 100%;
    width: ${(props) => props.width};
    position: fixed;
    right: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    z-index: 999;
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: width 0.3s;
  }
`;

const Xmark = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  & > h1 {
    margin: 0;
  }
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 30px;
  & > p {
    font-size: 20px;
    text-decoration: none;
    color: black;
    opacity: 80%;
    line-height: 20px;
  }
  & > a:first-child {
    font-weight: 700;
    padding-bottom: 5px;
    text-decoration: underline;
  }
  & > a:hover {
    text-decoration: underline;
  }
  ${mobile({ padding: "10px 20px" })}
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  text-decoration: underline;
  color: black;
  opacity: 80%;
  margin-bottom: 10px;
`;

const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 30px;
  & > a {
    font-size: 20px;
    text-decoration: none;
    color: black;
    opacity: 80%;
    line-height: 20px;
    font-weight: 700;
    padding-bottom: 5px;
    text-decoration: underline;
  }
  ${mobile({ padding: "10px 20px" })}
`;

const Filtertype = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 20px;
    text-decoration: none;
    color: black;
    opacity: 80%;
    line-height: 20px;
  }
  & > span {
    font-size: 12px;
    padding-top: 10px;
    cursor: pointer;
  }
`;

const ListContainer = styled.div``;

const Toptag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  ${mobile({ display: "none" })}
`;

const ToptagHidden = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media only screen and (min-width: 720px) {
    display: none;
  }
`;

const Refine = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  font-size: 25px;
  border: none;
  background-color: white;
  color: rgba(0, 0, 0, 0.9);
`;

const ProductCategory = styled.div`
  display: flex;
  align-items: baseline;
`;

const CategoryName = styled.div`
  font-size: 30px;
  ${mobile({ fontSize: "25px" })}
`;

const NumberofProduct = styled.div`
  font-size: 20px;
  opacity: 80%;
  margin-left: 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const SortCategory = styled.div`
  display: flex;
`;

const Sortby = styled.div`
  font-size: 15px;
`;

const SortList = styled.select`
  font-size: 15px;
  border: none;
  background-color: white;
  appearance: none;
  margin-left: 10px;
  opacity: 80%;
  &:focus {
    border: none;
    outline: none;
  }
`;

const Option = styled.option`
  font-size: 15px;
  &:after {
    border: none;
    opacity: 80%;
  }
`;

const Product = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-gap: 10px;
  justify-items: center;
  @media screen and (max-width: 380px) {
    grid-gap: 0px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  @media screen and (max-width: 380px) {
    width: 154px;
    height: 181px;
  }
  ${mobile({ alignSelf: "center" })}
`;

const Name = styled.span`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 380px) {
    font-size: 15px;
    padding-left: 10px;
    margin-bottom: -6px;
  }
`;
const Price = styled.span`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 380px) {
    font-size: 15px;
    padding-left: 10px;
    margin-bottom: 10px;
  }
`;
const PaginationContainer = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: center;
`;
// const Container = styled.div``

const ProductMen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(6);
  const [products, setProducts] = useState({ productImage });
  const [filterstatus, setFilterstatus] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [RefineWidth, setRefineWidth] = useState("0%");

  let handlePages = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (status) => {
    filterstatus.includes(status)
      ? filterstatus.splice(filterstatus.indexOf(status), 1)
      : filterstatus.push(status);
    setFilterstatus(filterstatus);

    const filternumber = _.range(0, filterstatus.length);
    const filteredItem = filternumber.map((item) =>
      products.productImage.filter((m) => m.type == filterstatus[item])
    );

    const newfilterlist = filteredItem.flat();
    setFiltered(newfilterlist);

    if (newfilterlist.length < pages) {
      setCurrentPage(1);
    }
  };

  let handleRefineWidth = (status) => {
    status === "open" ? setRefineWidth("60%") : setRefineWidth("0%");
    status === "close" ? setRefineWidth("0%") : setRefineWidth("60%");
  };

  function clearFilter() {
    setFilterstatus([]);
    setCurrentPage(1);
  }

  const newList = filterstatus.length > 0 ? filtered : products.productImage;

  const sortList = _.orderBy(newList, [`price`], ["asc"]);

  const currentlist = paginate(newList, currentPage, pages);

  return (
    <Container>
      <GridContainer>
        <FilterContainer width={RefineWidth}>
          <Xmark>
            <h1>Refine</h1>
            <CloseIcon
              style={{ fontSize: "20px" }}
              onClick={() => handleRefineWidth("close")}
            />
          </Xmark>
          <Filter>
            <FilterTitle>Shop by Category</FilterTitle>
            <p>New Arrivals</p>
            <p>Tops</p>
            <p>Bottoms</p>
            <p>Underwear</p>
            <p>Accessories</p>
            <p>Shoes</p>
          </Filter>
          <FilterList>
            <FilterTitle>Filter by Type</FilterTitle>
            <Filtertype>
              {Types.map((item) => {
                return (
                  <CheckBox
                    item={item.type}
                    onClick={handleFilter}
                    filterStatus={filterstatus}
                  />
                );
              })}
              <span onClick={clearFilter}>Clear All</span>
            </Filtertype>
          </FilterList>
        </FilterContainer>
        <ListContainer>
          <Toptag>
            <ProductCategory>
              <CategoryName>Men's Top</CategoryName>
              <NumberofProduct>({newList.length} styles)</NumberofProduct>
            </ProductCategory>
            <SortCategory>
              <Sortby>Sort by:</Sortby>
              <SortList>
                <Option>New arrivals</Option>
                <Option>Best seller</Option>
                <Option>Price from low to high</Option>
                <Option>Price from high to low</Option>
              </SortList>
            </SortCategory>
          </Toptag>
          <ToptagHidden>
            <ProductCategory>
              <CategoryName>Men's Top</CategoryName>
              <NumberofProduct>({newList.length} styles)</NumberofProduct>
            </ProductCategory>
            <Refine>
              <Button onClick={() => handleRefineWidth("open")}>
                <DisplaySettingsIcon
                  style={{ fontSize: "20px", marginRight: "5px" }}
                />
                Refine
              </Button>
            </Refine>
          </ToptagHidden>
          <Product>
            {currentlist.map((item) => (
              <ProductContainer key={item.id}>
                <Img src={item.url} />
                <Name>{item.name}</Name>
                <Price>${item.price}</Price>
              </ProductContainer>
            ))}
          </Product>
        </ListContainer>
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            pages={pages}
            products={newList}
            onClick={handlePages}
          />
        </PaginationContainer>
      </GridContainer>
    </Container>
  );
};

export default ProductMen;
