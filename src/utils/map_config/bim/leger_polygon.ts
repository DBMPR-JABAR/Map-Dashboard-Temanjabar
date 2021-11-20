const PATH = "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/LegerMajalengka_WFL1/FeatureServer/3"
const LAYER_ID = "bim_leger_polygon"
const TITLE = "Data Leger Jalan (Polygon)"


export const legerPolygonConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    apiKey: "AAPK2021e3c0ade243ac91fc03c5cc16af553UoLz7PP3cuznJsJw2hQOU6G-m47W2PWSfHujOs9JYI-UmZOtUw7TvgwWHUSIDPI",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
}