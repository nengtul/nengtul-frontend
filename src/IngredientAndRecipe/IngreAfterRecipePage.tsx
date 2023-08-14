import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ChoosedListSection from "./ChoosedListSection";
import RecipeSection from "./RecipeSection";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { useLocation } from "react-router-dom";

export interface IngredientsProps {
  ingredients: string | null;
}

function IngreAfterRecipePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ingredients = searchParams.get("ingredients");
  return (
    <MobileWrap>
      <Wrap>
        <Header />
        <ContensWrap>
          <ChoosedListSection ingredients={ingredients} />
          <RecipeSection ingredients={ingredients} />
        </ContensWrap>
        <TabMenu />
      </Wrap>
    </MobileWrap>
  );
}

const Wrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default IngreAfterRecipePage;
