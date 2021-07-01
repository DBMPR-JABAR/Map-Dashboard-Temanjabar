import { LAYER } from "../../constants"

const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/1"
const LAYER_ID = LAYER.RAWAN_GEMPA.id
const TITLE = LAYER.RAWAN_GEMPA.title

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "UNSUR",
                label: "Unsur"
            },
            {
                fieldName: "KETERANGAN",
                label: "Keterangan"
            }
        ]
    }]
}

export const rawanGempaConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}