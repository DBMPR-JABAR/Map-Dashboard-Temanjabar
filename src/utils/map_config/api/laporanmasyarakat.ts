import { env } from "../../../../env"

const LAYER_ID = "tx_laporan_masyarakat"
const TITLE = "Laporan Masyarakat"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `http://localhost:8080/assets/images/marker/jembatan.png`


export type LaporanMasyarakat = {
    id : number,
    nomorPengaduan : string,
    nama : string,
    nik : string ,
    alamat : string,
    telp : string ,
    email : string,
    jenis : string,
    gambar : string,
    lokasi : string,
    lat : string,
    long : string,
    deskripsi : string,
    status : string ,
    uptd_id : number,
    created_at : string,
    updated_at : string,
    user_id : null
}

const KEY = {
    id:'id',
    nomorPengaduan:'nomorPengaduan',
    nama:'nama',
    nik:'nik',
    alamat:'alamat',
    telp:'telp',
    email:'email',
    jenis:'jenis',
    gambar:'gambar',
    lokasi:'lokasi',
    lat:'lat',
    long:'long',
    deskripsi:'deskripsi',
    status:'status',
    uptd_id:'uptd_id',
    created_at:'created_at',
    updated_at:'updated_at',
    user_id:'user_id',
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{alamat}",
    content: [{
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "nomorPengaduan",
                    label: "Nomor Pengaduan",
                },
                {
                    fieldName: "nama",
                    label: "Nama",
                },
                {
                    fieldName: "email",
                    label: "Email",
                },
                {
                    fieldName: "alamat",
                    label: "Alamat",
                },
                {
                    fieldName: "jenis",
                    label: "Jenis",
                },
                {
                    fieldName: "lokasi",
                    label: "Lokasi",
                },
                {
                    fieldName: "lat",
                    label: "Latitude",
                },
                {
                    fieldName: "long",
                    label: "Longitude",
                },
                {
                    fieldName: "deskripsi",
                    label: "Deskripsi",
                },
                {
                    fieldName: "status",
                    label: "Status",
                },
                {
                    fieldName: "created_at",
                    label: "Tanggal Lapor",
                },
                {
                    fieldName: "uptd_id",
                    label: "UPTD",
                }
            ]
        },
        {
            type: "media",
            mediaInfos: [{
                title: "<b>Foto Kondisi</b>",
                type: "image",
                altText: "Foto Tidak Ada",
                value: {
                    sourceURL: `${env.baseUrl}/storage/{gambar}`
                }
            }]
        }
    ]
};

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
        name: "id",
        alias: "id",
        type: "integer"
    },
    {
        name: "nomorPengaduan",
        alias: "nomorPengaduan",
        type: "string"
    },
    {
        name: "nama",
        alias: "nama",
        type: "string"
    },
    {
        name: "email",
        alias: "Email",
        type: "string"
    },
    {
        name: "alamat",
        alias: "Alamat",
        type: "string"
    },
    {
        name: "jenis",
        alias: "jenis",
        type: "string"
    },
    {
        name: "gambar",
        alias: "gambar",
        type: "string"
    },
    {
        name: "lokasi",
        alias: "lokasi",
        type: "string"
    },
    {
        name: "lat",
        alias: "Latitude",
        type: "double"
    },
    {
        name: "long",
        alias: "Longitude",
        type: "double"
    },
    {
        name: "deskripsi",
        alias: "deskripsi",
        type: "string"
    },
    {
        name: "status",
        alias: "status",
        type: "string"
    },
    {
        name: "created_at",
        alias: "dilaporkan",
        type: "string"
    },
    {
        name: "uptd_id",
        alias: "UPTD",
        type: "string"
    }
]

export const renderLaporanMasyarakat = (items: LaporanMasyarakat[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: Number(item.long),
            y: Number(item.lat)
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as LaporanMasyarakat & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "alamat",
        title: TITLE,
        id: LAYER_ID,
        outFields: ["*"],
        fields: fields,
        geometryType: GEOM_TYPE,
        popupTemplate: popupTemplate,
        renderer: renderer,
        source: graphics,
        objectIdField: OBJECT_ID
    }
}
