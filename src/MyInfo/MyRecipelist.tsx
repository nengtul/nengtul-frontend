import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Post } from "./InfiniteScroll";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { LIKES_URL , RECIPE_USER_URL} from "../url";
import  {deleteData} from "../axios";
interface RecipeListCardProps {
  post: Post;
  onDeletePost: (postId: number) => void;
  apiEndPoint: string;
}

export default function MyRecipeList({ post,onDeletePost,apiEndPoint }: RecipeListCardProps) {
  const [isLiked, setIsLiked] = useState(true);
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLiked(prev => !prev);
  };
  if (!isLiked){
    
    if(MY_TOKEN!==null){
      if(apiEndPoint===LIKES_URL){
        deleteData(`${LIKES_URL}/${post.id}`,MY_TOKEN)
        .then(()=>{
            console.log('삭제되었습니다')
            onDeletePost(post.id)
        })
        .catch(error=>{
            console.log(error)
        })
      }else{
        deleteData(`${RECIPE_USER_URL}/${post.recipeId}`,MY_TOKEN)
        .then(()=>{
            console.log('삭제되었습니다')
            onDeletePost(post.id)
        })
        .catch(error=>{
            console.log(error)
        })
      }
  }
  }
  return (
    <List>
      <Link to={`/${post.recipeId}`}>
        <div className="img">
          <img src={post.thumbnailUrl} alt="Recipe-img" />
        </div>
        <div className="info">
          <Title>{post.title}</Title>
          <Heart>
            <FontAwesomeIcon icon={faHeart} style={{ height: "16rem", color: "red" }} />
            <HeartRate>{post.likeCount}</HeartRate>
          </Heart>
          <Writer>{post.recipeUserNickName}</Writer>
        </div>
        <button 
          className="delete-image-btn"
          onClick={handleClick}>
            X
        </button>
      </Link>
    </List>
  );
}
const List = styled.li`

  padding: 15rem 10rem;
  cursor: pointer;
  position:relative;
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
  .delete-image-btn{
    width:40rem;
    height:40rem;
    background-color:rgb(254, 98, 98);
    color:white;
    border-radius:100%;
    font-size:20rem;
    position:absolute;
    top:3px;
    right:2rem;
    cursor:pointer
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

const HeartBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #c4c4c4;
  position: absolute;
  bottom: 10px;
  // bottom:300px;
  right: 5px;
  z-index: 9;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    background: none;
    cursor: pointer;

    svg {
      color: red;
      font-size: 25rem;
    }
  }

`;