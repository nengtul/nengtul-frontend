import { useRef, useEffect } from "react";
import Header from "../common/Header";
import MobileWrap from "../common/MobileWrap";
import { LatLng, Map, Marker } from "kakao-maps";
// import axios from "axios";

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

// interface Post {
//   id: number;
//   title: string;
//   thumb: string;
//   price: number;
//   writer: string;
//   Lat: number;
//   Lng: number;
// }

export default function IngredientMap() {
  const { kakao } = window;
  const mapRef = useRef<HTMLDivElement | null>(null);

  // const fetchPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get<Post[]>(
  //       "http://localhost:5000/location"
  //     );
  //     const postData: Post[] = response.data;
  //     postData.forEach((data) => {
  //       const markerPosition = new kakao.maps.LatLng(data.Lat, data.Lng);
  //       const marker = new kakao.maps.Marker({ position: markerPosition });

  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  useEffect(() => {
    // fetchPosts().catch((err) => {
    //   console.error(err);
    // });

    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new kakao.maps.LatLng(37.3660433, 126.7321598),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);
    console.log(map);
  }, [kakao]);

  return (
    <>
      <MobileWrap>
        <Header />
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      </MobileWrap>
    </>
  );
}
