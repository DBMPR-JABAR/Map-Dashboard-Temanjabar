import { env } from '../../../../env'
import { LAYER } from '../../constants';
import { ACTION_ID } from '../jalan';

const PATH = env.geoSvrUrl + "geoserver/gsr/services/temanjabar/FeatureServer/3/"
const LAYER_ID = LAYER.JALAN_TOL_OPERASIONAL.id
const TITLE = LAYER.JALAN_TOL_OPERASIONAL.title

const prepSVAction : __esri.ActionButtonProperties = {
    type: "button",
    title: "Lihat Street View",
    id: ACTION_ID,
    className: "fas fa-street-view"
};

const popUpTemplate : __esri.PopupTemplateProperties = {
    title: "{NAMA}",
    content: [{
        type: "fields",
        fieldInfos: [{
                fieldName: "PANJANG",
                label: "Panjang"
            },
            {
                fieldName: "PENGELOLA",
                label: "Pengelola"
            },
            {
                fieldName: "STATUS",
                label: "Status"
            },
            {
                fieldName: "Kabupaten",
                label: "Kabupaten"
            },
            {
                fieldName: "Propinsi",
                label: "Propinsi"
            }
        ]
    }],
    actions: [prepSVAction as __esri.ActionButton]
}

const symbol : __esri.SimpleLineSymbolProperties = {
    type: "simple-line", 
    color: "yellow",
    width: "2px",
    style: "solid",
}

const renderer: __esri.SimpleRendererProperties = {
    type: "simple",
    symbol: symbol
}

export const jalanTolOperasionalConfig  : __esri.FeatureLayerProperties = {
    myType: "feature-layer",
    url: PATH,
    customParameters: {
        ak: env.authKey
    },
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    popupTemplate: popUpTemplate,
    renderer: renderer
}