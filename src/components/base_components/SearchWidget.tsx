import * as React from 'react'
import { loadModules } from 'esri-loader'
import { useAppSelector } from '../../app/hooks'
import { selectFeature } from '../../features/featureSlice'
import { SEARCH_WIDGET_ID } from '../../utils/constants'

export type LegendsProps = {
    view: __esri.MapView | __esri.SceneView | null,
    position: __esri.UIAddPosition
}

const SearchWidget : React.FC<LegendsProps> = (props: LegendsProps) => {
    const [searchWidget, setSearchWidget] = React.useState(null)
    const isLayerDisplayed = useAppSelector(selectFeature).kegiatan.length > 0
    
    React.useEffect(() => {

        props.view?.when(() => {
            loadModules(["esri/widgets/Search", "esri/layers/FeatureLayer"]).then(([Search, FeatureLayer]) => {
                
                const mSearchWidget = new Search({
                    view: props.view,
                    id: SEARCH_WIDGET_ID
                })
    
                setSearchWidget(mSearchWidget)
    
                if(isLayerDisplayed){
                    props.view?.ui.add(mSearchWidget!, props.position)
                }

            }).catch((err) => console.error(err))
        })


        return function cleanup() {
            props.view?.ui.remove(searchWidget!)
            setSearchWidget(null)
        }
    }, [ props.view, isLayerDisplayed ])

    return null
}


export default SearchWidget