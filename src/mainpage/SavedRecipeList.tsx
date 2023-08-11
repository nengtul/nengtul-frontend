import styled from "styled-components";
import { Link } from "react-router-dom";
import  {deleteData} from "../axios";
import { Post } from "./MyRecipe";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { SAVED_RECIPE_URL } from "../url";
interface RecipeListCardProps {
  post: Post;
  onDeletePost: (postId: number) => void;
}

export default function SavedRecipeList({ post,onDeletePost }: RecipeListCardProps) {
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue;
  console.log(post)
  const onDelete=()=>{
    if(MY_TOKEN!==null){
      deleteData(`${SAVED_RECIPE_URL}/${post.id}`,MY_TOKEN)
      .then(()=>{
          console.log('삭제되었습니다')
          onDeletePost(post.id)
      })
      .catch(error=>{
          console.log(error)
      })
    }
  }
  return (
    <>
      <RecipeLi>
        <button 
          className="delete-image-btn"
          onClick={onDelete}>
            X
        </button>
        <RecipeLink to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt="food-img" />
          <RecipeInfo>
            <RecipeTit>{post.title}</RecipeTit>
            {/* <RecipeWriter>{post.recipeUserNickName}</RecipeWriter> */}
            <RecipeWriter>박진완</RecipeWriter>
          </RecipeInfo>
        </RecipeLink>
      </RecipeLi>
    </>
  );
}


const RecipeLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #dad7d7;
  height:104px;
  position:relative;
  .delete-image-btn{
    width:20rem;
    height:20rem;
    background-color:rgb(254, 98, 98);
    color:white;
    border-radius:100%;
    font-size:10rem;
    position:absolute;
    top:3px;
    left:2rem;
    cursor:pointer
}
`;

const RecipeInfo = styled.div`
  padding: 20px 14px;
  width: 100%;
`;

const RecipeLink = styled(Link)`
  width: 100%;
  display: flex;
  img{
    width:104px;
    height:104px;
  }
`;

const RecipeTit = styled.p`
  font-size: 15rem;
  color: #5b5b5b;
  font-weight: 800;
`;

const RecipeHeart = styled.p`
  display: flex;
  font-size: 14rem;
  font-weight: 700;
  margin: 8px 0px 10px;
`;

const RecipeWriter = styled.span`
  font-size: 14rem;
  font-weight: 800;
  color: #5b5b5b;
`;