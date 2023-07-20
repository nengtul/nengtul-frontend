import { styled } from "styled-components";
import ImgBox from "./ImgBox";
import theme from "../../common/theme";

export default function RecipeStepCard() {
  return (
    <CardWrap>
      <h4>STEP 01.</h4>
      <ImgBox />
      <p>주재료 둥근 호박 1개와 양파 1/2개를 준비합니다.</p>
    </CardWrap>
  );
}

const CardWrap = styled.li`
  width: 92%;
  margin: 0 auto;
  margin-top: 30px;

  h4 {
    font-size: 16rem;
    font-weight: 800;
  }
  p {
    font-size: 15rem;
    word-break: keep-all;
    line-height: 1.3;
    margin-top: 10px;
    padding: 14px 10px;
    border: 2px solid ${theme.colors.main};
    border-radius: 10px;
  }
`;
