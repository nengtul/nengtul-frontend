import styled from "styled-components";
import theme from "../common/theme";
import SearchInput from "../IngredientAndRecipe/SearchInput";
import SearchList from "../IngredientAndRecipe/SearchList";
import { useEffect, useState } from "react";
import RecipeNumberInput from "./RecipeNumberInpuit";
import Button from "../common/Button";
import RecipeWriteSubmit from "./RecipeWriteSubmit";
import RecipeWriteCategory from "./RecipeWriteCategory";
import RecipeWriteIntro from "./RecipeWriteIntro";
import { RECIPE_URL } from "../url";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { updateData } from "../axios";
import OkModal from "../Modal/OkModal";
import { useNavigate } from "react-router-dom";

export default function RecipeWriteForm() {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryView, setCategoryView] = useState(false);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [cookingStep, setCookingSteps] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("");
  const [serving, setServing] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [listNum, setListNum] = useState(1);
  const [thumb, setThumb] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [okModalOpen, setOkModalOpen] = useState(false);

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const navigate = useNavigate();

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
    };
    const json = JSON.stringify(recipeAddDto);
    const blob = new Blob([json], { type: "application/json" });

    formData.append("recipeAddDto", blob);

    if (thumb !== null) {
      formData.append("thumbnail", thumb, thumb.name);
    }

    images.forEach((imageFile) => {
      formData.append(`images`, imageFile, imageFile.name);
    });
    if (MY_TOKEN !== null) {
      updateData(RECIPE_URL, formData, MY_TOKEN)
        .then((res) => {
          console.log(res);
          setOkModalOpen(true);
          navigate(`/${res}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

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
  return (
    <>
      {okModalOpen && (
        <OkModal
          title={"레시피 작성"}
          okModalText={"작성을 완료했습니다."}
          setokModalOpen={setOkModalOpen}
        />
      )}
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
                required
                onChange={(e) => {
                  setServing(e.target.value);
                }}
              />
            </div>
          </div>
          <RecipeWriteIntro setIntro={setIntro} setThumb={setThumb} />
          {Array.from({ length: listNum }, (_, index) => (
            <RecipeNumberInput
              key={index}
              step={index + 1}
              handleImgChange={handleImgChange}
              handleTextChange={handleTextChange}
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
