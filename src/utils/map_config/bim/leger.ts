import { legerLineConfig } from "./leger_line"
import { legerPolygonConfig } from "./leger_polygon"

const LAYER_ID = "leger"
const TITLE = "Data Leger Jalan"

const layers = [
    legerLineConfig,
    legerPolygonConfig,
]

export const legerLayerConfig : __esri.GroupLayerProperties = {
    myType: "group-layer",
    id: LAYER_ID,
    title: TITLE,
    layers: layers
}