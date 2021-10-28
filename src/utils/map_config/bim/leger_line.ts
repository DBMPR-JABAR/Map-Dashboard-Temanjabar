const PATH = "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Sceneasd_WFL1/FeatureServer/1"
const LAYER_ID = "bim_leger"
const TITLE = "Data Leger Jalan (Ruas)"


export const legerLineConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
}