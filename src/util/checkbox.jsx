import React, { useState } from "react";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.div`
  display: ${(props) => props.display};
`;
const Link = styled.span`
  font-size: 2rem;
  text-decoration: none;
  color: black;
  opacity: 80%;
  cursor: pointer;
`;

const CheckBox = (props) => {
  const [check, setCheck] = useState("none");
  const [uncheck, setUncheck] = useState("block");

  function handleClick() {
    if (check === "none") {
      setCheck("block");
      setUncheck("none");
    }
    if (check === "block") {
      setCheck("none");
      setUncheck("block");
    }
  }

  if (check === "block" && props.filterStatus.length === 0) {
    setCheck("none");
    setUncheck("block");
  }

  return (
    <Container
      onClick={() => {
        props.onClick(props.item);
        handleClick();
      }}
    >
      <Icon display={uncheck}>
        <CheckBoxOutlineBlankIcon />
      </Icon>
      <Icon display={check}>
        <CheckBoxIcon />
      </Icon>
      <Link>{props.item}</Link>
    </Container>
  );
};

export default CheckBox;
