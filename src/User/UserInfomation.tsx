import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

//1.회원정보보여주기  2.회원정보 수정하기  3.회원 탈퇴하기
function UserInfomation  () {
    interface UserData {
        name: string;
        nickname: string;
        phoneNumber: string;
      }
    const [data, setData] = useState<UserData | null>(null);
    const MY_TOKEN= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDU0OTEzNCwiZW1haWwiOiJiZXJyeTAxMTJAbmF2ZXIuY29tIn0.E0vvsdJDPvbL5pWql6BKKg_hIa50EWNAe2YvlvxZ-Qztu3cw7MS4Q5rvss48BDTEd_zHsti5rtuq6dc0VK_rHg'



    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
        axios.get<UserData>('http://43.200.162.72:8080/v1/user/detail')
          .then((response) => {
                setData(response.data);
                setEditedData(response.data);
                // console.log(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    // console.log('data',data)

    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState<UserData>({
        name: "",
        nickname: "",
        phoneNumber: "",
      });
    console.log('editiedData',editedData)
    const onModify=()=>{
        setEditing(!editing);
    }
    return (
        <UserInfoArea>
        <UserPic></UserPic>
        {data && !editing && (
            <>
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
            </EachAreaPart>
            <ModifyButton onClick={onModify}>수정하기</ModifyButton>
            <DeleteButton>탈퇴하기</DeleteButton>
            </>
        )}
        {data && editing &&(
            <>
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
                        <input
                            style={{fontSize:'19rem', outline:'none', border:'none',color:'gray',height:'20rem',padding:'0'}}
                            value={editedData?.name}
                            onChange={(e) =>
                                setEditedData({
                                ...editedData,
                                name: e.target.value,
                                })
                            }
                        />
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
            <ModifyButton onClick={onModify} >완료</ModifyButton>
            </>
        )}
     
        </UserInfoArea>
    )
}
const UserInfoArea=styled.div`   
    margin-top: 90rem;

`
const UserPic=styled.div`
    width:130rem;
    height:130rem;
    border-radius:100%;
    background-color:gray;
    margin: 0 auto;
    margin-bottom:50rem;
`
const EachAreaPart=styled.div`   
   border-top: 1px solid rgb(239, 239, 239);
   border-bottom: 1px solid rgb(239, 239, 239);
   padding: 5rem 0;
`
const EachArea=styled.div`   
    display:flex;
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
export default UserInfomation