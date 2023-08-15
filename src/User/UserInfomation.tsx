import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../Store/store";
import { USER_DETAIL_URL } from "../url";
import { useDispatch } from "react-redux";
import { getTokenData, deleteData, updateData } from "../axios";
import { useNavigate } from "react-router-dom";
import defaultThumb from "../assets/common/defaultThumb.svg";
import OkModal from "../Modal/OkModal";
import ComfirmModal from "../Modal/ConfirmModal";
import { setTokens } from "../Store/reducers";
import { PURGE } from "redux-persist";

//1.회원정보보여주기  2.회원정보 수정하기  3.회원 탈퇴하기
export interface UserData {
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImageUrl: string;
  emailVerifiedYn: boolean;
  id: number;
  roles: string;
}
interface UpdateUserData {
  nickname: string;
  phoneNumber: string;
}

function UserInfomation() {
  const navigate = useNavigate();
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  console.log(Token);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;
  const dispatch = useDispatch();

  const [okModalOpen, setokModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    if (MY_TOKEN !== null) {
      deleteData<UserData>(USER_DETAIL_URL, MY_TOKEN)
        .then(() => {
          dispatch(setTokens({ accessToken: null, refreshToken: null }));
          dispatch({ type: PURGE, key: ["root"], result: () => null });
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("roles");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [data, setData] = useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    console.log("내 토큰", MY_TOKEN);
    if (MY_TOKEN && REFRESH_TOKEN) {
      getTokenData<UserData>(USER_DETAIL_URL, MY_TOKEN, dispatch, REFRESH_TOKEN)
        .then((userData: UserData) => {
          console.log(userData);
          setData(userData);
          setEditedData(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState<UpdateUserData>({
    nickname: "",
    phoneNumber: "",
  });
  const [profileImage, setProfileImage] = useState<Blob | string>("");
  console.log("editiedData", editedData);
  const onModify = () => {
    setEditing(!editing);
  };
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (file) {
      setProfileImage(file);
      console.log("file", file);
    } else {
      setProfileImage("");
    }
  };

  //회원정보 수정
  const onUpdate = () => {
    try {
      // const url=USER_DETAIL_URL;
      const userUpdateDto = {
        nickname: editedData.nickname,
        phoneNumber: editedData.phoneNumber,
      };

      const formData = new FormData();

      if (profileImage instanceof Blob) {
        formData.append("image", profileImage);
      }

      const blob = new Blob([JSON.stringify(userUpdateDto)], {
        type: "application/json",
      });

      formData.append("userUpdateDto", blob);

      if (MY_TOKEN !== null) {
        updateData(USER_DETAIL_URL, formData, MY_TOKEN)
          .then((data) => {
            console.log(data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //회원정보 삭제
  const onDelete = () => {
    setModalOpen(true);
  };

  //이메일 인증
  const onVerify = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${MY_TOKEN}`;
    axios
      .post(`https://nengtul.shop/v1/users/${data?.id}/verify/reset `)
      .then((response) => {
        console.log(response);
        console.log("인증메일이 전송됨"); //모달창으로 바꾸기
        setokModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log("data", data);
  return (
    <UserInfoArea>
      {okModalOpen && (
        <OkModal
          setokModalOpen={setokModalOpen}
          title={"레시피 저장"}
          okModalText={"메일로 인증 링크를 보냈습니다."}
        />
      )}
      {modalOpen && <ComfirmModal closeModal={closeModal} handleDelete={handleDelete} />}
      {data && !editing && (
        <>
          <div className="thumb-img">
            <UserPic src={data?.profileImageUrl || defaultThumb}></UserPic>
          </div>
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

              {data.emailVerifiedYn === false ? (
                <Verify onClick={onVerify}>인증하기</Verify>
              ) : (
                <VerifyCheck>인증완료</VerifyCheck>
              )}
            </EachArea>
          </EachAreaPart>
          <ModifyButton onClick={onModify}>회원정보 수정하기</ModifyButton>
          <DeleteButton onClick={onDelete}>회원 탈퇴하기</DeleteButton>
        </>
      )}
      {data && editing && (
        <>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div className="thumb-img">
              <UserPic src={data?.profileImageUrl || defaultThumb}></UserPic>
            </div>
            <ModifyProfileBtn onClick={handleButtonClick}>+</ModifyProfileBtn>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <EachAreaPart>
              <EachArea>
                <Category>닉네임</Category>
                <UserNickName style={{ color: "red" }}>
                  <input
                    style={{
                      fontSize: "14rem",
                      outline: "none",
                      border: "none",
                      color: "gray",
                      height: "20rem",
                      padding: "0",
                    }}
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
                <UserName>{data.name}</UserName>
              </EachArea>
              <EachArea>
                <Category>전화번호</Category>
                <UserPhoneNumber>
                  <input
                    style={{
                      fontSize: "14rem",
                      outline: "none",
                      border: "none",
                      color: "gray",
                      height: "20rem",
                      padding: "0",
                    }}
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
            <Link
              to="/changePassword"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PasswordButton>비밀번호 변경하기</PasswordButton>
            </Link>
            <UpdateButton onClick={onUpdate}>완료</UpdateButton>
            <ModifyButton onClick={onModify}>취소</ModifyButton>
          </form>
        </>
      )}
    </UserInfoArea>
  );
}
const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .thumb-img {
    padding: 30px 0px;
  }
`;
const UserPic = styled.img`
  width: 130rem;
  height: 130rem;
  border-radius: 100%;
  background-color: gray;
  margin: 0 auto;
  display: block;
  position: relative;
`;
const EachAreaPart = styled.ul`
  width: 92%;
  box-shadow: 0px 0px 3px #2f2b2b;
  border-radius: 10px;
  overflow: hidden;
`;
const EachArea = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  height: auto;
`;
const Category = styled.div`
  font-size: 14rem;
  font-weight: 800;
  width: 120rem;
  height: 55px;
  padding: 10px 0px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserNickName = styled.div`
  font-size: 14rem;
  font-weight: 700;
  width: calc(100% - 120rem);
  padding: 0px 10px;
`;
const UserName = styled.div`
  font-size: 14rem;
  font-weight: 700;
  width: calc(100% - 120rem);
  padding: 0px 10px;
`;

const UserPhoneNumber = styled.div`
  font-size: 14rem;
  font-weight: 700;
  width: calc(100% - 120rem);
  padding: 0px 10px;
`;

const ModifyButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: #38db83;
  color: white;
  text-align: center;
  font-size: 16rem;
  font-weight: 800;
  padding: 14px 0px;
  width: 92%;
  margin-top: 10px;
`;
const DeleteButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: #fc8f6c;
  color: #fff;
  text-align: center;
  font-size: 16rem;
  font-weight: 800;
  padding: 14px 0px;
  width: 92%;
  margin-top: 10px;
`;
const UpdateButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: #38db83;
  color: white;
  text-align: center;
  font-size: 16rem;
  font-weight: 800;
  padding: 14px 0px;
  width: 92%;
  margin-top: 10px;
`;
const PasswordButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: #38db83;
  color: white;
  text-align: center;
  font-size: 16rem;
  font-weight: 800;
  padding: 14px 0px;
  width: 92%;
  margin-top: 10px;
`;

const Verify = styled.div`
  color: #fff;
  font-size: 14rem;
  font-weight: 700;
  padding: 8rem 12rem;
  border-radius: 10rem;
  background-color: #5b90fb;
  margin-left: 10px;
  cursor: pointer;
`;

const VerifyCheck = styled.div`
  color: #fff;
  font-size: 14rem;
  font-weight: 700;
  padding: 8rem 12rem;
  border-radius: 10rem;
  background-color: #5b90fb;
  margin-left: 10px;
`;

const ModifyProfileBtn = styled.button`
  width: 40rem;
  height: 40rem;
  font-size: 37rem;
  color: white;
  background-color: pink;
  border-radius: 100%;
  position: absolute;
  top: 180rem;
  right: 130rem;
  cursor: pointer;
`;
export default UserInfomation;
