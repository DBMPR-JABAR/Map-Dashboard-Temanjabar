const LAYER_ID = "tx_rawan_bencana"
const TITLE = "Titik Rawan Bencana"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"

export type IconRawanBencana = {
    ICON_NAME: string,
    ICON_IMAGE: string
}

const ICON_KEY = {
    ICON_NAME: "ICON_NAME",
    ICON_IMAGE: "ICON_IMAGE"
}

export type RawanBencana = {
    ID: number,
    NO_RUAS: string,
    STATUS: string,
    RUAS_JALAN: string,
    LOKASI: string,
    DAERAH: string,
    LAT: number,
    LONG: number,
    FOTO: string,
    SUP: string,
    KETERANGAN: string,
    ICON_NAME: string,
    ICON_IMAGE: string,
    UPTD_ID: number,
    CREATED_AT: string,
    UPDATED_AT: string,
    CREATED_BY: string,
    UPDATED_BY: string,
    FLAG: string
}

const KEY = {
    ID : 'ID',
    NO_RUAS : 'NO_RUAS',
    STATUS : 'STATUS',
    RUAS_JALAN : 'RUAS_JALAN',
    LOKASI : 'LOKASI',
    DAERAH : 'DAERAH',
    LAT : 'LAT',
    LONG : 'LONG',
    FOTO : 'FOTO',
    SUP : 'SUP',
    KETERANGAN : 'KETERANGAN',
    ICON_NAME : 'ICON_NAME',
    ICON_IMAGE : 'ICON_IMAGE',
    UPTD_ID : 'UPTD_ID',
    CREATED_AT : 'CREATED_AT',
    UPDATED_AT : 'UPDATED_AT',
    CREATED_BY : 'CREATED_BY',
    UPDATED_BY : 'UPDATED_BY',
    FLAG : 'FLAG',
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{RUAS_JALAN}",
    content: [{
            type: "fields",
            fieldInfos: [{
                    fieldName: "NO_RUAS",
                    label: "Nomor Ruas",
                },
                {
                    fieldName: "STATUS",
                    label: "Status",
                },
                {
                    fieldName: "LOKASI",
                    label: "Lokasi",
                },
                {
                    fieldName: "DAERAH",
                    label: "Daerah",
                },
                {
                    fieldName: "LAT",
                    label: "Latitude",
                },
                {
                    fieldName: "LONG",
                    label: "Longitude",
                },
                {
                    fieldName: "KETERANGAN",
                    label: "Keterangan",
                },
                {
                    fieldName: "SUP",
                    label: "SUP",
                },
                {
                    fieldName: "UPTD_ID",
                    label: "UPTD",
                }
            ]
        },
        {
            type: "media",
            mediaInfos: [{
                title: "<b>Foto Aktual</b>",
                type: "image",
                altText: "Foto Tidak Ada",
                value: {
                    sourceURL: `${process.env.BASE_URL}/storage/{FOTO}`
                }
            }]
        }
    ]
};

const fields : __esri.FieldProperties[] = [
    {
        name: OBJECT_ID,
        alias: OBJECT_ID,
        type: "oid"
    },
    {
        name: "ID",
        alias: "ID",
        type: "integer"
    },
    {
        name: "NO_RUAS",
        alias: "Nomor Ruas",
        type: "string"
    },
    {
        name: "STATUS",
        alias: "Status",
        type: "string"
    },
    {
        name: "RUAS_JALAN",
        alias: "Ruas Jalan",
        type: "string"
    },
    {
        name: "LOKASI",
        alias: "Lokasi",
        type: "string"
    },
    {
        name: "DAERAH",
        alias: "Daerah",
        type: "string"
    },
    {
        name: "LAT",
        alias: "Latitude",
        type: "double"
    },
    {
        name: "LONG",
        alias: "Longitude",
        type: "double"
    },
    {
        name: "KETERANGAN",
        alias: "Keterangan",
        type: "string"
    },
    {
        name: "FOTO",
        alias: "Foto",
        type: "string"
    },
    {
        name: "SUP",
        alias: "SUP",
        type: "string"
    },
    {
        name: "ICON_NAME",
        alias: "Jenis Titik Rawan Bencana",
        type: "string"
    },
    {
        name: "ICON_IMAGE",
        alias: "Icon Image",
        type: "string"
    },
    {
        name: "UPTD_ID",
        alias: "UPTD",
        type: "string"
    }
]

const renderer = (icons: IconRawanBencana[]) : __esri.UniqueValueRendererProperties => {
    const uniqueValueInfos : __esri.UniqueValueInfoProperties[] = icons.map((data) => ({
        value: data.ICON_NAME,
        symbol: {
            type: "picture-marker",
            url: `${process.env.BASE_URL}/storage/${data.ICON_IMAGE}`,
            width: "28px",
            height: "28px"
        } as __esri.PictureMarkerSymbolProperties
    }))

    return {
        type: "unique-value",
        field: KEY.ICON_NAME,
        uniqueValueInfos: uniqueValueInfos
    }
}

export const renderRawanBencana = (items: RawanBencana[], icons: IconRawanBencana[]) : __esri.FeatureLayerProperties => {

    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.LONG,
            y: item.LAT
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as RawanBencana & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "RUAS_JALAN",
        title: TITLE,
        id: LAYER_ID,
        outFields: ["*"],
        fields: fields,
        geometryType: GEOM_TYPE,
        popupTemplate: popupTemplate,
        renderer: renderer(icons),
        source: graphics,
        objectIdField: OBJECT_ID
    }
}