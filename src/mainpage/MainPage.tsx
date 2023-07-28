import ContensWrap from "../common/ContentsWrap";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import TabMenu from "../common/TabMenu";
import { Shadow } from "./CommonStyle";
import MainBanner from "./MainBanner";
import MyRecipe from "./MyRecipe";
import RecipeSlide from "./RecipeSlide";
import ServiceSection from "./ServiceSection";
import { useSelector } from "react-redux";
import { RootState } from "../AuthStore/store";

export default function MainPage() {
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  console.log(isLoggedin);
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
