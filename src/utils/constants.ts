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

export const LAYER : {[a: string] : {id: string, title: string, searchField?: string}} = {
    // -- WMS
    //--------- Jalan
    JALAN_GROUP : {id: "rj", title: "Ruas Jalan"},
    JALAN_NASIONAL : {id: "rjn", title: "Ruas Jalan Nasional"},
    JALAN_PROVINSI : {id: "rjp", title: "Ruas Jalan Provinsi"},
    JALAN_TOL_KONSTRUKSI : {id: "rjtk", title: "Ruas Jalan Tol (Konstruksi)"},
    JALAN_TOL_OPERASIONAL : {id: "rjto", title: "Ruas Jalan Tol (Operasional)"},
    //--------- Bencana
    AREA_RAWAN_BENCANA : {id: "rbl", title: "Rawan Bencana"},
    INDEKS_RESIKO_BANJIR_BANDANG : {id: "irbbId", title: "Indeks Resiko Banjir Bandang"},
    INDEKS_RESIKO_BANJIR: {id: "irbId", title: "Indeks Resiko Banjir"},
    RAWAN_GEMPA: {id: "rgtId", title: "Gempa Bumi"},
    RAWAN_GERAKAN_TANAH: {id: "rgt2Id", title: "Rawan Gerakan Tanah"},
    RAWAN_LONGSOR: {id: "longsorId", title: "Rawan Longsor"},
    //--------- Non-GroupLayer
    KEMANTAPAN_JALAN : {id: "rj_mantap", title: "Kemantapan Jalan"},
    SURVEI_ROADDROID_RUAS : {id: "rjp_skj", title: "Hasil Survei Kondisi Jalan"},
    SURVEI_ROADDROID_TITIK : {id: "rjp_skj_titik", title: "Hasil Survei Kondisi Jalan (Titik)"},
    
    //-- API
    CCTV : {id: "tx_cctv", title: "CCTV"},
    JEMBATAN : {id: "tx_jembatan", title: "Jembatan"},
    LAPORAN_BENCANA : {id: "tx_laporan_bencana", title: "Laporan Bencana"},
    LAPORAN_MASYARAKAT : {id: "tx_laporan_masyarakat", title: "Laporan Masyarakat"},
    PEMELIHARAAN : {id: "tx_pemeliharaan", title: "Pemeliharaan"},
    TITIK_RAWAN_BENCANA : {id: "tx_rawan_bencana", title: "Titik Rawan Bencana"},
    VEHICLE_COUNTING : {id: "tx_vc", title: "Vehicle Counting"},
}

export type Coordinate = {
    latitude: number,
    longitude: number
}

export type Tanggal = {
    displayed: boolean,
    mulai: string,
    sampai: string
}
