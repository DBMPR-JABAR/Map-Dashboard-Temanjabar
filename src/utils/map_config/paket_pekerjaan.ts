const RUAS_PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/talikuat/FeatureServer/0/`
const LAYER_RUAS_ID = "rj_paket"
const TITLE_RUAS = "Data Paket (Ruas)"

const TITIK_PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/talikuat/FeatureServer/1/`
const LAYER_TITIK_ID = "tx_paket"
const TITLE_TITIK = "Data Paket (Titik)"


const katPaket = [
    "Survey Kondisi Jalan/Jembatan",
    "Pembangunan Jalan",
    "Pelebaran Jalan Menuju Standar",
    "Pelebaran Jalan Menambah Lajur",
    "Rekonstruksi Jalan",
    "Rehabilitasi Jalan",
    "Pemeliharaan Berkala Jalan",
    "Pemeliharaan Rutin Jalan",
    "Pembangunan Jembatan",
    "Pembangunan Flyover",
    "Pembangunan Underpass",
    "Pembangunan Terowongan/Tunnel",
    "Penggantian Jembatan",
    "Pelebaran Jembatan",
    "Rehabilitasi Jembatan",
    "Pemeliharaan Rutin Jembatan",
    "Pemeliharaan Berkala Jembatan",
    "Penanggulangan Bencana/Tanggap Darurat"
];
const colors = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6",
                "#bfef45", "#fabed4", "#469990", "#dcbeff", "#9A6324", "#fffac8", "#800000", "#aaffc3",
                "#808000","#000075"];

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{NAMA_PAKET}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "NO_KONTRAK",
                label: "Nomor Kontrak"
            },
            {
                fieldName: "nama_kategori",
                label: "Jenis Pekerjaan"
            },
            {
                fieldName: "TGL_KONTRAK",
                label: "Tanggal Kontrak"
            },
            {
                fieldName: "TGL_INPUT",
                label: "Tanggal Input"
            },
            {
                fieldName: "WAKTU_PELAKSANAAN_HK",
                label: "Waktu Kontrak (Hari Kerja)"
            },
            {
                fieldName: "distance",
                label: "Perkiraan Panjang Saat Ini (m)"
            },
            {
                fieldName: "TARGET_PANJANG",
                label: "Target Panjang"
            },
            {
                fieldName: "JENIS_PENANGANAN",
                label: "Jenis Penanganan"
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
                fieldName: "LOKASI_PEKERJAAN",
                label: "Lokasi"
            },
            {
                fieldName: "KM_BDG1",
                label: "Segmen"
            },
            {
                fieldName: "SUP",
                label: "SUP"
            },
            {
                fieldName: "NILAI_KONTRAK",
                label: "Nilai Kontrak"
            },
            {
                fieldName: "PENYEDIA_JASA",
                label: "Penyedia Jasa"
            },
            {
                fieldName: "UPTD",
                label: "UPTD"
            },
            {
                fieldName: "updated_at",
                label: "Terakhir Diperbarui"
            }
        ]
    }]
}


const lineRenderer : __esri.UniqueValueRendererProperties = {
    type: "unique-value",
    field: "nama_kategori",
    uniqueValueInfos: katPaket.map((paket, index) => (
        {
            value: paket,
            symbol: {
                type: "simple-line",
                color: colors[index],
                width: "2px",
                style: "solid"
            }
        }
    ))
}

export const paketRuasConfig : __esri.FeatureLayerProperties = {
    myType: "feature-layer",
    searchField: "nama_paket",
    url: RUAS_PATH,
    customParameters: {
        ak: process.env.GEOSERVER_KEY
    },
    title: TITLE_RUAS,
    id: LAYER_RUAS_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: lineRenderer
}

const pointRenderer : __esri.UniqueValueRendererProperties = {
    type: "unique-value",
    field: "nama_kategori",
    uniqueValueInfos: katPaket.map((paket, index) => (
        {
            value: paket,
            symbol: {
                type: "simple-marker",
                color: colors[index],
            }
        }
    ))
}

export const paketTitikConfig : __esri.FeatureLayerProperties = {
    myType: "feature-layer",
    searchField: "nama_paket",
    url: TITIK_PATH,
    customParameters: {
        ak: process.env.GEOSERVER_KEY
    },
    title: TITLE_TITIK,
    id: LAYER_TITIK_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: pointRenderer
}