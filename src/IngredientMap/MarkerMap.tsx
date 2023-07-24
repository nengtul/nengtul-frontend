import { useRef, useEffect, useState } from "react";
import { LatLng, Map, Marker } from "kakao-maps";
import axios from "axios";
import MarkerCard from "./MarkerCard";
import { styled } from "styled-components";
import theme from "../common/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
  title: string;
  thumb: string;
  price: number;
  writer: string;
  Lat: number;
  Lng: number;
}

export default function MarkerMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Post | null>(null);
  const [location, setLocation] = useState([0, 0]);

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
          const response = await axios.get<Post[]>("http://localhost:5000/location");
          const postData: Post[] = response.data;
          postData.forEach((data) => {
            const markerPosition = new window.kakao.maps.LatLng(data.Lat, data.Lng);
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

  return (
    <MarkerWrap>
      <div ref={mapRef} style={{ width: "100%", height: "100%", position: "relative" }}>
        <button type="button" onClick={requestLocation} className="location-btn">
          <FontAwesomeIcon icon={faLocationDot} /> 현재 위치로
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
`;
