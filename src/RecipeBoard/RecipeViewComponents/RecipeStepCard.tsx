import { styled } from "styled-components";
import theme from "../../common/theme";

interface RecipeStepProps {
  cookingStep: string;
  count: number;
  imgArr: string[];
}

export default function RecipeStepCard({ cookingStep, count, imgArr }: RecipeStepProps) {
  return (
    <CardWrap>
      <h4>STEP {count}</h4>
      <ImgBox style={{ backgroundImage: `url(${imgArr[count - 1]})` }} />
      <p>{cookingStep}</p>
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

const ImgBox = styled.div`
  width: 100%;
  height: 190px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #333;
  background-size: cover;
  background-position: center;
`;
