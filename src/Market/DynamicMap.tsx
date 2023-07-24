import {useEffect,useRef} from 'react'
import styled from 'styled-components'
// import kakao from 'kakao.maps';S


interface DynamicMapProps {
    latitude: number;
    longitude: number;
}
const DynamicMap=({latitude,longitude}:DynamicMapProps)=>{
    console.log('지도 띄우기로 넘어옴!',latitude,longitude)
    const kakaoMapRef=useRef<HTMLDivElement>(null)

    
    useEffect(()=>{
        if (!kakaoMapRef.current){
            return 
        }
        const targetPoint=new kakao.maps.LatLng(latitude,longitude)
        const options={
            center:targetPoint,
            level:3
        }
        const backgroundMap =new window.kakao.maps.Map(kakaoMapRef.current,options)
        const markerPosition= new kakao.maps.LatLng(Number(latitude),Number(longitude))
        const marker = new kakao.maps.Marker({position:markerPosition})
        marker.setMap(backgroundMap)
        //위에는 현재 위치 표시해주는 마커


        //--여기서 마트나 편의점 띄우기 
        const optioning: kakao.maps.CustomOverlayOptions = {
            position: targetPoint,
            zIndex: 1, // z-index 값을 원하는 숫자로 설정하세요
          };
        // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
        const placeOverlay = new kakao.maps.CustomOverlay(optioning), 
                            contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
                            markers = [] as kakao.maps.Marker[], // 마커를 담을 배열입니다
                            currCategory = 'MT1'; 

        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places(backgroundMap)

        // 지도에 idle 이벤트를 등록합니다
        kakao.maps.event.addListener(backgroundMap,'idle',searchPlaces)

        // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
        // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
        addEventHandle(contentNode,'mousedown',kakao.maps.event.preventMap)
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        // 커스텀 오버레이 컨텐츠를 설정합니다
        placeOverlay.setContent(contentNode); 
        // 각 카테고리에 클릭 이벤트를 등록합니다
        // addCategoryClickEvent(); 

        // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        function addEventHandle(target:HTMLElement | Document, type: string, callback:EventListenerOrEventListenerObject) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } 
            // else if (target instanceof Document)
            //  {
            //     target.attachEvent('on' + type, callback);
            // }
        }

        // 카테고리 검색을 요청하는 함수입니다
        function searchPlaces() {
            if (!currCategory) {
                return;
            }  
            // 커스텀 오버레이를 숨깁니다 
            placeOverlay.setMap(null);
            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();      
            ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data:kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status, pagination: kakao.maps.Pagination) {
        // function placesSearchCB(data: Place[], status: any, pagination: any): void {
            console.log(pagination)
            if (status === kakao.maps.services.Status.OK) {
                
                // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
                displayPlaces(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        
            } else if (status === kakao.maps.services.Status.ERROR) {
                // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
                
            }
        }

        interface Place {
            x: string;
            y: string;
          }
        // 지도에 마커를 표출하는 함수입니다
        function displayPlaces(places:Place[]) {

            // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
            // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
            const categoryElement = document.getElementById(currCategory);
            if (categoryElement) {
                const order = categoryElement.getAttribute('data-order');
                for ( let i=0; i<places.length; i++ ) {
                
                    // 마커를 생성하고 지도에 표시합니다
                    const marker = addMarker(new kakao.maps.LatLng(Number(places[i].y), Number(places[i].x)), order);
        
                    // 마커와 검색결과 항목을 클릭 했을 때
                    // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
                    (function(marker, place) {
                        kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(place);
                        });
                    })(marker, places[i]);
                }
            } 
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position:kakao.maps.LatLng, order:any) {
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage 
                });
        
            marker.setMap(backgroundMap ); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다
        
            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( let i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers.splice(0, markers.length);
        }

        // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
        interface Place {
            place_url: string;
            place_name: string;
            road_address_name?: string;
            address_name: string;
            phone: string;
          }
          
        function displayPlaceInfo (place:Place) {
            const content = '<div class="placeinfo">' +
                            '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   
        
            // if (place.road_address_name) {
            //     content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
            //                 '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            // }  else {
            //     content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            // }                
           
            // content += '    <span class="tel">' + place.phone + '</span>' + 
            //             '</div>' + 
            //             '<div class="after"></div>';
        
            contentNode.innerHTML = content;
            placeOverlay.setPosition(new kakao.maps.LatLng(Number(place.y), Number(place.x)));
            placeOverlay.setMap(backgroundMap);  
        }

        // 각 카테고리에 클릭 이벤트를 등록합니다
        // function addCategoryClickEvent() {
        //     const category = document.getElementById('category'),
                
        //     if (category) {
        //         const children = category.children;
        //         for (let i=0; i<children.length; i++) {
        //             const child = children[i] as HTMLAnchorElement;
        //             child.addEventListener('click', onClickCategory);
        //         }
        //     }

        // 카테고리를 클릭했을 때 호출되는 함수입니다
        // function onClickCategory(this: HTMLElement) {
        //     const id = this.id,
        //         className = this.className;
        
        //     placeOverlay.setMap(null);
        
        //     // if (className === 'on') {
        //     //     currCategory = '';
        //     //     changeCategoryClass();
        //     //     removeMarker();
        //     // } else {
        //         currCategory = id;
        //         changeCategoryClass(this);
        //         searchPlaces();
        //     // }
        // }

        // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
        // function changeCategoryClass(el) {
        //     const category = document.getElementById('category'),
        //         children = category.children,
        //         i;
        
        //     for (let  i=0; i<children.length; i++ ) {
        //         children[i].className = '';
        //     }
        
        //     if (el) {
        //         el.className = 'on';
        //     } 
        // } 
    }
    ,[latitude,longitude])

    return(
        <DynamicMapOne>
            <DynamicMapTwo ref={kakaoMapRef}/>
        </DynamicMapOne>
    )
}


const DynamicMapOne = styled.div`
    height:100%;
`
const DynamicMapTwo = styled.div`
    width:100%;
    height:100%;
`
export default DynamicMap