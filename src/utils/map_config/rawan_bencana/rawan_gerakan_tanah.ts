const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/0"
const LAYER_ID = "rgt2Id"
const TITLE = "Rawan Gerakan Tanah"

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

export const rawanGerakanTanahConfig  = {
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}