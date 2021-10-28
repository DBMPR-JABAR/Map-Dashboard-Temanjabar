import { ACTION_ID } from '../jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/0/`
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
    content: [
        {
            type: "fields",
            fieldInfos: [
                {
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
                    fieldName: "sumber_data",
                    label: "Sumber Data"
                },
                {
                    fieldName: "sumber_tahun",
                    label: "Tahun Data Diambil"
                },
                {
                    fieldName: "expression/pjg_km",
                },
                                                {
                    fieldName: "updated_date",
                    label: "Terakhir Diperbarui"
                }
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
    expressionInfos: [{
            name: "pjg_km",
            title: "Panjang Ruas (KM)",
            expression: "Round($feature.pjg_ruas_m / 1000, 2)"
        },
        {
            name: "pemilik",
            title: "Status Jalan",
            expression: `return "Jalan Provinsi Jawa Barat"`,
        }

    ],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "#45abde",
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