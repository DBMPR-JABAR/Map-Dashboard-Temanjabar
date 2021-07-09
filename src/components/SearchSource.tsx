import { loadModules } from "esri-loader";
import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { selectFeature } from "../features/featureSlice";
import { SEARCH_WIDGET_ID } from "../utils/constants";
import { CustomSearchSource } from "./Layers";

type SearchSourceProps = {
    view: __esri.MapView | __esri.SceneView | null
    id: string
}

const featureFilter = (graphics: __esri.Graphic[], searchField: string, query: string) =>
    graphics.filter((graphic) =>
        graphic.attributes[searchField].toLowerCase().includes(query)
    );



const SearchSource : React.FC<SearchSourceProps> = (props: SearchSourceProps) => {
    const layer = useAppSelector(selectFeature).featureLayer
    React.useEffect(() => {

        loadModules(["esri/widgets/Search/LayerSearchSource", 
                     "esri/geometry/geometryEngine"]).then(([LayerSearchSource, geometryEngine]) => {
            
            const createSearchSource = (source: CustomSearchSource) : __esri.LayerSearchSource => {
                return new LayerSearchSource({
                    placeholder: source.placeholder,
                    name: source.name,
                    getSuggestions: async (params : any) => {
                        return featureFilter(
                            source.graphics,
                            source.searchField,
                            params.suggestTerm.toLowerCase()
                            ).map((feature) => {
                            return {
                                key: "name",
                                text: feature.attributes[source.searchField],
                                sourceIndex: params.sourceIndex,
                                feature,
                                layer: source.layer
                            };
                        });
                    },
                    getResults: async (params: any) => {
                        if (params.suggestResult.feature) {
                            const buffer = geometryEngine.geodesicBuffer(
                                params.suggestResult.feature.geometry,
                                100,
                                "meters"
                            );
                            return [
                                {
                                    extent: buffer.extent,
                                    feature: params.suggestResult.feature,
                                    name: params.suggestResult.text,
                                },
                            ];
                        } else {
                            const featuresFilter = featureFilter(
                            source.graphics,
                            source.searchField,
                            params.suggestResult.text.toLowerCase(),
                            );
                            const buffer = geometryEngine.geodesicBuffer(
                                featuresFilter[0].geometry,
                                100,
                                "meters"
                            );
                            return [
                                {
                                    extent: buffer.extent,
                                    feature: featuresFilter[0],
                                    name: params.suggestResult.text,
                                },
                            ];
                        }
                    },
                })
            }
                
            props.view?.when(() => {
                const searchWidget = props.view?.ui.find(SEARCH_WIDGET_ID) as __esri.widgetsSearch
                if(searchWidget && layer.length > 0){
                    searchWidget.sources.removeAll()

                    layer.forEach((source) => {
                        if(source.layer.myType === "outsource-layer"){
                            searchWidget.sources.push(new LayerSearchSource({
                                layer: source.layer,
                                searchFields: [source.searchField],
                                displayField: source.searchField,
                                exactMatch: false,
                                outFields: ["*"],
                                name: source.name,
                                placeholder: source.name
                            }))
                        }else{
                            searchWidget.sources.push(createSearchSource(source))
                        }
                    })
                    
                }
            })

        }).catch((err) => console.error(err))

    }, [props.view, layer])

    return null
}

export default SearchSource