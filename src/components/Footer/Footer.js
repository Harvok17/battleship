import React from "react";
import { FooterWrapper } from "../styled-components/appComponentStyles";
import { ReactComponent as Logo } from "../../assets/github.svg";

const Footer = () => {
  return (
    <FooterWrapper>
      <a
        href="https://github.com/Harvok17"
        target="_blank"
        rel="noreferrer"
        className="logo-container"
      >
        <Logo />
      </a>
      <span>Made by Harvok17</span>
    </FooterWrapper>
  );
};

export default Footer;
