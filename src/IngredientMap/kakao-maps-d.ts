declare module "kakao-maps" {
  export class LatLng {
    constructor(latitude: number, longitude: number);
  }

  export class Map {
    constructor(container: HTMLElement, options: any);
  }

  export class Marker {
    constructor(options: any);
    setMap(map: any): void;
  }

  // 기타 다른 타입들도 필요하면 추가할 수 있습니다.
}
