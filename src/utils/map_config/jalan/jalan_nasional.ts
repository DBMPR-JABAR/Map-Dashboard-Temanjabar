import { env } from '../../../../env'
import { ACTION_ID } from '../jalan';

const PATH = env.geoSvrUrl + "geoserver/gsr/services/temanjabar/FeatureServer/2/"
const LAYER_ID = "rjn"
const TITLE = "Ruas Jalan Nasional"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{NAMA_SK}",
    content: [{
        type: "fields",
        fieldInfos: [
            {
                fieldName: "NO_RUAS",
                label: "Nomor Ruas"
            },
            {
                fieldName: "expression/pemilik"
            },
            {
                fieldName: "PJG_SK",
                label: "Panjang (KM)"
            },
            {
                fieldName: "KLS_JALAN",
                label: "Kelas Jalan"
            },
            {
                fieldName: "LINTAS",
                label: "Lintas"
            },
            {
                fieldName: "TAHUN",
                label: "Tahun"
            }
        ]
    }],
    expressionInfos: [{
        name: "pemilik",
        title: "Status Jalan",
        expression: `return "Kementrian PUPR"`,
    }],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "red",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const jalanNasionalConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    customParameters: {
        ak: env.authKey
    },
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: renderer
}

// ---- Search
