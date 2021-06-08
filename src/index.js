import React from 'react'
import ReactDOM from 'react-dom'
import MapViewEsriLoader from './ui/components/MapViewEsriLoader'
import MapViewHook from './ui/components/MapViewHook'

const options = {
    url: 'https://js.arcgis.com/4.19/'
};

ReactDOM.render(
    <MapViewHook 
        />,
    document.getElementById('root')
)