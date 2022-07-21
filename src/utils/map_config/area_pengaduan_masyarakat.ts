import { pengaduanMasyarakatConfig } from "./area_pengaduan_masyarakat/pengaduan_masyarakat"

const LAYER_ID = "rbl"
const TITLE = "Pengaduan"

const layers = [
    pengaduanMasyarakatConfig
]

export const areaPengaduanMasyarakatConfig : __esri.GroupLayerProperties = {
    myType: "group-layer",
    id: LAYER_ID,
    title: TITLE,
    layers: layers
}