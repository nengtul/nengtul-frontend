import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import MyRecipeList from "./MyRecipelist";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import  {getData} from "../axios";
export interface Post {
  createdAt:string;
  id:number;
  recipeId:string;
  thumbnailUrl:string;
  title:string;
}
interface ContentData {
  content: Post[];
}
interface InfiniteScrollProps {
  apiEndPoint: string;
}

export default function InfiniteScroll({ apiEndPoint }: InfiniteScrollProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const [ref, inView] = useInView();

  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue

  const fetch = useCallback(async () => {
    try {
      if(MY_TOKEN){
        await getData<ContentData>(`${apiEndPoint}?size=5&page=${page.current}`,MY_TOKEN)
        .then(data=>{
          console.log(data)
          const contentData = data.content;
          setPosts((prevPosts) => [...prevPosts, ...contentData]);
          setHasNextPage(contentData.length === 5);
          if (contentData.length) {
            page.current += 1;
          } 
        })
        .catch(err=>{
          console.log(err)
        })
      }
      // axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
      // const { data } = await axios.get<ContentData>(`${apiEndPoint}?size=5&page=${page.current}`);
      // console.log('이거봐봐',data.content)
      // const contentData = data.content;
      // setPosts((prevPosts) => [...prevPosts, ...contentData]);
      // setHasNextPage(contentData.length === 5);
      // if (contentData.length) {
      //   page.current += 1;
      // }
    } catch (err) {
      console.error(err);
    }
  }, []);

  //이거추가됨
  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  //---

  useEffect(() => {
    console.log(inView, hasNextPage);
    const fetchData = () => {
      if (inView && hasNextPage) {
        fetch().catch((error) => {
          console.error(error);
        });
      }
    };
    fetchData();
  }, [fetch, hasNextPage, inView]);

  return (
    <>
      <CardWrap>
        {posts?.map((post) => <MyRecipeList key={post.id} post={post} onDeletePost={handleDeletePost} />)}
        <div ref={ref} />
      </CardWrap>
    </>
  );
}

const CardWrap = styled.ul`
  width: 100%;
  padding-top: 60px;
`;
