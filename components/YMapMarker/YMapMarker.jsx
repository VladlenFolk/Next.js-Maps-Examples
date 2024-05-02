"use client";
import style from "@/components/YMapMarker/YMapMarker.module.scss";
import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import ymapPopup from "@/stores/ymap-popup";

const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const { YMapMarker } = reactify.module(ymaps3);

const CustomMarkerWithPopup = ({
  coordinates,
  name,
  site,
  address,
  children,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { isOpen, setOpen, setClose } = ymapPopup;

  const getPopupOpen = () => {
    setPopupOpen(true);
    setOpen();
  };
  const getPopupClose = () => {
    setPopupOpen(false);
    setClose();
  };

  const containerRef = useRef();

  //Слушатель позволяющий закрывать попап, при клике вне попапа
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        (containerRef.current &&
          !containerRef.current.contains(event.target)) ||
        event.code === "esc"
      ) {
        setPopupOpen(false);
        setClose();
      }
    };

    const handleEsc = (event) => {
      if (event.code === "Escape" || event.code === "Enter") {
        setPopupOpen(false);
        setClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEsc);
    };
  }, []);

  //Если попап открыт, то остальные маркеры удаляются
  if (isOpen && !popupOpen) {
    return null;
  }

  return (
    <YMapMarker
      coordinates={coordinates}
      className={style.marker}
      onClick={getPopupOpen}
    >
      <>
        {popupOpen && (
          <div className={"popup"} ref={containerRef}>
            <h2 className={"popup__title"}>{name}</h2>
            <div className={"popup__content"}>
              <div className={"popup__contentContainer"}>
                <p className={"popup__contentTitle"}>Адрес:</p>
                <p className={"popup__contentText"}>
                  {address ? address : "Не указано"}
                </p>
              </div>
              <p className={"popup__contentTitle"}>
                <a href={site} target={"_blank"}>{`Перейти на сайт`}</a>
              </p>
            </div>
            <button className={"popup__close"} onClick={getPopupClose}></button>
          </div>
        )}
        {children}
      </>
    </YMapMarker>
  );
};

export default CustomMarkerWithPopup;
