"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { YMapLocationRequest } from "ymaps3";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import CustomMarkerWithPopup from "@/components/YMapMarker/YMapMarker";
import { museum } from "@/utils/places";

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
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 64 }), []);

    //Функция, в которой перебираем места и добавляем нужные поля
    const ceatePoints = places.map((point, i) => ({
      type: 'Feature',
      id: i,
      geometry: { coordinates: [point.longitude, point.latitude] },
      name_fund: point.name_fund,
      site: point.site,
      address: point.address,
      properties: { name: 'Point of issue of orders' }
    }));

  return (
    <div className={style.mapContainer}>
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <CustomMarkerWithPopup coordinates={[37.504062, 55.730588]} />
      </YMap>
    </div>
  );
}
