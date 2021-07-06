import { env } from "../../../../env"

const LAYER_ID = "tx_laporan_bencana"
const TITLE = "Laporan Bencana"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"

export type IconLaporanBencana = {
    KETERANGAN: string,
    ICON_IMAGE: string
}

const ICON_KEY = {
    KETERANGAN: "KETERANGAN",
    ICON_IMAGE: "ICON_IMAGE"
}

export type LaporanBencana = {
    ID : number,
    NO_RUAS : string ,
    RUAS_JALAN : string,
    LOKASI : string,
    DAERAH : string ,
    LAT : number,
    LONG : number,
    FOTO : string,
    SUP : string,
    KETERANGAN : string ,
    UPTD_ID : number,
    ICON_ID : number,
    ICON_IMAGE : string,
    CREATED_AT : string,
    UPDATED_AT : string,
    CREATED_BY : string,
    UPDATED_BY : string,
    VIDEO : string,
    WAKTU_KEJADIAN : string
}

const KEY = {
    ID : 'ID',
    NO_RUAS : 'NO_RUAS',
    RUAS_JALAN : 'RUAS_JALAN',
    LOKASI : 'LOKASI',
    DAERAH : 'DAERAH',
    LAT : 'LAT',
    LONG : 'LONG',
    FOTO : 'FOTO',
    SUP : 'SUP',
    KETERANGAN : 'KETERANGAN',
    UPTD_ID : 'UPTD_ID',
    ICON_ID : 'ICON_ID',
    ICON_IMAGE : 'ICON_IMAGE',
    CREATED_AT : 'CREATED_AT',
    UPDATED_AT : 'UPDATED_AT',
    CREATED_BY : 'CREATED_BY',
    UPDATED_BY : 'UPDATED_BY',
    VIDEO : 'VIDEO',
    WAKTU_KEJADIAN : 'WAKTU_KEJADIAN',
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{RUAS_JALAN}",
    content: [
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "NO_RUAS",
                    label: "Nomor Ruas",
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
                },
                {
                    fieldName: "WAKTU_KEJADIAN",
                    label: "Waktu Kejadian",
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
        },
        {
            title: "<b>Video</b>",
            type: "custom",
            outFields: ["*"],
            creator: function(feature: any) {
                const video = feature.graphic.attributes.VIDEO;
                let html = '';
                if(video != ""){
                    html += `
                    <div class="esri-feature-media__item">
                        <video controls class="esri-feature-media__item">
                            <source src="${process.env.BASE_URL}/storage/${video}" type="video/mp4">
                        </video>
                    </div>`;
                }
                return html;
            }
        }
    ]
}

const fields: __esri.FieldProperties[] = [
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
        name: "VIDEO",
        alias: "Video",
        type: "string"
    },
    {
        name: "WAKTU_KEJADIAN",
        alias: "Waktu Kejadian",
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

const renderer = (icons: IconLaporanBencana[]) : __esri.UniqueValueRendererProperties => {
    const uniqueValueInfos : __esri.UniqueValueInfoProperties[] = icons.map((data) => ({
        value: data.KETERANGAN,
        symbol: {
            type: "picture-marker",
            url: `${process.env.BASE_URL}/storage/${data.ICON_IMAGE}`,
            width: "28px",
            height: "28px"
        } as __esri.PictureMarkerSymbolProperties
    }))

    return {
        type: "unique-value",
        field: KEY.KETERANGAN,
        uniqueValueInfos: uniqueValueInfos
    }
}

export const renderLaporanBencana = (items: LaporanBencana[], icons: IconLaporanBencana[]) : __esri.FeatureLayerProperties => {

    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.LONG,
            y: item.LAT
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as LaporanBencana & { [OBJECT_ID] : number }
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