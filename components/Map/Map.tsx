import React from "react";
import ReactDOM from "react-dom";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import { museums, theatres, parks } from "@/utils/places";
import YMapCluster from "@/components/YMapCluster/YMapClaster";

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
} = reactify.module(ymaps3);

export default function Map() {
  return (
    <div className={style.mapContainer}>
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapCluster
          places={museums}
          placesType={"museums"}
          markerSrc={"/blue-marker.png"}
          color={"blue"}
          size={30}
        />
        <YMapCluster
          places={theatres}
          placesType={"theatres"}
          markerSrc={"/purple-marker.png"}
          color={"purple"}
          size={30}
        />
        <YMapCluster
          places={parks}
          placesType={"parks"}
          markerSrc={"/green-marker.png"}
          color={"green"}
          size={30}
        />
      </YMap>
    </div>
  );
}
