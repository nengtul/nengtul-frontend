import styled from "styled-components";
import { Link } from "react-router-dom";
import { deleteTokenData } from "../axios";
import { Post } from "./MyRecipe";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { SAVED_RECIPE_URL } from "../url";
import RecipeDeleteBtn from "../common/RecipeDeleteBtn";
import { useDispatch } from "react-redux";

interface RecipeListCardProps {
  post: Post;
  onDeletePost: (postId: number) => void;
}

export default function SavedRecipeList({ post, onDeletePost }: RecipeListCardProps) {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;

  const dispatch = useDispatch();

  const handleClick = () => {
    if (MY_TOKEN !== null && REFRESH_TOKEN) {
      deleteTokenData(`${SAVED_RECIPE_URL}/${post.id}`, MY_TOKEN, dispatch, REFRESH_TOKEN)
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
        <RecipeDeleteBtn handleClick={handleClick} />
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
    object-fit: cover;
    object-position: center;
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
