import style from "@/components/YMapMarker/YMapMarker.module.scss";
import ReactDOM from "react-dom";
import React, { useState, useRef } from "react";


const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const { YMapMarker } = reactify.module(ymaps3);

const CustomMarkerWithPopup = ({coordinates, name, site, address, children}) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const containerRef = useRef();
  const imageRef = useRef();

  return (
    <YMapMarker coordinates={coordinates} className={style.marker}>
      <>
        {popupOpen && (
          <div className={"popup"} ref={containerRef}>
            <h2 className={"popup__title"}>
              {locationName[targetLocation]} &#171;{name_fund.toUpperCase()}
              &#187;
            </h2>
            <div className={"popup__content"}>
              <div className={"popup__contentContainer"}>
                <p className={"popup__contentTitle"}>Адрес:</p>
                <p className={"popup__contentText"}>{address}</p>
              </div>
              <div className={"popup__contentContainer"}>
                <p className={"popup__contentTitle"}>Режим работы:</p>
                <p className={"popup__contentText"}>
                  {working_hours ? working_hours : "Не указано"}
                </p>
              </div>
              <div className={"popup__contentContainer"}>
                <p className={"popup__contentTitle"}>Кто есть:</p>
                <p className={"popup__contentText"}>
                  {animal_types ? animal_types : "Не указано"}
                </p>
              </div>
              <p className={"popup__contentText"}>
                <a
                  href={site}
                  target={"_blank"}
                >{`Перейти на страницу ${correctWordEnding(
                  locationName[targetLocation]
                )}`}</a>
              </p>
            </div>
            <button className={"popup__close"}></button>
          </div>
        )}
        {children}
      </>
    </YMapMarker>
  );
};

export default CustomMarkerWithPopup;
