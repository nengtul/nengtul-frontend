import styled from "styled-components";
import { IngredientsProps } from "./IngreAfterRecipePage";
import SearchList from "./SearchList";
import theme from "../common/theme";

function ChoosedListSection({ ingredients }: IngredientsProps) {
  return (
    <GreenArea>
      <MainArea>
        <Text>
          선택하신 재료로
          <br />
          요리 가능한 레시피 입니다!
        </Text>
        {ingredients && <SearchList ingredient={ingredients.split(",")} />}
      </MainArea>
    </GreenArea>
  );
}

const GreenArea = styled.div`
  background-color: ${theme.colors.main};
  width: 100%;
  height: auto;
`;
const MainArea = styled.div`
  padding: 20rem 0;
  .search-list {
    width: 80%;
    margin: 0 auto;
    max-height: 130px;
    background-color: #fff;
    margin-top: 10px;
    li {
      font-size: 14rem;
      font-weight: 800;
    }
    svg {
      display: none;
    }
  }
`;
const Text = styled.h2`
  margin: 0 auto;
  color: #fff;
  font-size: 22rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.3;
`;

export default ChoosedListSection;
