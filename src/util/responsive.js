import { css } from "styled-components";

export const small = (props) => {
  return css`
    @media only screen and (max-width: 550px) {
      ${props}
    }
  `;
};
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 990px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 800px) {
      ${props}
    }
  `;
};
