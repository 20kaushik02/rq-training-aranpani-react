import React, { FC, ReactElement } from "react";
import "./card.scss";

interface CardProps {
  render?: () => ReactElement;
}

const Card: FC<CardProps> = (props) => {
  const { render, children } = props;

  return <div className="card">{render ? render() : children}</div>;
};

export default Card;
