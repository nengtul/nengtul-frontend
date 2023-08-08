import styled from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {useState, useRef} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { NOTICES_URL } from "../url";
function NoticeWriteWrap(){
    //토큰가져오기
    const Token=useSelector((state: RootState)=>state.accessTokenValue)
    const {accessTokenValue}=Token;
    const MY_TOKEN=accessTokenValue;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<Blob[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageArray: Blob[] = Array.from(files).map((file) => file); 
            setImages(prevImages => [...prevImages, ...imageArray]);
        } else {
            setImages([]);
        }
    };
    console.log(images)

    //글 작성하기
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>): void=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title=formData.get('title') as string;
        const content=formData.get('content') as string;
        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
            const url= NOTICES_URL ;
            const noticeReqDto={
                title: title,
                content: content,
            }
            console.log('images!!!',images)
            
            if (images.length > 0) {
                images.forEach((image) => {
                if (image instanceof Blob) {
                    formData.append("images", image);
                }
                });
            }
            
            console.log('noticeReqDto:', noticeReqDto);
            console.log('image!!!',images)
            const blob=new Blob([JSON.stringify(noticeReqDto)],{
                type:'application/json'
            });
            formData.append("noticeReqDto", blob)
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
        } catch(err){
          console.log(err)
        }
      }
    return (
        <Wrap>
            <h2>공지사항 작성하기</h2>
            <WriteWrap>
            
                <form onSubmit={handleSubmit}>
                    <div>
                    <h4>제목</h4>
                    <input type="text" name="title" placeholder="제목을 입력해주세요." />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                    <h4>내용</h4>
                    <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
                    </div>
                    
                    <div className="input-file">
                        <label htmlFor="img-file">
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                        <input type="file" id="img-file" accept="image/*"  ref={fileInputRef} onChange={handleImageChange} multiple/>
                    </div>
                    {images.length > 0 && (
                        <div className="new-images-container">
                            {images.map((newImageUrl, index) => (
                                <div key={index} className="new-image-container">
                                    <img src={URL.createObjectURL(newImageUrl)} alt={`New Notice ${index}`} />
                                </div>
                            ))}
                        </div>
                    )}
        

                    <SubmitBtn type="submit" >
                        작성하기
                    </SubmitBtn>
                </form>
            </WriteWrap>
        </Wrap>
    );
}

const Wrap=styled.div`
    h2{
        font-size:25rem;
        color: ${theme.colors.main};
        padding:15rem 5rem 10rem 15rem;
    }
`
  const WriteWrap = styled.div`
    width: 92%;
    margin: 0 auto;
    padding: 20px 0px 20px;
   
    h4 {
      font-size: 16rem;
      font-weight: 800;
      color: ${theme.colors.main};
    }
  
    input[type="text"] {
      width: 100%;
      padding: 10px;
      margin-top: 4px;
      border: 1px solid #b0b0b0;
      border-radius: 5px;
  
      &:focus {
        outline: none;
        border: 1px solid #00ff75;
      }
    }
  
    textarea {
      width: 100%;
      min-height: 400px;
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #b0b0b0;
      margin-top: 4px;
  
      &:focus {
        outline: none;
        border: 1px solid #00ff75;
      }
    }
  
    .price-chk {
      display: flex;
      margin: 20px 0px 4px;
      span {
        font-size: 14rem;
        color: #b0b0b0;
        padding-left: 4px;
      }
      label {
        width: 16px;
        height: 16px;
        border-radius: 2px;
        display: inline-block;
        border: 1px solid ${theme.colors.main};
      }
      input:checked + label {
        background-color: ${theme.colors.main};
      }
      #chk-box {
        display: none;
      }
    }
    .input-file {
        justify-content: center;
        display: flex;
        align-items: center;
        margin: 20px 0;
        label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 300px;
            border: 2px solid ${theme.colors.main};
            height: 70px;
            border-radius: 5px;
            cursor: pointer;
            color: ${theme.colors.main};
            font-size: 30rem;
        }
        input[type="file"] {
            display: none;
        }
        span {
            font-size: 13rem;
            color: #817f7f;
            margin-left: 4px;
        }
    }
    img{
        width:95%;
        display:block;
        margin: 10rem auto;  
    }
  `;
  
  const SubmitBtn = styled.button`
    width: 100%;
    background-color: #38db83;
    font-size: 20rem;
    font-weight: bold;
    color: #fff;
    padding: 13px 0px;
    margin-top: 40px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  `;

export default NoticeWriteWrap