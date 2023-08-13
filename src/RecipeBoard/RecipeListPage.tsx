import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import styled from "styled-components";
import theme from "../common/theme";
import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import RecipeListCard from "./RecipeListCard";
import { useInView } from "react-intersection-observer";
import RecipeWriteBtn from "./RecipeWriteBtn";
import ContensWrap from "../common/ContentsWrap";
import TabMenu from "../common/TabMenu";
import { RECIPE_URL,RECIPE_CATEGORY_URL } from "../url";
import { getData } from "../axios";
import NoRecipeCategory from "../common/NoRecipeCategory";
export interface Post {
  likeCount: number;
  nickName: string;
  recipeId: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}
interface ContentData {
  content: Post[];
}
export default function RecipeListPage() {
  const [category, setCategory] = useState(""); //영어
  const [categoryName, setCategoryName] = useState("전체"); //한글
  const [viewCount, setViewCount] = useState("인기순");
  const [categoryView, setCategoryView] = useState(false);
  const [viewCountView, setViewCountView] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const categoryPage = useRef<number>(0);
  const [ref, inView] = useInView();
  const [sortValue,setSortValue]=useState("asc")
  const fetch = useCallback(
    async (category: string, sortValue:string, resetPage: boolean = false,resetPosts: boolean = false) => {
    console.log(category,'category확인')
    console.log(sortValue,'sort확인')
    try {
        const targetPage = resetPage ? 0 : categoryPage.current;
        let data;
        if(category===''){  //제일 처음렌더링
          if(sortValue==='createdAt'){  //제일처음 렌더링 하자마자 '최신순'으로 바꿨을 경우 (성공)
            data = await getData<ContentData>(`${RECIPE_URL}?size=5&page=${categoryPage.current}&sort=createdAt`)
            const contentData = data.content;
            if (resetPosts) {
              setPosts(contentData);
            } else {
              setPosts((prevPosts) => [...prevPosts, ...contentData]);
            }
            setHasNextPage(contentData.length === 5);
            if (contentData.length) {
                  categoryPage.current += 1;
              }
          }else{ // 1. 제일처음 렌더링 하자마자  (성공)  2. '최신순'으로 바꿨다가 다시 '인기순' (성공)
            data = await getData<ContentData>(`${RECIPE_URL}?size=5&page=${categoryPage.current}&sort=asc`)
            const contentData = data.content;
            if (resetPosts) {
              setPosts(contentData);
            } else {
              setPosts((prevPosts) => [...prevPosts, ...contentData]);
            }
            setHasNextPage(contentData.length === 5);
            if (contentData.length) {
              categoryPage.current += 1;
            }
          }
        }else{  //카테고리 선택했을때
          if(sortValue==='createdAt'){  //'최신순'선택했을때
            data = await getData<ContentData>(`${RECIPE_CATEGORY_URL}/${category}?size=5&page=${targetPage}&sort=createdAt`);
            const contentData = data.content;
            if (resetPosts) {
              setPosts(contentData);
            } else {
              setPosts((prevPosts) => [...prevPosts, ...contentData]);
            }
            setHasNextPage(contentData.length === 5);
            if (contentData.length) {
                  categoryPage.current += 1;
              }

          }else{
            data = await getData<ContentData>(`${RECIPE_CATEGORY_URL}/${category}?size=5&page=${targetPage}&sort=asc`);
            const contentData = data.content;
            if (resetPosts) {
              setPosts(contentData);
            } else {
              setPosts((prevPosts) => [...prevPosts, ...contentData]);
            }
            setHasNextPage(contentData.length === 5);
            if (contentData.length) {
                  categoryPage.current += 1;
              }
          }
      }
    } catch (err) {
      console.error(err);
    }
  },
  []);

  useEffect(() => {
    const fetchData = () => {
      if (inView && hasNextPage) {
        fetch(category,sortValue).catch((error) => {
          console.error(error);
        });
      }
    };
    fetchData();
  }, [fetch, hasNextPage, inView, category,sortValue]);

  //카테고리랑 sort 1개로 통일 
  const select=(e: React.MouseEvent<HTMLButtonElement>) => {
    const value=e.currentTarget.value; //'MAIN_DIST' or '인기순'
    if (value === '인기순' || value === '최신순') {
      setViewCount(value);
      setViewCountView(!viewCountView);
      categoryPage.current=0;
      const engValue=value === '인기순' ? 'asc' : 'createdAt'
      setSortValue (value === '인기순' ? 'asc' : 'createdAt');
      if (category === '') {
        fetch(category, engValue, true, true).catch((err)=>{
          console.log(err)
        });
      } else {
        fetch(category, engValue, true, true).catch((err)=>{
          console.log(err)
        });
      }
      
    }else{
      setCategory(value);
      setCategoryName(e.currentTarget.innerText);
      setCategoryView(!categoryView);
      categoryPage.current=0;
      fetch(value,sortValue,true,true).catch((err)=>{
        console.log(err)
      });
    }
  }
  console.log(posts.length)

  return (
    <MobileWrap>
      <Header />
      <ContensWrap>
        <ListWrap>
          <CategoryBtn>
            <button
              onClick={() => {
                setCategoryView(!categoryView);
              }}
            >
              {categoryName}
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {categoryView && (
              <ul>
                <li>
                  <button type="button" onClick={select} value="SIDE_DISH">
                    밑반찬
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="MAIN_SIDE_DISH">
                    메인반찬
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="KOREAN_SOUP">
                    국/탕
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="STEW">
                    찌개
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="DESSERT">
                    디저트
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="NOODLES_DUMPLINGS">
                    면/만두
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="RICE_PORRIDGE_RICE_CAKE">
                    밥/죽/떡
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="FUSION">
                    퓨전
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="KIMCHI_SALTED_FISH_SAUCES">
                    김치/젓갈
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="SEASONING_SAUCE_JAM">
                    양념/소스
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="SALAD">
                    샐러드
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="SOUP">
                    스프
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="BREAD">
                    빵
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="SNACKS">
                    과자
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="TEA_DRINK">
                    차/음료
                  </button>
                </li>
                <li>
                  <button type="button" onClick={select} value="ETC">
                    기타
                  </button>
                </li>
              </ul>
            )}
          </CategoryBtn>
          <CategoryBtn>
            <button
              onClick={() => {
                setViewCountView(!viewCountView);
              }}
            >
              {viewCount}
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {viewCountView && (
              <ul style={{ width: "200%" }}>
                <li style={{ width: "50%" }}>
                  <button onClick={select} value="인기순">
                    인기순
                  </button>
                </li>
                <li style={{ width: "50%" }}>
                  <button onClick={select} value="최신순">
                    최신순
                  </button>
                </li>
              </ul>
            )}
          </CategoryBtn>
          <CardWrap>
            <div ref={ref} />
            {posts.length>0?(
              posts?.map((post) => (
                  <RecipeListCard key={post.recipeId} post={post} />
              ))
            ):(
              <NoRecipeCategory title={"등록된"} />
            )} 
            <div ref={ref} />
          </CardWrap>
        </ListWrap>
        <RecipeWriteBtn />
      </ContensWrap>
      <TabMenu />
    </MobileWrap>
  );
}

const ListWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  padding-top: 20px;
`;

export const CategoryBtn = styled.div`
  position: relative;
  font-size: 14rem;
  width: 110px;
  height: 38px;
  border: 2px solid ${theme.colors.main};
  display: inline-block;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.31);
  border-radius: 9px;
  z-index: 9999;
  &:nth-of-type(2) {
    margin-left: 4px;
  }

  button {
    padding: 0px 8px;
    width: 100%;
    height: 100%;
    text-align: left;
    font-weight: 800;
    background-color: #fff;
    cursor: pointer;
  }
  & > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 9px;
  }
  ul {
    position: absolute;
    top: 120%;
    left: 0;
    border: 1px solid #333;
    width: 300%;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.31);
    border-radius: 9px;
    border: 2px solid ${theme.colors.main};
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    background-color: #fff;
    li {
      width: 33.33333%;
      height: 38px;
      border: 1px solid #c5ffe0;
    }
  }
`;

const CardWrap = styled.ul`
  width: 100%;
`;
