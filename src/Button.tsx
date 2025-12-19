import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  icon?: string;
  iconAriaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, icon, iconAriaLabel, onClick }: ButtonProps) {
  return <Btn
      onClick={onClick}
    >
      { icon ? <><span role="img" aria-label={iconAriaLabel}>{icon}</span>{" "}</> : null }
      <Content className="children">{children}</Content>
    </Btn>
}

const Btn = styled.button`
  background-color: #5B493F;
  color: #fff;
  box-shadow: 0 4px #463831ff;
  border: none;

  display: inline-block;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  padding: 0.75em 1em;
  transition: none;
  margin: 0.25em 0;
  position: relative;

  text-decoration: none;

  &:hover {
    top: 2px;
    box-shadow: 0 2px #795548;
  }

  @media screen and (max-width: 500px) {
    span .children {
      display: none;
    }
  }
`

const Content = styled.span`
  @media screen and (max-width: 500px) {
    display: none;
  }
`

export default Button;