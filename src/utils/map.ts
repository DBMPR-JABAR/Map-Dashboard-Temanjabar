export const mapOptions : __esri.MapProperties = {
    basemap: 'hybrid'
}

export const mapViewOptions : __esri.MapViewProperties = {
    zoom: 8,
    center: [107.6191, -6.9175],
    popup : {
        dockEnabled: true,
        dockOptions: {
            buttonEnabled: false,
            breakpoint: {
                width: 1920,
                height: 1080
            },
            position : "top-right"
        }
    }
}

export const sceneViewOptions: __esri.SceneViewProperties = {
    zoom: 8,
    center: [107.6191, -6.9175],
    popup : {
        dockEnabled: true,
        dockOptions: {
            buttonEnabled: false,
            breakpoint: {
                width: 720,
                height: 720
            },
            position : "top-right"
        }
    },
    viewingMode: "local"
}

