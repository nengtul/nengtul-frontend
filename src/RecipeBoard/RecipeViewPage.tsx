import MobileWrap from "../common/MobileWrap";
import Header from "../common/Header";
import TabMenu from "../common/TabMenu";
import RecipeViewWrap from "./RecipeViewComponents/RecipeViewWrap";

export default function RecipeView() {
  return (
    <>
      <MobileWrap>
        <Header />
        <RecipeViewWrap />
        <TabMenu />
      </MobileWrap>
    </>
  );
}
