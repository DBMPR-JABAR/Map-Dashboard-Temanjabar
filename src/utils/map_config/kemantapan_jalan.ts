import { env } from '../../../env'
import { ACTION_ID } from './jalan';

const PATH = process.env.GEOSERVER_URL + "geoserver/gsr/services/temanjabar/FeatureServer/1/"
const LAYER_ID = "rj_mantap"
const TITLE = "Kemantapan Jalan"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [
        {
            type: "media",
            mediaInfos: [
                {
                    title: "<b>Kondisi Jalan</b>",
                    type: "pie-chart",
                    caption: "Dari Luas Jalan {l} m2",
                    value: {
                        fields: ["sangat_baik", "baik", "sedang", "jelek", "parah", "sangat_parah", "hancur"]
                    }
                },
                {
                    title: "<b>Jalan Mantap</b>",
                    type: "pie-chart",
                    value: {
                        fields: ["sangat_baik", "baik", "sedang"]
                    }
                },
                {
                    title: "<b>Jalan Tidak Mantap</b>",
                    type: "pie-chart",
                    value: {
                        fields: ["jelek", "parah", "sangat_parah", "hancur"]
                    }
                }
            ]
        },
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "idruas",
                    label: "Nomor Ruas"
                },
                {
                    fieldName: "KOTA_KAB",
                    label: "Kota/Kabupaten"
                },
                {
                    fieldName: "LAT_AWAL",
                    label: "Latitude Awal"
                },
                {
                    fieldName: "LONG_AWAL",
                    label: "Longitude Awal"
                },
                {
                    fieldName: "LAT_AKHIR",
                    label: "Latitude Akhir"
                },
                {
                    fieldName: "LONG_AKHIR",
                    label: "Longitude Akhir"
                },
                {
                    fieldName: "KETERANGAN",
                    label: "Keterangan"
                },
                {
                    fieldName: "nm_sppjj",
                    label: "SPP/ SUP"
                },
                {
                    fieldName: "wil_uptd",
                    label: "UPTD"
                }
            ]
        }
    ],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "green",
    width: "2px",
    style: "solid",
    marker: {
        color: "orange",
        placement: "begin-end",
        style: "circle"
    }
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const kemantapanJalanConfig : __esri.FeatureLayerProperties = {
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
    renderer: renderer,
}