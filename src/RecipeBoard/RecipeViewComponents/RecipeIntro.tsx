import { styled } from "styled-components";
import theme from "../../common/theme";
import ImgBox from "./ImgBox";

export default function RecipeIntro() {
  return (
    <Intro>
      <h4>레시피 설명</h4>
      <ImgBox />
      <p>
        요즘 장마 철에는 비가 많이 오고 있습니다. 비 내리는 날에는 전 요리가
        생각이 나지요. 반찬 만들다가 남은 둥근 호박 1개로 2가지 전을 구웠답니다.
        어느 전이 맛있는지 만들어 드셔 보세요.^^
      </p>
    </Intro>
  );
}

const Intro = styled.div`
  width: 92%;
  margin: 0 auto;
  h4 {
    font-size: 16rem;
    font-weight: 700;
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
