import { LAYER } from "../../constants"

const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/7"
const LAYER_ID = LAYER.INDEKS_RESIKO_BANJIR.id
const TITLE = LAYER.INDEKS_RESIKO_BANJIR.title

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "kelas",
                label: "kelas"
            },
            {
                fieldName: "Shape_Leng",
                label: "Shape Leng"
            },
            {
                fieldName: "Shape_Area",
                label: "Shape Area"
            },
            {
                fieldName: "Luas_HA",
                label: "Luas HA"
            }
        ]
    }]
}

export const indeksResikoBanjirConfig : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}