const PATH = "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/2014_Majalengka_01__for_exported_to_GE_A/FeatureServer/3"
const LAYER_ID = "bim_leger_polygon"
const TITLE = "Data Leger Jalan (Polygon)"


export const legerPolygonConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
}