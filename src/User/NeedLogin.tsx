import { styled } from "styled-components";
import EggPart from "../LoginAndNewUser/EggPart";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function NeedLogin() {
  return (
    <NeedWrap>
      <EggPart />
      <h2>로그인이 필요한 서비스입니다. </h2>
      <Link to={"/login"}>
        로그인 하러 가기 <FontAwesomeIcon icon={faAngleRight} />
      </Link>
    </NeedWrap>
  );
}

const NeedWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #38db83;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .egg-img {
    padding-top: 0;
  }
  h2 {
    font-size: 20rem;
    font-weight: 800;
    color: #fff;
  }
  a {
    font-size: 16rem;
    font-weight: 800;
    color: #fff;
    background-color: #29c470;
    border: 3px solid #fff;
    padding: 16px 26px;
    border-radius: 15px;
    margin-top: 20px;
  }
`;
