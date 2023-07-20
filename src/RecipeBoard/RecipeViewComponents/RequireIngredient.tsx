import { styled } from "styled-components";
import SearchList from "../../IngredientAndRecipe/SearchList";

export default function RequirerIngredient() {
  return (
    <IngredientWrap>
      <h4>필요한 재료</h4>
      <SearchList searchData={["참치액", "참기름", "들기름"]}></SearchList>
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
