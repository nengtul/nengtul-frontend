import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionTitle, TitlePoint, MainPageSection } from "./CommonStyle";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../axios";
import { RECIPE_URL } from "../url";

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  centerMode: true,
};
interface SlideProps {
  recipeId: string;
  thumbnailUrl: string;
  title: string;
}

export default function RecipeSlide() {
  const [hotRecipe, setHotRecipe] = useState<SlideProps[]>([]);
  const url = RECIPE_URL;

  useEffect(() => {
    getData(url)
      .then((response) => {
        if (response) {
          const slideData = response.content as SlideProps[];
          setHotRecipe(slideData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <MainPageSection>
      <SectionTitle>
        <TitlePoint>냉털의 TODAY</TitlePoint> 인기 레시피
      </SectionTitle>
      <MainSlider>
        <Slider {...sliderSettings}>
          {hotRecipe?.map((item, index) => (
            <div key={index}>
              <Link className="slide-wrap" to={`/${item.recipeId}`}>
                <img src={item.thumbnailUrl} alt="recipe-img" />
                <SliderP>{item.title}</SliderP>
              </Link>
            </div>
          ))}
        </Slider>
        <MoreButton to={"/recipelist"}>더보기</MoreButton>
      </MainSlider>
    </MainPageSection>
  );
}

const MainSlider = styled.div`
  a.slide-wrap {
    width: 100%;
    display: block;
    padding: 0px 4px;
  }
  width: 100%;
  align-items: center;
  margin-top: 20px;
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const SliderP = styled.p`
  font-weight: 800;
  font-size: 16rem;
  padding: 0px 8px;
  margin-top: 4px;
  line-height: 1.3;
  max-height: 2.6;
  overflow: hidden;
  text-overflow: elipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MoreButton = styled(Link)`
  width: 170px;
  height: 41px;
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
  margin-top: 20px;
`;
