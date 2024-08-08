import React from "react";
import style from "./LoginCard.module.css";
interface Challenge {
  id: number;
  name: string;
  desc: string;
}

interface LoginCard {
  data: Challenge;
}

const LoginCard: React.FC<LoginCard> = ({ data }) => {
  return (
    <div className={style.container}>
      <span>{data.name}</span>
      <p>{data.desc}</p>
    </div>
  );
};
export default LoginCard;
