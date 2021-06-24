import { env } from "../../env";

import { Coordinate } from "./constants";
import { ACTION_ID as jalanAction } from "./map_config/jalan"
import { ACTION_ID as jembatanAction } from "./map_config/api/jembatan"
import { ACTION_ID as vidAction } from "./map_config/api/cctv"

declare var fluidPlayer: any;

let ACTION : {[a: string]: (attibute: any, position: Coordinate) => void } = {
    
    [jalanAction] : (_, pos) => {
        window.open(`http://maps.google.com/maps?q=&layer=c&cbll=${pos.latitude},${pos.longitude}`, 
                    'SV_map_bmpr');
    },
    [jembatanAction] : (attributes, _) => {
        const foto = attributes.FOTO;
        const fotoArr = foto.split(',');
        const vidElem = document.getElementById('imgjembatan');
        fotoArr.forEach((foto: string) => {
            vidElem!.innerHTML += `
                <img src="${env.baseUrl}/storage/${foto}"/>
            `;
        });
        document.querySelector('div.esri-popup__action[title="Lihat Foto"]')?.remove()
    },
    [vidAction] : (attributes, _) => {
        const url = attributes.URL;

        const vidElem = document.getElementById('vid');
        const vidSrcElem = document.createElement('source');
        vidSrcElem.src = url;
        vidSrcElem.type = 'application/x-mpegURL';
        vidElem!.appendChild(vidSrcElem);

        fluidPlayer(
            'vid', {
                layoutControls: {
                    fillToContainer: true,
                    autoPlay: true,
                }
            }
        );

        document.querySelector('div.esri-popup__action[title="Lihat CCTV"]')?.remove()
    }
    
}


export default ACTION