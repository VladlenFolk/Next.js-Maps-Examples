"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { YMapLocationRequest } from "ymaps3";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import Image from "next/image";

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

export default function Map() {
  return (
    <div className={style.mapContainer}>
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker coordinates={[37.504314, 55.73025]}>
          <Image
            src={"/blue-marker.png"}
            alt={"museum"}
            width={50}
            height={50}
          ></Image>
        </YMapMarker>
      </YMap>
    </div>
  );
}
