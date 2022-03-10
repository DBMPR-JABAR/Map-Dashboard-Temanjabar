import axios from "axios"
import { Cctv } from "../../utils/map_config/api/cctv"
import { Jembatan } from "../../utils/map_config/api/jembatan"
import { IconLaporanBencana, LaporanBencana } from "../../utils/map_config/api/laporanbencana"
import { LaporanMasyarakat } from "../../utils/map_config/api/laporanmasyarakat"
import { Pemeliharaan } from "../../utils/map_config/api/pemeliharaan"
import { IconRawanBencana, RawanBencana } from "../../utils/map_config/api/rawanbencana"
import { VehicleCounting } from "../../utils/map_config/api/vehiclecounting"
import { SapuLobang } from "../../utils/map_config/api/sapulobang"



export type KegiatanRequest = {
    uptd: string[],
    sup: string[],
    date_from: string,
    date_to: string,
    kegiatan: string[]
}

export type KegiatanResponseData = {
    jembatan: Jembatan[],
    pemeliharaan: Pemeliharaan[],
    vehiclecounting: VehicleCounting[],
    rawanbencana: RawanBencana[],
    iconrawanbencana: IconRawanBencana[],
    laporanbencana: LaporanBencana[],
    iconlaporanbencana: IconLaporanBencana[],
    cctv: Cctv[],
    laporanmasyarakat: LaporanMasyarakat[]
    sapulobang: SapuLobang[],

}

export type KegiatanResponse = {
    status: string,
    data: KegiatanResponseData
}

const requestKegiatan = async (body: KegiatanRequest) => {
    const requestUrl = `${process.env.BASE_URL}/api/map/dashboard/data`
    const response = await axios.post<KegiatanResponse>(requestUrl, body)
    const data = response.data
    // console.log(data)
    return data
}

export default requestKegiatan