import { env } from '../../../env'

type config = {
    popUpTemplate: __esri.PopupTemplate,
    featureProperties: __esri.FeatureLayerProperties
}

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: "prep-sv",
    className: "fas fa-thumbs-up"
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


export const jalanProvinsiConfig  = {
    url: env.baseUrl + "/geoserver/gsr/services/temanjabar/FeatureServer/0/",
    customParameters: {
        ak: env.authKey
    },
    title: 'Ruas Jalan Provinsi',
    id: 'rjp',
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-line",
            color: "green",
            width: "2px",
            style: "solid",
        }
    }
}