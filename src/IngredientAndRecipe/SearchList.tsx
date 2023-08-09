import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

interface SearchListProps {
  ingredient: string[];
  removeItem?: (index: number) => void;
}

export default function SearchList({
  ingredient,
  removeItem = () => {
    return;
  },
}: SearchListProps) {
  return (
    <SearchListWrap>
      <ul>
        {ingredient.map((item, index) => (
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
    </SearchListWrap>
  );
}

const SearchListWrap = styled.div`
  width: 100%;
  background-color: #ededed;
  border-radius: 10px;
  margin-top: 40px;
  padding: 10px;
  height: 245px;
  overflow-y:auto;
	&::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.main};
    border-radius: 10px;
    width: 2px;
  }
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  li {
    font-size: 13rem;
    color: ${theme.colors.main};
    padding: 8px 18px;
    border: 2px solid ${theme.colors.main};
    border-radius: 10px;
    margin: 4px 4px;
    font-weight: bold;
		background-color:#fff;
    position: relative;

    svg {
      color: red;
      position: absolute;
      top: -10px;
      left: -5px;
      cursor: pointer;
    }
  }
};
`;
