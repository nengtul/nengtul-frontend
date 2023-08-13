import axios, { AxiosError } from "axios";
import { REFRESH_URL } from "./url";
import { setTokens } from "./Store/reducers";

const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

interface SetTokensAction {
  type: string;
  accessToken: string;
  refreshToken: string;
}

const getRefresh = (
  token: string,
  refreshToken: string
): Promise<{ AccessToken: string; refreshToken: string }> => {
  const refreshUrl = REFRESH_URL;
  const headers = {
    Authorization: `Bearer ${token}`,
    RefreshToken: `Bearer ${refreshToken}`,
  };

  return axios
    .get<{ AccessToken: string; refreshToken: string }>(refreshUrl, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getTokenData = async <T>(
  url: string,
  token?: string,
  dispatch?: (action: SetTokensAction) => void,
  refreshToken?: string
): Promise<T> => {
  if (token) {
    setAuthorizationHeader(token);
  }

  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401 && token && refreshToken) {
      const newToken = await getRefresh(token, refreshToken);
      if (dispatch) {
        dispatch(
          setTokens({
            accessToken: newToken.AccessToken,
            refreshToken: newToken.refreshToken,
          })
        );
      }
      setAuthorizationHeader(newToken.AccessToken);
      const newResponse = await axios.get<T>(url);
      return newResponse.data;
    }

    throw error;
  }
};

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
