import { ACTION_ID } from '../jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/4/`
const LAYER_ID = "rjtk"
const TITLE = "Ruas Jalan Tol (Konstruksi)"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{Nama}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "panjang",
                label: "Panjang"
            },
            {
                fieldName: "pengelola",
                label: "Pengelola"
            },
            {
                fieldName: "kabupaten",
                label: "Kabupaten"
            },
            {
                fieldName: "propinsi",
                label: "Propinsi"
            },
            {
                fieldName: "keterangan",
                label: "Keterangan"
            }
        ]
    }],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "purple",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const jalanTolKonstruksiConfig : __esri.FeatureLayerProperties = {
    myType: "feature-layer",
    searchField: "nama",
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