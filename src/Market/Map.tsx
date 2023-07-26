import { useEffect, useState, ReactNode } from "react";
const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_APP_KEY = "b762e38f98faa6f9dc8ad7dfc173b261";

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
}
export default function Map(props: KakaoMapScriptLoaderProps) {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      setMapScriptLoaded(false);
    };
    document.getElementById("root")?.appendChild(script);
  }, []);
  return <>{mapScriptLoaded ? props.children : <div>지도를 가져오는 중입니다. </div>}</>;
}
