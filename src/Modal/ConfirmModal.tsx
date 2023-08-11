import { styled } from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
  handleDelete: () => void;
  closeModal: () => void;
}

export default function ComfirmModal({ handleDelete, closeModal }: CommentProps) {
  return (
    <ModalWrap>
      <div className="modal-component">
        <div className="title">
          <p>
            <FontAwesomeIcon icon={faQuestion} />
          </p>
        </div>
        <div className="check-return">
          <p>정말 삭제하시겠습니까?</p>
          <button type="button" onClick={handleDelete}>
            확인
          </button>
          <button type="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-component {
    background-color: #fff;
    width: 280px;
    border-radius: 8px;
    border: 2px solid ${theme.colors.main};
    .title {
      width: 100%;
      background-color: ${theme.colors.main};
      padding: 10px;
      p {
        color: #fff;
        font-size: 16rem;
        font-weight: 700;
        text-align: center;
      }
    }
    .check-return {
      padding: 20px;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 30rem;
        color: #8f8f8f;
      }
      p {
        width: 100%;
        font-size: 14rem;
        text-align: center;
        font-weight: 700;
        margin-bottom: 20px;
      }
      button {
        padding: 4px 0px;
        background-color: ${theme.colors.main};
        color: #fff;
        font-size: 16rem;
        font-weight: 700;
        margin-top: 20px;
        cursor: pointer;
        margin: 0px 2px;
        width: 40%;
      }
    }
  }
`;
