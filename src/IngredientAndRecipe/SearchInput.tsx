import React, { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onEnter: () => void;
  width?: string;
}

export default function SearchInput({ searchText, setSearchText, onEnter }: SearchInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onEnter();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <InputWrap>
      <input
        type="text"
        placeholder="추가할 재료를 입력해주세요."
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ height: "16rem", color: `${theme.colors.main}` }}
      />
    </InputWrap>
  );
}

const InputWrap = styled.div`
  width: 100%;
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
};
`;
