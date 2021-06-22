const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/SATUPETA_BPBD/Kebencanaan/MapServer/9"
const LAYER_ID = "longsorId"
const TITLE = "Rawan Longsor"

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "Shape",
                label: "Shape"
            },
            {
                fieldName: "OBJECTID",
                label: "OBJECTID "
            },
            {
                fieldName: "GRIDCODE",
                label: "GRIDCODE"
            },
            {
                fieldName: "kelas",
                label: "kelas "
            },
            {
                fieldName: "Shape_Leng",
                label: "Shape_Leng "
            },
            {
                fieldName: "Shape_Area",
                label: "Shape_Area "
            }
        ]
    }]
}

export const rawanLongsorConfig : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}