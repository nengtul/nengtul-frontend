import { styled } from "styled-components";
import { User } from "./InfiniteScroll2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { deleteData } from "../axios";
import defaultThumb from "../assets/common/defaultThumb.svg";
import LevelBadge from "../common/LevelBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookmark } from "@fortawesome/free-solid-svg-icons";
interface RecipeListCardProps {
  user: User;
  onDeletePost: (postId: number) => void;
  apiEndPoint: string;
}

export default function MyFavList({ user, onDeletePost, apiEndPoint }: RecipeListCardProps) {
  const [isLiked, setIsLiked] = useState(true);
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  console.log("user", user);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked((prev) => !prev);
  };
  if (!isLiked) {
    if (MY_TOKEN !== null) {
      deleteData(`${apiEndPoint}/${user.id}`, MY_TOKEN)
        .then(() => {
          console.log("삭제되었습니다");
          onDeletePost(user.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <List>
      <Link to={`recipe/user/${user.publisherId}`}>
        <div className="info">
          <div
            className="thumb"
            style={{ backgroundImage: `url(${user.publisherProfilePhotoUrl || defaultThumb})` }}
          ></div>
          <div className="writer">
            <LevelBadge>{user.publisherPoint}</LevelBadge>
            <p>{user.publisherNickName} 님</p>
            <span className="write-count">
              <FontAwesomeIcon icon={faBook} />
              {user.publisherRecipeCount}
            </span>
          </div>
        </div>
        <Like onClick={handleClick}>
          <FontAwesomeIcon icon={faBookmark} style={{ fontSize: "20rem", color: "#9f9ae7" }} />
        </Like>
      </Link>
    </List>
  );
}
const List = styled.li`
  width: 97%;
  margin: 10px auto 0;
  background-color: #fff;
  padding: 10px 14px;
  border-radius: 15px;
  box-shadow: 0px 0px 3px #333;
  padding: 10px 14px;
  border-bottom: 1px solid #e1e1e1;
  .writer {
    margin-left: 4px;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info {
    display: flex;
    align-items: center;
    p {
      font-size: 16rem;
      margin: 4px 0px 8px 8px;
      font-weight: 700;
    }
    .thumb {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      background-size: cover;
      background-color: #333;
    }
    .write-count {
      font-size: 13rem;
      background-color: #000000a8;
      font-weight: 700;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      margin-left: 7px;
      padding: 4px 10px;
      color: #fff;
      svg {
        margin-right: 10px;
        color: #c1ffa9;
      }
    }
  }
`;

const Like = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
`;
