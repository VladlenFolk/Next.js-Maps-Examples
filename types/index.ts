import { LngLat } from "@yandex/ymaps3-types";

interface Geometry {
  coordinates: LngLat;
}

interface Properties {
  name: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  name: string;
  site: string;
  address: string;
  properties: Properties;
}

export interface Museum {
  id: string;
  name: string;
  site: string;
  coordinates: [number, number];
  address: string;
}

export interface IPlaces {
  id: string;
  name: string;
  site: string;
  coordinates: number[];
  address: string;
}

export interface IClusterProps {
  places: IPlaces[];
  placesType: string;
  color: string;
  markerSrc: string;
  size: number;
}