import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { selectFeature } from "../features/featureSlice";
import { SEARCH_WIDGET_ID } from "../utils/constants";
import { FeatureSetMap } from "./Layers";

type SearchSourceProps = {
    view: __esri.MapView | __esri.SceneView | null
}

const SearchSource : React.FC<SearchSourceProps> = (props: SearchSourceProps) => {
    const layer = useAppSelector(selectFeature).featureLayer
    
    React.useEffect(() => {
        console.log(layer)

        props.view?.when(() => {
            const searchWidget = props.view?.ui.find(SEARCH_WIDGET_ID) as __esri.widgetsSearch
            if(searchWidget){
                searchWidget.allPlaceholder = "ASASAS"
            }

        })

    }, [layer])

    return <button onClick={() => console.log(layer)}> GET </button>
}

export default SearchSource