import { buildLegerLine } from "./leger_line"
import { buildLegerPolygon } from "./leger_polygon"

const LAYER_ID = "leger"
const TITLE = "Data Leger Jalan"


export const buildLeger = (uptdList: string[]) : __esri.GroupLayerProperties => {
    let layers: __esri.FeatureLayerProperties[] = [];

    uptdList.forEach(uptd => {
        layers.push(buildLegerPolygon(uptd));
        layers.push(buildLegerLine(uptd));
    });

    return {
        myType: "group-layer",
        id: LAYER_ID,
        title: TITLE,
        layers: layers
    }

}