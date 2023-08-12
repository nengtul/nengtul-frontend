import { MainPageSection, SectionTitle, TitlePoint } from "./CommonStyle";
import styled from "styled-components";
import SavedRecipeList from "./SavedRecipeList";
import { useState, useEffect,  useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import  {getData} from "../axios";
import { SAVED_RECIPE_URL } from "../url";


export interface Post {
  createdAt:string;
  id:number;
  recipeId:string;
  thumbnailUrl:string;
  title:string;
  recipeUserNickname:string;
}
interface ContentData {
  content: Post[];
}

export default function MyRecipe() {
  const [activeTab, setActiveTab] = useState('myRecipe'); // 기본값 설정

  const handleTabChange = (tab:string) => {
    setActiveTab(tab);
  };
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue;
  const [posts, setPosts] = useState<Post[]>([]);

  
  const fetch = useCallback(async () => {
    try {
      let url = '';
      if (activeTab === 'savedRecipe') {
        url = SAVED_RECIPE_URL;
      } else if (activeTab === 'myRecipe') {
        url = '';
      }
      if(activeTab==='savedRecipe'){
        if(MY_TOKEN){
          await getData<ContentData>(`${url}`,MY_TOKEN)
          .then(data=>{
            console.log(data)
            console.log(data.content)
            const contentData = data.content;
            setPosts((prevPosts) => [...prevPosts, ...contentData]);
            
          })
          .catch(err=>{
            console.log(err)
          })
      }
    }
    } catch (err) {
      console.error(err);
    }
  }, [activeTab]);
  useEffect(() => {
    const fetchData = () => {
        fetch().catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, [fetch]);

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  return (
    <>
      <MainPageSection>
        <SectionTitle>
          <TitlePoint>박진완님의</TitlePoint> 냉털 레시피
        </SectionTitle>
        <TabMenuWrap>
          <TabMenu>
            <Tab onClick={() => handleTabChange('myRecipe')} >나의 레시피</Tab>
            <SecondTab onClick={() => handleTabChange('savedRecipe')} >저장 레시피</SecondTab>
          </TabMenu>
        </TabMenuWrap>
        <ListWrap>
          {/* 나의 레시피 목록 */}
          {activeTab === 'myRecipe' && (
            <>
              {/* <RecipeList />
              <RecipeList /> */}
              
            </>
            )}
          {/* 저장 레시피 목록 */}
          {activeTab === 'savedRecipe' && (
            <>
              {posts?.map((post) => <SavedRecipeList key={post.id} post={post} onDeletePost={handleDeletePost} />)}
            </>    
          )}
        </ListWrap>
      </MainPageSection>
    </>
  );
}


const TabMenuWrap = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
`;

const TabMenu = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  color: #797979;
  font-size: 15rem;
  font-weight: 800;
  border-radius: 9px;
  border: 2px solid rgba(56, 219, 131, 0);
  background: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.31);
  padding: 8px 16px;
  cursor: pointer;
`;

const SecondTab = styled(Tab)`
  margin-left: 10px;
`;

const ListWrap = styled.ul`
  width: 95%;
  height: 450px;
  border-radius: 15px;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.38);
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  margin-top: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
  }
`;
