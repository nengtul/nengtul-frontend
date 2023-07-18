import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import EggIcon from "../assets/icon/EggIcon_png.png";
import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

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

  return (
    <>
      <MobileWrap>
        <Header />
        <div
          className="SearchWrap"
          style={{ paddingTop: "40px", height: "100%" }}
        >
          <SearchWrap>
            <img src={EggIcon} alt="logo" />
            <SearchInput>
              <input
                type="text"
                placeholder="추가할 재료를 입력해주세요."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchData((prevData) => [...prevData, searchText]);
                    setSearchText("");
                  }
                }}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ height: "16rem", color: `${theme.colors.main}` }}
              />
            </SearchInput>
            <SearchList>
              <ul>
                {searchData.map((item, index) => (
                  <li key={index}>
                    {item}
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ height: "20rem" }}
                      onClick={() => removeItem(index)}
                    />
                  </li>
                ))}
              </ul>
            </SearchList>
            <SearchButton type="button">레시피 조회</SearchButton>
          </SearchWrap>
        </div>
      </MobileWrap>
    </>
  );
}

const SearchWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SearchInput = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    font-size: 15rem;
    border: 2px solid ${theme.colors.main};
    &:focus {
      outline: none;
      border: 2px solid #00ff75;
      box-shadow: inset 0px 0px 3px 1px #44e71f;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`;

const SearchList = styled.div`
  width: 90%;
  background-color: #ededed;
  border-radius: 10px;
  margin-top: 40px;
  padding: 10px;
  height: 245px;

  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  li {
    font-size: 14rem;
    color: ${theme.colors.main};
    padding: 8px 22px;
    border: 2px solid ${theme.colors.main};
    border-radius: 10px;
    margin: 10px 4px;
    font-weight: bold;
    position: relative;

    svg {
      color: red;
      position: absolute;
      top: -10px;
      left: -5px;
      cursor: pointer;
    }
  }
`;

const SearchButton = styled.button`
  width: 90%;
  background-color: ${theme.colors.main};
  font-size: 20rem;
  font-weight: bold;
  color: #fff;
  padding: 13px 0px;
  margin-top: 40px;
  border-radius: 5px;
  cursor: pointer;
`;
