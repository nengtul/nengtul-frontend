import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setTokens } from "../Store/reducers";
import Modal from "../common/Modal";

interface ServerResponse {
  AccessToken: string;
  refreshToken: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState<{ error: AxiosError | null }>({ error: null });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin().catch((err) => {
      console.error(err);
    });
  };

  const handleLogin = async () => {
    try {
      const url = "http://43.200.162.72:8080/v1/user/login";
      const data = {
        email: email,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json",
        // application/json 기능 찾아보기
      };

      const response = await axios.post<ServerResponse>(url, data, {
        withCredentials: true, //withCredentials
        headers: headers,
      });
      console.log(response.data.AccessToken);
      console.log(response.data.refreshToken);
      console.log(response);
      dispatch(
        setTokens({
          accessToken: response.data.AccessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      navigate("/");
    } catch (err) {
      console.error("로그인 요청 실패", err);
      setModalOpen({ error: err as AxiosError }); // true가 아닌 객체로 상태 전달
    }
  };

  const handleCloseModal = () => {
    setModalOpen({ error: null });
  };

  return (
    <>
      {modalOpen.error && (
        <Modal error={modalOpen.error} onClose={handleCloseModal} title="로그인"></Modal>
      )}
      <InputAndButton onSubmit={handleSubmit}>
        <SquareInput id="id">
          <IdInputWrapper>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </IdInputWrapper>
        </SquareInput>
        <SquareInput id="password">
          <PasswordInputWrapper>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </PasswordInputWrapper>
        </SquareInput>

        <Button>
          <SquareButton id="login" type="submit">
            로그인
          </SquareButton>
        </Button>
        <Link to="/newUser">
          <Button>
            <SquareButton id="newUser">회원가입</SquareButton>
          </Button>
        </Link>
      </InputAndButton>
    </>
  );
}

const SquareInput = styled.div`
  width: 90%;
  height: 54rem;
  background-color: #38db83;
  border: 2rem solid white;
  border-radius: 4rem;
  margin: 0 auto;
  margin-bottom: 3%;
`;

const IdInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;
    font-size: 16rem;
    background-color: #38db83;
    // background-color: red;
    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;

    font-size: 16rem;
    background-color: #38db83;

    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const SquareButton = styled.button`
  width: 100%;
  // height: 100%;
  height: 51rem;
  background-color: white;
  border: 2rem solid white;
  border-radius: 4rem;

  font-size: 20rem;
  font-weight: 700;
  color: #38db83;
  text-align: center;
  cursor: pointer;
  &:first-of-type {
    margin-top: 16rem;
  }
`;
const Button = styled.div`
  width: 90%;
  height: 6%;
  margin: 0 auto;
  position: relative;
`;
const InputAndButton = styled.form`
  width: inherit;
  height: inherit;
  margin-top: 30rem;
`;
