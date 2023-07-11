import React from 'react';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon } from 'ol/style';

const Marker = ({ longitude, latitude }) => {
  const coordinates = fromLonLat([longitude, latitude]);

  const style = new Icon({
    src: 'https://openlayers.org/en/latest/examples/data/icon.png',
  });

  const feature = new Feature({
    geometry: new Point(coordinates),
  });

  feature.setStyle(style);

  return (
    <div>
      <div>{longitude}</div>
      <div>{latitude}</div>
    </div>
  );
};

export default Marker;