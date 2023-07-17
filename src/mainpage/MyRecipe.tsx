import { MainPageSection, SectionTitle, TitlePoint } from "./CommonStyle";
import styled from "styled-components";
import RecipeList from "./RecipeList";

const TabMenuWrap = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
`;

const TabMenu = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  color: #797979;
  font-size: 15rem;
  font-weight: 800;
  border-radius: 9px;
  border: 2px solid rgba(56, 219, 131, 0);
  background: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.31);
  padding: 8px 16px;
  cursor: pointer;
`;

const SecondTab = styled(Tab)`
  margin-left: 10px;
`;

const ListWrap = styled.ul`
  width: 95%;
  height: 450px;
  border-radius: 15px;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.38);
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  margin-top: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
  }
`;

export default function MyRecipe() {
  return (
    <>
      <MainPageSection>
        <SectionTitle>
          <TitlePoint>박진완님의</TitlePoint> 냉털 레시피
        </SectionTitle>
        <TabMenuWrap>
          <TabMenu>
            <Tab>나의 레시피</Tab>
            <SecondTab>저장 레시피</SecondTab>
          </TabMenu>
        </TabMenuWrap>
        <ListWrap>
          <RecipeList />
          <RecipeList />
          <RecipeList />
          <RecipeList />
          <RecipeList />
          <RecipeList />
          <RecipeList />
        </ListWrap>
      </MainPageSection>
    </>
  );
}
