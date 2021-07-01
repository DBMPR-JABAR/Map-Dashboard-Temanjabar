import { rawanGempaConfig } from "./rawan_bencana/rawan_gempa"
import { rawanGerakanTanahConfig } from "./rawan_bencana/rawan_gerakan_tanah"
import { indeksResikoBanjirConfig } from "./rawan_bencana/indeks_resiko_banjir"
import { indeksResikoBanjirBandangConfig } from "./rawan_bencana/indeks_resiko_banjir_bandang"
import { rawanLongsorConfig } from "./rawan_bencana/rawan_longsor"
import { LAYER } from "../constants"

const LAYER_ID = LAYER.AREA_RAWAN_BENCANA.id
const TITLE = LAYER.AREA_RAWAN_BENCANA.title

const layers = [
    rawanGerakanTanahConfig,
    rawanGempaConfig,
    rawanLongsorConfig,
    indeksResikoBanjirConfig,
    indeksResikoBanjirBandangConfig
]

export const rawanBencanaConfig : __esri.GroupLayerProperties = {
    myType: "group-layer",
    id: LAYER_ID,
    title: TITLE,
    layers: layers
}