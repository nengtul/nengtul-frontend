import styled from "styled-components";
import { useEffect, useState, useRef,useCallback } from "react";
import axios from "axios";
import getLogin from "../ApiCall/getLogin";
import { Tokens } from "../ApiCall/getLogin";
import { Link } from "react-router-dom";
// import CertifyPage from "../FindAndCertify/CertifyPage"
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

      const getUserInfo = useCallback(async () => {
        try {
          const tokens: Tokens | null = await getLogin();
          if (tokens){
            const { accessToken} = tokens;
            console.log('여기1',accessToken)
            return accessToken
        
        } else{
            console.log('여기2')
            return null;
        }
        } catch (err) {
            console.log('여기3')
          console.error(err);
          return null;
        }
      }, []);

    // useEffect(() => {
    //     getUserInfo().catch((err) => {
    //       console.error(err);
    //     });
    //   },[]);  


    const [data, setData] = useState<UserData | null>(null);
    // const MY_TOKEN = getLogin();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const MY_TOKEN: string | null = await getUserInfo();
    //         console.log('여기4',MY_TOKEN)
    //         // const MY_TOKEN: string | null = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MTA0NjMzMiwiZW1haWwiOiJiZXJyeTAxMTJAbmF2ZXIuY29tIn0.m0KkFGwFSZvgPugjYUnyhC3d_40PqRwW8tTXimiMq90R-2SicQfEwXmyyB2FiSzsacNxPRJ9tcqh4vBi0GKCXg';
    //         if (MY_TOKEN) {
    //             console.log('여기에 들어왔나?',MY_TOKEN)
    //             axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
    //             axios.get<UserData>('https://nengtul.shop/v1/user/detail')
    //             .then((response) => {
    //                 setData(response.data);
    //                 setEditedData(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //         }
    //      }
    //     fetchData().catch((err)=>{
    //         console.error(err);
    //     });
    // },[]);
    useEffect(() => {
        getUserInfo()
        .then((MY_TOKEN: string | null) => {
            if (MY_TOKEN) {
                console.log('여기에 들어왔나?',MY_TOKEN)
                axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
                axios.get<UserData>('https://nengtul.shop/v1/user/detail')
                    .then((response) => {
                        setData(response.data);
                        setEditedData(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }else {
                console.error("토큰을 가져올 수 없습니다.");
              }

        })
        .catch((err) => {
          console.error(err);
        });
      }, []);


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
        // editedData.profileImage에 파일 정보 저장
        if (file) {
            setProfileImage(file);
            console.log('file',file)
          } else {
            setProfileImage('');
          }
        // console.log('file',editedData)
      }
     
    // console.log('여기는 이미지', profileImage);
     
    //회원정보 수정
    const onUpdate=()=>{
        try{
            const url="https://nengtul.shop/v1/user/detail"
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
        axios.delete<UserData>('https://nengtul.shop/v1/user/detail')
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
        axios.post(`https://nengtul.shop/v1/user/verify/reset/${data?.id}`)
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