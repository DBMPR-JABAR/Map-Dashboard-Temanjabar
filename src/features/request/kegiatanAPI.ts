import axios from "axios";
import { Cctv } from "../../utils/map_config/api/cctv";
import { Jembatan } from "../../utils/map_config/api/jembatan";
import {
  IconLaporanBencana,
  LaporanBencana,
} from "../../utils/map_config/api/laporanbencana";
import { LaporanMasyarakat } from "../../utils/map_config/api/laporanmasyarakat";
import { Pemeliharaan } from "../../utils/map_config/api/pemeliharaan";
import {
  IconRawanBencana,
  RawanBencana,
} from "../../utils/map_config/api/rawanbencana";
import { VehicleCounting } from "../../utils/map_config/api/vehiclecounting";
import {
  SapuLobang,
  IconSapuLobang,
} from "../../utils/map_config/api/sapulobang";
import { SapuLobangPerencanaan } from "../../utils/map_config/api/sapulobang_perencanaan";
import { SapuLobangPenanganan } from "../../utils/map_config/api/sapulobang_penanganan";
import { LaporRumija } from "../../utils/map_config/api/lapor_rumija";
import { PaketPekerjaan } from "../../utils/map_config/api/PaketPekerjaan";

export type KegiatanRequest = {
  uptd: string[];
  sup: string[];
  date_from: string;
  date_to: string;
  kegiatan: string[];
};

export type KegiatanResponseData = {
  jembatan: Jembatan[];
  pemeliharaan: Pemeliharaan[];
  vehiclecounting: VehicleCounting[];
  rawanbencana: RawanBencana[];
  iconrawanbencana: IconRawanBencana[];
  laporanbencana: LaporanBencana[];
  iconlaporanbencana: IconLaporanBencana[];
  cctv: Cctv[];
  laporanmasyarakat: LaporanMasyarakat[];
  sapulobang: SapuLobang[];
  iconsapulobang: IconSapuLobang[];
  sapulobang_perencanaan: SapuLobangPerencanaan[];
  sapulobang_penanganan: SapuLobangPenanganan[];
  laporrumija: LaporRumija[];
  pembangunan: PaketPekerjaan[];
};

export type KegiatanResponse = {
  status: string;
  data: KegiatanResponseData;
};

const requestKegiatan = async (body: KegiatanRequest) => {
  const requestUrl = `${process.env.BASE_URL}/api/map/dashboard/data`;
  const response = await axios.post<KegiatanResponse>(requestUrl, body);
  const data = response.data;
  console.log(data);
  return data;
};

export default requestKegiatan;
