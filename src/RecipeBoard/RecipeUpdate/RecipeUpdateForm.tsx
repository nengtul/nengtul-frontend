import styled from "styled-components";
import theme from "../../common/theme";
import SearchInput from "../../IngredientAndRecipe/SearchInput";
import SearchList from "../../IngredientAndRecipe/SearchList";
import { useEffect, useState } from "react";
import RecipeNumberInput from "./RecipeNumberInpuit";
import Button from "../../common/Button";
import RecipeWriteSubmit from "../RecipeWriteSubmit";
import RecipeWriteCategory from "./RecipeWriteCategory";
import RecipeWriteIntro from "./RecipeWriteIntro";
import { RECIPE_URL } from "../../url";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Store/store";
import { putData } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";

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
interface Recipe {
  recipeData: RecipeData;
}

export default function RecipeUpdateForm() {
  const location = useLocation();
  const { recipeData } = location.state as Recipe;
  const navigate = useNavigate();
  const step = recipeData.cookingStep.split("\\");

  const [category, setCategory] = useState(recipeData.category);
  const [categoryName, setCategoryName] = useState(recipeData.category);
  const [categoryView, setCategoryView] = useState(false);
  const [ingredient, setIngredient] = useState<string[]>(recipeData.ingredient.split(","));
  const [searchText, setSearchText] = useState("");
  const [cookingStep, setCookingSteps] = useState<string[]>(recipeData.cookingStep.split("\\"));
  const [cookingTime, setCookingTime] = useState(recipeData.cookingTime);
  const [serving, setServing] = useState(recipeData.serving);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState(recipeData.title);
  const [intro, setIntro] = useState(recipeData.intro);
  const [listNum, setListNum] = useState(step.length);
  const [thumb, setThumb] = useState<File | null>(null);
  const [link, setLink] = useState(recipeData.videoUrl);
  const [changeImage, setChangeImage] = useState<string[]>([]);

  useEffect(() => {
    if (recipeData.category === "밑반찬") setCategory("SIDE_DISH");
    else if (recipeData.category === "메인 반찬") setCategory("MAIN_SIDE_DISH");
    else if (recipeData.category === "국/탕") setCategory("KOREAN_SOUP");
    else if (recipeData.category === "찌개") setCategory("STEW");
    else if (recipeData.category === "디저트") setCategory("DESSERT");
    else if (recipeData.category === "면/만두") setCategory("NOODLES_DUMPLINGS");
    else if (recipeData.category === "밥/죽/떡") setCategory("RICE_PORRIDGE_RICE_CAKE");
    else if (recipeData.category === "퓨전") setCategory("FUSION");
    else if (recipeData.category === "김치/젓갈/장류") setCategory("KIMCHI_SALTED_FISH_SAUCES");
    else if (recipeData.category === "양념/소스/잼") setCategory("SEASONING_SAUCE_JAM");
    else if (recipeData.category === "샐러드") setCategory("SALAD");
    else if (recipeData.category === "스프") setCategory("SOUP");
    else if (recipeData.category === "빵") setCategory("BREAD");
    else if (recipeData.category === "과자") setCategory("SNACKS");
    else if (recipeData.category === "차/음료/술") setCategory("TEA_DRINK");
    else if (recipeData.category === "양식") setCategory("WESTERN_FOOD");
    else if (recipeData.category === "기타") setCategory("ETC");
    else if (recipeData.category === "없음") setCategory("NONE");
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const url = `${RECIPE_URL}/${recipeData.id}`;
  const handleSubmit = () => {
    const formData = new FormData();

    const recipeAddDto = {
      title: title,
      intro: intro,
      ingredient: ingredient.join(","),
      cookingStep: cookingStep.join("\\"),
      cookingTime: cookingTime,
      serving: serving,
      category: category,
      videoUrl: link,
      imagesUrl: changeImage.filter((item) => item !== undefined).join("\\"),
    };
    const json = JSON.stringify(recipeAddDto);
    const blob = new Blob([json], { type: "application/json" });

    formData.append("recipeUpdateDto", blob);

    const emptyFile = new File([], "");

    if (thumb !== null) {
      formData.append("thumbnail", thumb, thumb.name);
    } else {
      formData.append("thumbnail", emptyFile);
    }

    for (let i = 0; i < step.length; i++) {
      if (images[i] instanceof File) {
        formData.append(`images`, images[i], images[i].name);
      } else {
        formData.append(`images`, emptyFile);
      }
    }

    if (MY_TOKEN !== null) {
      putData(url, formData, MY_TOKEN)
        .then((res) => {
          console.log(res);
          navigate(`/${recipeData.id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const selectOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setCategory(value);
    setCategoryName(e.currentTarget.innerText);
    setCategoryView(!categoryView);
  };

  const handleTextChange = (step: number, value: string) => {
    setCookingSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[step - 1] = value;
      return newSteps;
    });
  };

  const handleImgChange = (step: number, img: File) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[step - 1] = img;
      return newImages;
    });
  };

  const removeItem = (index: number) => {
    setIngredient((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleEnter = () => {
    setIngredient((prevData) => [...prevData, searchText]);
    setSearchText("");
  };

  const inputPlus = () => {
    setListNum(listNum + 1);
  };
  const inputMinus = () => {
    if (listNum === 1) return;
    setListNum(listNum - 1);
  };

  useEffect(() => {
    console.log(changeImage);
  }, [changeImage]);

  return (
    <>
      <CategoryWrap>
        <form>
          <RecipeWriteCategory
            selectOpt={selectOpt}
            category={category}
            categoryView={categoryView}
            setCategoryView={setCategoryView}
            categoryName={categoryName}
          />

          <div style={{ marginTop: "20px" }}>
            <p>* 제목</p>
            <FormInput
              type="text"
              placeholder="제목을 입력해주세요."
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="input-ingredient">
            <p>* 재료 등록</p>
            <SearchInput
              searchText={searchText}
              setSearchText={setSearchText}
              onEnter={handleEnter}
            />
          </div>
          <SearchList ingredient={ingredient} removeItem={removeItem} />
          <FormInput
            type="text"
            placeholder="유튜브 동영상이 있다면 링크를 적어주세요!"
            required
            value={link}
            style={{ marginTop: "20px" }}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <div className="recipe-info">
            <div>
              <p>조리시간</p>
              <FormInput
                type="text"
                placeholder="ex) 30분"
                value={cookingTime}
                required
                onChange={(e) => {
                  setCookingTime(e.target.value);
                }}
              />
            </div>
            <div>
              <p>레시피 양</p>
              <FormInput
                type="text"
                placeholder="ex) 2인분"
                value={serving}
                required
                onChange={(e) => {
                  setServing(e.target.value);
                }}
              />
            </div>
          </div>
          <RecipeWriteIntro
            setIntro={setIntro}
            setThumb={setThumb}
            intro={intro}
            thumbnailUrl={recipeData.thumbnailUrl}
          />
          {Array.from({ length: listNum }, (_, index) => (
            <RecipeNumberInput
              key={index}
              step={index + 1}
              handleImgChange={handleImgChange}
              handleTextChange={handleTextChange}
              cookingStep={cookingStep}
              stepImg={recipeData.imageUrl.split("\\")}
              setChangeImage={setChangeImage}
            />
          ))}
          <CountButtonWrap>
            <Button onClick={inputMinus}>-</Button>
            <p>STEP</p>
            <Button onClick={inputPlus}>+</Button>
          </CountButtonWrap>
          <RecipeWriteSubmit handleSubmit={handleSubmit} />
        </form>
      </CategoryWrap>
    </>
  );
}

const CategoryWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 20px 0px;
  p {
    font-size: 16rem;
    font-weight: 700;
    color: ${theme.colors.main};
    margin-bottom: 4px;
  }
  .input-ingredient {
    margin-top: 20px;
    & + div {
      margin-top: 10px;
      height: 140px;
    }
  }

  .recipe-info {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 48%;
    }
    input {
      margin-top: 0px;
    }
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 15rem;
  margin-top: 0px;
  border: 2px solid ${theme.colors.main};
  border-radius: 5px;
  &:focus {
    outline: none;
    border: 2px solid #00ff75;
    box-shadow: inset 0px 0px 3px 1px #44e71f;
  }
`;

const CountButtonWrap = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-top: 30px;
  p {
    font-size: 15rem;
    padding: 0px 10px;
    background-color: #eaffd8;
    font-weight: 800;
    display: flex;
    align-items: center;
  }
`;
