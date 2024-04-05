'use client';
import React, { useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { close, open, getCoordinates, setZoom } from '@/reducers/map/map';
import CustomMarkerWithPopup from './CustomMarker/CustomMarker';

//Данные, получаемые после загрузки скрипта
const [ymaps3React] = await Promise.all([
  // eslint-disable-next-line no-undef
  ymaps3.import('@yandex/ymaps3-reactify'),
  // eslint-disable-next-line no-undef
  ymaps3.ready
]);
const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapListener,
  YMapLayer,
  YMapFeatureDataSource
} =
  // eslint-disable-next-line no-undef
  reactify.module(ymaps3);
const { YMapClusterer, clusterByGrid } = reactify.module(
  // eslint-disable-next-line no-undef
  await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1')
);

export default function Map({ places }) {
  const dispatch = useDispatch();

  const { coordinates, zoom, mapPopupStatus } = useSelector(
    state => state.mapModal
  );

  //Замаскировал ошибку, возникающую из-за тега YM
  const realError = console.error;
  console.error = (...x) => {
    // debugger;
    if (
      x.indexOf(
        'Warning: The tag <ymaps> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.'
      )
    ) {
      return;
    }
    realError(...x);
  };

  /*При начальной загрузке страницы закрываем все попапы, которые
   которые могли остаться открытыми
  */
  useEffect(() => {
    closePopup();
  }, []);

  //Функции открытия/закрытия попапа, которые хранят состояние в store
  const closePopup = () => {
    dispatch(close());
  };
  const openPopup = () => {
    dispatch(open());
  };

  /*Функция, которая отслеживает события внутри карты, setZoom и getCoordinates
  получают значение зума и координат и сохраняют в сторе. В свою очередь из
  стора мы используем их для установки позиционирования карты YMap location={}
  при клике на маркер.
  */
  const createBehaviorEventHandler = useCallback(() => {
    return function (object) {
      if (object.type === 'dblClick') return;
      dispatch(setZoom(object.location.zoom));
      dispatch(getCoordinates(object.location.center));
      closePopup();
    };
  }, []);

  //Функция для кластеризции, чем больше gridSize тем быстрее маркеры схлопнутся
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 30 }), []);

  //Функция, в которой перебираем места и добавляем нужные поля
  const points = places.map((point, i) => ({
    type: 'Feature',
    id: i,
    geometry: { coordinates: [point.longitude, point.latitude] },
    name_fund: point.name_fund,
    site: point.site,
    address: point.address,
    properties: { name: 'Point of issue of orders' }
  }));

  //Функция для создания одиночного маркера
  const marker = useCallback(
    feature => (
      <CustomMarkerWithPopup
        coordinates={feature.geometry.coordinates}
        popupMapOpen={openPopup}
        popupMapClose={closePopup}
        name_fund={feature.name_fund}
        site={feature.site}
        address={feature.address}
        source={'my-source'}
      />
    ),
    []
  );

  //Функция для создания отдельного кластера
  const cluster = useCallback((coordinates, features) => {
    /*Если координат нет (значение == null), то в кластер попадает значение
    [0,0], поэтому кластер отрисовывался на экваторе))
    */
    if (coordinates[0] === 0 || coordinates[1] === 0) {
      return null;
    }
    return (
      <YMapMarker coordinates={coordinates} source={'my-source'}>
        <div
          className='circle'
          style={
            mapPopupStatus ? { display: 'none' } : { display: 'inline-block' }
          }
        >
          <div className='circle-content'>
            <span className='circle-text'>{features.length}</span>
          </div>
        </div>
      </YMapMarker>
    );
  }, []);

  return (
    <YMap location={{ center: coordinates, zoom: zoom, duration: 500 }}>
      <YMapDefaultSchemeLayer />
      <YMapListener
        onActionEnd={useMemo(() => createBehaviorEventHandler(), [])}
      />
      <YMapDefaultFeaturesLayer />
      {
        <>
          <YMapFeatureDataSource id='my-source' />
          <YMapLayer source='my-source' type='markers' zIndex={1800} />
          <YMapClusterer
            marker={marker}
            cluster={cluster}
            method={gridSizedMethod}
            features={points}
          />
        </>
      }
    </YMap>
  );
}
