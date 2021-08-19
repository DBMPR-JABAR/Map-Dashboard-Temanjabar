const PATH = "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/2014_Majalengka_01__for_exported_to_GE_A/FeatureServer/2"
const LAYER_ID = "bim_leger"
const TITLE = "Data Leger Jalan (Ruas)"


export const legerLineConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
}