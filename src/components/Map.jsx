import React from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Overlay from 'ol/Overlay'; // Обновлено
import Marker from './Marker.jsx';

const Map = ({ objects }) => {
  const mapRef = React.createRef();
  const popupRef = React.createRef();
  const overlayRef = React.createRef(); // Добавлено

  React.useEffect(() => {
    const map = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([47.237011, 39.710992]),
        zoom: 12,
      }),
    });

    map.on('click', () => {
      popupRef.current.style.display = 'none';
    });

    objects.forEach((object) => {
      const marker = new Marker(object.lon, object.lat);
      marker.on('click', () => {
        const popupContent = `<div>${object.name}</div>`;
        popupRef.current.innerHTML = popupContent;
        popupRef.current.style.display = 'block';
      });
      map.addOverlay(marker);
    });

    overlayRef.current = new Overlay({ element: popupRef.current }); // Обновлено
    map.addOverlay(overlayRef.current); // Обновлено
  }, [objects]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      <div ref={popupRef} style={{ display: 'none' }}></div>
    </div>
  );
};

export default Map;