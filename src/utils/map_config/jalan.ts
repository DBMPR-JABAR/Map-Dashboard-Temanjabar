import { LAYER } from "../constants"
import { jalanNasionalConfig } from "./jalan/jalan_nasional"
import { jalanProvinsiConfig } from "./jalan/jalan_provinsi"
import { jalanTolKonstruksiConfig } from "./jalan/jalan_tol_konstruksi"
import { jalanTolOperasionalConfig } from "./jalan/jalan_tol_operasi"

export const ACTION_ID = "prevSv"
const LAYER_ID = LAYER.JALAN_GROUP.id
const TITLE = LAYER.JALAN_GROUP.title

const jalanLayer = [
    jalanTolKonstruksiConfig,
    jalanTolOperasionalConfig,
    jalanNasionalConfig,
]

export const ruasJalanLayerConfig : __esri.GroupLayerProperties = {
    myType: "group-layer",
    id: LAYER_ID,
    title: TITLE,
    layers: jalanLayer
}