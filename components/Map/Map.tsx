import React from "react";
import ReactDOM from "react-dom";
import { LOCATION } from "@/utils/constants";
import style from "@/components/Map/Map.module.scss";
import { museums, theatres, parks } from "@/utils/places";
import YMapCluster from "@/components/YMapCluster/YMapCluster";

//Данные, получаемые после загрузки скрипта
const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
  reactify.module(ymaps3);

export default function Map() {
  //Замаскировал ошибку, возникающую из-за тега YM
  const realError = console.error;
  console.error = (...error) => {
    if (
      error.indexOf(
        "Warning: The tag <ymaps> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter."
      )
    ) {
      return;      
    }
    realError(...error);
  };
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
          size={40}
        />
        <YMapCluster
          places={theatres}
          placesType={"theatres"}
          markerSrc={"/purple-marker.png"}
          color={"purple"}
          size={40}
        />
        <YMapCluster
          places={parks}
          placesType={"parks"}
          markerSrc={"/green-marker.png"}
          color={"green"}
          size={60}
        />
      </YMap>
    </div>
  );
}
