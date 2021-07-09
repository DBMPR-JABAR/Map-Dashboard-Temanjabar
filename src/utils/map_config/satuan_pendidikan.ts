const PATH = "https://satupeta.jabarprov.go.id/arcgis/rest/services/DATA_PENDIDIKAN_PT/sebaran_pendidikan/MapServer/0"
const LAYER_ID = "tx_sekolah"
const TITLE = "Persebaran Satuan Pendidikan"

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nama}",
    content: [{
        type: "fields",
        fieldInfos: [
            {
                fieldName: "alamat",
                label: "Alamat"
            },
            {
                fieldName: "npsn",
                label: "NPSN"
            },
            {
                fieldName: "tingkatan",
                label: "Tingkatan"
            },
            {
                fieldName: "expression/sumber_data",
                label: "Sumber Data"
            }
        ]
    }],
    expressionInfos: [
        {
            name: "sumber_data",
            title: "Sumber Data",
            expression: `return "Satupeta Jabar DISDIK, 2021"`,
        }
    ],
}

export const satuanPendidikanConfig  : __esri.FeatureLayerProperties  = {
    myType: "outsource-layer",
    searchField: "nama",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
}