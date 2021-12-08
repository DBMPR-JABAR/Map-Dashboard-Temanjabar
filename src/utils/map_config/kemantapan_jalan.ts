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
                    title: "<b>Kondisi Jalan</b>",
                    type: "pie-chart",
                    caption: "Dari Luas Jalan {luas} m2",
                    value: {
                        fields: ["sangat_baik", "baik", "sedang", "jelek", "parah", "sangat_parah", "hancur"]
                    }
                },
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
                    fieldName: "kab_kota",
                    label: "Kota/Kabupaten"
                },
                {
                    fieldName: "ikp",
                    label: "IKP"
                },
                {
                    fieldName: "kemantapan",
                    label: "Kemantapan (%)"
                },
                {
                    fieldName: "tgl_survei",
                    label: "Tanggal Survei",
                    format: {
                        dateFormat: "short-date"
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
        },
        {
            type: "custom",
            outFields: ["*"],
            creator: function(feature: any) {
                const baseUrl = process.env.BASE_URL
                const idruas = feature.graphic.attributes.idruas;

                const html = `
                    <a href="${baseUrl}/admin/monitoring/kinerja-jalan/${idruas}" target="_blank" class="btn btn-primary text-white">Lihat Detail</a>
                `;
                return html;
            }
        },
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