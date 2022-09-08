import React from "react";
import styled from "styled-components";

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1600px;
  margin: 100px auto;
  background-color: #fffff0;
  font-family: "Libre Baskerville", serif;
`;
const Left = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const PromoText = styled.span`
  font-size: 80px;
  font-weight: 700;
  height: 100%;
`;

const PromoButton = styled.button`
  width: 100px;
  padding: 5px;
  border: none;
  color: white;
  background-color: #cc641b;
`;

const PromoImage = styled.img`
  flex: 50%;
`;

const PromoItems = () => {
  return (
    <Background>
      <Left>
        <PromoText>Must-Haves</PromoText>
        <PromoButton>Shop Now</PromoButton>
      </Left>
      <PromoImage src="https://images.unsplash.com/photo-1597633244018-0201d0158aab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" />
    </Background>
  );
};

export default PromoItems;
