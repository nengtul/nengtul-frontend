export default function getLogin(): string | null {
  const persistedData = localStorage.getItem("persist:root");

  if (persistedData) {
    const parsedData = JSON.parse(persistedData) as { accessTokenValue: string };

    const accessTokenValue = parsedData.accessTokenValue;
    if (accessTokenValue) {
      const accessTokenWithoutQuotes = accessTokenValue.replace(/^"(.*)"$/, "$1");
      return accessTokenWithoutQuotes;
    } else {
      return null;
    }
  } else {
    return null; // 저장된 데이터가 없을 경우 null을 반환
  }
}
