const LAYER_ID = "tx_sapu_lobang_perencanaan"
const TITLE = "Sapu Lobang Perencanaan"

const GEOM_TYPE = "point"
const OBJECT_ID = "ObjectID"
const ICON = `${process.env.BASE_URL}/assets/images/marker/sapulobang_schedule.png`


export type SapuLobangPerencanaan = {
    tanggal: string,
    lat: number,
    long: number,
    uptd_id: string,
    icon: string,
    image : string,
    panjang : string,
    keterangan: string,
    kategori: string,
    description: string,
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
    image : 'image',
    panjang : 'panjang',
    description : 'description',
    kategori : 'kategori',
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
                    fieldName: "panjang",
                    label: "Panjang (M)"
                },
                {
                    fieldName: "kategori",
                    label: "Kategori"
                },
                {
                    fieldName: "description",
                    label: "Keterangan"
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
                }
            ]
        },
        {
            type: "custom",
            title: "<b>Detail Lobang/b>",
            outFields: ["*"],
            creator: function(feature : any) {
                var id = feature.graphic.attributes.id_pek;
                const image = feature.graphic.attributes.image;
                let html = '';
                // if(isImage(image)){
                //     html += `
                //     <div class="esri-feature-media__item">
                //         <img src="${process.env.BASE_URL}/storage/survei_lubang/${image}" alt="Failed to load" />
                //     </div>`;
                // }
                
                // return html;
                return `
                <div class="esri-feature-media__item">
                    
                    <img src="${process.env.BASE_URL}/map-dashboard/intervention-mage/${image}" alt="Failed to load" />

                </div>`;
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
        name: "tanggal",
        alias: "Tanggal",
        type: "string"
    },
    {
        name: "panjang",
        alias: "Panjang (M)",
        type: "string"
       
    },
    {
        name: "kategori",
        alias: "Kategori",
        type: "string"
    },
    {
        name: "description",
        alias: "Keterangan",
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
        name: "image",
        alias: "Image",
        type: "string"
    }
]

export const renderSapuLobangPerencanaan = (items: SapuLobangPerencanaan[]) : __esri.FeatureLayerProperties => {
    
    const graphics : __esri.GraphicProperties[] = items.map((item, index) => ({
        geometry: {
            type: "point",
            x: item.long,
            y: item.lat
        } as __esri.PointProperties,
        attributes: {
            ObjectID: index,
            ...item
        } as SapuLobangPerencanaan & { [OBJECT_ID] : number }
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