import  { useState, useEffect, FunctionComponent } from 'react';
import { loadModules } from 'esri-loader';

export type ScaleBarProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const ScaleBar : FunctionComponent<ScaleBarProps> = (props: ScaleBarProps) => {
    const [scaleBar, setScaleBar] = useState(null);
    
    useEffect(() => {
        loadModules(['esri/widgets/ScaleBar']).then(([ScaleBar]) => {
            const bar = new ScaleBar({
                view: props.view,
                unit: 'metric'
            });

            setScaleBar(bar);

            props.view?.ui.add(bar, props.position)

        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view?.ui.remove(scaleBar!);
        }
    }, [ props.view ]);

    return null;
}

export default ScaleBar;