import * as React from "react";
import Select from "react-select"
import type {OptionsType, GroupTypeBase, Styles} from 'react-select'

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectFeature, setKegiatan, setSPP, setTanggal, setUPTD } from "../features/featureSlice";
import getSUP from "../features/request/SupAPI"

import { uptdOptions, kegiatanOptions } from "../utils/options";
import type { SelectOption } from '../utils/options'
import { HAS_TANGGAL, Tanggal } from "../utils/constants";
import * as _ from "lodash";

const customStyles: Partial<Styles<SelectOption, true, GroupTypeBase<SelectOption>>> | undefined = {
 
    control: (provided, _) => ({
        ...provided,
        maxHeight: '16vh',
    }),
    valueContainer: (provided, _) => ({
        ...provided,
        maxHeight: '14vh',
        overflowY: 'scroll',
        scrollbarWidth: 'none'
    }),
    indicatorsContainer: (provided, _) => ({
        ...provided,
        maxHeight: '14vh',
    }),
    multiValueLabel: (provided, _) => ({
        ...provided,
        fontSize: '0.6em'
    })
}

const FilterSelection : React.FC = () => {
    const dispatch = useAppDispatch()
    const tanggalInit = useAppSelector(selectFeature).tanggal

    const [sppOptions, setSppOptions] = React.useState<SelectOption[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    const [kegiatanValue, setKegiatanValue] = React.useState<OptionsType<SelectOption> | null>(null)
    const [sppValue, setSppValue] = React.useState<OptionsType<SelectOption> | null>(null)
    const [uptdValue, setUptdValue] = React.useState<OptionsType<SelectOption> | null >(null)
    const [btnDisabled, setBtnDisabled] = React.useState<boolean>(true)
    const [tglValue, setTglValue] = React.useState<Tanggal>(tanggalInit)

    const btnTrigger = (spp: OptionsType<SelectOption> | null, kegiatan: OptionsType<SelectOption> | null) => {
        if(spp && kegiatan){
            setBtnDisabled((spp.length > 0 && kegiatan.length > 0) ? false : true)
        }
    }
    
    const handleUPTDChange = (value: OptionsType<SelectOption>) => {
        setUptdValue(value)
        const uptdArray = value.map(x => x.value)

        setIsLoading(true)
        loadOptions(uptdArray).then((value) => {
            const sppValue = value.map(x => ({label: x.SUP, value: x.SUP})) as OptionsType<SelectOption>
            handleSPPChange(sppValue)
            setSppOptions(sppValue as SelectOption[])
            setIsLoading(false)
        }).catch(e => console.log(e))
    }   

    const handleSPPChange = (value: OptionsType<SelectOption>) => {
        setSppValue(value)

        btnTrigger(value, kegiatanValue)
    }

    const loadOptions = async (uptd: string[]) => {
        const data = await getSUP(uptd);
        return data.data.spp;
    }

    const handleKegiatanChange = (value: OptionsType<SelectOption>) => {
        setKegiatanValue(value)
        const kegiatanArr = value.map(kegiatan => kegiatan.value)

        if(_.isEmpty(_.intersection(kegiatanArr, HAS_TANGGAL))){
            setTglValue({...tglValue, displayed: false})
        }else{
            setTglValue({...tglValue, displayed: true})
        }

        btnTrigger(sppValue, value)
    }

    const handleTanggal = (event: React.ChangeEvent<HTMLInputElement>, type: "mulai" | "sampai") => {
        (type === "mulai")
            ? setTglValue({...tglValue, mulai: event.target.value})
            : setTglValue({...tglValue, sampai: event.target.value})
    }

    const handleClick = () => {
        const uptdArr = uptdValue!.map(uptd => uptd.value)
        const sppArr = sppValue!.map(spp => spp.value)
        const kegiatanArr = kegiatanValue!.map(kegiatan => kegiatan.value)

        dispatch(setUPTD(uptdArr))
        dispatch(setSPP(sppArr))
        dispatch(setKegiatan(kegiatanArr))
        dispatch(setTanggal(tglValue))
    }

    return <>
        <div className="form-group mt-2">
            <label htmlFor="uptd">UPTD: </label>
            <Select options={uptdOptions} isMulti isSearchable placeholder="Pilih UPTD"
                    value={uptdValue}  onChange={(value) => { handleUPTDChange(value) }} />
        </div>
        <div className="form-group mt-2">
            <label htmlFor="uptd">SUP: </label>
            <Select options={sppOptions} isMulti isSearchable isLoading={isLoading}
                    value={sppValue}  onChange={(value) => { handleSPPChange(value) }}
                    styles={customStyles} placeholder="Pilih SUP" />
        </div>
        <div className="form-group mt-2">
            <label htmlFor="uptd">Filter: </label>
            <Select options={kegiatanOptions} isMulti isSearchable styles={customStyles}
                    placeholder="Pilih Kegiatan"
                    value={kegiatanValue}  onChange={(value) => { handleKegiatanChange(value) }} />
        </div>
        <div className={(tglValue.displayed) ? "d-block" : "d-none"}>
            <div className="form-group mt-2">
                <label htmlFor="dari">Mulai Tanggal: </label>
                <input className="form-control" 
                    onChange={(event) => {handleTanggal(event, "mulai")}} type="date" value={tglValue.mulai} />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="sampai">Sampai Tanggal: </label>
                <input className="form-control" onChange={(event) => {handleTanggal(event, "sampai")}} type="date" value={tglValue.sampai} />
            </div>
        </div>
        <button disabled={btnDisabled} onClick={handleClick}
            className={"mt-4 form-control btn-"+(btnDisabled?'disabled':'primary')}>Proses</button>
    </>
}

export default FilterSelection


