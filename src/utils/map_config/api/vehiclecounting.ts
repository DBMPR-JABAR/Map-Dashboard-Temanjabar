const LAYER_ID = "tx_vc"
const TITLE = "Vehicle Counting"

const ACTION_ID = "prep-vid"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `${process.env.BASE_URL}/assets/images/marker/vehiclecounting.png`

export type VehicleCounting = {
    ID: number,
    LOKASI: string,
    URL: string,
    CHANNEL: string,
    GAMBAR: string,
    LAT: number,
    LONG: number,
    JUMLAH_ORANG_UP: number,
    JUMLAH_ORANG_DOWN: number,
    JUMLAH_ORANG_STAY: number,
    JUMLAH_MOBIL_UP: number,
    JUMLAH_MOBIL_DOWN: number,
    JUMLAH_MOBIL_STAY: number,
    JUMLAH_MOTOR_UP: number,
    JUMLAH_MOTOR_DOWN: number,
    JUMLAH_MOTOR_STAY: number,
    JUMLAH_BIS_UP: number,
    JUMLAH_BIS_DOWN: number,
    JUMLAH_BIS_STAY: number,
    JUMLAH_TRUK_UP: number,
    JUMLAH_TRUK_DOWN: number,
    JUMLAH_TRUK_STAY: number,
    SUP: string,
    UPTD: string,
    CREATED_AT: string,
    UPDATED_AT: string
}

const KEY = {
    ID:'ID',
    LOKASI:'LOKASI',
    URL:'URL',
    CHANNEL:'CHANNEL',
    GAMBAR:'GAMBAR',
    LAT:'LAT',
    LONG:'LONG',
    JUMLAH_ORANG_UP:'JUMLAH_ORANG_UP',
    JUMLAH_ORANG_DOWN:'JUMLAH_ORANG_DOWN',
    JUMLAH_ORANG_STAY:'JUMLAH_ORANG_STAY',
    JUMLAH_MOBIL_UP:'JUMLAH_MOBIL_UP',
    JUMLAH_MOBIL_DOWN:'JUMLAH_MOBIL_DOWN',
    JUMLAH_MOBIL_STAY:'JUMLAH_MOBIL_STAY',
    JUMLAH_MOTOR_UP:'JUMLAH_MOTOR_UP',
    JUMLAH_MOTOR_DOWN:'JUMLAH_MOTOR_DOWN',
    JUMLAH_MOTOR_STAY:'JUMLAH_MOTOR_STAY',
    JUMLAH_BIS_UP:'JUMLAH_BIS_UP',
    JUMLAH_BIS_DOWN:'JUMLAH_BIS_DOWN',
    JUMLAH_BIS_STAY:'JUMLAH_BIS_STAY',
    JUMLAH_TRUK_UP:'JUMLAH_TRUK_UP',
    JUMLAH_TRUK_DOWN:'JUMLAH_TRUK_DOWN',
    JUMLAH_TRUK_STAY:'JUMLAH_TRUK_STAY',
    SUP:'SUP',
    UPTD:'UPTD',
    CREATED_AT:'CREATED_AT',
    UPDATED_AT:'UPDATED_AT'
}

const prepVidAction : __esri.ActionButtonProperties = {
    title: "Lihat Video",
    id: ACTION_ID,
    className: "fas fa-cctv"
}

