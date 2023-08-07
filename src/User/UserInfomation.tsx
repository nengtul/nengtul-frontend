import styled from "styled-components";
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { USER_DETAIL_URL } from "../url";
//1.회원정보보여주기  2.회원정보 수정하기  3.회원 탈퇴하기
function UserInfomation  () {
    interface UserData {
        name: string;
        nickname: string;
        phoneNumber: string;
        profileImageUrl:string;
        emailVerifiedYn:boolean;
        id:number;
    }
    interface UpdateUserData {
        nickname: string;
        phoneNumber: string;
    }
    const Token=useSelector((state: RootState)=>state.accessTokenValue)
    console.log(Token)
    const {accessTokenValue}=Token;
    const MY_TOKEN=accessTokenValue
    // const storedData = sessionStorage.getItem("persist:root");
    // const parsedData = JSON.parse(storedData?.replace(/\\"/g, ''));
    // const MY_TOKEN = parsedData?.accessTokenValue;
    // console.log("이거 안뜨면 안디는디",MY_TOKEN)
    



   
    const [data, setData] = useState<UserData | null>(null);
    // const MY_TOKEN = getLogin();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //이거는 session할때 필요한 애ㅡ들
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        axios.get<UserData>(USER_DETAIL_URL)
          .then((response) => {
                setData(response.data);
                setEditedData(response.data);
          })
          .catch((error) => {
            console.error(error);
    });},[])

   


    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState<UpdateUserData>({
        nickname: "",
        phoneNumber: "",
      });
    const [profileImage, setProfileImage] = useState<Blob | string>('');
    console.log('editiedData',editedData)
    const onModify=()=>{
        setEditing(!editing);
    }
    // console.log('이거 확인해봐',data)
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
            setProfileImage(file);
            console.log('file',file)
          } else {
            setProfileImage('');
          }

      }
     
 
     
    //회원정보 수정
    const onUpdate=()=>{
        try{
            const url=USER_DETAIL_URL;
            const userUpdateDto = {
                nickname: editedData.nickname,
                phoneNumber: editedData.phoneNumber,
              };
            const formData = new FormData();
            console.log('image!!!',profileImage)
            if (profileImage instanceof Blob) {
                formData.append("image", profileImage);
              }
            console.log('image!!!',profileImage)
            console.log('userUpdateDto:', userUpdateDto);
            
            
           const blob=new Blob([JSON.stringify(userUpdateDto)],{
            type:'application/json'
           });
           formData.append("userUpdateDto", blob)
           const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          axios.post(url,formData,config)
          .then((response) => {
            console.log('response', response);
            console.log('수정완료!'); // 모달창으로 바꾸기
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
        }catch (err) {
            console.log(err)
        }
    }
    //회원정보 삭제
    const onDelete=()=>{
        axios.delete<UserData>(USER_DETAIL_URL)
        .then((response) => {
              console.log(response)
                console.log('탈퇴되었습니다')//모달창으로 바꾸기
        })
        .catch((error) => {
          console.error(error);
        })
    }

    //이메일 인증
    const onVerify=()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        // axios.post(`${USER_VERIFY_RESET_URL}/${data?.id}`)
        axios.post(`/api/v1/users/${data?.id}/verify/reset `)
        .then((response) => {
              console.log(response)
              console.log('인증메일이 전송됨') //모달창으로 바꾸기
              window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        })
    }
    console.log('data',data)
    return (
        <UserInfoArea>
        {data && !editing && (
            <>
            <UserPic src={data?.profileImageUrl}></UserPic>
            <EachAreaPart>
                <EachArea>
                    <Category>닉네임</Category>
                    <UserNickName>{data.nickname}</UserNickName>
                </EachArea>
                <EachArea>
                    <Category>이름</Category>
                    <UserName>{data.name}</UserName>
                </EachArea>
                <EachArea>
                    <Category>전화번호</Category>
                    <UserPhoneNumber>{data.phoneNumber}</UserPhoneNumber>
                </EachArea>
                <EachArea>
                    <Category>메일인증</Category>
                    
                        {data.emailVerifiedYn===false?(
                            <Verify onClick={onVerify}>인증하기</Verify>
                        ):(
                            <VerifyCheck>인증됨</VerifyCheck>
                        )}
                    
                </EachArea>
            </EachAreaPart>
            <ModifyButton onClick={onModify}>회원정보 수정하기</ModifyButton>
            <DeleteButton onClick={onDelete}>탈퇴하기</DeleteButton>
            </>
        )}
        {data && editing &&(
            <>
            <form>
            <UserPic src={data?.profileImageUrl}></UserPic>
            <ModifyProfileBtn onClick={handleButtonClick}>+</ModifyProfileBtn>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} />
            <EachAreaPart>
                <EachArea>
                    <Category>닉네임</Category>
                    <UserNickName style={{color:'red'}}>
                        <input
                             style={{fontSize:'19rem', outline:'none', border:'none',color:'gray' ,height:'20rem',padding:'0'}}
                            value={editedData?.nickname}
                            onChange={(e) =>
                                setEditedData({
                                ...editedData,
                                nickname: e.target.value,
                                })
                            }
                        />
                    </UserNickName>
                </EachArea>
                <EachArea>
                    <Category>이름</Category>
                    <UserName>  
                        {data.name}
                    </UserName>
                </EachArea>
                <EachArea>
                    <Category>전화번호</Category>
                    <UserPhoneNumber>
                        <input
                            style={{fontSize:'19rem', outline:'none', border:'none',color:'gray',height:'20rem',padding:'0'}}
                            value={editedData?.phoneNumber}
                            onChange={(e) =>
                                setEditedData({
                                ...editedData,
                                phoneNumber: e.target.value,
                                })
                            }
                        />
                    </UserPhoneNumber>
                </EachArea>
            </EachAreaPart>
            <Link to="/changePassword"><PasswordButton>비밀번호 변경하기</PasswordButton></Link>
            <UpdateButton onClick={onUpdate} >완료</UpdateButton>
            <ModifyButton onClick={onModify} >취소</ModifyButton>
            </form>
            </>
        )}
     
        </UserInfoArea>
    )
}
const UserInfoArea=styled.div`   
    margin-top: 60rem;

`
const UserPic=styled.img`
    width:130rem;
    height:130rem;
    border-radius:100%;
    background-color:gray;
    margin: 0 auto;
    margin-bottom:50rem;
    display:block;
    position:relative;
`
const EachAreaPart=styled.div`   
   border-top: 1px solid rgb(239, 239, 239);
   border-bottom: 1px solid rgb(239, 239, 239);
   padding: 5rem 0;
`
const EachArea=styled.div`   
    display:flex;
    align-items: center
`
const Category=styled.div`   
    font-size:20rem;
    width:120rem;
    padding: 20rem 20rem;
`
const UserNickName=styled.div`
    font-size:20rem;
    border-bottom:1px solid rgb(239, 239, 239);
    padding: 20rem 0rem;
    width:60%;
    
`
const UserName=styled.div`
    font-size:20rem;
    border-bottom:1px solid rgb(239, 239, 239);
    padding: 20rem 0rem;
    width:60%;
    
`

