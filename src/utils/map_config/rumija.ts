import { ACTION_ID } from './jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/17/`
const LAYER_ID = "tx_rumija"
const TITLE = "Ruang Milik Jalan"
const ICON = `${process.env.BASE_URL}/assets/images/marker/rumija.png`

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{jenis_penggunaan}",
    content: [
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "nama",
                    label: "Nama"
                },
                {
                    fieldName: "alamat",
                    label: "Alamat"
                },
                {
                    fieldName: "no_ijin",
                    label: "Nomor Izin"
                },
                {
                    fieldName: "tanggal_ijin",
                    label: "Tanggal Izin"
                },
                {
                    fieldName: "ruas_jalan",
                    label: "Ruas Jalan"
                },
                {
                    fieldName: "kab_kota",
                    label: "Kab/Kota"
                },
                {
                    fieldName: "uptd",
                    label: "UPTD"
                },
                {
                    fieldName: "luas",
                    label: "Luas (m2)"
                },
                {
                    fieldName: "jenis_penggunaan",
                    label: "Jenis Penggunaan"
                },
                {
                    fieldName: "uraian",
                    label: "Uraian"
                },
            ]
        },
        {
            type: "custom",
            outFields: ["*"],
            creator: function(feature: any) {
                const baseUrl = process.env.BASE_URL
                const foto = feature.graphic.attributes.foto;
                const foto1 = feature.graphic.attributes.foto_1;
                const foto2 = feature.graphic.attributes.foto_2;
                const video = feature.graphic.attributes.video;
                let html = '';
                if(foto !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto}" alt="Foto 1" />
                    </div>`;
                }
                if(foto1 !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto1}" alt="Foto 2" />
                    </div>`;
                }
                if(foto2 !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto2}" alt="Foto 3" />
                    </div>`;
                }
                if(video !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <video controls class="esri-feature-media__item">
                            <source src="${baseUrl}/storage/${video}" type="video/mp4">
                        </video>
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

export const rumijaConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    searchField: "uraian",
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
