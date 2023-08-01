import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import getLogin from "../ApiCall/getLogin";
import { Link } from "react-router-dom";
//1.회원정보보여주기  2.회원정보 수정하기  3.회원 탈퇴하기
function UserInfomation  () {
    interface UserData {
        name: string;
        nickname: string;
        phoneNumber: string;
        profileImageUrl:string;
      }
    interface UpdateUserData {
        nickname: string;
        phoneNumber: string;
        profileImageUrl:string;
        // address:null;
        // addressDetail: null;
      }
    const [data, setData] = useState<UserData | null>(null);
    // const MY_TOKEN= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDgwNzY4NiwiZW1haWwiOiJiZXJyeTAxMTJAbmF2ZXIuY29tIn0._VjnOkwMuZdDbqwUXJD8TwUtKpH1CJGML0_VtY_vGAJznoMToeUxbpkxme-YwxyJKcdlxqNNHqmlxC5qJ98aJA'
    const MY_TOKEN = getLogin();
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
    const [editedData, setEditedData] = useState<UpdateUserData>({
        nickname: "",
        phoneNumber: "",
        profileImageUrl:"",
      });
    console.log('editiedData',editedData)
    const onModify=()=>{
        setEditing(!editing);
    }

    //회원정보 수정
    const onUpdate=()=>{
        try{
            const url="http://43.200.162.72:8080/v1/user/detail"
            const data ={
                nickname: editedData.nickname,
                phoneNumber: editedData.phoneNumber,
                profileImageUrl:editedData.profileImageUrl,
            }
            console.log('수정할데이터',data)
            axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
            axios.put(url, data)
            .then((response) => {
              console.log('response',response);
              console.log('수정완료!');
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
        axios.delete<UserData>('http://43.200.162.72:8080/v1/user/detail')
        .then((response) => {
              console.log(response)
        })
        .catch((error) => {
          console.error(error);
        })
    }
    return (
        <UserInfoArea>
        <UserPic src={data?.profileImageUrl}></UserPic>
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
            <ModifyButton onClick={onModify}>회원정보 수정하기</ModifyButton>
            <DeleteButton onClick={onDelete}>탈퇴하기</DeleteButton>
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
            </>
        )}
     
        </UserInfoArea>
    )
}
const UserInfoArea=styled.div`   
    margin-top: 70rem;

`
const UserPic=styled.img`
    width:130rem;
    height:130rem;
    border-radius:100%;
    background-color:gray;
    margin: 0 auto;
    margin-bottom:50rem;
    display:block;
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
export default UserInfomation