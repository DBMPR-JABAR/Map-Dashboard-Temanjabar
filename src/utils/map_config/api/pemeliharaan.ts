const LAYER_ID = "tx_pemeliharaan"
const TITLE = "Pemeliharaan"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `${process.env.BASE_URL}assets/images/marker/pemeliharaan.png`


export type Pemeliharaan = {
    ID_PEK: string,
    TANGGAL: string,
    NAMA_MANDOR: string,
    SUP: string,
    RUAS_JALAN: string,
    JENIS_PEKERJAAN: number,
    PAKET: string,
    LOKASI: string,
    PANJANG: number,
    PERALATAN: string,
    JUMLAH_PEKERJA: number,
    FOTO_AWAL: string,
    FOTO_SEDANG: string,
    FOTO_AKHIR: string,
    TGLREAL: string,
    ID_SESSION: string,
    KET: string,
    LAT: number,
    LNG: number,
    VIDEO: string,
    FILE: string,
    NO_SPP: string,
    IS_DELETED: number,
    KATEGORI: string,
    RULE: string,
    UPTD: string,
    CREATED_AT: string,
    CREATED_BY: number,
    UPDATED_AT: string,
    UPDATED_BY: number,
    FLAG: string,
    FOTO_PEGAWAI: string
}

const KEY = {
    ID_PEK : 'ID_PEK',
    TANGGAL : 'TANGGAL',
    NAMA_MANDOR : 'NAMA_MANDOR',
    SUP : 'SUP',
    RUAS_JALAN : 'RUAS_JALAN',
    JENIS_PEKERJAAN : 'JENIS_PEKERJAAN',
    PAKET : 'PAKET',
    LOKASI : 'LOKASI',
    PANJANG : 'PANJANG',
    PERALATAN : 'PERALATAN',
    JUMLAH_PEKERJA : 'JUMLAH_PEKERJA',
    FOTO_AWAL : 'FOTO_AWAL',
    FOTO_SEDANG : 'FOTO_SEDANG',
    FOTO_AKHIR : 'FOTO_AKHIR',
    TGLREAL : 'TGLREAL',
    ID_SESSION : 'ID_SESSION',
    KET : 'KET',
    LAT : 'LAT',
    LNG : 'LNG',
    VIDEO : 'VIDEO',
    FILE : 'FILE',
    NO_SPP : 'NO_SPP',
    IS_DELETED : 'IS_DELETED',
    KATEGORI : 'KATEGORI',
    RULE : 'RULE',
    UPTD : 'UPTD',
    CREATED_AT : 'CREATED_AT',
    CREATED_BY : 'CREATED_BY',
    UPDATED_AT : 'UPDATED_AT',
    UPDATED_BY : 'UPDATED_BY',
    FLAG : 'FLAG',
    FOTO_PEGAWAI : 'FOTO_PEGAWAI',
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{RUAS_JALAN}",
    content: [
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "TANGGAL",
                    label: "Tanggal"
                },
                {
                    fieldName: "JENIS_PEKERJAAN",
                    label: "Jenis Pekerjaan"
                },
                {
                    fieldName: "NAMA_MANDOR",
                    label: "Nama Mandor"
                },
                {
                    fieldName: "PANJANG",
                    label: "Panjang "
                },
                {
                    fieldName: "LAT",
                    label: "Latitude"
                },
                {
                    fieldName: "LNG",
                    label: "Longitude"
                },
                {
                    fieldName: "LOKASI",
                    label: "Lokasi"
                },
                {
                    fieldName: "SUP",
                    label: "SUP"
                },
                {
                    fieldName: "UPTD",
                    label: "UPTD"
                }
            ]
        },
        {
            type: "custom",
            title: "<b>Detail Pemeliharaan/b>",
            outFields: ["*"],
            creator: function(feature : any) {
                var id = feature.graphic.attributes.ID_PEK;
                return `<a class="btn btn-primary text-white mb-4" href="${process.env.BASE_URL}/pemeliharaan/pekerjaan/${id}" target="_blank">
                        Lihat Detail Pekerjaan</a>`;
            }
        }
    ],
}

const symbol: __esri.PictureMarkerSymbolProperties = {
    type: "picture-marker",
    url: ICON,
    width: "24px",
    height: "24px"
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

const fields: __esri.FieldProperties[] = [
    {
        name: OBJECT_ID,
        alias: OBJECT_ID,
        type: "oid"
    },
    {
        name: "ID_PEK",
        alias: "ID_PEK",
        type: "string"
    },
    {
        name: "TANGGAL",
        alias: "Tanggal",
        type: "string"
    },
    {
        name: "JENIS_PEKERJAAN",
        alias: "Jenis Pekerjaan",
        type: "string"
    },
    {
        name: "NAMA_MANDOR",
        alias: "Nama Mandor",
        type: "string"
    },
    {
        name: "PANJANG",
        alias: "Panjang",
        type: "string"
    },
    {
        name: "PERALATAN",
        alias: "Peralatan",
        type: "string"
    },
    {
        name: "LAT",
        alias: "Latitude",
        type: "double"
    },
    {
        name: "LNG",
        alias: "Longitude",
        type: "double"
    },
    {
        name: "LOKASI",
        alias: "Lokasi",
        type: "string"
    },
    {
        name: "RUAS_JALAN",
        alias: "Ruas Jalan",
        type: "string"
    },
    {
        name: "FOTO_AWAL",
        alias: "Foto Awal",
        type: "string"
    },
    {
        name: "FOTO_SEDANG",
        alias: "Foto Sedang",
        type: "string"
    },
    {
        name: "FOTO_AKHIR",
        alias: "Foto Akhir",
        type: "string"
    },
    {
        name: "VIDEO",
        alias: "Video",
        type: "string"
    },
    {
        name: "SUP",
        alias: "SUP",
        type: "string"
    },
    {
        name: "UPTD",
        alias: "UPTD",
        type: "string"
    }
]

export const renderPemeliharaan = (items: Pemeliharaan[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.LNG,
            y: item.LAT
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as Pemeliharaan & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "RUAS_JALAN",
        title: TITLE,
        id: LAYER_ID,
        outFields: ["*"],
        geometryType: GEOM_TYPE,
        fields: fields,
        popupTemplate: popupTemplate,
        renderer: renderer,
        source: graphics,
        objectIdField: OBJECT_ID
    }
}