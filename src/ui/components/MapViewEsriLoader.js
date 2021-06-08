import React from 'react';
import EsriLoaderReact from 'esri-loader-react';

function MapViewEsriLoader({options}) {  

  return (
      <EsriLoaderReact 
        options={options} 
        modulesToLoad={['esri/Map', 'esri/views/MapView', 'esri/widgets/ScaleBar']}    
        onReady={({loadedModules: [Map, MapView, ScaleBar], containerNode}) => {

          let view = new MapView({
            container: containerNode,
            map: new Map({basemap: 'streets-vector'}),
            zoom: 4,
            center: [174, -42],
          });
          
          view.ui.add(new ScaleBar({
            view: view,
            unit: 'metric'
          }), {
            position: "bottom-left"
          });
        }}
      />
  );  
}
export default MapViewEsriLoader
