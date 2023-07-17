import FoodImg from "../assets/mainpage/img01.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipeLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #dad7d7;
`;

const RecipeInfo = styled.div`
  padding: 20px 14px;
  width: 100%;
`;

const RecipeLink = styled(Link)`
  width: 100%;
  display: flex;
`;

const RecipeTit = styled.p`
  font-size: 15rem;
  color: #5b5b5b;
  font-weight: 800;
`;

const RecipeHeart = styled.p`
  display: flex;
  font-size: 14rem;
  font-weight: 700;
  margin: 8px 0px 10px;
`;

const RecipeWriter = styled.span`
  font-size: 14rem;
  font-weight: 800;
  color: #5b5b5b;
`;

export default function RecipeList() {
  return (
    <>
      <RecipeLi>
        <RecipeLink to={"/"}>
          <img src={FoodImg} alt="food-img" />
          <RecipeInfo>
            <RecipeTit>백종원 사장님의 필살 오므라이스!!</RecipeTit>
            <RecipeHeart>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ height: "16rem", color: "red" }}
              />
              230
            </RecipeHeart>
            <RecipeWriter>박진완</RecipeWriter>
          </RecipeInfo>
        </RecipeLink>
      </RecipeLi>
    </>
  );
}
