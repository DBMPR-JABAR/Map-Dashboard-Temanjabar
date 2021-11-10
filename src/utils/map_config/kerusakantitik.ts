import { ACTION_ID } from './jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/18/`
const LAYER_ID = "tx_kerusakan"
const TITLE = "Kerusakan Jalan (Titik)"
const ICON = `${process.env.BASE_URL}/assets/images/marker/peningkatan.png`

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{jenis_kerusakan}",
    content: [
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "tingkat_keparahan",
                    label: "Tingkat Keparahan"
                },
                {
                    fieldName: "dimensi",
                    label: "Dimensi"
                },
                {
                    fieldName: "satuan",
                    label: "Satuan"
                },
                {
                    fieldName: "kerapatan",
                    label: "Kerapatan (%)"
                },
                {
                    fieldName: "lat",
                    label: "Latitude"
                },
                {
                    fieldName: "long",
                    label: "Longitude"
                },
                {
                    fieldName: "uptd",
                    label: "UPTD"
                },
                {
                    fieldName: "created_at",
                    label: "Tanggal Dibuat"
                },
                {
                    fieldName: "updated_at",
                    label: "Tanggal Diperbarui"
                },
            ]
        },
        {
            type: "custom",
            outFields: ["*"],
            creator: function(feature: any) {
                const baseUrl = process.env.BASE_URL
                const foto = feature.graphic.attributes.gambar;
                let html = '';
                if(foto !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto}" alt="Foto 1" />
                    </div>`;
                }
                return html;
            }
        },
    ],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.PictureMarkerSymbolProperties = {
    type: "picture-marker",
    url: ICON,
    width: "24px",
    height: "24px"
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const kerusakanTitikConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    searchField: "jenis_kerusakan",
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
