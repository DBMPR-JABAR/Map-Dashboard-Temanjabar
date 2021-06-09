import React from "react"
import { Map } from "@esri/react-arcgis"
import { mapOptions, viewOptions } from '../../utils/map'
import FeatureLayer from "./FeatureLayer"


class EsriMap extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            map: null,
            view: null
        }
        this.handleMapLoad = this.handleMapLoad.bind(this)
    }

    handleMapLoad(map, view){
        this.setState(() => (map, view))
    }

    render() {
        const data = [
            {
                url: 'https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/1/'
            },
            {
                url: 'https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/4/'
            },
        ]
        return (
            <Map
                mapProperties={ mapOptions }
                viewProperties={ viewOptions } 
                onLoad={this.handleMapLoad} >
            <FeatureLayer
                featureLayerProperties={{
                    url: 'https://tj.temanjabar.net/geoserver/gsr/services/temanjabar/FeatureServer/4/'
                }} />
            </Map>
        )
        
    }

}
export default EsriMap
