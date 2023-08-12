import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeleteProps {
  onDelete: () => void;
}

export default function RecipeDeleteBtn({ onDelete }: DeleteProps) {
  return (
    <Button onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
}

const Button = styled.button`
  padding: 6px 20px;
  background-color: rgb(255 158 158);
  color: white;
  position: absolute;
  bottom: 6px;
  right: 4px;
  cursor: pointer;
  font-size: 12rem;
  border-radius: 5px;
`;
