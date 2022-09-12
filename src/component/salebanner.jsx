import React, { useState, useEffect } from "react";
import TextTransition from "react-text-transition";
import styled from "styled-components";
import { mobile } from "../util/responsive";

const Background = styled.div`
  background-color: #cc641b;
  color: white;
  font-size: 18px;
  padding: 15px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${mobile({ fontSize: "15px", padding: "12px 0" })}
`;

const Text = styled.span`
  font-weight: bold;
`;

const bannerText = [
  `Become a subscriber and get up to 20% off!`,
  "Free Shipping over $25!",
  "Check out our new seasonal line!",
];

const SaleBanner = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      count < 2 ? setCount((count) => count + 1) : setCount(0);
    }, 5000);

    return () => clearInterval(timerId);
  }, [count]);

  return (
    <Background>
      <Text>
        <TextTransition direction="down">{bannerText[count]}</TextTransition>
      </Text>
    </Background>
  );
};

export default SaleBanner;
