import { styled } from "styled-components";
import theme from "../../common/theme";

interface RecipeIntroProps {
  thumbnailUrl: string;
  intro: string;
}

export default function RecipeIntro({ thumbnailUrl, intro }: RecipeIntroProps) {
  return (
    <Intro>
      <h4>레시피 설명</h4>
      <ImgBox style={{ backgroundImage: `url(${thumbnailUrl})` }} />
      <p>{intro}</p>
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

const ImgBox = styled.div`
  width: 100%;
  height: 190px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #333;
  background-size: cover;
`;
