import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { small } from "../util/responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  font-family: "Libre Baskerville", serif;
`;
const Title = styled.h1`
  font-size: 40px;
`;
const Comment = styled.p`
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  ${small({ fontSize: "15px" })}
`;

const Links = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  background-color: #cc641b;
  border: none;
  padding: 5px 0;
  ${small({ maxWidth: "200px" })}
`;

const StyledLink = styled(Link)`
  font-size: 20px;
  color: white;
  text-decoration: none;
  ${small({ fontSize: "15px" })}
`;

const Page404 = () => {
  return (
    <Container>
      <Title>Oh No!</Title>
      <Comment>
        This Page does not exist. But we do have some other great things.
      </Comment>
      <Links>
        <StyledLink to="/">Continue Shopping</StyledLink>
      </Links>
    </Container>
  );
};

export default Page404;
