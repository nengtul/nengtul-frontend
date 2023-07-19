import { styled } from "styled-components";
import theme from "./theme";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <>
      <ButtonType onClick={onClick} type="button">
        {children}
      </ButtonType>
    </>
  );
}

const ButtonType = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25rem;
  font-weight: bold;
  background-color: ${theme.colors.main};
  color: #fff;
  cursor: pointer;
`;
