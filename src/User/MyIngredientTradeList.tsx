import axios from "axios";
import { useEffect, useState} from "react";
import styled from "styled-components";
import PostDetail from "./PostDetail.tsx";

export interface Item{
    id:number;
    title:string;
    content:string;
    place:string;
    price:number;
    createdAt:string;
    lat:number;
    lon:number;
    shareImg:string;
}
function MyIngredeintTradeList(){
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null); 
    useEffect(() => {
        const storedData = sessionStorage.getItem("persist:root");
        const parsedData = JSON.parse(storedData?.replace(/\\"/g, ''));
        const MY_TOKEN = parsedData?.accessTokenValue;
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        axios.get("https://nengtul.shop/v1/shareboard/mylist")
        .then((response)=>{
            console.log(response)
            setItems(response.data as Item[]);
            console.log('받아오기성공')
        })
        .catch((error)=>{
            console.error(error)
        })
    }, []);
    const handlePostClick = (itemId:number) => {
        setSelectedItemId(itemId);
      };
    return(
         <>
         <MyIngredientTrade>내가 작성한 나눔 글 </MyIngredientTrade>
            {items.map((item) => (
                <div key={item.id}>
                    {selectedItemId === item.id ? (
                        <PostDetail item={item} />
                        ) : (
                        <Post onClick={() => handlePostClick(item.id)}>
                            <h2>{item.title}</h2>
                            <p>{item.place}</p>
                            <p>{item.content}</p>
                        </Post>
                    )}
                </div>
            ))}
        </>
    )
}
export default MyIngredeintTradeList


const MyIngredientTrade=styled.div`
    width:100%;
    height:50rem;
    font-size:25rem;
    font-weight:700;
    color:#38DB83;
    display:flex;
    align-items: center;
    padding-left:5rem;
`
const Post = styled.div`
    width:100%;
    height:70rem;
    background-color:pink;
    cursor:pointer;
    border-bottom: 1px solid black;
    h2{
        font-size:20rem;
        display:inline-block;
    }
    

`