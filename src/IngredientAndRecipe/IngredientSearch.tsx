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
              <SearchList searchData={searchData} removeItem={removeItem} />
            </div>
            <SearchButton to={"/ingredientRecipe"}>레시피 조회</SearchButton>
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
