import Egg from "../assets/icon/EggIcon_png.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import theme from "../common/theme";

interface TitleProps {
  title: string;
}

export default function NoRecipeCategory({ title }: TitleProps) {
  return (
    <NoneRecipe>
        <img src={Egg} alt="logo" />
        <p>아직 {title} 레시피가 없습니다!</p>
        <Link to={"/recipewrite"}>
          이 카테고리에 해당하는 <br/>
          레시피를 등록해봐요! 
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </NoneRecipe>
  );
}

const NoneRecipe = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top:150rem;
  p {
    font-size: 18rem;
    font-weight: 800;
  }
  a {
    font-size: 16rem;
    font-weight: 700;
    color: #fff;
    background-color: ${theme.colors.main};
    padding: 12px 20px;
    margin-top: 20px;
    border-radius: 10px;
    svg {
      margin-left: 10px;
    }
  }
  line-height:1.5;
`;
