import styled from "styled-components";
import { Link } from "react-router-dom";
import { deleteData } from "../axios";
import { Post } from "./MyRecipe";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { SAVED_RECIPE_URL } from "../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface RecipeListCardProps {
  post: Post;
  onDeletePost: (postId: number) => void;
}

export default function SavedRecipeList({ post, onDeletePost }: RecipeListCardProps) {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  console.log("post", post);
  const onDelete = () => {
    if (MY_TOKEN !== null) {
      deleteData(`${SAVED_RECIPE_URL}/${post.id}`, MY_TOKEN)
        .then(() => {
          console.log("삭제되었습니다");
          onDeletePost(post.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <RecipeLi>
        <button className="delete-image-btn" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <RecipeLink to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt="food-img" />
          <RecipeInfo>
            <RecipeTit>{post.title}</RecipeTit>
            <RecipeWriter>{post.recipeUserNickname}</RecipeWriter>
          </RecipeInfo>
        </RecipeLink>
      </RecipeLi>
    </>
  );
}

const RecipeLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #dad7d7;
  height: 104px;
  position: relative;
  .delete-image-btn {
    padding: 6px 20px;
    background-color: rgb(255 158 158);
    color: white;
    position: absolute;
    bottom: 6px;
    right: 4px;
    cursor: pointer;
    font-size: 12rem;
    border-radius: 5px;
  }
`;

const RecipeInfo = styled.div`
  padding: 20px 8px;
  width: 100%;
`;

const RecipeLink = styled(Link)`
  width: 100%;
  display: flex;
  img {
    width: 104px;
    height: 104px;
  }
`;

const RecipeTit = styled.p`
  font-size: 16rem;
  color: #5b5b5b;
  font-weight: 800;
  line-height: 1.3;
  max-height: 2.6;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  word-break: keep-all;
`;

const RecipeWriter = styled.span`
  display: block;
  font-size: 13rem;
  font-weight: 700;
  margin-top: 10px;
  color: #5b5b5b;
`;
