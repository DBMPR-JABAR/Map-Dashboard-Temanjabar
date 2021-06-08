import React from 'react'
import { useMap } from 'esri-loader-hooks'

function MapViewHook() {

    const map = {
      basemap: "streets"
    };
    const view = {
      center: [15, 65],
      zoom: 4
    };

    const [ref] = useMap(map, { view });
    return <div ref={ref} />;
  }
  
  export default MapViewHook;