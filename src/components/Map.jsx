import React from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { Overlay } from 'ol';
import XYZ from 'ol/source/XYZ';


const Map = ({ objects }) => {
  React.useEffect(() => {
    const map = new OLMap({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([39.7106, 47.2226]),
        zoom: 12
      })
    });

    const markers = objects.map(object => {
      const marker = new Overlay({
        position: fromLonLat([object.lon, object.lat]),
        positioning: 'center-center',
        element: document.createElement('div'),
        stopEvent: false
      });

      const icon = new Icon({
        src: 'path/to/icon.png',
        anchor: [0.5, 1]
      });

      marker.getElement().appendChild(icon);
      map.addOverlay(marker);

      return marker;
    });

    return () => {
      markers.forEach(marker => {
        map.removeOverlay(marker);
      });
    };
  }, [objects]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Map;