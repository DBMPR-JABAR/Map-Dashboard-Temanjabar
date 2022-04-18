export const SEARCH_WIDGET_ID = "searchWidget"

export const UPTD = {
    UPTD1: "uptd1",
    UPTD2: "uptd2",
    UPTD3: "uptd3",
    UPTD4: "uptd4",
    UPTD5: "uptd5",
    UPTD6: "uptd6"
}

export const KEGIATAN = {
    // --- Ruas Jalan
    RUAS_JALAN: "ruasjalan",
    KEMANTAPAN_JALAN: "kemantapanjalan",
    KEMANTAPAN_JALAN_MASYARAKAT: "kemantapanjalan_masyarakat",
    KERUSAKAN_JALAN_TITIK: "kerusakanjalan_titik",
    KONDISI_JALAN: "kondisijalan",
    KONDISI_JALAN_TITIK: "kondisijalan_titik",
    SAPU_LOBANG:  "sapulobang",
    SAPU_LOBANG_PERENCANAAN:  "sapulobang_perencanaan",
    SAPU_LOBANG_PENANGANAN:  "sapulobang_penanganan",

    // --- Kebencanaan
    LAPORAN_BENCANA: "laporanbencana",
    TITIK_RAWAN_BENCANA: "rawanbencana",
    AREA_RAWAN_BENCANA: "datarawanbencana",

    // --- Proyek
    BANKEU: "bankeu",
    JEMBATAN: "jembatan",
    PEMELIHARAAN: "pemeliharaan",
    PEKERJAAN: "pekerjaan",
    LAPORAN_MASYARAKAT: "laporanmasyarakat",

    // --- Ruang Milik Jalan
    RUMIJA: "rumija",
    LAPOR_RUMIJA: "laporrumija",

    // --- Tata Ruang
    CCTV: "cctv",
    VEHICLE_COUNTING: "vehiclecounting",
    SATUAN_PENDIDIKAN: "satuanpendidikan",

    // --- BIM
    LEGER: "leger",
}

export const HAS_TANGGAL = [
    KEGIATAN.PEMELIHARAAN,
    KEGIATAN.PEKERJAAN,
    KEGIATAN.SAPU_LOBANG,
    KEGIATAN.SAPU_LOBANG_PERENCANAAN,
    KEGIATAN.SAPU_LOBANG_PENANGANAN


]

export const NEED_API_REQUEST = [
    KEGIATAN.JEMBATAN,
    KEGIATAN.PEMELIHARAAN,
    KEGIATAN.CCTV,
    KEGIATAN.TITIK_RAWAN_BENCANA,
    KEGIATAN.LAPORAN_BENCANA,
    KEGIATAN.LAPORAN_MASYARAKAT,
    KEGIATAN.VEHICLE_COUNTING,
    KEGIATAN.SAPU_LOBANG,
    KEGIATAN.SAPU_LOBANG_PERENCANAAN,
    KEGIATAN.SAPU_LOBANG_PENANGANAN,
    KEGIATAN.LAPOR_RUMIJA

]

export type Coordinate = {
    latitude: number,
    longitude: number
}

export type Tanggal = {
    displayed: boolean,
    mulai: string,
    sampai: string
}
