import styled from "styled-components";
import axios from "axios";
import { useState,useRef,useEffect} from "react";
import {Item} from "./MyIngredientTradeList"
function PostDetail({ item }:{item:Item}) {
    const storedData = sessionStorage.getItem("persist:root");
    const parsedData = JSON.parse(storedData?.replace(/\\"/g, ''));
    const MY_TOKEN = parsedData?.accessTokenValue;

    //삭제
    const onDelete=()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        axios.delete(`https://nengtul.shop/v1/shareboard/${item.id}`)
        .then((response) => {
              console.log(response)
              console.log('삭제됨') //모달창으로 바꾸기
            //   window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        })
    }

    //수정값을 저장하는 부분
    interface UpdateData {
        title:string,
        content:string,
        place:string,
        price:number,
    }
    const [isEditing, setIsEditing] = useState(false); 
  
    const [editedData, setEditedData] = useState<UpdateData>({
            title: '',
            content: '',
            place: '',
            price: 0,
    });
    useEffect(() => {
        if (isEditing) {
            setEditedData({
                title: item.title,
                content: item.content,
                place: item.place,
                price: item.price,
            });
        }
    }, [isEditing, item]);
   

    //수정하러 가기버튼(수정/취소 버튼)
    const onModify=()=>{
        setIsEditing(!isEditing); 
    }

    //사진새로 등록하기
    const [tradeImage, setTradeImage] = useState<Blob | string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        
      };
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file=e.target.files?.[0];
        console.log('file',file)
        if (file) {
            setTradeImage(file);
            console.log('file',file)
        } else {
            setTradeImage('');
        }
      }
    


    //회원정보 수정제출버튼
    const onSave=()=>{
        try{
            if (!editedData) {
                return;
            }
            
            const url=`https://nengtul.shop/v1/shareboard/${item.id}`
            const shareBoardDto={
                title:editedData.title,
                content:editedData.content,
                place:editedData.place,
                price:editedData.price,
                lat:item.lat,
                lon:item.lon,
            }
            const formData = new FormData();
            console.log('image!!!',tradeImage)
            if (tradeImage instanceof Blob) {
                formData.append("image", tradeImage);
            }
            console.log('userUpdateDto:', shareBoardDto);
            console.log('image!!!',tradeImage)
            const blob=new Blob([JSON.stringify(shareBoardDto)],{
                type:'application/json'
            });
            formData.append("shareBoardDto", blob)
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            };

            axios.post(url,formData,config)
                .then((response) => {
                    console.log('response', response);
                    console.log('수정완료!'); // 모달창으로 바꾸기
                })
                .catch((error) => {
                    console.error(error);
                });
            }catch(err){
                console.log(err)
            }
    }  
    return (
      <PostDetailSection>
        {isEditing ? (
            <>
            <h2>Post Detail</h2>
            <p>Title: 
                <input 
                    value={editedData?.title}
                    onChange={(e) =>
                        setEditedData({
                        ...editedData,
                        title: e.target.value,
                        })
                    }
                />
            </p>
            <p>Place: 
                <input 
                    value={editedData?.place}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            place: e.target.value,
                        })
                    }
                />
            </p>
            <p>Content: 
                <input 
                    value={editedData?.content}
                    onChange={(e) =>
                        setEditedData({
                        ...editedData,
                        content: e.target.value,
                        })
                    }
                />
            </p>
            <p>가격: 
                <input 
                    value={editedData?.price}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            price: parseInt(e.target.value),
                        })
                    }
                />
            </p>
            <p>작성일: {item.createdAt}</p>
            <img src={item.shareImg}/>
            <ModifyProfileBtn onClick={handleButtonClick}>사진변경하기</ModifyProfileBtn>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} />
            <button  onClick={onModify}>취소</button >
            <button  onClick={onSave}>완료</button >
            </>
        ):(
            <>
            <h2>Post Detail</h2>
            <p>Title: {item.title}</p>
            <p>Place: {item.place}</p>
            <p>Content: {item.content}</p>
            <p>가격: {item.price}</p>
            <p>작성일: {item.createdAt}</p>
            <img src={item.shareImg}/>
            <button className='delete-btn' onClick={onDelete}>삭제</button >
            <button className='modify-btn' onClick={onModify}>수정</button >
            </>
        )}
  
      </PostDetailSection>
    );
  }
  
const PostDetailSection=styled.div`
  width:100%;
  background-color:green;
  h2{
    font-size:20rem
  }
  p{
    font-size:20rem;
  }
`
const ModifyProfileBtn=styled.button`
    width:40rem;
    height:40rem;
    font-size:37rem;
    color:white;
    background-color:red;
    border-radius:100%;
    // position: absolute;
    // top:210rem;
    // right:130rem;
    cursor:pointer;
    
`
  export default PostDetail;