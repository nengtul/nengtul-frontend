import styled from "styled-components";
import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import ChoosedListSection from "./ChoosedListSection";
import RecipeSection from "./RecipeSection";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";

function IngreAfterRecipePage() {
  return (
    <MobileWrap>
      <Wrap>
        <Header />
        <ContensWrap>
          <ChoosedListSection />
          <RecipeSection />
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
