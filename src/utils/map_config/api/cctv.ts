import { env } from "../../../../env"

const LAYER_ID = "tx_cctv"
const TITLE = "CCTV"
export const ACTION_ID = "prep-vid"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `${process.env.BASE_URL}assets/images/marker/cctv.png`

export type Cctv = {
    ID: number,
    LOKASI: string,
    LAT: string,
    LONG: string,
    URL: string,
    DESCRIPTION: string,
    CATEGORY: string,
    STATUS: string,
    ENABLE_VEHICLE_COUNTING: number,
    SUP: string,
    UPTD_ID: number,
    CREATED_AT: string,
    UPDATED_AT: string,
    CREATED_BY: string,
    UPDATED_BY: string,
    FLAG: string
}

const KEY = {
    ID:'ID',
    LOKASI:'LOKASI',
    LAT:'LAT',
    LONG:'LONG',
    URL:'URL',
    DESCRIPTION:'DESCRIPTION',
    CATEGORY:'CATEGORY',
    STATUS:'STATUS',
    ENABLE_VEHICLE_COUNTING:'ENABLE_VEHICLE_COUNTING',
    SUP:'SUP',
    UPTD_ID:'UPTD_ID',
    CREATED_AT:'CREATED_AT',
    UPDATED_AT:'UPDATED_AT',
    CREATED_BY:'CREATED_BY',
    UPDATED_BY:'UPDATED_BY',
    FLAG:'FLAG',
}


const prepVidAction : __esri.ActionButtonProperties = {
    title: "Lihat Video",
    id: ACTION_ID,
    className: "fas fa-video"
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{LOKASI}",
    content: [{
            title: "Video",
            type: "custom",
            outFields: ["*"],
            creator: function() {
                const vidElem = document.createElement('video');
                vidElem.id = 'vid'; // + f.graphic.attributes.ID;
                vidElem.style.cssText = 'background:gray;';
                vidElem.width = 275;
                vidElem.height = 200;
                return vidElem;
            }
        },
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "LAT",
                    label: "Latitude"
                },
                {
                    fieldName: "LONG",
                    label: "Longitude"
                },
                {
                    fieldName: "URL",
                    label: "Url"
                },
                {
                    fieldName: "DESCRIPTION",
                    label: "Deskripsi"
                },
                {
                    fieldName: "CATEGORY",
                    label: "Kategori"
                },
                {
                    fieldName: "STATUS",
                    label: "Status"
                },
                {
                    fieldName: "SUP",
                    label: "SUP"
                },
                {
                    fieldName: "UPTD_ID",
                    label: "UPTD"
                }
            ]
        }
    ],
    actions: [prepVidAction as __esri.ActionButton]
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
        name: "LOKASI",
        alias: "Lokasi",
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
        name: "DESCRIPTION",
        alias: "Deskripsi",
        type: "string"
    },
    {
        name: "CATEGORY",
        alias: "Kategori",
        type: "string"
    },
    {
        name: "URL",
        alias: "URL",
        type: "string"
    },
    {
        name: "STATUS",
        alias: "Status",
        type: "string"
    },
    {
        name: "SUP",
        alias: "SUP",
        type: "string"
    },
    {
        name: "UPTD_ID",
        alias: "UPTD_ID",
        type: "string"
    }
]

export const renderCctv = (items: Cctv[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: Number(item.LONG),
            y: Number(item.LAT)
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as Cctv & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "LOKASI",
        title: TITLE,
        id: LAYER_ID,
        outFields: ["*"],
        geometryType: GEOM_TYPE,
        popupTemplate: popupTemplate,
        fields: fields,
        renderer: renderer,
        source: graphics,
        objectIdField: OBJECT_ID
    }
}

