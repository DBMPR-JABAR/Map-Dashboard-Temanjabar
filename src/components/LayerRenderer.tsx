import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { selectFeature } from "../features/featureSlice";
import Layers from "./Layers";
import { KEGIATAN, NEED_API_REQUEST, Tanggal } from "../utils/constants";
import * as _ from "lodash";

import { ruasJalanLayerConfig } from "../utils/map_config/jalan";
import { jalanProvinsiConfig } from "../utils/map_config/jalan/jalan_provinsi";
import { rawanBencanaConfig } from "../utils/map_config/rawan_bencana";
import { kemantapanJalanConfig } from "../utils/map_config/kemantapan_jalan";
import { surveiRoaddroidRuasConfig } from "../utils/map_config/survei_roaddroid_ruas";
import { surveiRoaddroidTitikConfig } from "../utils/map_config/survei_roaddroid_titik";
import requestKegiatan, { KegiatanRequest, KegiatanResponseData } from "../features/request/kegiatanAPI";
import { renderJembatan } from "../utils/map_config/api/jembatan";
import { renderPemeliharaan } from "../utils/map_config/api/pemeliharaan";
import { renderCctv } from "../utils/map_config/api/cctv";
import { renderVehicleCounting } from "../utils/map_config/api/vehiclecounting";
import { renderLaporanMasyarakat } from "../utils/map_config/api/laporanmasyarakat";
import { renderLaporanBencana } from "../utils/map_config/api/laporanbencana";
import { renderRawanBencana } from "../utils/map_config/api/rawanbencana";
import { paketRuasConfig, paketTitikConfig } from "../utils/map_config/paket_pekerjaan";
import { satuanPendidikanConfig } from "../utils/map_config/satuan_pendidikan";
import { bantuanKeuanganConfig } from "../utils/map_config/bantuan_keuangan";
import { rumijaConfig } from "../utils/map_config/rumija"; 
import { legerLayerConfig } from "../utils/map_config/bim/leger";
import { kerusakanTitikConfig } from "../utils/map_config/kerusakantitik";

export type RendererProps = {
    map: __esri.Map | null
    view: __esri.MapView | __esri.SceneView | null
}

const LayerRenderer : React.FC<RendererProps> = (props: RendererProps) => {
    const features = useAppSelector(selectFeature)

    const [data, setData] = React.useState<__esri.LayerProperties[]>([])

    // Separate Kegiatan That Request to API vs. WMS
    const needApi = _.intersection(features.kegiatan, NEED_API_REQUEST)
    const mapServer = _.difference(features.kegiatan, needApi)

    const requestBody : KegiatanRequest = {
        uptd: features.uptd,
        kegiatan: needApi,
        sup: features.sup,
        date_from: features.tanggal.mulai,
        date_to: features.tanggal.sampai
    }

    // ----- POSSIBLY BUG ----- //
    
    React.useEffect(() => {
        let isMounted = false
        const items : __esri.LayerProperties[] = []

        props.view?.when(() => {
            isMounted = true

            if(!_.isEmpty(requestBody.kegiatan)){
               
                // Request From API then To WMS
                requestKegiatan(requestBody).then((response) => {
                    requestBody.kegiatan.forEach((kegiatan) => {
                        items.push(renderAPI[kegiatan](response.data))
                    })
                }).then(() => {
                    mapServer.forEach((kegiatan) => {
                        items.push(renderWMS[kegiatan](features.uptd, features.sup, features.tanggal))
                    })
                    if(isMounted) setData(items)
                })
            }else{
 
                // Avoiding Unnecessary APIRequest
                mapServer.forEach((kegiatan) => {
                    items.push(renderWMS[kegiatan](features.uptd, features.sup, features.tanggal))
                })

                if(isMounted) setData(items)
            }
        }).catch(() => {
            setData([])
            isMounted = false
        })

    }, [ features.kegiatan, features.sup, features.tanggal, features.uptd ])

    return <Layers map={props.map} view={props.view} data={data} features={features} />
}

export default LayerRenderer

