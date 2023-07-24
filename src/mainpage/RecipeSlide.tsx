import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionTitle, TitlePoint, MainPageSection } from "./CommonStyle";
import styled from "styled-components";
import SlideImg from "../assets/mainpage/slide01.png";
import { Link } from "react-router-dom";

const MainSlider = styled.div`
  width: 100%;
  margin: 30px 0px;
  align-items: center;
`;
const SliderP = styled.p`
  font-weight: 800;
  font-size: 15rem;
  padding: 4px 8px;
`;

const MoreButton = styled(Link)`
  width: 190px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16rem;
  color: #fff;
  background-color: #38db83;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 30px;
`;

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  centerMode: true,
};

export default function RecipeSlide() {
  return (
    <MainPageSection>
      <SectionTitle>
        <TitlePoint>냉털의 TODAY</TitlePoint> 인기 레시피
      </SectionTitle>
      <MainSlider>
        <Slider {...sliderSettings}>
          <div>
            <Link to="/recipeview">
              <img src={SlideImg} alt="recipe-slide" />
              <SliderP>비빔국수의 핵심은 양념장!</SliderP>
            </Link>
          </div>
          <div>
            <Link to="/recipeview">
              <img src={SlideImg} alt="recipe-slide" />
              <SliderP>비빔국수의 핵심은 양념장!</SliderP>
            </Link>
          </div>
          <div>
            <Link to="/recipeview">
              <img src={SlideImg} alt="recipe-slide" />
              <SliderP>비빔국수의 핵심은 양념장!</SliderP>
            </Link>
          </div>
        </Slider>
        <MoreButton to={"/recipelist"}>더보기</MoreButton>
      </MainSlider>
    </MainPageSection>
  );
}
