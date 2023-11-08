import { RecipeData } from "../RecipeBoard/RecipeViewComponents/RecipeViewWrap";
import ThumbDummy01 from "../assets/recipe/dummy1.jpg";
import ThumbDummy02 from "../assets/recipe/dummy2.jpg";
import ThumbDummy03 from "../assets/recipe/dummy3.jpg";

interface SlideProps {
  recipeId: string;
  thumbnailUrl: string;
  title: string;
}

export const dummyData: SlideProps[] = [
  {
    recipeId: "1",
    thumbnailUrl: ThumbDummy01,
    title: "(더미) 전참시 유병재가 만든 찜닭! 꽈리고추닭볶음",
  },
  {
    recipeId: "2",
    thumbnailUrl: ThumbDummy02,
    title: "(더미) 도시락에 빠질 수 없는 ✿유부초밥✿ 레시피 모음",
  },
  {
    recipeId: "3",
    thumbnailUrl: ThumbDummy03,
    title: "(더미) WoW!! 모두에게 박수받을 10가지 캠핑요리✨",
  },
];

export const DummyRecipeData: RecipeData = {
  category: "SIDE_DISH",
  cookingStep:
    "대파는 송송 썬다. \\ 팬에 기름을 두르고 닭을 굽듯이 볶는다. \\ 물, 다진마늘을 넣고 국물이 자작할 때까지 졸인다.",
  cookingTime: "30분 이내",
  createAt: "2023-11-08",
  id: "1",
  imageUrl: `${ThumbDummy01} \\ ${ThumbDummy02} \\ ${ThumbDummy03}`,
  ingredient: "닭, 꽈리고추, 대파, 간장, 설탕, 물, 다진마늘, 후추, 통깨, 식용유",
  intro:
    "맛남의 광장 백종원 선생님의 레시피를유병재 스타일로 간단하게 만든 닭볶음탕! 닭볶음탕보다 만들기도 쉽고, 단짠단짠 양념도 잘 배어있어서 밥반찬으로도 너무 좋아요 :)",
  modifiedAt: "",
  nickName: "관리자",
  serving: "3인분",
  thumbnailUrl: ThumbDummy01,
  title: "(더미) 전참시 유병재가 만든 찜닭! 꽈리고추닭볶음",
  userId: 0,
  videoUrl: "",
  viewCount: 10,
  point: 0,
  userProfileUrl: "",
  likes: false,
  favorite: false,
};
