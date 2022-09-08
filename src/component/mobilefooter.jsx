import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 0 6rem;
`;

const GridContainer = styled.div`
  margin-top: 15px;
`;
const GridItem = styled.div`
  font-size: 12px;
  padding: 2px 0;
  &:nth-child(1) {
    font-weight: 700;
    font-size: 15px;
    padding-bottom: 2px;
  }
`;
const QuickLink = styled.div`
  font-size: 12px;
  margin-top: 15px;
`;

const SocialContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

const FooterText = styled.span`
  font-size: 12px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const MobileFooter = () => {
  return (
    <React.Fragment>
      <Container>
        <GridContainer>
          <GridItem>Company Info</GridItem>
          <GridItem>About Us</GridItem>
          <GridItem>Terms of Service</GridItem>
          <GridItem>Affiliate Program</GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem>Help</GridItem>
          <GridItem>Contact Us</GridItem>
          <GridItem>Return Policy</GridItem>
          <GridItem>Order Status</GridItem>
        </GridContainer>
        <QuickLink>
          <GridItem>Follow Us</GridItem>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon color="E60023">
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </QuickLink>
      </Container>
      <FooterText>© 2022, LeveL All rights reserved.</FooterText>
    </React.Fragment>
  );
};

export default MobileFooter;
