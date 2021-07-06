import { env } from '../../../../env'
import { ACTION_ID } from '../jalan';

const PATH = process.env.GEOSERVER_URL + "geoserver/gsr/services/temanjabar/FeatureServer/0/"
const LAYER_ID = "rjp"
const TITLE = "Ruas Jalan Provinsi"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "IDruas",
                label: "Kode Ruas"
            },
            {
                fieldName: "expression/pemilik"
            },
            {
                fieldName: "LAT_AWAL",
                label: "Latitude 0"
            },
            {
                fieldName: "LONG_AWAL",
                label: "Longitude 0"
            },
            {
                fieldName: "LAT_AKHIR",
                label: "Latitude 1"
            },
            {
                fieldName: "LONG_AKHIR",
                label: "Longitude 1"
            },
            {
                fieldName: "kab_kota",
                label: "Kab/Kota"
            },
            {
                fieldName: "wil_uptd",
                label: "UPTD"
            },
            {
                fieldName: "nm_sppjj",
                label: "SUP"
            },
            {
                fieldName: "expression/pjg_km",
            }
        ]
    }],
    expressionInfos: [
        {
            name: "pjg_km",
            title: "Panjang Ruas (KM)",
            expression: "Round($feature.pjg_ruas_m / 1000, 2)"
        },
        {
            name: "pemilik",
            title: "Status Jalan",
            expression: `return "DBMPR Jawa Barat"`,
        }
    ],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "green",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const jalanProvinsiConfig : __esri.FeatureLayerProperties = {
    myType: "feature-layer",
    searchField: "nm_ruas",
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


// --- Search
const jalanProvinsiSource: __esri.LayerSearchSourceProperties = {
    name: TITLE,
    layer: jalanProvinsiConfig,
    searchFields: ["nm_ruas"],
    displayField: "nm_ruas"
}