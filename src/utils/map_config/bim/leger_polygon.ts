const PATH = "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Sceneasd_WFL1/FeatureServer/2"
const LAYER_ID = "bim_leger_polygon"
const TITLE = "Data Leger Jalan (Polygon)"


export const legerPolygonConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
}