import { ACTION_ID } from './jalan';

const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/15/`
const LAYER_ID = "rj_bankeu"
const TITLE = "Bantuan Keuangan"

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nama_kegiatan}",
    content: [
        {
            title: "<b>Progress</b>",
            type: "custom",
            outFields: ["*"],
            creator: function(feature: any) {
                const progress = feature.graphic.attributes.progress;
                let html = '';
                if(progress !== undefined){
                    html += `
                        <p>Progress</p>
                        <div class="progress">
                            <div class="progress-bar bg-success"
                                role="progressbar" style="width: ${progress}%"
                                aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress}%</div>
                        </div>
                    `;
                }
                return html;
            }
        },
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "progress",
                    label: "Proggress (%)"
                },
                {
                    fieldName: "nama_kegiatan",
                    label: "Nama Kegiatan"
                },
                {
                    fieldName: "nama_lokasi",
                    label: "Lokasi"
                },
                {
                    fieldName: "pemda",
                    label: "Pemda"
                },
                {
                    fieldName: "opd",
                    label: "OPD"
                },
                {
                    fieldName: "unor",
                    label: "UPTD"
                },
                {
                    fieldName: "kategori",
                    label: "Kategori Paket Pekerjaan"
                },
                {
                    fieldName: "no_kontrak",
                    label: "No Kontrak"
                },
                {
                    fieldName: "tanggal_kontrak",
                    label: "Tanggal Kontrak"
                },
                {
                    fieldName: "nilai_kontrak",
                    label: "Nilai Kontrak (Rp)"
                },
                {
                    fieldName: "no_spmk",
                    label: "No SMPK"
                },
                {
                    fieldName: "tanggal_spmk",
                    label: "Tanggal SPMK"
                },
                {
                    fieldName: "panjang",
                    label: "Panjang (km)"
                },
                {
                    fieldName: "waktu_pelaksanaan",
                    label: "Waktu Pelaksanaan (hari)"
                },
                {
                    fieldName: "ppk_kegiatan",
                    label: "PPK Kegiatan"
                },
                {
                    fieldName: "penyedia_jasa",
                    label: "Penyedia Jasa"
                },
                {
                    fieldName: "konsultasi_supervisi",
                    label: "Konsultan Supervisi"
                },
                {
                    fieldName: "nama_ppk",
                    label: "Nama PPK"
                },
                {
                    fieldName: "nama_sse",
                    label: "Nama SSE"
                },
                {
                    fieldName: "nama_gs",
                    label: "Nama Gs"
                },
                {
                    fieldName: "created_at",
                    label: "Dibuat Tanggal"
                },
                {
                    fieldName: "updated_at",
                    label: "Diperbarui Tanggal"
                },
                {
                    fieldName: "sumber_data",
                    label: "Sumber Data"
                },
            ]
        },
        {
            title: "<b>Progress</b>",
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
                        <img src="${baseUrl}/storage/${foto}" alt="Foto Evidence 1" />
                    </div>`;
                }
                if(foto1 !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto1}" alt="Foto Evidence 2" />
                    </div>`;
                }
                if(foto2 !== undefined){
                    html += `
                    <div class="esri-feature-media__item">
                        <img src="${baseUrl}/storage/${foto2}" alt="Foto Evidence 3" />
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

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "lime",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const bantuanKeuanganConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    searchField: "nama_lokasi",
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
