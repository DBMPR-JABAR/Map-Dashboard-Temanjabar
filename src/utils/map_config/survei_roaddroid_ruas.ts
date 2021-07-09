import { ACTION_ID } from './jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/6/`
const LAYER_ID = "rjp_skj"
const TITLE = "Hasil Survei Kondisi Jalan"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "custom",
        title: "<b>Survei Kondisi Jalan</b>",
        outFields: ["*"],
        creator: function(feature: any) {
            var id = feature.graphic.attributes.idruas;
            var div = document.createElement("div");
            div.className = "myClass";
            div.innerHTML = `<h5>Kode Ruas Jalan: ${id}</h5>
                            <iframe
                                src="${process.env.BASE_URL}/admin/monitoring/roadroid-survei-kondisi-jalan/${id}"
                                title="W3Schools Free Online Web Tutorials"
                                style="width:100%"/>
                            `;
            return div;
        }
    },
    {
        type: "fields",
        fieldInfos: [{
                fieldName: "idruas",
                label: "Nomor Ruas"
            },
            {
                fieldName: "idsegmen",
                label: "Nomor Segmen"
            },
            {
                fieldName: "KOTA_KAB",
                label: "Kota/Kabupaten"
            },
            {
                fieldName: "e_IRI",
                label: "Estimasi IRI"
            },
            {
                fieldName: "c_IRI",
                label: "Kalkulasi IRI"
            },
            {
                fieldName: "avg_speed",
                label: "Kecepatan Rata-Rata Pengukuran IRI"
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

const symbol : {[a: string]: __esri.SimpleLineSymbolProperties}   = {
    "Baik" :  {
        type: "simple-line",
        color: "green",
        width: "2px",
        style: "solid",
    },
    "Sedang" : {
        type: "simple-line",
        color: "orange",
        width: "2px",
        style: "solid",
    },
    "Rusak Ringan" : {
        type: "simple-line",
        color: "red",
        width: "2px",
        style: "solid",
    },
    "Rusak Berat": {
        type: "simple-line",
        color: "#990b0b",
        width: "2px",
        style: "solid",
    }
}

const renderer: __esri.UniqueValueRendererProperties = {
    type: "unique-value",
    valueExpression: "When($feature.e_iri <= 4, 'Baik', $feature.e_iri > 4 && $feature.e_iri <= 8, 'Sedang', $feature.e_iri > 8 && $feature.e_iri <= 12, 'Rusak Ringan', 'Rusak Berat')",
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

export const surveiRoaddroidRuasConfig : __esri.FeatureLayerProperties = {
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