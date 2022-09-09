import { css } from "styled-components";

export const small = (props) => {
  return css`
    @media only screen and (max-width: 450px) {
      ${props}
    }
  `;
};
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 790px) {
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
