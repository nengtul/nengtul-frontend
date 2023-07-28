import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Post } from "./InfiniteScroll";
import { Link } from "react-router-dom";

interface RecipeListCardProps {
  post: Post;
}

export default function MyRecipeList({ post }: RecipeListCardProps) {
  return (
    <List>
      <Link to="/">
        <div className="img">
          <img src={post.thumb} alt="Recipe-img" />
        </div>
        <div className="info">
          <Title>{post.title}</Title>
          <Heart>
            <FontAwesomeIcon icon={faHeart} style={{ height: "16rem", color: "red" }} />
            <HeartRate>{post.like}</HeartRate>
          </Heart>
          <Writer>{post.writer}</Writer>
        </div>
      </Link>
    </List>
  );
}
const List = styled.li`
  padding: 15rem 10rem;
  cursor: pointer;
  border-bottom: 1px solid #dddddd;
  a {
    display: flex;
  }
  .img {
    width: 35%;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  .info {
    padding: 15rem 0 15rem 10rem;
  }
`;

const Title = styled.h4`
  font-size: 18rem;
  font-weight: 700;
  margin-bottom: 12rem;
  display: block;
  display: -webkit-box;
  line-height: 1.2;
  max-height: 2.4;
  overflow: hidden;
  text-overflow: elipse;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;
const Heart = styled.div`
  margin-bottom: 12rem;
  display: flex;
  align-items: center;
`;
const HeartRate = styled.div`
  font-size: 14rem;
  margin-left: 2%;
`;
const Writer = styled.div`
  font-size: 14rem;
`;
