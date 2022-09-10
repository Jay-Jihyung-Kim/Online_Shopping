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

const FilterTitle = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;

const FilterItem = styled.span``;

//Body Product
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(6);
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
      products.productImage.filter((m) => m.type == filterstatus[item])
    );

    const newfilterlist = filteredItem.flat();
    setFiltered(newfilterlist);

    if (newfilterlist.length < pages) {
      setCurrentPage(1);
    }
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
          <FilterTitle>Item Type</FilterTitle>
          <FilterItem>
            {Types.map((item) => {
              return (
                <CheckBox
                  item={item.type}
                  onClick={handleFilter}
                  filterStatus={filterstatus}
                />
              );
            })}
          </FilterItem>
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
