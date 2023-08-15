import { styled } from "styled-components";
import UpdateDeleteBtn from "./UpdateDeleteBtn";
import { deleteData, putData } from "../../axios";
import { REPLY_COMMENT_URL } from "../../url";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { useState } from "react";
import ComfirmModal from "../../Modal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import theme from "../../common/theme";

interface Comment {
  commentId: number;
  createdAt: string;
  modifiedAt: string;
  replyComment: string;
  replyCommentId: number;
  userId: number;
  userNickname: string;
}

interface CommentListProps {
  item: Comment;
  commentsInput: () => void;
}

export default function DownCommentList({ item, commentsInput }: CommentListProps) {
  const date = item.createdAt.split("T")[0];
  const url = `${REPLY_COMMENT_URL}/${item.commentId}/replycommets/${item.replyCommentId}`;
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const MY_ID = Number(sessionStorage.getItem("userId"));
  const MY_ROLE = sessionStorage.getItem("roles");

  const [update, setUpdate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateComment, setUpdateComment] = useState("");

  const handleDelete = () => {
    deleteData(url, MY_TOKEN as string)
      .then((data) => {
        console.log(data);
        commentsInput();
        setModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateSubmit = () => {
    const data = {
      replyComment: updateComment,
    };
    if (MY_TOKEN !== null) {
      putData(url, data, MY_TOKEN)
        .then((data) => {
          console.log(data);
          setUpdate(false);
          commentsInput();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <ComfirmModal
          closeModal={closeModal}
          handleDelete={handleDelete}
          message={"정말 삭제하시겠습니까?"}
        />
      )}

      <List key={item.replyCommentId}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            {item.userNickname} / {date}
          </p>
          {(MY_ROLE === "ADMIN" || MY_ID == item.userId) && (
            <UpdateDeleteBtn handleUpdate={handleUpdate} handleModal={handleModal} />
          )}
        </div>
        <p>{item.replyComment}</p>
        {update && (
          <div className="update-comment">
            <textarea
              placeholder={item.replyComment}
              onChange={(e) => {
                setUpdateComment(e.target.value);
              }}
            ></textarea>
            <div>
              <button onClick={updateSubmit}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                onClick={() => {
                  setUpdate(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        )}
      </List>
    </>
  );
}

const List = styled.li`
  width: 100%;
  padding: 10px 20px;
  background-color: #efefef;
  border-bottom: 1px solid #c2c2c2;
  position: relative;
  &:nth-of-type(1) {
    border-top: 1px solid #c2c2c2;
  }
  div > p {
    font-size: 12rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 14rem;
  }

	.update-comment textarea {
    width: 100%;
    margin-top: 10px;
  }
  .update-comment button {
    background-color: ${theme.colors.main};
    color: #fff;
    cursor: pointer;
    margin-top: 4px;
    font-size: 15rem;
    border-radius: 4px;
    width: 25px;
    height: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:nth-of-type(2) {
      margin-left: 2px;
    }

`;
