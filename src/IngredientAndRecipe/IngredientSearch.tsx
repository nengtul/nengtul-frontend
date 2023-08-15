import { useState } from "react";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import EggIcon from "../assets/icon/EggIcon_png.png";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import styled from "styled-components";
import theme from "../common/theme";
import { Link } from "react-router-dom";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";

export default function IngredientSearch() {
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

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

  return (
    <>
      <MobileWrap>
        <Header />
        <ContensWrap>
          <SearchWrap>
            <img src={EggIcon} alt="logo" />
            <div className="searchWrap">
              <SearchInput
                searchText={searchText}
                setSearchText={setSearchText}
                onEnter={handleEnter}
              />
              <SearchList ingredient={ingredient} removeItem={removeItem} />
            </div>
            {ingredient.length > 0 ? (
              <SearchButton to={`/ingredientRecipe?ingredients=${ingredient.join(",")}`}>
                레시피 조회
              </SearchButton>
            ) : (
              <div className="no-ingredient">하나 이상의 재료를 입력해주세요.</div>
            )}
          </SearchWrap>
        </ContensWrap>
        <TabMenu />
      </MobileWrap>
    </>
  );
}

const SearchWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 80px 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .searchWrap {
    width: 90%;
  }
  .no-ingredient {
    width: 90%;
    height: 46px;
    background-color: #7a8d83;
    font-size: 16rem;
    font-weight: 700;
    color: #fff;
    margin-top: 40px;
    border-radius: 5px;
    cursor: not-allowed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchButton = styled(Link)`
  width: 90%;
  background-color: ${theme.colors.main};
  font-size: 20rem;
  font-weight: bold;
  color: #fff;
  padding: 13px 0px;
  margin-top: 40px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;
