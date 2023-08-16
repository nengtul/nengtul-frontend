import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { NOTICES_URL, NOTICES_LIST_URL } from "../url";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import theme from "../common/theme";
import { deleteData, updateData, getTokenData, getData } from "../axios";
import { useDispatch } from "react-redux";

interface Post {
  content: string;
  createdAt: string;
  id: number;
  modifiedAt: string;
  nickname: string;
  noticeImg: string;
  title: string;
  userId: number;
  viewCount: number;
}
interface UpdateData {
  title: string;
  content: string;
}
function NoticeView() {
  const roles = sessionStorage.getItem("roles");

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;
  const { noticeId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const dispatch = useDispatch();

  const [newImageUrls, setNewImageUrls] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageArray: Blob[] = Array.from(files).map((file) => file);

      setNewImageUrls([...newImageUrls, ...imageArray]);
    } else {
      setNewImageUrls([]);
    }
  };

  //글 불러오기
  useEffect(() => {
    getData<Post>(`${NOTICES_LIST_URL}/${noticeId}`)
      .then((post: Post) => {
        setPost(post);
        const imageUrlString = post.noticeImg;
        const urls = imageUrlString.split("\\");
        setImageUrls(urls.slice(0, -1));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onModify = () => {
    setIsEditing(!isEditing);
  };

  //글 삭제하기
  const onDelete = () => {
    if (MY_TOKEN !== null) {
      deleteData(`${NOTICES_URL}/${noticeId}`, MY_TOKEN)
        .then(() => {
          console.log("삭제되었습니다");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //글 수정하기
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UpdateData>({
    //수정할때 받아올 원래 내용
    title: "",
    content: "",
  });
  useEffect(() => {
    if (isEditing && post) {
      setEditedData({
        title: post.title,
        content: post.content,
      });
    }
  }, [isEditing, post]);

  const onSave = () => {
    try {
      if (!editedData) {
        return;
      }

      const noticeReqDto = {
        title: editedData.title,
        content: editedData.content,
      };
      const formData = new FormData();

      if (newImageUrls.length > 0) {
        newImageUrls.forEach((image) => {
          if (image instanceof Blob) {
            formData.append("images", image);
          }
        });
      }

      const blob = new Blob([JSON.stringify(noticeReqDto)], {
        type: "application/json",
      });
      formData.append("noticeReqDto", blob);

      if (MY_TOKEN !== null) {
        updateData(`${NOTICES_URL}/${noticeId}`, formData, MY_TOKEN)
          .then((data) => {
            console.log(data);
            console.log("수정완료!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <NoticeViewArea>
      {isEditing ? (
        //수정하는중
        <>
          <Notice>
            공지사항
            <div className="btns">
              <button className="delete-btn btn" onClick={onModify}>
                취소
              </button>
              <button className="modify-btn btn" onClick={onSave}>
                완료
              </button>
            </div>
          </Notice>
          <NoticeTitleDate>
            <NoticeTitle>
              <input
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    title: e.target.value,
                  })
                }
              />
            </NoticeTitle>
            <NoticeDate>{post?.createdAt.slice(0, 10)}</NoticeDate>
          </NoticeTitleDate>
          <NoticeContent>
            <textarea
              value={editedData.content}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  content: e.target.value,
                })
              }
            />
          </NoticeContent>

          <div className="input-file">
            <label htmlFor="img-file">
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
              type="file"
              id="img-file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              multiple
            />
          </div>
          {newImageUrls.length > 0 && (
            <div className="new-images-container">
              {newImageUrls.map((newImageUrl, index) => (
                <div key={index} className="new-image-container">
                  <button
                    onClick={() => {
                      const newImageUrlsCopy = [...newImageUrls];
                      newImageUrlsCopy.splice(index, 1);
                      setNewImageUrls(newImageUrlsCopy);
                    }}
                    className="delete-image-btn"
                  >
                    X
                  </button>
                  <img src={URL.createObjectURL(newImageUrl)} alt={`New Notice ${index}`} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        //원본
        <>
          <Notice>
            공지사항
            {roles === "ADMIN" && (
              <div className="btns">
                <button className="delete-btn btn" onClick={onDelete}>
                  삭제
                </button>
                <button className="modify-btn btn" onClick={onModify}>
                  수정
                </button>
              </div>
            )}
          </Notice>
          <NoticeTitleDate>
            <NoticeTitle>{post?.title}</NoticeTitle>
            <NoticeDate>{post?.createdAt.slice(0, 10)}</NoticeDate>
          </NoticeTitleDate>
          <NoticeContent>{post?.content}</NoticeContent>
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Notice ${index}`} />
          ))}
        </>
      )}
    </NoticeViewArea>
  );
}

export default NoticeView;

const NoticeViewArea = styled.div`
  margin-top: 10rem;
  img {
    width: 95%;
    display: block;
    margin: 10rem auto;
  }
  .btn {
    font-size: 18rem;
    padding: 4rem 10rem;
    margin: 3rem;
    color: white;
  }
  .btns {
    position: relative;
    display: inline-block;
    left: 125rem;
    margin-bottom: 5rem;
  }
  .delete-btn {
    background-color: rgb(254, 98, 98);
  }
  .modify-btn {
    background-color: rgb(96, 149, 255);
  }
  input {
    font-size: 20rem;
    outline: none;
    border: none;
    color: gray;
    padding: 5rem;
  }
  .input-file {
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 20px 0;
    label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 70px;
      border: 2px solid ${theme.colors.main};
      border-radius: 5px;
      cursor: pointer;
      color: ${theme.colors.main};
      font-size: 30rem;
    }
    input[type="file"] {
      display: none;
    }
  }
  .delete-image-btn {
    width: 40rem;
    height: 40rem;
    background-color: rgb(254, 98, 98);
    color: white;
    border-radius: 100%;
    font-size: 25rem;
    position: relative;
    top: 40px;
    left: 5rem;
  }
`;

const Notice = styled.h1`
  font-size: 30rem;
  padding: 15rem 20rem;
`;
const NoticeTitleDate = styled.div`
  padding: 15rem 20rem;
  background-color: rgb(221, 221, 221);
`;
const NoticeTitle = styled.div`
  font-size: 20rem;
  input {
    width: 100%;
  }
`;
const NoticeDate = styled.div`
  padding-top: 5rem;
  font-size: 15rem;
`;

const NoticeContent = styled.div`
  font-size: 20rem;
  padding: 10rem 20rem;
  line-height: 1.5;
  textarea {
    background-color: #f4f4f4;
    font-size: 20rem;
    max-width: 100%;
    width: 100%;
    height: 200rem;
    box-sizing: border-box;
    resize: vertical;
    padding: 5rem;
    outline: none;
    border: none;
    color: gray;
  }
`;
