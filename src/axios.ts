import axios, { AxiosError } from "axios";
import { REFRESH_URL } from "./url";
import { setTokens } from "./Store/reducers";
import type { PayloadAction } from "@reduxjs/toolkit";

const getRefresh = (
  token: string,
  refreshToken: string
): Promise<{ AccessToken: string; refreshToken: string }> => {
  const refreshUrl = REFRESH_URL;
  const headers = {
    withCredentials: true,
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
  token: string,
  dispatch: (
    action: PayloadAction<{ accessToken: string | null; refreshToken: string | null }>
  ) => void,
  refreshToken: string
): Promise<T> => {
  const headers = {
    withCredentials: true,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get<T>(url, { headers });
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
      const headers = {
        withCredentials: true,
        Authorization: `Bearer ${newToken.AccessToken}`,
      };
      const newResponse = await axios.get<T>(url, { headers });
      return newResponse.data;
    }

    throw error;
  }
};

export const getData = <T>(url: string, token?: string): Promise<T> => {
  let headers;
  if (token) {
    headers = {
      withCredentials: true,
      Authorization: `Bearer ${token}`,
    };
  }
  return axios
    .get<T>(url, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteData = <T>(url: string, token?: string): Promise<T> => {
  let headers;
  if (token) {
    headers = {
      withCredentials: true,
      Authorization: `Bearer ${token}`,
    };
  }
  return axios
    .delete<T>(url, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteTokenData = async <T>(
  url: string,
  token: string,
  dispatch: (
    action: PayloadAction<{ accessToken: string | null; refreshToken: string | null }>
  ) => void,
  refreshToken: string
): Promise<T> => {
  const headers = {
    withCredentials: true,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.delete<T>(url, { headers });
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
      const headers = {
        withCredentials: true,
        Authorization: `Bearer ${newToken.AccessToken}`,
      };
      const newResponse = await axios.delete<T>(url, { headers });
      return newResponse.data;
    }

    throw error;
  }
};

export const updateData = <T>(url: string, formData: object, token?: string): Promise<T> => {
  const headers = token
    ? {
        withCredentials: true,
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "multipart/form-data",
      };

  return axios
    .post<T>(url, formData, { headers })
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
  let headers;
  if (token) {
    headers = {
      withCredentials: true,
      Authorization: `Bearer ${token}`,
    };
  }
  return axios
    .post<T>(url, data, { headers })
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
  let headers;
  if (token) {
    headers = {
      withCredentials: true,
      Authorization: `Bearer ${token}`,
    };
  }

  return axios
    .put<T>(url, data, { headers })
    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const putTokenData = async <T>(
  url: string,
  data: object,
  token: string,
  dispatch: (
    action: PayloadAction<{ accessToken: string | null; refreshToken: string | null }>
  ) => void,
  refreshToken: string
): Promise<T> => {
  const headers = {
    withCredentials: true,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put<T>(url, data, { headers });
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
      const headers = {
        withCredentials: true,
        Authorization: `Bearer ${newToken.AccessToken}`,
      };
      const newResponse = await axios.put<T>(url, data, { headers });
      return newResponse.data;
    }

    throw error;
  }
};
