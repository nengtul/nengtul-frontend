import { styled } from "styled-components";
import theme from "../common/theme";

export default function GreenBanner() {
  return (
    <Banner>
      <p>회원님이 찜한 레시피입니다.</p>
    </Banner>
  );
}

const Banner = styled.div`
  width: 100%;
  background-color: ${theme.colors.main};
  padding: 20px;
  position: fixed;
  top: auto;
  left: auto;
  width: 390px;

  p {
    color: #fff;
    font-size: 20rem;
    font-weight: 800;
    text-align: center;
  }
`;
