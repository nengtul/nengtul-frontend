import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import RecipeWriteForm from "./RecipeWriteForm";

export default function RecipeWritePage() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <RecipeWriteForm />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
