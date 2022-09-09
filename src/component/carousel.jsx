import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { mobile } from "../util/responsive";

const Background = styled.div``;
const CarouselPromo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: "Libre Baskerville", serif;
  margin: 40px 0;
  ${mobile({ margin: "20px 0" })}
`;
const CarouselPromoTitle = styled.span`
  font-size: 50px;
  font-weight: 600;
  max-width: 570px;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.1;
  ${mobile({ fontSize: "30px" })}
`;
const CarouselPromoText = styled.span`
  margin: 20px 0;
  padding: 0 10px;
  font-size: 16px;
  ${mobile({ fontSize: "12px" })}
`;
const CarouselPromoButton = styled.button`
  width: 120px;
  padding: 5px;
  background-color: white;
  ${mobile({ fontSize: "12px", width: "100px" })}
`;
const GridContainer = styled.div``;
const Container = styled.div`
  display: flex;
  max-width: 2500px;
  max-height: 700px;
  margin: 0px auto;
  background-color: #f7faf0;
  & > img {
    object-fit: cover;
  }
`;

const CarouselSlide = () => {
  return (
    <Background>
      <CarouselPromo>
        <CarouselPromoTitle>New Fall Runaway</CarouselPromoTitle>
        <CarouselPromoTitle>Collection is here.</CarouselPromoTitle>
        <CarouselPromoText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consequat congue justo.
        </CarouselPromoText>
        <CarouselPromoButton>Shop Now</CarouselPromoButton>
      </CarouselPromo>
      <GridContainer>
        <Carousel>
          <Carousel.Item pause="hover" interval={3000}>
            <Container>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1603808033587-935942847de4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
                alt="First slide"
              />
            </Container>
          </Carousel.Item>
          <Carousel.Item pause="hover" interval={3000}>
            <Container>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
                alt="First slide"
              />
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="First slide"
              />
            </Container>
          </Carousel.Item>
        </Carousel>
      </GridContainer>
    </Background>
  );
};

export default CarouselSlide;
