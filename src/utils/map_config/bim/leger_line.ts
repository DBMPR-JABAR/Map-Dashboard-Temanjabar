const LAYER_ID = "bim_leger"
const TITLE = "Data Leger Jalan (Ruas)"


export const buildLegerLine = (uptd: string) : __esri.FeatureLayerProperties => {

    const pathList: {[key: string] : string} = {
        ["uptd1"]: "None",
        ["uptd2"]: "None",
        ["uptd3"]: "None",
        ["uptd4"]: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/Leger_UPTD4_2019_WFL1/FeatureServer/2",
        ["uptd5"]: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/LegerMajalengka_WFL1/FeatureServer/2",
        ["uptd6"]: "None",
    }

    const PATH: string = pathList[uptd] || "None";

    return {
        myType: "outsource-layer",
        apiKey: "AAPK2021e3c0ade243ac91fc03c5cc16af553UoLz7PP3cuznJsJw2hQOU6G-m47W2PWSfHujOs9JYI-UmZOtUw7TvgwWHUSIDPI",
        url: PATH,
        title: TITLE,
        id: LAYER_ID,
        // popupEnabled: true,
        // popupTemplate: {
        //     title: "Leger",
        //     fieldInfos: [
        //         {
        //             fieldName: "Name",
        //             label: "Name"
        //         },
        //         {
        //             fieldName: "PopupInfo",
        //             label: "Popup Info"
        //         }
        //     ]
        // },
        outFields: ["*"],
    }

}