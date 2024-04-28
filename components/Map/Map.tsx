"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { LngLat } from "ymaps3";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import CustomMarkerWithPopup from "@/components/YMapMarker/YMapMarker";
import { museums } from "@/utils/places";
import Image from "next/image";
import { Feature } from "@yandex/ymaps3-types/packages/clusterer";

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
  //Функция для кластеризции, чем больше gridSize тем быстрее маркеры схлопнутся
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 20 }), []);

  //Функция, в которой перебираем места и добавляем нужные поля
  const points: Feature[] = museums.map((museum) => ({
    type: "Feature",
    id: museum.id,
    geometry: { type: "Point", coordinates:  [museum.coordinates[0], museum.coordinates[1]] },
    properties: {
      name: museum.name,
      site: museum.site,
      address: museum.address,
    },
  }));

  //Функция для создания одиночного маркера
  const marker = useCallback(
    (feature: Feature) => (
      <YMapMarker key={feature.id} coordinates={feature.geometry.coordinates}>
        <Image
          src="/blue-marker.png"
          alt="map-point"
          className={"point"}
          width={55}
          height={50}
        />
      </YMapMarker>
    ),
    []
  );

  //Функция для создания отдельного кластера
  const cluster = useCallback((coordinates: LngLat, features: Feature[]) => {
    return (
      <YMapMarker
        key={features[0].id}
        coordinates={coordinates}
        source={"my-source"}
      >
        <div className="circle">
          <div className="circle-content">
            <p className="circle-text">{features.length}</p>
          </div>
        </div>
      </YMapMarker>
    );
  }, []);

  return (
    <div className={style.mapContainer}>
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {
          <>
            <YMapFeatureDataSource id="my-source" />
            <YMapLayer source="my-source" type="markers" zIndex={1800} />
            <YMapClusterer
              marker={marker}
              cluster={cluster}
              method={gridSizedMethod}
              features={points}
            />
          </>
        }
      </YMap>
    </div>
  );
}
