"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import type { YMapLocationRequest } from "ymaps3";
// import { useDispatch, useSelector } from 'react-redux';
// import { close, open, getCoordinates, setZoom } from '@/reducers/map/map';
import CustomMarkerWithPopup from "./CustomMarker/CustomMarker";

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
} =
  // eslint-disable-next-line no-undef
  reactify.module(ymaps3);
const { YMapClusterer, clusterByGrid } = reactify.module(
  // eslint-disable-next-line no-undef
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);

export default function Map() {
  return (
    <YMap location={}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
    </YMap>
  );
}
