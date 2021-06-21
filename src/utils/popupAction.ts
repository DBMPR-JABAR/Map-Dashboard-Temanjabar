import { Coordinate } from "./constants";
import { ACTION_ID as jalanAction } from "./map_config/jalan"


let ACTION : {[a: string]: (attibute: any, position: Coordinate) => void } = {
    
    [jalanAction] : (_, pos) => {
        window.open(`http://maps.google.com/maps?q=&layer=c&cbll=${pos.latitude},${pos.longitude}`, 
                    'SV_map_bmpr');
    },
    
}


export default ACTION