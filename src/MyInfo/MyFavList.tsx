import { styled } from "styled-components";
import { User } from "./InfiniteScroll2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { deleteData } from "../axios";
import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import defaultThumb from "../assets/common/defaultThumb.svg";
interface RecipeListCardProps {
  user:User;
  onDeletePost: (postId: number ) => void;
  apiEndPoint: string;
}

export default function MyFavList({ user, onDeletePost, apiEndPoint }: RecipeListCardProps) {
  const [isLiked, setIsLiked] = useState(true);
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  console.log('user',user)
  const handleClick = () => {
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
        <MemberThumb
              style={{ backgroundImage: `url(${user.publisherProfilePhotoUrl || defaultThumb})` }}
            />
        <div className="info">
          <Writer>{user.publisherNickName}</Writer>
        </div>
        <RecipeDeleteBtn onDelete={handleClick} />
      </Link>
    </List>
  );
}
const List = styled.li`
    display:flex;
    padding: 4rem;
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #dddddd;
    display:flex;
    a{
        display:flex;
    }
    .info {
        display:flex;
        align-items: center;
        margin-left:15rem;
    }
    .delete-image-btn {
        width: 40rem;
        height: 40rem;
        background-color: rgb(254, 98, 98);
        color: white;
        border-radius: 100%;
        font-size: 20rem;
        position: absolute;
        top: 3px;
        right: 2rem;
        cursor: pointer;
    }
`;
const MemberThumb = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-size: cover;
  margin-left:10rem;
  
`;

const Writer = styled.div`
  font-size: 20rem;
  font-weight: 700;
`;
