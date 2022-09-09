import React from "react";
import styled from "styled-components";
import { mobile } from "../util/responsive";

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 40px auto 0px;
  border-top: 1px solid #92b6b1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #92b6b1;
  color: white;
  font-family: "Libre Baskerville", serif;
`;
const SubscribeTitle = styled.h1`
  font-weight: 600;
  padding-top: 30px;
  margin: 0;
  font-size: 30px;
  ${mobile({ fontSize: "23px" })}
`;
const SubscribeText = styled.span`
  font-size: 15px;
  ${mobile({ fontSize: "11px" })}
`;
const Input = styled.input`
  font-size: 15px;
  width: 100%;
  max-width: 450px;
  margin-top: 15px;
  padding: 7px 0 7px 10px;
  color: rgba(0, 0, 0, 0.7);
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 12px;
  }
  ${mobile({ maxWidth: "300px" })}
`;
const Button = styled.button`
  font-size: 15px;
  width: 100%;
  max-width: 450px;
  margin-top: 15px;
  border: none;
  color: #fafafa;
  background: #202c39;
  padding: 7px 0;
  ${mobile({ maxWidth: "300px" })}
`;
const SubscribeTerm = styled.span`
  font-size: 10px;
  width: 100%;
  max-width: 550px;
  margin-top: 10px;
  margin-bottom: 30px;
  ${mobile({ fontSize: "8px", maxWidth: "80%" })}
  & > a {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 500;
    ${mobile({ fontSize: "8px" })}
    &:hover {
      color: #fafafa;
    }
  }
`;

const Subscribe = () => {
  return (
    <Container>
      <SubscribeTitle>Subscribe and receive 20% Off</SubscribeTitle>
      <SubscribeText>
        Be the first to know about our deals, updates and more!
      </SubscribeText>
      <Input placeholder="EMAIL ADDRESS" type="email" name="email" />
      <Button>GET 20% OFF</Button>
      <SubscribeTerm>
        *By clicking "GET 20% OFF" button you have granted a permission for us
        to send a promotional offers to the email you have provided and agreed
        to our <a href="">Terms</a> & <a href="">Privacy Policy</a>.
      </SubscribeTerm>
    </Container>
  );
};

export default Subscribe;
