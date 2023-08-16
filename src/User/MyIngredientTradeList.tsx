import { useEffect, useState } from "react";
import styled from "styled-components";
import PostDetail from "./PostDetail.tsx";
import { SHARE_MYLIST_URL } from "../url.ts";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTokenData } from "../axios";
export interface Item {
  id: number;
  title: string;
  content: string;
  place: string;
  price: number;
  createdAt: string;
  lat: number;
  lon: number;
  shareImg: string;
}
function MyIngredeintTradeList() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (MY_TOKEN && REFRESH_TOKEN) {
      getTokenData<Item[]>(SHARE_MYLIST_URL, MY_TOKEN, dispatch, REFRESH_TOKEN)
        .then((data: Item[]) => {
          setItems(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, []);
  const handlePostClick = (itemId: number) => {
    setSelectedItemId(itemId);
  };
  return (
    <>
      <MyIngredientTrade>내가 작성한 나눔 글 </MyIngredientTrade>
      {items.map((item) => (
        <div key={item.id}>
          {selectedItemId === item.id ? (
            <PostDetail item={item} />
          ) : (
            <Post onClick={() => handlePostClick(item.id)}>
              <div>
                <h2>{item.title}</h2>
                <p>{item.createdAt.slice(5, 10)}</p>
              </div>
              <p className="place">{item.place}</p>
            </Post>
          )}
        </div>
      ))}
    </>
  );
}
export default MyIngredeintTradeList;

const MyIngredientTrade = styled.div`
  width: 100%;
  height: 80rem;
  font-size: 28rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 15rem;
  background-color: #38db83;
`;
const Post = styled.div`
  width: 100%;
  height: 70rem;
  cursor: pointer;
  border-bottom: 1px solid #dddddd;
  padding: 15rem;
  div {
    display: flex;
    p {
      margin-left: 10rem;
      font-size: 18rem;
      color: gray;
    }
  }
  h2 {
    font-size: 20rem;
    display: inline-block;
  }
  .place {
    font-size: 18rem;
    margin-top: 5rem;
  }
`;