const popupTemplate : __esri.PopupTemplateProperties = {
    title: "{LOKASI}",
    content: [{
            type: "custom",
            outFields: ["*"],
            creator: (function() {
                const vidElem = document.createElement('video');
                vidElem.id = 'vid'; // + f.graphic.attributes.ID;
                vidElem.style.cssText = 'background:gray;';
                vidElem.width = 275;
                vidElem.height = 200;
                return vidElem;
            })
        },
        {
            type: "fields",
            fieldInfos: [{
                    fieldName: "CHANNEL",
                    label: "Channel"
                },
                {
                    fieldName: "LAT",
                    label: "Latitude"
                },
                {
                    fieldName: "LONG",
                    label: "Longitude"
                },
                {
                    fieldName: "JUMLAH_ORANG_UP",
                    label: "Jumlah Orang Up"
                },
                {
                    fieldName: "JUMLAH_ORANG_DOWN",
                    label: "Jumlah Orang Down"
                },
                {
                    fieldName: "JUMLAH_ORANG_STAY",
                    label: "Jumlah Orang Stay"
                },
                {
                    fieldName: "JUMLAH_MOBIL_UP",
                    label: "Jumlah Mobil Up"
                },
                {
                    fieldName: "JUMLAH_MOBIL_DOWN",
                    label: "Jumlah Mobil Down"
                },
                {
                    fieldName: "JUMLAH_MOBIL_STAY",
                    label: "Jumlah Mobil Stay"
                },
                {
                    fieldName: "JUMLAH_MOTOR_UP",
                    label: "Jumlah Motor Up"
                },
                {
                    fieldName: "JUMLAH_MOTOR_DOWN",
                    label: "Jumlah Motor Down"
                },
                {
                    fieldName: "JUMLAH_MOTOR_STAY",
                    label: "Jumlah Motor Stay"
                },
                {
                    fieldName: "JUMLAH_BIS_UP",
                    label: "Jumlah Bis Up"
                },
                {
                    fieldName: "JUMLAH_BIS_DOWN",
                    label: "Jumlah Bis Down"
                },
                {
                    fieldName: "JUMLAH_BIS_STAY",
                    label: "Jumlah Bis Stay"
                },
                {
                    fieldName: "JUMLAH_TRUK_UP",
                    label: "Jumlah Truk Up"
                },
                {
                    fieldName: "JUMLAH_TRUK_DOWN",
                    label: "Jumlah Truk Down"
                },
                {
                    fieldName: "JUMLAH_TRUK_STAY",
                    label: "Jumlah Truk Stay"
                },
                {
                    fieldName: "SUP",
                    label: "SUP"
                },
                {
                    fieldName: "UPTD",
                    label: "UPTD"
                },
                {
                    fieldName: "CREATED_AT",
                    label: "Terakhir Diperbarui"
                },
                {
                    fieldName: "UPDATED_AT",
                    label: "Upload Terakhir"
                },
            ]
        }
    ],
    actions: [prepVidAction as __esri.ActionButton]
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
        name: "CHANNEL",
        alias: "Channel",
        type: "string"
    },
    {
        name: "URL",
        alias: "URL",
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
        name: "JUMLAH_ORANG_UP",
        alias: "Jumlah Orang Up",
        type: "string"
    },
    {
        name: "JUMLAH_ORANG_DOWN",
        alias: "Jumlah Orang Down",
        type: "string"
    },
    {
        name: "JUMLAH_ORANG_STAY",
        alias: "Jumlah Orang Stay",
        type: "string"
    },
    {
        name: "JUMLAH_MOBIL_UP",
        alias: "Jumlah Mobil Up",
        type: "string"
    },
    {
        name: "JUMLAH_MOBIL_DOWN",
        alias: "Jumlah Mobil Down",
        type: "string"
    },
    {
        name: "JUMLAH_MOBIL_STAY",
        alias: "Jumlah Mobil Stay",
        type: "string"
    },
    {
        name: "JUMLAH_MOTOR_UP",
        alias: "Jumlah Motor Up",
        type: "string"
    },
    {
        name: "JUMLAH_MOTOR_DOWN",
        alias: "Jumlah Motor Down",
        type: "string"
    },
    {
        name: "JUMLAH_MOTOR_STAY",
        alias: "Jumlah Motor Stay",
        type: "string"
    },
    {
        name: "JUMLAH_BIS_UP",
        alias: "Jumlah Bis Up",
        type: "string"
    },
    {
        name: "JUMLAH_BIS_DOWN",
        alias: "Jumlah Bis Down",
        type: "string"
    },
    {
        name: "JUMLAH_BIS_STAY",
        alias: "Jumlah Bis Stay",
        type: "string"
    },
    {
        name: "JUMLAH_TRUK_UP",
        alias: "Jumlah Truk Up",
        type: "string"
    },
    {
        name: "JUMLAH_TRUK_DOWN",
        alias: "Jumlah Truk Down",
        type: "string"
    },
    {
        name: "JUMLAH_TRUK_STAY",
        alias: "Jumlah Truk Stay",
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
    },
    {
        name: "CREATED_AT",
        alias: "Terakhir Diperbarui",
        type: "string"
    },
    {
        name: "UPDATED_AT",
        alias: "Upload Terakhir",
        type: "string"
    },
]

export const renderVehicleCounting = (items: VehicleCounting[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: Number(item.LONG),
            y: Number(item.LAT)
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as VehicleCounting & { [OBJECT_ID] : number }
    }))

    return  {
        myType: "feature-layer",
        searchField: "LOKASI",
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