import RecipeVideo from "../RecipeViewComponents/RecipeVideo";
import RecipeViewInfo from "../RecipeViewComponents/RecipeViewInfo";
import RequirerIngredient from "../RecipeViewComponents/RequireIngredient";
import RecipeIntro from "../RecipeViewComponents/RecipeIntro";
import RecipeStepCard from "../RecipeViewComponents/RecipeStepCard";
import { styled } from "styled-components";
import theme from "../../common/theme";
import RecipeComment from "../RecipeViewComponents/RecipeComment";
import ContensWrap from "../../common/ContentsWrap";
import { useParams, useNavigate } from "react-router-dom";
import { deleteData, getData, getTokenData } from "../../axios";
import { LIKES_RECIPE_URL, RECIPE_DETAIL_URL, RECIPE_URL } from "../../url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import RecipeMainBanner from "./RecipeMainBanner";
import UpdateDeleteBtn from "./UpdateDeleteBtn";
import ComfirmModal from "../../Modal/ConfirmModal";
import { simpleUpdateData } from "../../axios";
import { SAVED_RICIPE_RECIPE_URL, FAV_PUB_URL } from "../../url";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import OkModal from "../../Modal/OkModal";
import { DummyRecipeData } from "../../mainpage/DummyData";

export interface RecipeData {
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
  likes: boolean;
  favorite: boolean;
}

export default function RecipeViewWrap() {
  const navigate = useNavigate();
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;

  const ROLES = sessionStorage.getItem("roles");
  const USER_ID = Number(sessionStorage.getItem("userId"));

  const [step, setStep] = useState<string[]>([]);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [okModalText, setOkModalText] = useState("");
  const [okModalOpen, setokModalOpen] = useState(false);
  const [likes, setLikes] = useState(false);

  const [favorite, setFavorite] = useState(false);

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
    likes: false,

    favorite: false,
  });
  const [isSaved, setIsSaved] = useState(false);
  const { recipeId } = useParams();
  const url = `${RECIPE_DETAIL_URL}/${recipeId}`;
  const deleteUrl = `${RECIPE_URL}/${recipe.id}`;
  const likeUrl = `${LIKES_RECIPE_URL}/${recipe.id}`;

  const dispatch = useDispatch();

  const favoriteUrl = `${FAV_PUB_URL}/${recipe.userId}`;
  useEffect(() => {
    if (MY_TOKEN && REFRESH_TOKEN) {
      getTokenData(url, MY_TOKEN, dispatch, REFRESH_TOKEN)
        .then((response) => {
          const responseData = response as RecipeData;
          setRecipe(responseData);
          setStep(responseData.cookingStep.split("\\"));
          setImgArr(responseData.imageUrl.split("\\"));
          setLikes(recipe.likes);
          setFavorite(recipe.favorite);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      getData(url)
        .then((response) => {
          const responseData = response as RecipeData;
          setRecipe(responseData);
          setStep(responseData.cookingStep.split("\\"));
          setImgArr(responseData.imageUrl.split("\\"));
          setLikes(recipe.likes);
          setFavorite(recipe.favorite);
        })
        .catch((err) => {
          const responseData = DummyRecipeData as RecipeData;
          setRecipe(responseData);
          setStep(responseData.cookingStep.split("\\"));
          setImgArr(responseData.imageUrl.split("\\"));
          setLikes(recipe.likes);
          setFavorite(recipe.favorite);
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (recipe.id && recipe.title) {
      const savedRecipes: RecipeData[] = JSON.parse(
        sessionStorage.getItem("savedRecipes") || "[]"
      ) as RecipeData[];
      if (savedRecipes.length >= 10) {
        savedRecipes.shift();
      }
      const exists = savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id);
      if (!exists) {
        const updatedSavedRecipes = [...savedRecipes, recipe];
        sessionStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
      }
    }
  }, [recipe]);

  const handleDelete = () => {
    deleteData(deleteUrl, MY_TOKEN as string)
      .then((data) => {
        console.log(data);
        setModalOpen(false);
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = () => {
    console.log(recipe);
    navigate(`/update/${recipe.id}`, { state: { recipeData: recipe } });
  };

  const hanldeLikes = () => {
    if (MY_TOKEN) {
      simpleUpdateData(likeUrl, {}, MY_TOKEN)
        .then((response) => {
          console.log("좋아요", response);
          setOkModalText("좋아하는 레시피에 추가했습니다.");
          setokModalOpen(true);
          setLikes(true);
        })
        .catch((err) => {
          console.error(err);
          setOkModalText("이미 좋아하는 레시피입니다.");
          setokModalOpen(true);
        });
    } else {
      setOkModalText("로그인이 필요한 서비스입니다.");
      setokModalOpen(true);
    }
  };
  const handleFavorites = () => {
    if (MY_TOKEN) {
      simpleUpdateData(favoriteUrl, {}, MY_TOKEN)
        .then((response) => {
          console.log(response);
          setOkModalText("즐겨찾기에 추가했습니다.");
          setokModalOpen(true);
          setFavorite(true);
        })
        .catch((err) => {
          console.error(err);
          setOkModalText("이미 즐겨찾기한 레시피입니다.");
          setokModalOpen(true);
        });
    } else {
      setOkModalText("로그인이 필요한 서비스입니다.");
      setokModalOpen(true);
    }
  };
  const onSave = () => {
    if (!isSaved) {
      setIsSaved(true);
      if (MY_TOKEN) {
        simpleUpdateData(`${SAVED_RICIPE_RECIPE_URL}/${recipeId}`, {}, MY_TOKEN)
          .then((response) => {
            console.log("성공");
            console.log(response);
            setOkModalText("레시피를 저장했습니다.");
            setokModalOpen(true);
          })
          .catch((error: AxiosError) => {
            if (error) {
              if (error?.response?.status === 404) {
                setOkModalText("이미 저장한 레시피입니다.");
                setokModalOpen(true);
              }
            }
          });
      } else {
        setOkModalText("로그인이 필요한 서비스입니다.");
        setokModalOpen(true);
      }
    } else {
      setOkModalText("이미 저장한 레시피입니다.");
      setokModalOpen(true);
    }
  };
  return (
    <>
      {modalOpen && (
        <ComfirmModal
          closeModal={closeModal}
          handleDelete={handleDelete}
          message={"정말 삭제하시겠습니까?"}
        />
      )}
      {okModalOpen && (
        <OkModal setokModalOpen={setokModalOpen} title={"레시피"} okModalText={okModalText} />
      )}
      <ContensWrap>
        {recipe.videoUrl ? (
          <RecipeVideo video={recipe.videoUrl} />
        ) : (
          <RecipeMainBanner thumb={recipe.thumbnailUrl} />
        )}
        {(ROLES === "ADMIN" || USER_ID === recipe.userId) && (
          <div
            className="button-wrap"
            style={{
              width: "92%",
              margin: "0 auto",
              marginBottom: "-16px",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <UpdateDeleteBtn handleUpdate={handleUpdate} handleModal={handleModal} />
          </div>
        )}
        <RecipeViewInfo
          title={recipe.title}
          nickName={recipe.nickName}
          serving={recipe.serving}
          cookingTime={recipe.cookingTime}
          point={recipe.point}
          userProfileUrl={recipe.userProfileUrl}
          handleLikes={hanldeLikes}
          likes={likes}
          favorite={favorite}
          handleFavorites={handleFavorites}
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
        <RecipeComment />
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
