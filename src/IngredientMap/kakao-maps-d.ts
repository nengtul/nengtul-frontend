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
}
