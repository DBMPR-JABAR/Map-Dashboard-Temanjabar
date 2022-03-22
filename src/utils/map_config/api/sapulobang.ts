const LAYER_ID = "tx_rawan_bencana"
const TITLE = "Titik Rawan Bencana"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"

export type IconSapuLobang = {
    keterangan: string,
    icon: string
}

const ICON_KEY = {
    keterangan: "keterangan",
    icon: "icon"
}

export type SapuLobang = {
    tanggal: string,
    lat: number,
    long: number,
    uptd_id: string,
    icon: string,
    keterangan: string,
    created_at: string,
    created_by: number,
    updated_at: string,
    updated_by: number
}

const KEY = {
    tanggal : 'tanggal',
    lat : 'lat',
    long : 'long',
    uptd_id : 'uptd_id',
    icon : 'icon',
    keterangan : 'keterangan',
    created_at : 'created_at',
    created_by : 'created_by',
    updated_at : 'updated_at',
    updated_by : 'updated_by',
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
                    fieldName: "lat",
                    label: "Latitude"
                },
                {
                    fieldName: "long",
                    label: "Longitude"
                },
                {
                    fieldName: "uptd_id",
                    label: "UPTD"
                },
                {
                    fieldName: "icon",
                    label: "Icon"
                }
            ]
        },
        {
            type: "custom",
            title: "<b>Detail Lobang/b>",
            outFields: ["*"],
            creator: function(feature : any) {
                var id = feature.graphic.attributes.id_pek;
                return `<a class="btn btn-primary text-white mb-4" href="#" target="_blank">
                        Lihat Detail Pekerjaan</a>`;
            }
        }
    ],
}

const fields: __esri.FieldProperties[] = [
    {
        name: OBJECT_ID,
        alias: OBJECT_ID,
        type: "oid"
    },
    {
        name: "tanggal",
        alias: "Tanggal",
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
        name: "uptd_id",
        alias: "UPTD",
        type: "string"
    },
    {
        name: "icon",
        alias: "Icon",
        type: "string"
    }
]


const renderer = (icons: IconSapuLobang[]) : __esri.UniqueValueRendererProperties => {
    const uniqueValueInfos : __esri.UniqueValueInfoProperties[] = icons.map((data) => ({
        value: data.keterangan,
        symbol: {
            type: "picture-marker",
            url: `${process.env.BASE_URL}/storage/${data.icon}`,
            width: "28px",
            height: "28px"
        } as __esri.PictureMarkerSymbolProperties
    }))

    return {
        type: "unique-value",
        field: KEY.keterangan,
        uniqueValueInfos: uniqueValueInfos
    }
}

export const renderSapuLobang = (items: SapuLobang[], icons: IconSapuLobang[]) : __esri.FeatureLayerProperties => {

    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.long,
            y: item.lat
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as SapuLobang & { [OBJECT_ID] : number }
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