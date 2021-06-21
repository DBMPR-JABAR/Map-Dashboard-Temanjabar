import { env } from '../../../env'
import { ACTION_ID } from './jalan';

const PATH = env.geoSvrUrl + "geoserver/gsr/services/temanjabar/FeatureServer/7/"
const LAYER_ID = "rjp_skj_titik"
const TITLE = "Hasil Survei Kondisi Jalan (Titik)"

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
                fieldName: "id_ruas_jalan",
                label: "Nomor Ruas"
            },
            {
                fieldName: "latitude",
                label: "Latitude"
            },
            {
                fieldName: "longitude",
                label: "Longitude"
            },
            {
                fieldName: "distance",
                label: "Jarak"
            },
            {
                fieldName: "altitude",
                label: "Altitude"
            },
            {
                fieldName: "altitude_10",
                label: "Altitude / 10"
            },
            {
                fieldName: "eiri",
                label: "Estimasi IRI"
            },
            {
                fieldName: "ciri",
                label: "Kalkulasi IRI"
            }
        ]
    }],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : {[a: string]: __esri.SimpleMarkerSymbolProperties}   = {
    "Baik" :  {
        type: "simple-marker",
        color: "green",
        size: "15px",
        style: "circle",
    },
    "Sedang" : {
        type: "simple-marker",
        color: "orange",
        size: "15px",
        style: "circle",
    },
    "Rusak Ringan" : {
        type: "simple-marker",
        color: "red",
        size: "15px",
        style: "circle",
    },
    "Rusak Berat": {
        type: "simple-marker",
        color: "#990b0b",
        size: "15px",
        style: "circle",
    }
}

const renderer: __esri.UniqueValueRendererProperties = {
    type: "unique-value",
    valueExpression: "When($feature.eiri <= 4, 'Baik', $feature.eiri > 4 && $feature.eiri <= 8, 'Sedang', $feature.eiri > 8 && $feature.eiri <= 12, 'Rusak Ringan', 'Rusak Berat')",
    uniqueValueInfos: [
        {
            value: 'Baik',
            symbol: symbol['Baik']
        },
        {
            value: 'Sedang',
            symbol: symbol['Sedang'],
        },
        {
            value: 'Rusak Ringan',
            symbol: symbol['Rusak Ringan'],
        },
        {
            value: 'Rusak Berat',
            symbol: symbol["Rusak Berat"]
        },
    ]
}

export const surveiRoaddroidTitikConfig : __esri.FeatureLayerProperties = {
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