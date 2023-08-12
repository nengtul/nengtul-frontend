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
import { RECIPE_URL } from "../url";
import { getData } from "../axios";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
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
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue;
  const [category, setCategory] = useState(""); //영어
  const [categoryName, setCategoryName] = useState("전체"); //한글
  const [viewCount, setViewCount] = useState("인기순");
  const [categoryView, setCategoryView] = useState(false);
  const [viewCountView, setViewCountView] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const [ref, inView] = useInView();

//원본=============================
  // const fetch = useCallback(async () => {
  //   try {
  //     await getData<ContentData>(`${RECIPE_URL}?size=5&page=${page.current}`)
  //       .then((data) => {
  //         // console.log(data);
  //         const contentData = data.content;
  //         setPosts((prevPosts) => [...prevPosts, ...contentData]);
  //         setHasNextPage(contentData.length === 5);
  //         if (contentData.length) {
  //           page.current += 1;
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);
  
  // const sortFetch=(category:string)=>{
  //   setPosts([])
  //   page.current=0
  //   console.log('카테고리떠야함',category)
  //   if (MY_TOKEN) {
  //     console.log('여기는ㄱ ㅏ나')
  //     getData<ContentData>(`https://nengtul.shop/v1/recipe/category/${category}?size=5&page=${page.current}`,MY_TOKEN)
  //       .then((data)=>{
  //         console.log(data)
  //         const contentData = data.content;
  //         setPosts((prevPosts) => [...prevPosts, ...contentData]);
  //         setHasNextPage(contentData.length === 5);
  //         if (contentData.length) {
  //           page.current += 1;
  //         }
  //       })
  //       .catch(error=>{
  //           console.log(error)
  //       })
  //     }
  // }

  // useEffect(() => {
  //   const fetchData = () => {
  //     if (inView && hasNextPage) {
  //       fetch().catch((error) => {
  //         console.error(error);
  //       });
  //     }
  //   };
  //   fetchData();
  // }, [fetch, hasNextPage, inView]);
 

  // const selectOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = e.currentTarget.value;
  //   console.log('value',value)
  //   setCategory(value);
  //   setCategoryName(e.currentTarget.innerText);
  //   setCategoryView(!categoryView);
  // };
  
 
  // useEffect(() => {
  //   // if (category === "") {
  //   //   fetchDefaultData();
  //   // } else {
  //   //   fetchCategoryData(category);
  //   // }
  //   sortFetch(category);
  // }, [category]);

  // const selectViewOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = e.currentTarget.value;
  //   setViewCount(value);
  //   setViewCountView(!viewCountView);
  // };
//이까지 원본=============================
  
//시도 1 . 따로따로 나누기 ===================================
  // const fetchDefaultData = useCallback(async () => {
  //   try {
  //     const data = await getData<ContentData>(`${RECIPE_URL}?size=5&page=${page.current}`);
  //     const contentData = data.content;
  //     setPosts((prevPosts) => [...prevPosts, ...contentData]);
  //     setHasNextPage(contentData.length === 5);
  //     if (contentData.length) {
  //       page.current += 1;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);
  // const fetchCategoryData = useCallback(async (category: string) => {
  //   setPosts([]);
  //   page.current = 0;
  //   console.log('카테고리떠야함', category);
  //   if (MY_TOKEN) {
  //     console.log('여기는ㄱ ㅏ나');
  //     try {
  //       const data = await getData<ContentData>(`https://nengtul.shop/v1/recipe/category/${category}?size=5&page=${page.current}`, MY_TOKEN);
  //       const contentData = data.content;
  //       console.log(data)
  //       setPosts(contentData);
  //       setHasNextPage(contentData.length === 5);
  //       if (contentData.length) {
  //         page.current += 1;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, []);
//여기까지 시도 1 . 따로따로 나누기 ===================================
  
//시도 2. fetch 하나 쓰고 category값 넘기기
const fetch = useCallback(
  async (category:string) => {
    console.log(category,'이거확인')
    try {
      if(MY_TOKEN){
        if(category===''){
          const data = await getData<ContentData>(`${RECIPE_URL}?size=5&page=${page.current}`,MY_TOKEN)
          const contentData = data.content;
          setPosts((prevPosts) => [...prevPosts, ...contentData]);
          setHasNextPage(contentData.length === 5);
          if (contentData.length) {
            page.current += 1;
          }

        }else{
          const data = await getData<ContentData>(`https://nengtul.shop/v1/recipe/category/${category}?size=5&page=${page.current}`,MY_TOKEN);
          const contentData = data.content;
          setPosts((prevPosts) => [...prevPosts, ...contentData]);
          setHasNextPage(contentData.length === 5);
          if (contentData.length) {
            page.current += 1;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  []
);

useEffect(() => {
  const fetchData = () => {
    if (inView && hasNextPage) {
      fetch(category).catch((error) => {
        console.error(error);
      });
    }
  };
  fetchData();
}, [fetch, hasNextPage, inView, category]);

const selectOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
  const value = e.currentTarget.value;
  console.log("value", value);
  setCategory(value);
  setCategoryName(e.currentTarget.innerText);
  setCategoryView(!categoryView);
};


const selectViewOpt = (e: React.MouseEvent<HTMLButtonElement>) => {
  const value = e.currentTarget.value;
  setViewCount(value);
  setViewCountView(!viewCountView);
};

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
                  <button type="button" onClick={selectOpt} value="SIDE_DISH">
                    밑반찬
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="MAIN_SIDE_DISH">
                    메인반찬
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="KOREAN_SOUP">
                    국/탕
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="STEW">
                    찌개
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="DESSERT">
                    디저트
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="NOODLES_DUMPLINGS">
                    면/만두
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="RICE_PORRIDGE_RICE_CAKE">
                    밥/죽/떡
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="FUSION">
                    퓨전
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="KIMCHI_SALTED_FISH_SAUCES">
                    김치/젓갈
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="SEASONING_SAUCE_JAM">
                    양념/소스
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="SALAD">
                    샐러드
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="SOUP">
                    스프
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="BREAD">
                    빵
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="SNACKS">
                    과자
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="TEA_DRINK">
                    차/음료
                  </button>
                </li>
                <li>
                  <button type="button" onClick={selectOpt} value="ETC">
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
                  <button onClick={selectViewOpt} value="인기순">
                    인기순
                  </button>
                </li>
                <li style={{ width: "50%" }}>
                  <button onClick={selectViewOpt} value="최신순">
                    최신순
                  </button>
                </li>
              </ul>
            )}
          </CategoryBtn>
          <CardWrap>
            {posts?.map((post) => <RecipeListCard key={post.recipeId} post={post} />)}
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
