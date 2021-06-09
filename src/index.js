import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/components/App'
import EsriMap from './ui/components/EsriMap';

const options = {
    url: 'https://js.arcgis.com/4.19/'
};

ReactDOM.render(
    <EsriMap 
        />,
    document.getElementById('root')
)