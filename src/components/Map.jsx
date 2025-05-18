import React, { useEffect, useRef } from 'react';
import { useSelector }              from 'react-redux';
import 'ol/ol.css';
import Map                           from 'ol/Map';
import View                          from 'ol/View';
import TileLayer                     from 'ol/layer/Tile';
import OSM                           from 'ol/source/OSM';
import Overlay                       from 'ol/Overlay';
import Feature                       from 'ol/Feature';
import Point                         from 'ol/geom/Point';
import { Style, Icon }               from 'ol/style';
import { Vector as VectorLayer }     from 'ol/layer';
import { Vector as VectorSource }    from 'ol/source';
import { fromLonLat, toLonLat }      from 'ol/proj';
import 'ol-popup';
import './popup.css';

import markerImg from '../assets/marker.png';

const MapComponent = () => {
  const mapElementRef     = useRef(null);
  const popupElementRef   = useRef(null);
  const mapInstanceRef    = useRef(null);
  const objects           = useSelector(state => state.objects);

  // инициализация карты и оверлея
  useEffect(() => {
    if (!mapElementRef.current) return;

    const map = new Map({
      target: mapElementRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([39.699196, 47.233797]),
        zoom: 12,
      }),
    });

    // сохраняем инстанс
    mapInstanceRef.current = map;

    // создаём popup overlay
    const overlay = new Overlay({
      element: popupElementRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -25],
    });
    map.addOverlay(overlay);

    // клик по крестику закрывает попап
    popupElementRef.current
      .querySelector('.ol-popup-closer')
      .onclick = () => {
        overlay.setPosition(undefined);
        return false;
      };

    // клик по маркеру — показываем popup
    map.on('click', evt => {
      const feat = map.forEachFeatureAtPixel(evt.pixel, f => f);
      if (feat) {
        const coord = toLonLat(feat.getGeometry().getCoordinates());
        overlay.setPosition(fromLonLat(coord));
        popupElementRef.current
          .querySelector('.ol-popup-content')
          .innerText = feat.get('name');
      } else {
        overlay.setPosition(undefined);
      }
    });

    return () => map.setTarget(undefined);
  }, []);

  // эффект для маркеров: каждый раз, когда objects меняется
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // удаляем предыдущий слой "markers"
    map.getLayers().getArray()
      .filter(l => l.get('name') === 'markers')
      .forEach(l => map.removeLayer(l));

    // создаём новые фичи
    const features = objects.map(o => {
      const feat = new Feature({
        geometry: new Point(fromLonLat(o.coordinates)),
      });
      feat.set('name', o.name);
      feat.setStyle(new Style({
        image: new Icon({
          src: markerImg,
          scale: 0.05,
        }),
      }));
      return feat;
    });

    // добавляем новый слой
    const vectorLayer = new VectorLayer({
      name: 'markers',
      source: new VectorSource({ features }),
    });
    map.addLayer(vectorLayer);
  }, [objects]);

  return (
    <>
      <div
        ref={mapElementRef}
        style={{ width: '100%', height: '100vh' }}
      />
      <div ref={popupElementRef} className="ol-popup">
        <a href="#" className="ol-popup-closer"></a>
        <div className="ol-popup-content"></div>
      </div>
    </>
  );
};

export default MapComponent;
