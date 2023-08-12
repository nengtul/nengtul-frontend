import Header from "../../common/Header";
import MobileWrap from "../../common/MobileWrap";
import ContensWrap from "../../common/ContentsWrap";
import TabMenu from "../../common/TabMenu";
import RecipeUpdateForm from "./RecipeUpdateForm";

export default function RecipeUpdatePage() {
  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <RecipeUpdateForm />
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}
