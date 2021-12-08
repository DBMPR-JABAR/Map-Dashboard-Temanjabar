import { ACTION_ID } from './jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/1/`
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
                    title: "<b>Kemantapan Jalan</b>",
                    type: "pie-chart",
                    caption: "Dari Luas Jalan {luas} m2",
                    value: {
                        fields: ["kemantapan", "expression/tidakmantap"]
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
                    fieldName: "kab_kota",
                    label: "Kota/Kabupaten"
                },
                {
                    fieldName: "kemantapan",
                    label: "Kemantapan (%)"
                },
                {
                    fieldName: "tgl_survei",
                    label: "Periode Survei",
                    format: {
                        dateFormat: "year"
                    }
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
    expressionInfos: [
        {
            name: "tidakmantap",
            title: "tidak mantap",
            expression: "100 - $feature.kemantapan"
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

export const kemantapanJalanMasyarakatConfig : __esri.FeatureLayerProperties = {
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