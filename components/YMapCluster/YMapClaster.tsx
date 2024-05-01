import React, { useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { LngLat } from "ymaps3";
import CustomMarkerWithPopup from "@/components/YMapMarker/YMapMarker";
import Image from "next/image";
import { Feature } from "@yandex/ymaps3-types/packages/clusterer";


//Данные, получаемые после загрузки скрипта
const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const { YMapMarker, YMapLayer, YMapFeatureDataSource } =
  reactify.module(ymaps3);

const { YMapClusterer, clusterByGrid } = reactify.module(
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);
interface IPlaces {
  id: string;
  name: string;
  site: string;
  coordinates: number[];
  address: string;
}

interface IClusterProps {
  places: IPlaces[];
  placesType: string;
  color: string;
  markerSrc: string;
  size: number;
}

export default function YMapCluster({
  places,
  placesType,
  markerSrc,
  color,
  size,
}: IClusterProps) {
  /*Функция для кластеризции, чем больше gridSize тем быстрее маркеры схлопнутся 
  (в TS gridSizedMethod вызывает ошибку отключил TS для строки ниже )*/

  const gridSizedMethod = useMemo(
    //@ts-ignore
    () => clusterByGrid ({ gridSize: size }),
    []
  );

  //Функция, в которой перебираем места и добавляем нужные поля
  const placesPoints: Feature[] = places.map((place: IPlaces) => ({
    type: "Feature",
    id: place.id,
    geometry: {
      type: "Point",
      coordinates: [place.coordinates[0], place.coordinates[1]],
    },
    //в properties передаем все данные, необходимые для маркера, например для попапа
    properties: {
      name: place.name,
      site: place.site,
      address: place.address,
    },
  }));

  //Функция для создания одиночного маркера
  const PlacesMarker = useCallback(
    (feature: Feature) => (
      <CustomMarkerWithPopup
        key={feature.id}
        coordinates={feature.geometry.coordinates}
        name={feature.properties?.name}
        site={feature.properties?.site}
        address={feature.properties?.address}
      >
        <Image
          src={markerSrc}
          alt="map-point"
          className={"point"}
          width={55}
          height={50}
        />
      </CustomMarkerWithPopup>
    ),
    []
  );

  //Функция для создания отдельного кластера
  const PlacesCluster = useCallback(
    (coordinates: LngLat, features: Feature[]) => {
      return (
        <YMapMarker
          key={features[0].id}
          coordinates={coordinates}
          source={placesType}
        >
          <div className={`circle ${color}`}>
            <div className="circle-content">
              <p className="circle-text">{features.length}</p>
            </div>
          </div>
        </YMapMarker>
      );
    },
    []
  );

  return (
    <>
      <YMapFeatureDataSource id={placesType} />
      <YMapLayer source={placesType} type="markers" zIndex={1800} />
      <YMapClusterer
        marker={PlacesMarker}
        cluster={PlacesCluster}
        method={gridSizedMethod}
        features={placesPoints}
      />
    </>
  );
}
