import { KEGIATAN, UPTD } from "./constants";

export type SelectOption = {
    value: string,
    label: string
}
export type GroupSelect = {
    label: string,
    options: SelectOption[]
}

export const uptdOptions = () : SelectOption[] => {
    let uptdOptions : SelectOption[] = []
    if(process.env.MODE === "uptd"){
        const url = window.location.href
        const n = url.charAt(url.lastIndexOf("uptd") + 4);
        uptdOptions = [
            { value: `uptd${n}`, label: `UPTD ${n}` }
        ]
    }else{
        uptdOptions = [
            { value: UPTD.UPTD1, label: 'UPTD 1' },
            { value: UPTD.UPTD2, label: 'UPTD 2' },
            { value: UPTD.UPTD3, label: 'UPTD 3' },
            { value: UPTD.UPTD4, label: 'UPTD 4' },
            { value: UPTD.UPTD5, label: 'UPTD 5' },
            { value: UPTD.UPTD6, label: 'UPTD 6' }
        ]
    }
    return uptdOptions
}

export const kegiatanOptions = () : GroupSelect[] => {
    let kegiatanOptions : GroupSelect[] = []
    switch(process.env.MODE){
        case "internal":
            kegiatanOptions = [
                {
                    label: "Kondisi Jalan",
                    options: [
                        { value: KEGIATAN.RUAS_JALAN, label: "Ruas Jalan"},
                        { value: KEGIATAN.KEMANTAPAN_JALAN, label:  "Survei Kondisi Kemantapan Jalan"},
                        { value: KEGIATAN.KERUSAKAN_JALAN_TITIK, label:  "Kerusakan Jalan (Titik)"},
                        { value: KEGIATAN.KONDISI_JALAN, label:  "Survei Kondisi Jalan dengan Roaddroid"},
                        { value: KEGIATAN.KONDISI_JALAN_TITIK, label:  "Survei Kondisi Jalan (Titik Roaddroid)"},
                        { value: KEGIATAN.SAPU_LOBANG, label:  "Sapu Lobang"},

                    ]
                },
                {
                    label: "Integrasi BIM",
                    options: [
                        { value: KEGIATAN.LEGER, label: "Leger Jalan"}
                    ]
                },
                {
                    label: "Kebencanaan",
                    options: [
                        { value: KEGIATAN.LAPORAN_BENCANA, label: "Laporan Bencana"},
                        { value: KEGIATAN.TITIK_RAWAN_BENCANA, label:  "Titik Rawan Bencana"},
                        { value: KEGIATAN.AREA_RAWAN_BENCANA, label:  "Area Rawan Bencana"},
                    ]
                },
                {
                    label: "Proyek",
                    options: [
                        { value: KEGIATAN.BANKEU, label: "Bantuan Keuangan"},
                        { value: KEGIATAN.JEMBATAN, label: "Jembatan"},
                        { value: KEGIATAN.PEMELIHARAAN, label: "Pemeliharaan"},
                        { value: KEGIATAN.PEKERJAAN, label:  "Paket Pekerjaan"},
                        { value: KEGIATAN.LAPORAN_MASYARAKAT, label:  "Laporan Masyarakat"},
                    ]
                },
                {
                    label: "Tata Ruang",
                    options: [
                        { value: KEGIATAN.RUMIJA, label: "Ruang Milik Jalan"},
                        { value: KEGIATAN.CCTV, label: "CCTV"},
                        { value: KEGIATAN.VEHICLE_COUNTING, label:  "Vehicle Counting"},
                    ]
                },
            ]
            break
        default:
            kegiatanOptions = [
                {
                    label: "Ruas Jalan",
                    options: [
                        { value: KEGIATAN.RUAS_JALAN, label: "Ruas Jalan"},
                        { value: KEGIATAN.KEMANTAPAN_JALAN_MASYARAKAT, label:  "Kemantapan Jalan"},
                        { value: KEGIATAN.KERUSAKAN_JALAN_TITIK, label:  "Kerusakan Jalan (Titik)"},
                    ]
                },
                {
                    label: "Kebencanaan",
                    options: [
                        { value: KEGIATAN.LAPORAN_BENCANA, label: "Laporan Bencana"},
                        { value: KEGIATAN.TITIK_RAWAN_BENCANA, label:  "Titik Rawan Bencana"},
                        { value: KEGIATAN.AREA_RAWAN_BENCANA, label:  "Area Rawan Bencana"},
                    ]
                },
                {
                    label: "Proyek",
                    options: [
                        { value: KEGIATAN.JEMBATAN, label: "Jembatan"},
                        { value: KEGIATAN.PEMELIHARAAN, label: "Pemeliharaan"},
                        { value: KEGIATAN.PEKERJAAN, label:  "Paket Pekerjaan"},
                    ]
                },
                {
                    label: "Tata Ruang",
                    options: [
                        { value: KEGIATAN.RUMIJA, label: "Ruang Milik Jalan"},
                        { value: KEGIATAN.CCTV, label: "CCTV"},
                    ]
                },
            ]
            break
    }
    return kegiatanOptions
}


