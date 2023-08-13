import styled from "styled-components";
import theme from "./theme";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoRecipe from "./NoRecipe";

interface RecipeData {
  category: string;
  cookingStep: string;
  cookingTime: string;
  createAt: string;
  id: string;
  imageUrl: string;
  ingredient: string;
  intro: string;
  modifiedAt: string;
  nickName: string;
  serving: string;
  thumbnailUrl: string;
  title: string;
  userId: number;
  videoUrl: string;
  viewCount: number;
  point: number;
  userProfileUrl: string;
  likes: boolean;
}

export default function HeaderLatest() {
  const [recipe, setRecipe] = useState<RecipeData[]>([]);

  useEffect(() => {
    const latestRecipe = sessionStorage.getItem("savedRecipes");
    if (latestRecipe) {
      const parsedLatestRecipe = JSON.parse(latestRecipe) as RecipeData[];
      setRecipe(parsedLatestRecipe);
    }
  }, []);

  return (
    <>
      <LatestWrap>
        <p>최근 본 레시피</p>

        {recipe.length > 0 ? (
          <ul>
            {recipe.map((item, index) => (
              <li key={index} style={{ backgroundImage: `url(${item.thumbnailUrl})` }}>
                <Link to={`/${item.id}`}></Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-recipe">
            <Link to={"/recipelist"}>레시피 보러가기</Link>
          </div>
        )}
      </LatestWrap>
    </>
  );
}

const LatestWrap = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f6f6f6;

  p {
    font-size: 15rem;
    font-weight: 800;
  }
  .no-recipe a {
    font-size: 16rem;
    font-weight: 700;
    color: #fff;
    background-color: ${theme.colors.main};
    padding: 10px;
    display: inline-block;
    margin-top: 20px;
    border-radius: 10px;
  }

  ul {
    display: flex;
    margin-top: 10px;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 6px;
      cursor: grab;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.main};
      border-radius: 10px;
      width: 2px;
    }

    li {
      width: 100px;
      height: 100px;
      background-color: #333;
      flex-shrink: 0;
      font-size: 20rem;
      color: #fff;
      background-size: cover;
      background-position: center;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    li:not(:nth-of-type(1)) {
      margin-left: 10px;
    }
  }
`;
