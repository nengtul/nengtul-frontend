import { styled } from "styled-components";

interface CommentProps {
  handleUpdate: () => void;
  handleModal: () => void;
}

export default function UpdateDeleteBtn({ handleUpdate, handleModal }: CommentProps) {
  return (
    <BtnWrap>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleModal}>삭제</button>
    </BtnWrap>
  );
}

const BtnWrap = styled.div`
  display: flex;
  button {
    cursor: pointer;
    margin: 0px 2px;
    font-size: 14rem;
    background-color: #56aa7d;
    border-radius: 4px;
    padding: 2px 8px;
    color: #fff;
    &:nth-of-type(2) {
      background-color: #fc8f6c;
    }
  }
`;