const UserPhoneNumber=styled.div`
    font-size:20rem;
    padding: 20rem 0rem;
    width:60%;
    
`

const ModifyButton=styled.div`
    cursor:pointer;
    background-color:#38DB83;
    color:white;
    width:70%;
    text-align:center;
    padding:20rem 40rem ;
    font-size:20rem;
    margin: 30rem auto;
    margin-bottom:0;
    border-radius:40rem;
`
const DeleteButton=styled.div`
    cursor:pointer;
    color:#38DB83;
    width:70%;
    text-align:center;
    padding:20rem 40rem ;
    font-size:20rem;
    margin: 30rem auto;
    border:1px solid #38DB83;
    border-radius:40rem;
`
const UpdateButton=styled.div`
    cursor:pointer;
    color:#38DB83;
    width:70%;
    text-align:center;
    padding:20rem 40rem ;
    font-size:20rem;
    margin: 30rem auto 10rem auto;
    border:1px solid #38DB83;
    border-radius:40rem;
`
const PasswordButton=styled.div`
    cursor:pointer;
    color:#38DB83;
    width:70%;
    text-align:center;
    padding:20rem 40rem ;
    font-size:20rem;
    margin: 10rem auto;
    border:1px solid #38DB83;
    border-radius:40rem;
`

const Verify=styled.div`
    width:25%;
    background-color:#5b90fb;
    font-size:20rem;
    color:white;
    text-align:center;
    height:40rem;
    border-radius:10rem;
    padding-top:10rem;
    cursor:pointer;
`

const VerifyCheck=styled.div`
    color:#5b90fb;
    font-size:20rem;
    padding:10rem;
    border-radius:10rem;
    border:1px solid #5b90fb;
`

const ModifyProfileBtn=styled.button`
    width:40rem;
    height:40rem;
    font-size:37rem;
    color:white;
    background-color:pink;
    border-radius:100%;
    position: absolute;
    top:210rem;
    right:130rem;
    cursor:pointer;
    
`
export default UserInfomation