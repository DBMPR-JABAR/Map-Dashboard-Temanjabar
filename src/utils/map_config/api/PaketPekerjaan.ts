import { type } from "os";

const LAYER_ID = "tx_paket_pekerjaan";
const TITLE = "Paket Pekerjaan";

const GEOM_TYPE = "point";
const OBJECT_ID = "ObjectID";
const ICON = `${process.env.BASE_URL}/assets/images/marker/pembangunan-icon.png`;
//const ICON = "https://www.mapcustomizer.com/markers/51120e9b/png/default/15";
export type PaketPekerjaan = {
  nm_paket: string;
  no_kontrak: string;
  no_spmk: string;
  ppk_kegiatan: string;
  tgl_kontrak: string;
  tgl_spmk: string;
  detail: Detail;
  laporan_approved: string;
};

type Detail = {
  kontraktor: Kontraktor;
  konsultan: Konsultan;
  nilai_kontrak: string;
  panjangKM: string;
  lama_waktu: number;
  panjang_km: string;
  ruas: Ruas[];
  ppk_detail: PPKDetail;
};

type PPKDetail = {
  user: UserPPK;
};
type UserPPK = {
  name: string;
};
type Ruas = {
  id_ruas_jalan: string;
  segment_jalan: string;
  long_awal: number;
  lat_awal: number;
  lat_akhir: number;
  long_akhir: number;
};

type Konsultan = {
  nama: string;
};

type Kontraktor = {
  nama: string;
};

const popupTemplate: __esri.PopupTemplateProperties = {
  title: "{nm_paket}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "no_kontrak", label: "No. Kontrak" },
        { fieldName: "nilai_kontrak", label: "Nilai Kontrak" },
        { fieldName: "tgl_kontrak", label: "Tgl. Kontrak" },
        { fieldName: "tgl_spmk", label: "Tgl. SPMK" },
        { fieldName: "lama_waktu", label: "Lama Pekerjaan" },
        { fieldName: "ppk_kegiatan", label: "PPK Kegiatan" },
        { fieldName: "kontraktor", label: "Kontraktor" },
        { fieldName: "konsultan", label: "Konsultan" },
        { fieldName: "ppk", label: "PPK" },
      ],
    },
  ],
};

const symbol: __esri.PictureMarkerSymbolProperties = {
  type: "picture-marker",
  url: ICON,
  width: "24px",
  height: "24px",
};

const renderer: __esri.SimpleRendererProperties = {
  type: "simple",
  symbol: symbol,
};

var lamaWaktu = "";

const fields: __esri.FieldProperties[] = [
  {
    name: OBJECT_ID,
    alias: OBJECT_ID,
    type: "oid",
  },
  {
    name: "nm_paket",
    alias: "Nama Pekerjaan",
    type: "string",
  },
  {
    name: "nilai_kontrak",
    alias: "Nilai Kontrak",
    type: "string",
  },
  {
    name: "no_kontrak",
    alias: "No. Kontrak",
    type: "string",
  },
  {
    name: "tgl_kontrak",
    alias: "Tgl. SPMK",
    type: "string",
  },
  {
    name: "tgl_spmk",
    alias: "Tgl. SPMK",
    type: "string",
  },
  {
    name: "lama_waktu",
    alias: "Waktu Pekerjaan",
    type: "string",
  },
  {
    name: "ppk_kegiatan",
    alias: "PPK Kegiatan",
    type: "string",
  },
  {
    name: "kontraktor",
    alias: "Kontraktor",
    type: "string",
  },
  {
    name: "konsultan",
    alias: "Konsultan",
    type: "string",
  },
  {
    name: "ppk",
    alias: "PPK",
    type: "string",
  },
  {
    name: "realisasi",
    alias: "Realisasi",
    type: "string",
  },
];

export const renderPaketPekerjaan = (
  items: PaketPekerjaan[]
): __esri.FeatureLayerProperties => {
  const graphics: __esri.GraphicProperties[] = items.map((item, index) => ({
    geometry: {
      type: "point",
      x: item.detail.ruas[0].long_awal,
      y: item.detail.ruas[0].lat_awal,
    } as __esri.PointProperties,
    attributes: {
      ObjectID: index,
      nm_paket: item.nm_paket,
      nilai_kontrak: item.detail.nilai_kontrak,
      no_kontrak: item.no_kontrak,
      tgl_kontrak: item.tgl_kontrak,
      tgl_spmk: item.tgl_spmk,
      lama_waktu: item.detail.lama_waktu + " Hari",
      ppk_kegiatan: item.ppk_kegiatan,
      kontraktor: item.detail.kontraktor.nama,
      konsultan: item.detail.konsultan.nama,
      ppk: item.detail.ppk_detail.user.name,
    } as unknown as PaketPekerjaan & { [OBJECT_ID]: number },
  }));
  console.log(items[0].detail.ruas[0].long_awal);
  return {
    myType: "feature-layer",
    searchField: "ruas_jalan",
    title: TITLE,
    id: LAYER_ID,
    outFields: ["*"],
    geometryType: GEOM_TYPE,
    fields: fields,
    popupTemplate: popupTemplate,
    renderer: renderer,
    source: graphics,
    objectIdField: OBJECT_ID,
  };
};
