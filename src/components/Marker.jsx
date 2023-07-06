import React, { useEffect } from 'react';
import Overlay from 'ol/Overlay';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style as StyleInt } from 'ol/style';

const Marker = ({ lon, lat }) => {
  const markerRef = React.createRef();

  useEffect(() => {
    const feature = new Feature({
      geometry: new Point([lon, lat]),
    });

    const iconStyle = new StyleInt({
      image: new Icon({
        src: './src/components/marker.png',
        scale: 0.1,
      }),
    });
    feature.setStyle(iconStyle);

    const source = new VectorSource({
      features: [feature],
    });

    const vectorLayer = new VectorLayer({
      source: source,
    });

    const marker = new Overlay({
      element: markerRef.current,
      positioning: 'center-center',
      stopEvent: false,
      offset: [0, 0],
    });

    vectorLayer.on('change', () => {
      marker.setPosition(feature.getGeometry().getCoordinates());
    });

    marker.setElement(markerRef.current);

    return () => {
      marker.setMap(null);
      vectorLayer.setMap(null);
    };
  }, [lon, lat]);

  return <div ref={markerRef} style={{ display: 'none' }}></div>;
};

export default Marker;