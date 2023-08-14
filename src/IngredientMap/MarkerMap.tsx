import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LatLng, Map, Marker } from "kakao-maps";
import MarkerCard from "./MarkerCard";
import { styled } from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPen } from "@fortawesome/free-solid-svg-icons";
import { SHAREBOARD_URL } from "../url";
import { getData } from "../axios";
type EventListener = (event: kakao.maps.event.MouseEvent) => void;

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: typeof LatLng;
        Map: typeof Map;
        Marker: typeof Marker;
        event: {
          addListener(instance: Marker, event: string, listener: EventListener): void;
          removeListener(instance: Marker, event: string, listener: EventListener): void;
        };
      };
    };
    map: Map;
  }
}
export interface Post {
  id: number;
  userId: number;
  userNickname: string;
  title: string;
  content: string;
  place: string;
  shareImg: string;
  price: number;
  lat: number;
  lon: number;
  createdAt: string;
  modifiedAt: string;
  closed: boolean;
  point: number;
}

export default function MarkerMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Post | null>(null);
  const [location, setLocation] = useState([0, 0]);
  console.log(selectedMarker);
  const getDefaultLocation = () => {
    const defaultLocation = [37.564718, 126.977108];
    setLocation(defaultLocation);
  };

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = [position.coords.latitude, position.coords.longitude];
        setLocation(currentLocation);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = [position.coords.latitude, position.coords.longitude];
          setLocation(currentLocation);
        },
        (error) => {
          console.error("위치 서비스를 동의하지 않았습니다.", error);
          getDefaultLocation();
        }
      );
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location[0] !== 0 && location[1] !== 0) {
      const initializeMap = () => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(location[0], location[1]),
          level: 4,
        };

        const map = new window.kakao.maps.Map(container, options);
        window.map = map;
      };

      const fetchPosts = async () => {
        try {
          const lat = location[0];
          const lon = location[1];
          // const response = await axios.get<Post[]>(`${SHAREBOARD_URL}?lat=${lat}&lon=${lon}&range=10000`);
          const response = await getData<Post[]>(
            `${SHAREBOARD_URL}?lat=${lat}&lon=${lon}&range=10000`
          );
          // const postData: Post[] = response.data;
          const postData: Post[] = response;
          postData.forEach((data) => {
            const markerPosition = new window.kakao.maps.LatLng(data.lat, data.lon);
            const marker = new window.kakao.maps.Marker({ position: markerPosition });

            window.kakao.maps.event.addListener(marker, "click", () => {
              setSelectedMarker(data); // 선택된 마커 정보 업데이트
            });

            marker.setMap(window.map);
          });
        } catch (err) {
          console.error(err);
        }
      };

      initializeMap();
      fetchPosts().catch((err) => {
        console.error(err);
      });
    }
  }, [location]);
  const navigate = useNavigate();
  const goToWrite = () => {
    navigate("/ingredientWrite");
  };
  return (
    <MarkerWrap>
      <div ref={mapRef} style={{ width: "100%", height: "100%", position: "relative" }}>
        <button type="button" onClick={requestLocation} className="location-btn">
          <FontAwesomeIcon icon={faLocationDot} /> 현재 위치로
        </button>
        <button type="button" className="write-btn" onClick={goToWrite}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      {selectedMarker && (
        <MarkerCard selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
      )}
    </MarkerWrap>
  );
}

const MarkerWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .location-btn {
    padding: 4px 10px;
    border-radius: 10px;
    border: 2px solid ${theme.colors.main};
    background-color: #fff;
    color: ${theme.colors.main};
    font-size: 15rem;
    font-weight: 800;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    z-index: 9999;
  }

  .write-btn {
    width: 58rem;
    height: 58rem;
    color: white;
    background-color: ${theme.colors.main};
    display: inline-block;
    cursor: pointer;
    position: absolute;
    left: 83%;
    font-size: 30rem;
    bottom: 20px;
    z-index: 9999;
    border-radius: 100%;
  }
`;
