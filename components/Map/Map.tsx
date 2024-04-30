"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { LngLat } from "ymaps3";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import CustomMarkerWithPopup from "@/components/YMapMarker/YMapMarker";
import { museums, theatres } from "@/utils/places";
import Image from "next/image";
import { Feature } from "@yandex/ymaps3-types/packages/clusterer";
import { IClusterMethod } from "@yandex/ymaps3-types/packages/clusterer";

//Данные, получаемые после загрузки скрипта
const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapListener,
  YMapLayer,
  YMapFeatureDataSource,
} = reactify.module(ymaps3);

const { YMapClusterer, clusterByGrid } = reactify.module(
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);

export default function Map() {
  /*Функция для кластеризции, чем больше gridSize тем быстрее маркеры схлопнутся 
  (в TS gridSizedMethod вызывает ошибку отключил TS для строки ниже )*/
  //@ts-ignore
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 30 }), []);

  //Функция, в которой перебираем места и добавляем нужные поля
  const MuseumPoints: Feature[] = museums.map((museum) => ({
    type: "Feature",
    id: museum.id,
    geometry: {
      type: "Point",
      coordinates: [museum.coordinates[0], museum.coordinates[1]],
    },
    //в properties передаем все данные, необходимые для маркера, например для попапа
    properties: {
      name: museum.name,
      site: museum.site,
      address: museum.address,
    },
  }));

  const TheatresPoints: Feature[] = theatres.map((museum) => ({
    type: "Feature",
    id: museum.id,
    geometry: {
      type: "Point",
      coordinates: [museum.coordinates[0], museum.coordinates[1]],
    },
    //в properties передаем все данные, необходимые для маркера, например для попапа
    properties: {
      name: museum.name,
      site: museum.site,
      address: museum.address,
    },
  }));

  //Функция для создания одиночного маркера
  const MuseumMarker = useCallback(
    (feature: Feature) => (
      <CustomMarkerWithPopup
        key={feature.id}
        coordinates={feature.geometry.coordinates}
        name={feature.properties?.name}
        site={feature.properties?.site}
        address={feature.properties?.address}
      >
        <Image
          src="/blue-marker.png"
          alt="map-point"
          className={"point"}
          width={55}
          height={50}
        />
      </CustomMarkerWithPopup>
    ),
    []
  );

  const TheatreMarker = useCallback(
    (feature: Feature) => (
      <CustomMarkerWithPopup
        key={feature.id}
        coordinates={feature.geometry.coordinates}
        name={feature.properties?.name}
        site={feature.properties?.site}
        address={feature.properties?.address}
      >
        <Image
          src="/green-marker.png"
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
  const MuseumCluster = useCallback(
    (coordinates: LngLat, features: Feature[]) => {
      return (
        <YMapMarker
          key={features[0].id}
          coordinates={coordinates}
          source={"museums"}
        >
          <div className="circle blue">
            <div className="circle-content">
              <p className="circle-text">{features.length}</p>
            </div>
          </div>
        </YMapMarker>
      );
    },
    []
  );

  const TheatreCluster = useCallback(
    (coordinates: LngLat, features: Feature[]) => {
      return (
        <YMapMarker
          key={features[0].id}
          coordinates={coordinates}
          //в source передаем название кластера
          source={"theatres"}
        >
          <div className="circle green">
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
    <div className={style.mapContainer}>
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {
          <>
            <YMapFeatureDataSource id="museums" />
            <YMapLayer source="museums" type="markers" zIndex={1800} />
            <YMapClusterer
              marker={MuseumMarker}
              cluster={MuseumCluster}
              method={gridSizedMethod}
              features={MuseumPoints}
            />
          </>
        }
         {
          <>
            <YMapFeatureDataSource id="theatres" />
            <YMapLayer source="theatres" type="markers" zIndex={1800} />
            <YMapClusterer
              marker={TheatreMarker}
              cluster={TheatreCluster}
              method={gridSizedMethod}
              features={TheatresPoints}
            />
          </>
        }
      </YMap>
    </div>
  );
}
