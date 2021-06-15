import  { useState, useEffect, FunctionComponent } from 'react';
import { loadModules } from 'esri-loader';

export type FeatureLayerProps = {
    featureLayerProperties: __esri.FeatureLayerProperties,
    map: __esri.Map | null
}

const FeatureLayer : FunctionComponent<FeatureLayerProps> = (props: FeatureLayerProps) => {
    const [myFeatureLayer, setMyFeatureLayer] = useState(null);
    
    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
            const myFeatureLayer = new FeatureLayer(
                props.featureLayerProperties
            );

            setMyFeatureLayer(myFeatureLayer);
            props.map?.add(myFeatureLayer);

        }).catch((err) => console.error(err));

        return function cleanup() {
            props.map?.remove(myFeatureLayer!);
        }
    }, [ props ]);

    return null;
}

export default FeatureLayer;