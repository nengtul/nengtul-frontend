import styled from "styled-components";
import theme from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import defaultThumb from "../assets/common/defaultThumb.svg";
import LevelBadge from "./LevelBadge";
import LogoutBtn from "./LogoutBtn";

interface UserDataProps {
  name: string;
  point: number;
  profileImageUrl: string;
}

interface UserData {
  data: UserDataProps;
  setLogOut: () => void;
}

export default function HeaderInfo({ data, setLogOut }: UserData) {
  return (
    <>
      <HeaderLoginInfo>
        {data.name ? (
          <>
            <LogoutBtn setLogOut={setLogOut} />
            <MemberThumb
              style={{ backgroundImage: `url(${data.profileImageUrl || defaultThumb})` }}
            />
            <MemberName>
              {data.name} <span>님</span>
            </MemberName>
            <LevelBadge>{data.point}</LevelBadge>
          </>
        ) : (
          <Link to={"/login"} className="login-form">
            <div className="default-img" style={{ backgroundImage: `url(${defaultThumb})` }}></div>
            <h4>로그인을 해주세요.</h4>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        )}
      </HeaderLoginInfo>
    </>
  );
}

const HeaderLoginInfo = styled.div`
  width: 100%;
  padding: 20px 10px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25) inset;
  position: relative;
  .login-form {
    width: 100%;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      width: 60px;
      font-size: 30rem;
      color: ${theme.colors.main};
    }
  }
  .default-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-size: cover;
  }
  h4 {
    font-size: 18rem;
    color: #8d8d8d;
  }
`;

const MemberThumb = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-size: cover;
`;

const MemberName = styled.p`
  font-size: 20rem;
  font-weight: 800;
  text-align: center;
  margin: 10px 0px 5px;
  span {
    font-size: 14rem;
  }
`;
