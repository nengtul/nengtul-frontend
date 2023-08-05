import styled from "styled-components";
import axios from "axios";
import { useState,useRef,useEffect} from "react";
import {Item} from "./MyIngredientTradeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
            <div>
            <div className='btns'>
            <button  className="btn delete-btn" onClick={onModify}>취소</button >
            <button  className="btn modify-btn" onClick={onSave}>완료</button >
            </div>
            <p className="p"><span>제목</span> <br/> 
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
            <p className="p"><span>내용</span> <br/>
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
            <p className="p"><span>가격</span> <br/>
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
            <p className="p"><span>거래위치</span> <br/>
                <input 
                    value={editedData?.place}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            place: e.target.value,
                        })
                    }
                />
            </p >
            <div className="imgs">
            <img src={item.shareImg}/>
            <ModifyProfileBtn onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faPlus} />
            </ModifyProfileBtn>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} />
            </div>
            {/* <p className="date">{item.createdAt}</p> */}
            </div>
        ):(
            <>
            <div className='btns'>
                <button className='delete-btn btn' onClick={onDelete}>삭제</button >
                <button className='modify-btn btn' onClick={onModify}>수정</button >
            </div>
            <p className="p"><span>제목</span> <br/>{item.title}</p>
            <p className="p"><span>내용</span> <br/>{item.content}</p>
            <p className="p"><span>가격</span><br/> {item.price}원</p>
            <p className="p"><span>거래위치</span> <br/>{item.place}</p>
            <img src={item.shareImg}/>
            <p className="date"> {item.createdAt}</p>
            </>
        )}
  
      </PostDetailSection>
    );
  }
  
const PostDetailSection=styled.div`
    width:100%;
    background-color:#f3f3f3;
    padding:10rem 15rem;
    line-height:1.4;
    h2{
        font-size:20rem
    }
    .p{
        font-size:20rem;
        margin-bottom:7rem;
    }
    span{
        color:#38DB83;
        font-size: 20rem;
        font-weight:800;
        margin-bottom:3rem;
    }
    img{
        width:150rem;
        height:150rem;
    }
    .btn{
        font-size: 18rem;
        padding:4rem 10rem;
        margin:3rem;
        color:white;
        
    }
    .btns{
        position:relative;
        display:inline-block;
        right:5rem;
        margin-bottom:5rem;
    }
    .date{
        display:inline-block;
        font-size:15rem;
        position:relative;
        right:-85rem;
    }
    input{
        font-size: 20rem;
        outline:none;
        border:none;
        color:gray;
        padding:5rem;
    }
    .imgs{
        display:flex;
        align-items: flex-end
    }
    .delete-btn{
        background-color:rgb(254, 98, 98);
    }
    .modify-btn{
        background-color:rgb(96, 149, 255);
    }
`
const ModifyProfileBtn=styled.button`
    cursor:pointer;
    width: 50px;
    height: 50px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid #38DB83;
    font-size:20rem;
    color:#38DB83;
    margin-left:5rem;

    
`
  export default PostDetail;