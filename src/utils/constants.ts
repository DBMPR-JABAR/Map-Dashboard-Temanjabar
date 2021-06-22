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
    KONDISI_JALAN: "kondisijalan",
    KONDISI_JALAN_TITIK: "kondisijalan_titik",

    // --- Kebencanaan
    LAPORAN_BENCANA: "laporanbencana",
    TITIK_RAWAN_BENCANA: "rawanbencana",
    AREA_RAWAN_BENCANA: "datarawanbencana",

    // --- Proyek
    JEMBATAN: "jembatan",
    PEMELIHARAAN: "pemeliharaan",
    PEKERJAAN: "pekerjaan",
    LAPORAN_MASYARAKAT: "laporanmasyarakat",

    // --- Tata Ruang
    CCTV: "cctv",
    VEHICLE_COUNTING: "vehiclecounting",
}

export const HAS_TANGGAL = [
    KEGIATAN.PEMELIHARAAN,
    KEGIATAN.PEKERJAAN
]

export const NEED_API_REQUEST = [
    KEGIATAN.JEMBATAN,
    KEGIATAN.PEMELIHARAAN,
    KEGIATAN.CCTV,
    KEGIATAN.TITIK_RAWAN_BENCANA,
    KEGIATAN.LAPORAN_BENCANA,
    KEGIATAN.LAPORAN_MASYARAKAT,
    KEGIATAN.VEHICLE_COUNTING
]

export type Coordinate = {
    latitude: number,
    longitude: number
}

