import { useEffect, useState, ReactNode } from "react";
const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_APP_KEY = "9542ff19f956b37363005f4b1adb6dbf";

////뭘 한건진 모르겠지만 이렇게 코드 추가하니까 window.kakao.maps.load 여기에 있던 빨간줄이 해결됨
// declare global {
//     interface Window {
//       kakao: KakaoNamespace;
//     }
//   }

// interface KakaoNamespace {
//     maps: KakaoMaps;
// }
// interface KakaoMaps {
//     load(callback: () => void): void;

// }
//---이까지

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
