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
import axios from "axios";
import { RECIPE_URL } from "../url";
export default function RecipeWriteForm() {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryView, setCategoryView] = useState(false);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [cookingStep, setCookingSteps] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [listNum, setListNum] = useState(1);
  const [thumb, setThumb] = useState<File | null>(null);
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("recipeAdd[title]", title);
    formData.append("recipeAdd[intro]", intro);
    formData.append("recipeAdd[ingredient]", ingredient.join(","));
    formData.append("recipeAdd[cookingStep]", cookingStep.join("\\"));
    formData.append("recipeAdd[category]", "SIDE_DISH");
    formData.append("recipeAdd[videoUrl]", link);

    if (thumb !== null) {
      formData.append("thumbnail", thumb);
    }

    images.forEach((imageFile, index) => {
      formData.append(`images[${index}]`, imageFile);
    });

    const persistedData = sessionStorage.getItem("persist:root");
    if (persistedData) {
      const parsedData = JSON.parse(persistedData) as {
        accessTokenValue: string;
      };

      const accessTokenValue = parsedData.accessTokenValue.replace(/"/g, "");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessTokenValue}`,
      };

      axios
        .post(RECIPE_URL , formData, {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
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
      <CategoryWrap>
        <form>
          <RecipeWriteCategory
            selectOpt={selectOpt}
            category={category}
            categoryView={categoryView}
            setCategoryView={setCategoryView}
            categoryName={categoryName}
          />

          <FormInput
            type="text"
            placeholder="제목을 입력해주세요."
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div className="input-ingredient">
            <p>재료 등록</p>
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
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
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

  .input-ingredient {
    margin-top: 20px;
    p {
      font-size: 16rem;
      font-weight: 700;
      color: ${theme.colors.main};
      margin-bottom: 4px;
    }
    & + div {
      margin-top: 10px;
      height: 140px;
    }
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 15rem;
  margin-top: 20px;
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
