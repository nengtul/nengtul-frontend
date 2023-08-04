import styled from "styled-components";
import theme from "../common/theme";
import TrandingLocation from "./TrandingLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios  from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/tradeStore";
import {useState, useRef} from "react";
import { SHAREBOARD_URL } from "../url";
export default function WriteForm() {
  const LatLng=useSelector((state: RootState)=>state.latlngInfo)
  console.log('뭐뜨냐',LatLng)
  const {moveLatitude,moveLongitude}=LatLng;
  //거래위치 props로 받아옴
  const [locationInfo, setLocationInfo] = useState<string>("");
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInfo(e.target.value);
  };
  console.log('거래장소',locationInfo)

  //이미지
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const  [tradeImage, setTradeImage]= useState<Blob |"">(""); //사진 한장
  const [tradeImage, setTradeImage] = useState<Blob | null>(null);
  // const [tradeImage, setTradeImage] = useState<Blob[]>([]); //사진 여러장
  //사진 한장일때 handleImageChange
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file=e.target.files?.[0];
    console.log('file',file)
    if (file) {
        setTradeImage(file);
        console.log('file',file)
      } else {
        // setTradeImage("");
        setTradeImage(null);
      }
      
  }
  const imageURL = tradeImage ? URL.createObjectURL(tradeImage) : null;
  //사진 여러장일때
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const imageArray: Blob[] = Array.from(files).map((file) => file);
  //     setTradeImage(imageArray);
  //   } else {
  //     setTradeImage([]);
  //   }
  // };
  // console.log('사진여러장 어떻게 들어가나 확인용',tradeImage)
  //이미지+shareBoardDto 같이 보내기
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>): void=>{
    e.preventDefault();
    console.log('클릭됨')
    const formData = new FormData(e.currentTarget);
    const title=formData.get('title') as string;
    const content=formData.get('content') as string;
    const price=formData.get('price') as string;
    const latitude=moveLatitude;
    const longitude=moveLongitude;
    const place= locationInfo;

    //토큰가져오기
    const storedData = sessionStorage.getItem("persist:root");
    const parsedData = JSON.parse(storedData?.replace(/\\"/g, ''));
    const MY_TOKEN = parsedData?.accessTokenValue;
    console.log('MY_TOKEN',MY_TOKEN)
    
    try{
      axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
      const url=SHAREBOARD_URL;
      const shareBoardDto={
        title: title,
        content: content,
        place: place,
        price: Number(price),
        lat: latitude,
        lon:longitude,
      }
      console.log('image!!!',tradeImage)
      //사진 한장일때
      if (tradeImage instanceof Blob) {
        formData.append("image", tradeImage);
      }
      //사진 여러장일때
      // if (tradeImage.length > 0) {
      //   tradeImage.forEach((image) => {
      //     if (image instanceof Blob) {
      //       formData.append("images", image);
      //     }
      //   });
      // }

      console.log('shareBoardDto:', shareBoardDto);
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
    } catch(err){
      console.log(err)
    }
  }
  
  return (
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
          <div className="price-chk">
            <input type="checkbox" id="chk-box" />
            <label htmlFor="chk-box"></label>
            <span>무료 나눔이라면 체크해주세요!</span>
          </div>
          <input type="text" name="price" placeholder="가격을 입력해주세요." />
          <div className="input-file">
            <label htmlFor="img-file">
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input type="file" id="img-file" accept="image/*"  ref={fileInputRef} onChange={handleImageChange} />
            {tradeImage instanceof Blob ? <img src={imageURL || ""} alt="recipe-img" /> : <></>}
            {tradeImage ? <></> : <span>* 이미지를 업로드해 주세요.</span>}
          </div>

          <TrandingLocation location={locationInfo} onLocationChange={handleLocationChange}/>
          <SubmitBtn type="submit" >
              작성하기
          </SubmitBtn>
        </form>
      </WriteWrap>
  );
}

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
    min-height: 120px;
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
    display: flex;
    align-items: center;
    margin-top: 20px;
    label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 70px;
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
    img{
      width:70rem;
      height:70rem;
      margin-left:5rem;
    }
   
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
