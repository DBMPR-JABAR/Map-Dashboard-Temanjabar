import { ACTION_ID } from '../jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/16/`
const LAYER_ID = "rjk"
const TITLE = "Ruas Jalan Kab/Kota"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nama_jalan}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "jenis_jalan",
                label: "Jenis Jalan"
            },
            {
                fieldName: "status_jalan",
                label: "Status Jalan"
            },
            {
                fieldName: "sumber_data",
                label: "Sumber Data"
            },
            {
                fieldName: "sumber_tahun",
                label: "Tahun Data Diambil"
            }
        ]
    }],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "white",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const jalanKabkotaConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    searchField: "nama_jalan",
    url: PATH,
    customParameters: {
        ak: process.env.GEOSERVER_KEY
    },
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: renderer
}
