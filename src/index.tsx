import * as React from 'react'
import * as ReactDOM from 'react-dom'
import EsriMap from './ui/components/EsriMap';

const options = {
    url: 'https://js.arcgis.com/4.19/'
};

ReactDOM.render(
    <EsriMap />,
    document.getElementById('root')
)