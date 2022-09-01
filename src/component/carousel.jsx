import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const GridContainer = styled.div``;

const Container = styled.div`
  display: flex;
  max-width: 1500px;
  max-height: 600px;
  margin: 0px auto;
  background-color: #f7faf0;
  & > img {
    object-fit: cover;
  }
`;

const CarouselTitle = styled.h3`
  font-size: 35px;
  color: ${(props) => props.color};
  position: absolute;
  top: -130px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CarouselText = styled.span`
  opacity: 80%;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.color};
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CarouselSlide = () => {
  return (
    <GridContainer>
      <Carousel>
        <Carousel.Item pause="hover" interval={3000}>
          <Container>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1603808033587-935942847de4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
              alt="First slide"
            />
            <Carousel.Caption>
              <CarouselTitle color="white">
                Trending Shoes 25% Off
              </CarouselTitle>
              <CarouselText color="white">
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdumNulla vitae
                elit libero, a pharetra augue mollis interdum
              </CarouselText>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
        <Carousel.Item pause="hover" interval={3000}>
          <Container>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
              alt="First slide"
            />
            <Carousel.Caption>
              <CarouselTitle color="#202C39">
                Find the style that fits you!
              </CarouselTitle>
              <CarouselText color="#202C39">
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdumNulla vitae
                elit libero, a pharetra augue mollis interdum
              </CarouselText>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="First slide"
            />
            <Carousel.Caption>
              <CarouselTitle color="white">
                All the comfort you been looking for
              </CarouselTitle>
              <CarouselText color="white">
                Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla
                vitae elit libero, a pharetra augue mollis interdumNulla vitae
                elit libero, a pharetra augue mollis interdum
              </CarouselText>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
      </Carousel>
    </GridContainer>
  );
};

export default CarouselSlide;
