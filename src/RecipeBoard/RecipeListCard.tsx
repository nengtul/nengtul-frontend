import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "./RecipeListPage";
import ViewAndHeart from "../common/ViewAndHeart";

interface RecipeListCardProps {
  post: Post;
}

export default function RecipeListCard({ post }: RecipeListCardProps) {
  return (
    <>
      <CardLi>
        <Link to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt={post.title} />
          <ThumbInfo>
            <p>{post.title}</p>
          </ThumbInfo>
        </Link>
        <ViewAndHeart viewCount={post.viewCount} heartCount={post.likeCount} />
      </CardLi>
    </>
  );
}

const CardLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #fff;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.32);
  a {
    width: 100%;
    height: 343px;
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbInfo = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000000a8;
  padding: 20px 10px;
  p {
    font-size: 20rem;
    color: #fff;
    font-weight: 800;
    line-height: 1.3;
  }
`;
