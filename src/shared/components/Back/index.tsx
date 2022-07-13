import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./back.scss";

interface BackProps {
  name: string;
}

const Back: FC<BackProps> = (props) => {
  const navigate = useNavigate();

  const { name } = props;

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <div className="back" onClick={handleGoBack}>
      <i className="icon-back" />
      <span>{name}</span>
    </div>
  );
};

export default Back;
