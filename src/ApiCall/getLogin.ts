import axios from "axios";
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default async function getLogin(): Promise<Tokens | null> {
  const persistedData = sessionStorage.getItem("persist:root");
  console.log(persistedData);
  if (persistedData) {
    const parsedData = JSON.parse(persistedData) as {
      accessTokenValue: string;
      refreshTokenValue: string;
    };

    const accessTokenValue = parsedData.accessTokenValue.replace(/"/g, "");
    const refreshTokenValue = parsedData.refreshTokenValue.replace(/"/g, "");
    console.log(accessTokenValue);
    console.log(refreshTokenValue);

    const headers = {
      Authorization: `Bearer ${accessTokenValue}`,
      RefreshToken: `Bearer ${refreshTokenValue}`,
    };

    try {
      const response = await axios.get("/api/v1/auth/refresh", {
        withCredentials: true,
        headers: headers,
      });
      return {
        accessToken: response.data.AccessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    return null;
  }
}
