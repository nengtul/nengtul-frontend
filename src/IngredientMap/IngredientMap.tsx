import { useRef, useEffect, useCallback } from "react";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import { LatLng, Map, Marker } from "kakao-maps";
import axios from "axios";

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: typeof LatLng;
        Map: typeof Map;
        Marker: typeof Marker; // 추가된 부분
      };
    };
  }
}

interface Post {
  id: number;
  title: string;
  thumb: string;
  price: number;
  writer: string;
  Lat: number;
  Lng: number;
}

export default function IngredientMap() {
  const { kakao } = window;
  const mapRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      // 가상 서버에서 데이터를 받아옴
      const response = await axios.get<Post[]>(
        "http://localhost:5000/location"
      );
      const postData: Post[] = response.data;

      // 받아온 데이터를 이용하여 마커 생성
      postData.forEach((data) => {
        const markerPosition = new kakao.maps.LatLng(data.Lat, data.Lng);
        const marker = new kakao.maps.Marker({ position: markerPosition });
        // marker.setMap(map); // map 객체는 아래의 useEffect 내부에서 생성한 것을 사용합니다.
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // 더미 데이터 받아오는 함수 호출
    fetchPosts().catch((err) => {
      console.error(err);
    });

    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new kakao.maps.LatLng(37.3660433, 126.7321598),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);

    // map 객체를 fetchPosts 함수에서도 사용할 수 있도록 노출
    // window.map = map;
  }, [fetchPosts]);

  return (
    <>
      <MobileWrap>
        <Header />
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      </MobileWrap>
    </>
  );
}
