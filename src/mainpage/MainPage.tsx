import ContensWrap from "../common/ContentsWrap";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import TabMenu from "../common/TabMenu";
import { Shadow } from "./CommonStyle";
import MainBanner from "./MainBanner";
import MyRecipe from "./MyRecipe";
import RecipeSlide from "./RecipeSlide";
import ServiceSection from "./ServiceSection";

export default function MainPage() {
  return (
    <MobileWrap>
      <Header />
      <ContensWrap className="MainWrap" style={{ paddingTop: "58px" }}>
        <MainBanner />
        <RecipeSlide />
        <Shadow />
        <ServiceSection />
        <Shadow />
        <MyRecipe />
      </ContensWrap>
      <TabMenu />
    </MobileWrap>
  );
}
