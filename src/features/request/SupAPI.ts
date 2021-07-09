import axios from "axios"

export type SppData = {
    SUP: string,
    UPTD: string
}

export type SupResponse = {
    status: string,
    data: {
        uptd: string[],
        spp: SppData[]
    }
}

const getSUP = async (uptd: string[]) => {
    const requestUrl = process.env.BASE_URL + "/api/map/dashboard/sup"
    const body = {
        uptd: uptd
    }

    const response = await axios.post<SupResponse>(requestUrl, body)
    const data = response.data

    return data
}

export default getSUP