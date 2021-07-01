import { LAYER } from "../../constants"

const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/0"
const LAYER_ID = LAYER.RAWAN_GERAKAN_TANAH.id
const TITLE = LAYER.RAWAN_GERAKAN_TANAH.title

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "GERTAN",
                label: "gertan"
            },
            {
                fieldName: "SUMBER",
                label: "sumber"
            }
        ]
    }]
}

export const rawanGerakanTanahConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}