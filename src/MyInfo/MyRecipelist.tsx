import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Post } from "./InfiniteScroll";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { LIKES_URL, RECIPE_URL } from "../url";
import { deleteData } from "../axios";
import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import { useLocation } from "react-router-dom";
import ViewAndHeart from "../common/ViewAndHeart";
interface RecipeListCardProps {
  post: Post;
  onDeletePost: (postId: number | string) => void;
  apiEndPoint: string;
}

export default function MyRecipeList({ post, onDeletePost, apiEndPoint }: RecipeListCardProps) {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const param = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (MY_TOKEN !== null) {
      if (apiEndPoint === LIKES_URL) {
        deleteData(`${LIKES_URL}/${post.id}`, MY_TOKEN)
          .then(() => {
            console.log("삭제되었습니다");
            onDeletePost(post.id);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        deleteData(`${RECIPE_URL}/${post.recipeId}`, MY_TOKEN)
          .then(() => {
            console.log("삭제되었습니다");
            onDeletePost(post.recipeId);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <List>
      <Link to={`/${post.recipeId}`}>
        <div className="img">
          <img src={post.thumbnailUrl} alt="Recipe-img" />
        </div>
        <div className="info">
          <Title>{post.title}</Title>
          <ViewAndHeart viewCount={post.viewCount} heartCount={post.likeCount} />
          <Writer>{post.recipeUserNickName}</Writer>
        </div>
        {param.pathname === "/heartLecipe" ? <RecipeDeleteBtn handleClick={handleClick} /> : <></>}
      </Link>
    </List>
  );
}
const List = styled.li`
  padding: 4rem;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #dddddd;
  a {
    display: flex;
    align-items: center;
  }
  .img {
    width: 110px;
    height: 110px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    padding: 10rem;
    width: calc(100% - 110px);
    .view-wrap {
      position: inherit;
      display: inline-flex;
      padding: 6px 10px;
      p {
        font-weight: 700;
      }
    }
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

const Title = styled.h4`
  font-size: 15rem;
  font-weight: 800;
  margin-bottom: 6rem;
  display: -webkit-box;
  line-height: 1.3;
  max-height: 2.6;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Writer = styled.div`
  font-size: 13rem;
  font-weight: 700;
  margin-top: 10px;
`;
