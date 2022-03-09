const LAYER_ID = "tx_pemeliharaan"
const TITLE = "Pemeliharaan"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `${process.env.BASE_URL}/assets/images/marker/pemeliharaan.png`


export type Pemeliharaan = {
    id_pek: string,
    tanggal: string,
    nama_mandor: string,
    sup: string,
    ruas_jalan: string,
    jenis_pekerjaan: number,
    paket: string,
    lokasi: string,
    panjang: number,
    peralatan: string,
    jumlah_pekerja: number,
    foto_awal: string,
    foto_sedang: string,
    foto_akhir: string,
    tglreal: string,
    id_session: string,
    ket: string,
    lat: number,
    lng: number,
    video: string,
    file: string,
    no_spp: string,
    is_deleted: number,
    kategori: string,
    rule: string,
    uptd_id: string,
    created_at: string,
    created_by: number,
    updated_at: string,
    updated_by: number,
    flag: string,
    foto_pegawai: string
}

const KEY = {
    id_pek : 'id_pek',
    tanggal : 'tanggal',
    nama_mandor : 'nama_mandor',
    sup : 'sup',
    ruas_jalan : 'ruas_jalan',
    jenis_pekerjaan : 'jenis_pekerjaan',
    paket : 'paket',
    lokasi : 'lokasi',
    panjang : 'panjang',
    peralatan : 'peralatan',
    jumlah_pekerja : 'jumlah_pekerja',
    foto_awal : 'foto_awal',
    foto_sedang : 'foto_sedang',
    foto_akhir : 'foto_akhir',
    tglreal : 'tglreal',
    id_session : 'id_session',
    ket : 'ket',
    lat : 'lat',
    lng : 'lng',
    video : 'video',
    file : 'file',
    no_spp : 'no_spp',
    is_deleted : 'is_deleted',
    kategori : 'kategori',
    rule : 'rule',
    uptd_id : 'uptd_id',
    created_at : 'created_at',
    created_by : 'created_by',
    updated_at : 'updated_at',
    updated_by : 'updated_by',
    flag : 'flag',
    foto_pegawai : 'foto_pegawai',
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{ruas_jalan}",
    content: [
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "tanggal",
                    label: "Tanggal"
                },
                {
                    fieldName: "jenis_pekerjaan",
                    label: "Jenis Pekerjaan"
                },
                {
                    fieldName: "nama_mandor",
                    label: "Nama Mandor"
                },
                {
                    fieldName: "panjang",
                    label: "Panjang "
                },
                {
                    fieldName: "lat",
                    label: "Latitude"
                },
                {
                    fieldName: "lng",
                    label: "Longitude"
                },
                {
                    fieldName: "lokasi",
                    label: "Lokasi"
                },
                {
                    fieldName: "sup",
                    label: "SUP"
                },
                {
                    fieldName: "uptd_id",
                    label: "UPTD"
                }
            ]
        },
        {
            type: "custom",
            title: "<b>Detail Pemeliharaan/b>",
            outFields: ["*"],
            creator: function(feature : any) {
                var id = feature.graphic.attributes.id_pek;
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
        name: "id_pek",
        alias: "id_pek",
        type: "string"
    },
    {
        name: "tanggal",
        alias: "Tanggal",
        type: "string"
    },
    {
        name: "jenis_pekerjaan",
        alias: "Jenis Pekerjaan",
        type: "string"
    },
    {
        name: "nama_mandor",
        alias: "Nama Mandor",
        type: "string"
    },
    {
        name: "panjang",
        alias: "Panjang",
        type: "string"
    },
    {
        name: "peralatan",
        alias: "Peralatan",
        type: "string"
    },
    {
        name: "lat",
        alias: "Latitude",
        type: "double"
    },
    {
        name: "lng",
        alias: "Longitude",
        type: "double"
    },
    {
        name: "lokasi",
        alias: "Lokasi",
        type: "string"
    },
    {
        name: "ruas_jalan",
        alias: "Ruas Jalan",
        type: "string"
    },
    {
        name: "foto_awal",
        alias: "Foto Awal",
        type: "string"
    },
    {
        name: "foto_sedang",
        alias: "Foto Sedang",
        type: "string"
    },
    {
        name: "foto_akhir",
        alias: "Foto Akhir",
        type: "string"
    },
    {
        name: "video",
        alias: "Video",
        type: "string"
    },
    {
        name: "sup",
        alias: "SUP",
        type: "string"
    },
    {
        name: "uptd_id",
        alias: "UPTD",
        type: "string"
    }
]

export const renderPemeliharaan = (items: Pemeliharaan[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.lng,
            y: item.lat
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as Pemeliharaan & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "ruas_jalan",
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