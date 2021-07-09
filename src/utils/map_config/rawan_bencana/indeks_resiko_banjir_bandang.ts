const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/8"
const LAYER_ID = "irbbId"
const TITLE = "Indeks Resiko Banjir Bandang"

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
            }

        ]
    }]
}

export const indeksResikoBanjirBandangConfig : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}