import Image from 'next/image';
import style from '@/components/Map/CustomMarker/CustomMarker.module.scss';
import ReactDOM from 'react-dom';
import type { YMapLocationRequest } from 'ymaps3';
import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getCoordinates } from '@/reducers/map/map';
// import { closePopup } from '@/reducers/auth/reducer';
// import { useMediaQuery } from '@/utils/useMediaQuery';

const [ymaps3React] = await Promise.all([
  // eslint-disable-next-line no-undef
  ymaps3.import('@yandex/ymaps3-reactify'),
  // eslint-disable-next-line no-undef
  ymaps3.ready
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
// eslint-disable-next-line no-undef
const { YMapMarker } = reactify.module(ymaps3);

const CustomMarkerWithPopup = ({
  coordinates,
  popupMapOpen,
  popupMapClose,
  name_fund,
  site,
  address,
  working_hours,
  animal_types
}) => {
  const [popupOpen, setPopupOpen] = useState(false);

  // const dispatch = useDispatch();
  // const { zoom, mapPopupStatus } = useSelector(state => state.mapModal);
  // const modalStatus = useSelector(state => state.mapModal.);
  // const { targetLocation } = useSelector(state => state.location);

  // const desktop = useMediaQuery('(min-width: 1024px)');
  const containerRef = useRef();
  const imageRef = useRef();

  /*При начальной загрузке страницы закрываем все попапы, которые
   которые могли остаться открытыми
  */
  // useEffect(() => {
  //   closePopup();
  // }, []);

  //Слушатель позволяющий закрывать попап, при клике вне попапа
  // useEffect(() => {
  //   const handleOutsideClick = event => {
  //     if (
  //       containerRef.current &&
  //       !containerRef.current.contains(event.target) &&
  //       !imageRef.current.contains(event.target)
  //     ) {
  //       setPopupOpen(false);
  //       popupMapClose();
  //     }
  //   };
  //   document.addEventListener('click', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, [popupMapClose]);

  
  //Функция корректировки названия места


  //Если попап открыт, то остальные маркеры удаляются
  // if (mapPopupStatus && !popupOpen) {
  //   return null;
  // }

  /*
  Данные, которые нужны для корректировки попапа, чтобы при клике
  на маркер, попап перемещался в центр экрана
  */
 


  /*
    Функция, которая открывает попап и устанавливает нужные координаты,
    при клике на маркер
  */
  // const setOpen = () => {
  //   desktop
  //     ? dispatch(
  //         getCoordinates([coordinates[0], coordinates[1] + YCoordSpotter])
  //       )
  //     : dispatch(getCoordinates([coordinates[0], coordinates[1]]));
  //   setPopupOpen(true);
  //   popupMapOpen();
  // };

  return (
    <YMapMarker coordinates={coordinates} className={style.marker}>
      <>
        {popupOpen && (
          <div className={'popup'} ref={containerRef}>
            <h2 className={'popup__title'}>
              {/* {locationName[targetLocation]} &#171;{name_fund.toUpperCase()} */}
              &#187;
            </h2>
            <div className={'popup__content'}>
              <div className={'popup__contentContainer'}>
                <p className={'popup__contentTitle'}>Адрес:</p>
                <p className={'popup__contentText'}>{address}</p>
              </div>
              <div className={'popup__contentContainer'}>
                <p className={'popup__contentTitle'}>Режим работы:</p>
                <p className={'popup__contentText'}>
                  {working_hours ? working_hours : 'Не указано'}
                </p>
              </div>
              <div className={'popup__contentContainer'}>
                <p className={'popup__contentTitle'}>Кто есть:</p>
                <p className={'popup__contentText'}>
                  {animal_types ? animal_types : 'Не указано'}
                </p>
              </div>
              <p className={'popup__contentText'}>
                {/* <a
                  href={site}
                  target={'_blank'}
                >{`Перейти на страницу ${correctWordEnding(
                  locationName[targetLocation]
                )}`}</a> */}
              </p>
            </div>
            <button
              onClick={() => {
                setPopupOpen(false);
                popupMapClose();
              }}
              className={'popup__close'}
            ></button>
          </div>
        )}

        <Image
          src='/icons/icon_placemark.png'
          alt='map-point'
          className={'point'}
          width={50}
          height={60}
          // onClick={setOpen}
          ref={imageRef}
        />
      </>
    </YMapMarker>
  );
};

export default CustomMarkerWithPopup;
