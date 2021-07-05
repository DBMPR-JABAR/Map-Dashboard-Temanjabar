import { env } from "../../../../env"

const LAYER_ID = "tx_jembatan"
const TITLE = "Jembatan"
export const ACTION_ID = "prep-img"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `http://localhost:8080/assets/images/marker/jembatan.png`

export type Jembatan = {
    ID: number,
    NAMA_JEMBATAN: string,
    LAT: number,
    LNG: number,
    PANJANG: number,
    LEBAR: number,
    JUMLAH_BENTANG: number,
    LOKASI: string,
    RUAS_JALAN: string,
    KET: string,
    SUP: string,
    UPTD: string,
    FOTO: string[]
}

const KEY = {
    ID: "ID",
    NAMA_JEMBATAN: "NAMA_JEMBATAN",
    LAT: "LAT",
    LNG: "LNG",
    PANJANG: "PANJANG",
    LEBAR: "LEBAR",
    JUMLAH_BENTANG: "JUMLAH_BENTANG",
    LOKASI: "LOKASI",
    RUAS_JALAN: "RUAS_JALAN",
    KET: "KET",
    SUP: "SUP",
    UPTD: "UPTD",
    FOTO: "FOTO"
}

const prepImgJembatan : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Foto",
    id: ACTION_ID,
    className: "fas fa-image"
};

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{NAMA_JEMBATAN}",
    content: [{
            type: "fields",
            fieldInfos: [{
                    fieldName: "PANJANG",
                    label: "Panjang"
                },
                {
                    fieldName: "LEBAR",
                    label: "Lebar"
                },
                {
                    fieldName: "RUAS_JALAN",
                    label: "Ruas Jalan"
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
            title: "<b>Foto Jembatan</b>",
            outFields: ["*"],
            creator: function() {
                const vidElem = document.createElement('div');
                vidElem.id = 'imgjembatan';
                return vidElem;
            }
        }
    ],
    actions: [prepImgJembatan as __esri.ActionButton]
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
        name: "ID",
        alias: "ID",
        type: "integer"
    },
    {
        name: "PANJANG",
        alias: "Panjang",
        type: "double"
    },
    {
        name: "LEBAR",
        alias: "Lebar",
        type: "double"
    },
    {
        name: "RUAS_JALAN",
        alias: "Ruas Jalan",
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
        name: "SUP",
        alias: "SUP",
        type: "string"
    },
    {
        name: "NAMA_JEMBATAN",
        alias: "Nama Jembatan",
        type: "string"
    },
    {
        name: "UPTD",
        alias: "UPTD",
        type: "string"
    },
    {
        name: "FOTO",
        alias: "Foto",
        type: "string"
    }
]

export const renderJembatan = (items: Jembatan[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((jembatan, index) => ({
        geometry: {
            type: "point",
            x: jembatan.LNG,
            y: jembatan.LAT
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...jembatan
        } as Jembatan & { [OBJECT_ID] : number }
    }))
    
    return  {
        myType: "feature-layer",
        searchField: "NAMA_JEMBATAN",
        title: TITLE,
        id: LAYER_ID,
        outFields: ["*"],
        geometryType: GEOM_TYPE,
        popupTemplate: popupTemplate,
        renderer: renderer,
        fields: fields,
        source: graphics,
        objectIdField: OBJECT_ID
    }
}