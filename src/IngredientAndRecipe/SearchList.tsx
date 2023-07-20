import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

interface SearchListProps {
  searchData: string[];
  removeItem?: (index: number) => void;
}

export default function SearchList({
  searchData,
  removeItem = () => {
    return;
  },
}: SearchListProps) {
  return (
    <SearchListWrap>
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
  overflow-y:scroll;
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
};
`;
