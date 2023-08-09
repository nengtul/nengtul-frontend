import { styled } from "styled-components";
import SearchList from "../../IngredientAndRecipe/SearchList";

interface ingredientInterface {
  ingredient: string;
}

export default function RequirerIngredient({ ingredient }: ingredientInterface) {
  const list = ingredient.split(",");

  return (
    <IngredientWrap>
      <h4>필요한 재료</h4>
      <SearchList ingredient={list}></SearchList>
    </IngredientWrap>
  );
}

const IngredientWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 20px 0px;
  h4 {
    font-size: 16rem;
    font-weight: 700;
  }
  & > div {
    height: 180px;
    margin-top: 14px;
    svg {
      display: none;
    }
  }
`;
