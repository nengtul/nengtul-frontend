import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import styled from "styled-components";
import theme from "../common/theme";
import SearchInput from "../IngredientAndRecipe/SearchInput";
import SearchList from "../IngredientAndRecipe/SearchList";
import { CategoryBtn } from "./RecipeListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RecipeNumberInput from "./RecipeNumberInpuit";
import Button from "../common/Button";
import RecipeWriteSubmit from "./RecipeWriteSubmit";

export default function RecipeWritePage() {
  const [category, setCategory] = useState("");
  const [categoryView, setCategoryView] = useState(false);

  const selectOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setCategory(value);
    setCategoryView(!categoryView);
  };

  const [searchData, setSearchData] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const removeItem = (index: number) => {
    setSearchData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleEnter = () => {
    setSearchData((prevData) => [...prevData, searchText]);
    setSearchText("");
  };

  const [listNum, setListNum] = useState(1);

  const inputPlus = () => {
    setListNum(listNum + 1);
  };
  const inputMinus = () => {
    if (listNum === 1) return;
    setListNum(listNum - 1);
  };

  return (
    <>
      <MobileWrap>
        <Header />
        <CategoryWrap>
          <form>
            <CategoryBtn>
              <button
                onClick={() => {
                  setCategoryView(!categoryView);
                }}
                type="button"
              >
                {category || "카테고리"}
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
              {categoryView && (
                <ul>
                  <li>
                    <button type="button" onClick={selectOpt} value="한식">
                      한식
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={selectOpt} value="중식">
                      중식
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={selectOpt} value="일식">
                      일식
                    </button>
                  </li>
                </ul>
              )}
            </CategoryBtn>

            <FormInput type="text" placeholder="제목을 입력해주세요." />

            <div className="input-ingredient">
              <p>재료 등록</p>
              <SearchInput
                searchText={searchText}
                setSearchText={setSearchText}
                onEnter={handleEnter}
              />
            </div>
            <SearchList searchData={searchData} removeItem={removeItem} />
            <div className="finishRecipe">
              <p>레시피 설명</p>
              <textarea placeholder="요리에 대한 설명을 입력해주세요."></textarea>
            </div>
            {Array.from({ length: listNum }, (_, index) => (
              <RecipeNumberInput key={index} step={index + 1} />
            ))}
            <CountButtonWrap>
              <Button onClick={inputMinus}>-</Button>
              <p>STEP</p>
              <Button onClick={inputPlus}>+</Button>
            </CountButtonWrap>
            <RecipeWriteSubmit />
          </form>
        </CategoryWrap>
      </MobileWrap>
    </>
  );
}

const CategoryWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 80px 0px;

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
  .finishRecipe {
    margin-top: 20px;
    p {
      font-size: 16rem;
      font-weight: 700;
      color: ${theme.colors.main};
      margin-bottom: 4px;
    }
    textarea {
      width: 100%;
      min-height: 120px;
      padding: 8px;
      border-radius: 5px;
      border: 2px solid ${theme.colors.main};
      margin-top: 10px;

      &:focus {
        outline: none;
        border: 2px solid #00ff75;
      }
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
