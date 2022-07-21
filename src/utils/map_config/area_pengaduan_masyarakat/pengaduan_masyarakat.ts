const PATH = `${process.env.GEOSERVER_URL}/geoserver/gsr/services/temanjabar/FeatureServer/17`

const LAYER_ID = "rgtId"
const TITLE = "Area Pengaduan Masyarakat"

// export type LaporanMasyarakat = {
//     id : number,
//     nomorPengaduan : string,
//     nama : string,
//     nik : string ,
//     alamat : string,
//     telp : string ,
//     email : string,
//     jenis : string,
//     gambar : string,
//     kota : string,
//     deskripsi : string,
//     status : string ,
//     uptd : number,
//     created_at : string,
// }

// const KEY = {
//     id:'id',
//     nomorPengaduan:'nomorPengaduan',
//     nama:'nama',
//     nik:'nik',
//     alamat:'alamat',
//     telp:'telp',
//     email:'email',
//     jenis:'jenis',
//     gambar:'gambar',
//     kota:'kota',
//     deskripsi:'deskripsi',
//     status:'status',
//     uptd:'uptd',
//     created_at:'created_at',
// }

const symbol: __esri.SimpleFillSymbolProperties = {
    type: "simple-fill",
    color: [217, 19, 9, 0.2]
}
const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol

}
const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{nm_ruas}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "nomor_pengaduan",
                label: "Nomor"
            },
            {
                fieldName: "deskripsi",
                label: "Deskripsi"
            },
            {
                fieldName: "status",
                label: "Status"
            },
            {
                fieldName: "nama",
                label: "Nama"
            },
            {
                fieldName: "email",
                label: "Email"
            },
            {
                fieldName: "telp",
                label: "Telepon"
            },
            {
                fieldName: "alamat",
                label: "Alamat"
            },
        ]
    },
    {
        type: "custom",
        outFields: ["*"],
        creator: function(feature: any) {
            const foto = feature.graphic.attributes.gambar;
            let html = '';
            if(foto != undefined){
                html += `
                <div class="esri-feature-media__item">
                 
                    <img src="${process.env.BASE_URL}/map-dashboard/intervention-mage/${foto}" alt="Failed to load" />
                    
                </div>`;
            }
            return html;
        }
    }
    ]
}

export const pengaduanMasyarakatConfig  : __esri.FeatureLayerProperties  = {
    myType: "feature-layer",
    url: PATH,
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: renderer,
    
}