const renderAPI : {[k: string] : (data: KegiatanResponseData) => __esri.LayerProperties} = {
    
    [KEGIATAN.JEMBATAN] : (data) =>  renderJembatan(data.jembatan),
    [KEGIATAN.PEMELIHARAAN] : (data) => renderPemeliharaan(data.pemeliharaan),
    [KEGIATAN.CCTV] : (data) => renderCctv(data.cctv),
    [KEGIATAN.VEHICLE_COUNTING] : (data) => renderVehicleCounting(data.vehiclecounting),
    [KEGIATAN.LAPORAN_MASYARAKAT] : (data) => renderLaporanMasyarakat(data.laporanmasyarakat),
    [KEGIATAN.LAPORAN_BENCANA] : (data) => renderLaporanBencana(data.laporanbencana, data.iconlaporanbencana),
    [KEGIATAN.TITIK_RAWAN_BENCANA] : (data) => renderRawanBencana(data.rawanbencana, data.iconrawanbencana),

}

const renderWMS : {[k: string] : (uptd: string[], sup: string[], tanggal: Tanggal) => __esri.LayerProperties} = {

    [KEGIATAN.RUAS_JALAN] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => value.charAt(4)), ',')
        let query = (!_.isEmpty(uptd)) ? `uptd IN (${uptdNum})` : ''
        jalanProvinsiConfig.definitionExpression = query

        if(ruasJalanLayerConfig.layers?.indexOf(jalanProvinsiConfig) === -1){
            ruasJalanLayerConfig.layers?.push(jalanProvinsiConfig)
        }
        
        return ruasJalanLayerConfig
    },
    [KEGIATAN.AREA_RAWAN_BENCANA] : () => {
        return rawanBencanaConfig
    },
    [KEGIATAN.KEMANTAPAN_JALAN] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => value.charAt(4)), ',')
        let query = (!_.isEmpty(uptd)) ? `uptd IN (${uptdNum})` : ''
        kemantapanJalanConfig.definitionExpression = query
        
        return kemantapanJalanConfig
    },
    [KEGIATAN.KONDISI_JALAN] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => value.charAt(4)), ',')
        let query = (!_.isEmpty(uptd)) ? `uptd IN (${uptdNum})` : ''
        surveiRoaddroidRuasConfig.definitionExpression = query
        
        return surveiRoaddroidRuasConfig
    },
    [KEGIATAN.KONDISI_JALAN_TITIK] : () => {
        return surveiRoaddroidTitikConfig
    },    
    [KEGIATAN.PEKERJAAN] : (uptd, sup, tanggal) => {
        const uptdNum = _.join(_.map(uptd, (value) => value.charAt(4)), ',')
        let query = `uptd IN (${uptdNum}) AND (tgl_kontrak BETWEEN '${tanggal.mulai}' AND '${tanggal.sampai}')`

        paketRuasConfig.definitionExpression = query
        paketTitikConfig.definitionExpression = query

        return {
            myType: "group-layer",
            id: "paket",
            title: "Data Paket",
            layers: [paketRuasConfig, paketTitikConfig]
        } as __esri.GroupLayerProperties
    },
    [KEGIATAN.SATUAN_PENDIDIKAN] : () => {
        return satuanPendidikanConfig
    },
    [KEGIATAN.BANKEU] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => `'${value}'`), ',')
        let query = (!_.isEmpty(uptd)) ? `unor IN (${uptdNum})` : ''
        bantuanKeuanganConfig.definitionExpression = query
        
        return bantuanKeuanganConfig
    },
    [KEGIATAN.LEGER] : (uptd) => {
        return legerLayerConfig;
    },
    [KEGIATAN.RUMIJA] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => `'${value.charAt(4)}'`), ',')
        let query = (!_.isEmpty(uptd)) ? `uptd IN (${uptdNum})` : ''
        rumijaConfig.definitionExpression = query
        
        return rumijaConfig
    },
    [KEGIATAN.KERUSAKAN_JALAN_TITIK] : (uptd) => {
        const uptdNum = _.join(_.map(uptd, (value) => value.charAt(4)), ',')
        let query = (!_.isEmpty(uptd)) ? `uptd IN (${uptdNum})` : ''
        kerusakanTitikConfig.definitionExpression = query
        
        return kerusakanTitikConfig
    },
}