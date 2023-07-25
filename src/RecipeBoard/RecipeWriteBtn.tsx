import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function RecipeWriteBtn() {
  return (
    <>
      <WriteBtn to={"/recipewrite"}>
        <FontAwesomeIcon icon={faPencil} />
      </WriteBtn>
    </>
  );
}

const WriteBtn = styled(Link)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${theme.colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: auto;
  bottom: 110px;
  transform: translatex(5px);
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 16rem;
  }
`;
