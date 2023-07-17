import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import { Shadow } from "./CommonStyle";
import MainBanner from "./MainBanner";
import MyRecipe from "./MyRecipe";
import RecipeSlide from "./RecipeSlide";
import ServiceSection from "./ServiceSection";

export default function MainPage() {
  return (
    <MobileWrap>
      <Header />
      <MainBanner />
      <RecipeSlide />
      <Shadow />
      <ServiceSection />
      <Shadow />
      <MyRecipe />
    </MobileWrap>
  );
}
