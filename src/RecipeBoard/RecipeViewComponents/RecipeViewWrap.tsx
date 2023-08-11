import RecipeVideo from "../RecipeViewComponents/RecipeVideo";
import RecipeViewInfo from "../RecipeViewComponents/RecipeViewInfo";
import RequirerIngredient from "../RecipeViewComponents/RequireIngredient";
import RecipeIntro from "../RecipeViewComponents/RecipeIntro";
import RecipeStepCard from "../RecipeViewComponents/RecipeStepCard";
import { styled } from "styled-components";
import theme from "../../common/theme";
import RecipeComment from "../RecipeViewComponents/RecipeComment";
import ContensWrap from "../../common/ContentsWrap";
import { useParams } from "react-router-dom";
import { getData } from "../../axios";
import { RECIPE_DETAIL_URL } from "../../url";
import { useEffect, useState } from "react";
import RecipeMainBanner from "./RecipeMainBanner";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import  {simpleUpdateData} from "../../axios";
import { SAVED_RICIPE_RECIPE_URL } from "../../url";
import { AxiosError } from 'axios';
interface RecipeData {
  category: string;
  cookingStep: string;
  cookingTime: string;
  createAt: string;
  id: string;
  imageUrl: string;
  ingredient: string;
  intro: string;
  modifiedAt: string;
  nickName: string;
  serving: string;
  thumbnailUrl: string;
  title: string;
  userId: number;
  videoUrl: string;
  viewCount: number;
  point: number;
  userProfileUrl: string;
}

export default function RecipeViewWrap() {
  const [step, setStep] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const [recipe, setRecipe] = useState<RecipeData>({
    category: "",
    cookingStep: "",
    cookingTime: "",
    createAt: "",
    id: "",
    imageUrl: "",
    ingredient: "",
    intro: "",
    modifiedAt: "",
    nickName: "",
    serving: "",
    thumbnailUrl: "",
    title: "",
    userId: 0,
    videoUrl: "",
    viewCount: 0,
    point: 0,
    userProfileUrl: "",
  });
  const [isSaved, setIsSaved] = useState(false);
  const { recipeId } = useParams();
  const url = `${RECIPE_DETAIL_URL}/${recipeId}`;
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue;

  useEffect(() => {
    getData(url)
      .then((response) => {
        const responseData = response as RecipeData;
        console.log(response);
        setRecipe(responseData);
        setStep(response.cookingStep.split("\\"));
        setImgArr(response.imageUrl.split("\\"));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [recipe.cookingStep]);

  const onSave=(event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    if(!isSaved){
      setIsSaved(true)
      if(MY_TOKEN){
        simpleUpdateData(`${SAVED_RICIPE_RECIPE_URL}/${recipeId}`,{},MY_TOKEN)
        .then(response=>{
          console.log('성공')
          console.log(response)
        })
        .catch((error:AxiosError)=>{
          if (error) {
            if (error?.response?.status === 404) {
              console.log("이미 저장한 레시피입니다"); //모달창
            }  
          }
        })
      }
    }
    else{
      console.log('이미 저장한 레시피입니다') //모달창
    }
  }
  return (
    <>
      <ContensWrap>
        {/* <RecipeVideo /> */}
        {recipe.videoUrl ? (
          <RecipeVideo video={recipe.videoUrl} />
        ) : (
          <RecipeMainBanner thumb={recipe.thumbnailUrl} />
        )}
        <RecipeViewInfo
          title={recipe.title}
          nickName={recipe.nickName}
          serving={recipe.serving}
          cookingTime={recipe.cookingTime}
          point={recipe.point}
          userProfileUrl={recipe.userProfileUrl}
        />
        <RequirerIngredient ingredient={recipe.ingredient} />
        <RecipeIntro thumbnailUrl={recipe.thumbnailUrl} intro={recipe.intro} />
        <ul>
          {step.length > 0 &&
            step.map((step, index) => (
              <RecipeStepCard key={index} count={index + 1} cookingStep={step} imgArr={imgArr} />
            ))}
        </ul>
        <RecipeSaveBtn onClick={onSave}>레시피 저장</RecipeSaveBtn>
        <RecipeComment recipeId={recipe.id} />
      </ContensWrap>
      ;
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
