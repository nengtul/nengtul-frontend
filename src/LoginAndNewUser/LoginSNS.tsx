import KakaoIcon from "../assets/icon/kakaotalk.svg";
import GoogleIcon from "../assets/icon/google.svg";
import NaverIcon from "../assets/icon/naver.svg";

import styled from "styled-components";

export default function LoginSNS() {
  return (
    <>
      <SNSButtonArea>
        <SNSButton id="kakao">
          <img src={KakaoIcon} alt="EggIcon" />
        </SNSButton>
        <SNSButton id="Google">
          <img src={GoogleIcon} alt="EggIcon" />
        </SNSButton>
        <SNSButton id="Naver">
          <img src={NaverIcon} alt="EggIcon" />
        </SNSButton>
      </SNSButtonArea>
    </>
  );
}

const SNSButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 20rem 0;
`;
const SNSButton = styled.button`
  width: 62rem;
  height: 62rem;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  background-color: #fff;
  margin: 0px 10rem;

  img {
    width: 28rem;
  }
`;
