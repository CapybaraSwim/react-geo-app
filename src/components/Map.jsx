import { fromLonLat, transform } from 'ol/proj.js';
import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import './popup.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [map, setMap] = useState(null);
  let objects = [
    {
      name: 'ЮФУ Библиотека',
      coordinates: [39.699196, 47.233797],
    },
    {
      name: 'ТЦ Плаза',
      coordinates: [39.631649, 47.208845],
    },
  ];

  useEffect(() => {
    const mapObject = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([39.699196, 47.233797]),
        zoom: 12,
      }),
    });

    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map) {
      const overlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        offset: [, -10],
      });
      map.addOverlay(overlay);

      const closer = document.getElementById('popup-closer');
      closer.onclick = () => overlay.setPosition(undefined);

      map.on('click', (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (ft) => ft);
        if (feature) {
          const coordinates = transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
          overlay.setPosition(coordinates);
          const popupContent = document.getElementById('popup-content');
          popupContent.innerHTML = feature.get('name');
        } else {
          overlay.setPosition(undefined);
        }
      });
    }
  }, [map]);

  useEffect(() => {
    if (map && objects.length > 0) {
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: objects.map((obj) => {
            const lonlat = transform(obj.coordinates, 'EPSG:4326', 'EPSG:3857');
            const feature = new Feature({
              geometry: new Point(lonlat),
            });
            feature.setStyle(new Style({
              image: new Icon({
                src: 'marker.png',
                scale: 0.03,
              }),
            }));
            feature.set('name', obj.name); // Set the name property of the feature
            return feature;
          }),
        }),
      });
      map.addLayer(markerLayer);
    }
  }, [map, objects]);

  return (
    <>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
      <div id="popup" className="ol-popup" ref={popupRef}>
        <button id="popup-closer" className="ol-popup-closer"></button>
        <div id="popup-content"></div>
      </div>
    </>
  );
};

export default MapComponent;