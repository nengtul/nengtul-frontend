import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import RecipeVideo from "./RecipeViewComponents/RecipeVideo";
import RecipeViewInfo from "./RecipeViewComponents/RecipeViewInfo";
import RequirerIngredient from "./RecipeViewComponents/RequireIngredient";
import RecipeIntro from "./RecipeViewComponents/RecipeIntro";
import RecipeStepCard from "./RecipeViewComponents/RecipeStepCard";
import { styled } from "styled-components";
import theme from "../common/theme";
import RecipeComment from "./RecipeViewComponents/RecipeComment";
import CommentInput from "./RecipeViewComponents/CommentInput";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";

export default function RecipeView() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <RecipeVideo />
          <RecipeViewInfo />
          <RequirerIngredient />
          <RecipeIntro />
          <ul>
            <RecipeStepCard />
            <RecipeStepCard />
            <RecipeStepCard />
            <RecipeStepCard />
            <RecipeStepCard />
          </ul>
          <RecipeSaveBtn>레시피 저장</RecipeSaveBtn>
          <RecipeComment />
          <CommentInput />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}

const RecipeSaveBtn = styled.button`
  background-color: ${theme.colors.main};
  width: 92%;
  margin: 0 auto;
  margin-top: 40px;
  display: block;
  padding: 12px 0px;
  font-size: 16rem;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  border-radius: 5px;
`;
