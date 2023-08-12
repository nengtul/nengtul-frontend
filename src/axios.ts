import axios from "axios";
// import { REFRESH_URL } from "./url";

const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// const refreshToken = (token: string, refreshToken: string): Promise<string> => {
//   const refreshUrl = REFRESH_URL;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     RefreshToken: `Bearer ${refreshToken}`,
//   };

//   return axios
//     .get<{ access_token: string }>(refreshUrl, { headers })
//     .then((response) => response.data.access_token)
//     .catch((error) => {
//       throw error;
//     });
// };

export const getData = <T>(url: string, token?: string): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }
  return axios
    .get<T>(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteData = <T>(url: string, token?: string): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }
  return axios
    .delete<T>(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateData = <T>(url: string, formData: object, token?: string): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post<T>(url, formData, config)
    .then((response) => {
      console.log("response", response);
      console.log("수정완료!"); // 모달창으로 바꾸기
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
export const simpleUpdateData = <T>(url: string, data?: object, token?: string): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }

  return axios
    .post<T>(url, data)
    .then((response) => {
      console.log("response", response); // 모달창으로 바꾸기
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const putData = <T>(url: string, data: object, token?: string): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }

  return axios
    .put<T>(url, data)
    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
