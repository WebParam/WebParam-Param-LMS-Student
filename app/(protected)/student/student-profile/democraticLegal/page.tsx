"use client";
import { updateDemographicsInformation } from "@/app/api/studentProfile/studentprofile";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { statsSAAreaCodeOptions } from "./data";
import { useRouter } from "next/navigation";
import { readUserData } from "@/app/lib/endpoints";
import { GET } from "@/app/lib/api-client";
import { useProgressContext } from "@/context/progress-card-context/progress-context";
import { codes } from "../codes";

export default function DemocraticLegal({ student, codes }: any) {
  console.log("codes in democratic legal:", codes)
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");

  const {setDemographicLegalPercentage} = useProgressContext(); // Use context values

  const [equityCode, setEquityCode] = useState('');
  const [nationalityCode, setNationalityCode] = useState('');
  const [homeLanguageCode, setHomeLanguageCode] = useState('');
  const [immigrantStatus, setImmigrantStatus] = useState('');
  const [popiActAgree, setPopiActAgree] = useState('');
  const [popiActDate, setPopiActDate] = useState('');
  const [citizenStatusCode, setCitizenStatusCode] = useState('');
  const [socioeconomicCode, setSocioeconomicCode] = useState('');
  const [disabilityCode, setDisabilityCode] = useState('');
  const [disabilityRating, setDisabilityRating] = useState('');
  const [provinceCode, setProvinceCode] = useState('');
  const [statsSAAreaCode, setStatsSAAreaCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // codes
  const [equityCodes, setEquityCodes] = useState<any>();
  const [nationalityCodes, setNationalityCodes] = useState<any>();
  const [homeLanguageCodes, setHomeLanguageCodes] = useState<any>();
  const [immigrantStatusCodes, setImmigrantStatusCodes] = useState<any>();
  const [popiActAgreeCodes, setPopiActAgreeCodes] = useState<any>();
  const [popiActDateCodes, setPopiActDateCodes] = useState<any>();
  const [citizenStatusCodeCodes, setCitizenStatusCodeCodes] = useState<any>();
  const [socioeconomicCodes, setSocioeconomicCodes] = useState<any>();
  const [disabilityCodes, setDisabilityCodes] = useState<any>();
  const [disabilityRatingCodes, setDisabilityRatingCodes] = useState<any>();
  const [provinceCodes, setProvinceCodes] = useState<any>();
  const [statsSAAreaCodes, setStatsSAAreaCodes] = useState<any>();
  const router = useRouter();


  function setStudentContactInformation(student: any) {
    setEquityCode(student?.data?.equityCode);
    setNationalityCode(student?.data?.nationalityCode);
    setHomeLanguageCode(student?.data?.homeLanguageCode);
    setImmigrantStatus(student?.data?.immigrantStatus);
    setPopiActAgree(student?.data?.popiActAgree);
    setPopiActDate(student?.data?.popiActDate);
    setCitizenStatusCode(student?.data?.citizenStatusCode);
    setSocioeconomicCode(student?.data?.socioeconomicCode);
    setDisabilityCode(student?.data?.disabilityCode);
    setDisabilityRating(student?.data?.disabilityRating);
    setProvinceCode(student?.data?.provinceCode);
    setStatsSAAreaCode(student?.data?.statssAreaCode)
  }

  useEffect(() => {
    setStudentContactInformation(student);
    calculateDemographicLegalPercentage();
  }, [student]);

    useEffect(() => {
      console.log("codes:", codes)
      setEquityCodes(codes.filter((code:any)=>code.Type===1)[0]?.Codes)
      setNationalityCodes(codes.filter((code:any)=>code.Type===2)[0]?.Codes)
      setHomeLanguageCodes(codes.filter((code:any)=>code.Type===3)[0]?.Codes)
      setImmigrantStatusCodes(codes.filter((code:any)=>code.Type===9)[0]?.Codes)
      setPopiActAgreeCodes(codes.filter((code:any)=>code.Type===12)[0]?.Codes)
      setPopiActDateCodes(codes.filter((code:any)=>code.Type===13)[0]?.Codes)
      setCitizenStatusCodeCodes(codes.filter((code:any)=>code.Type===5)[0]?.Codes)
      setSocioeconomicCodes(codes.filter((code:any)=>code.Type===6)[0]?.Codes)
      setDisabilityCodes(codes.filter((code:any)=>code.Type===7)[0]?.Codes)
      setDisabilityRatingCodes(codes.filter((code:any)=>code.Type===8)[0]?.Codes)
      setProvinceCodes(codes.filter((code:any)=>code.Type===11)[0]?.Codes)
      setStatsSAAreaCodes(codes.filter((code:any)=>code.Type===14)[0]?.Codes)
      calculateDemographicLegalPercentage();
    }, []);
    
    console.log("equityCodes:", equityCodes)
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    setIsSubmitting(true);

      const payload = {
        userId: user?.data?.id||user?.id,
        equityCode: equityCode,
        nationalityCode: nationalityCode,
        homeLanguageCode: homeLanguageCode,
        immigrantStatus: immigrantStatus,
        popiActAgree: popiActAgree,
        popiActDate: popiActDate,
        citizenStatusCode: citizenStatusCode,
        socioeconomicCode: socioeconomicCode,
        disabilityCode: disabilityCode,
        disabilityRating: disabilityRating,
        provinceCode: provinceCode,
        statsCodeSAAreaCode: statsSAAreaCode
      
      }
  
      const res = updateDemographicsInformation(payload);

      if (res) {
        console.log('response', res);
        setIsSubmitting(false);
        calculateDemographicLegalPercentage();
        router.push('/student/student-profile?tab=ContactInformation')
      }
  }

  const groupedOptions: any = {
    'Western Cape': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('WC')),
    'Eastern Cape': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('EC')),
    'Northern Cape': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('NC')),
    'Free State': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('FS')),
    'KwaZulu-Natal': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('KZN')),
    'North West': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('NW')),
    'Gauteng': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('GT')),
    'Mpumalanga': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('MP')),
    'Limpopo': statsSAAreaCodeOptions.filter((option) => option.value.startsWith('LIM')),
  };

  const calculateDemographicLegalPercentage = () => {
    const fields = [
      equityCode,
      nationalityCode,
      homeLanguageCode,
      immigrantStatus,
      popiActAgree,
      popiActDate,
      citizenStatusCode,
      socioeconomicCode,
      disabilityCode,
      disabilityRating,
      provinceCode,
      statsSAAreaCode
    ];

    const totalFields = fields.length;
    
    // Filter the fields that are empty (empty strings, null, or undefined)
    const emptyFields = fields.filter(field => field).length;
    
    // Calculate percentage of empty fields
    const percentage = (emptyFields / totalFields) * 100;
    if (typeof window !== "undefined") {
      localStorage.setItem('demographicLegalPercentage', percentage.toString());
      setDemographicLegalPercentage(percentage);
    }
};


  return (
    <div
    className="tab-pane fade active show"
    id="profile"
    role="tabpanel"
    aria-labelledby="Personal Information"
  >
    <div className="rbt-dashboard-content-wrapper">
    <form
  onSubmit={handleSubmit}
  className="rbt-profile-row rbt-default-form row row--15"
  style={{minWidth:'100%'}}
>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="equityCode">Equity Code</label>
      <select 
      name="equityCode" 
      value={equityCode} 
      id=""
      required
      onChange={(e) => setEquityCode(e.target.value)}>
        <option value="">Select</option>
        {
         equityCodes && equityCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
     
    </div>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="nationalityCode">Nationality Code</label>
      <select
        name="nationalityCode"
        value={nationalityCode}
        id="nationalityCode"
        required
        onChange={(e) => setNationalityCode(e.target.value)}
      >
        <option value="">Select</option>
        {
         nationalityCodes && nationalityCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="homeLanguageCode">Home Language Code</label>
        <select
        name="homeLanguageCode"
        value={homeLanguageCode}
        id="homeLanguageCode"
        required
        onChange={(e) => setHomeLanguageCode(e.target.value)}
      >
        <option value="">Select</option>
        {
         homeLanguageCodes && homeLanguageCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="citizenStatusCode">Citizen Status Code</label>
        <select
        name="citizenStatusCode"
        value={citizenStatusCode}
        id="citizenStatusCode"
        required
        onChange={(e) => setCitizenStatusCode(e.target.value)}
      >
        <option value="">Select</option>
        {
         citizenStatusCodeCodes && citizenStatusCodeCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="socioeconomicCode">Socioeconomic Code</label>
        <select
        name="socioeconomicCode"
        value={socioeconomicCode}
        id="socioeconomicCode"
        required
        onChange={(e) => setSocioeconomicCode(e.target.value)}
      >
        <option value="">Select</option>
        {
         socioeconomicCodes && socioeconomicCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="disabilityCode">Disability Code</label>
        <select
        name="disabilityCode"
        value={disabilityCode}
        id="disabilityCode"
        required
        onChange={(e) => setDisabilityCode(e.target.value)}
      >
        <option value="">Select</option>
        {
         disabilityCodes && disabilityCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  
  {disabilityCode != "N" && 
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="disabilityRating">Disability Rating</label>
        <select
        name="disabilityRating"
        value={disabilityRating}
        id="disabilityRating"
        required
        onChange={(e) => setDisabilityRating(e.target.value)}
      >
        <option value="">Select</option>
        {
         disabilityRatingCodes && disabilityRatingCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>}

  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="immigrantStatus">Immigrant Status</label>
        <select
        name="immigrantStatus"
        value={immigrantStatus}
        id="immigrantStatus"
        required
        onChange={(e) => setImmigrantStatus(e.target.value)}
      >
        <option value="">Select</option>
        {
         immigrantStatusCodes && immigrantStatusCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="provinceCode">Province Code</label>
       <select 
        name="provinceCode"
        value={provinceCode}
        id="provinceCode"
        required
        onChange={(e) => setProvinceCode(e.target.value)}
        >
        <option value="">Select</option>
        {
         provinceCodes && provinceCodes.map((item:any, index:number) => (
            <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
          ))
        }
      </select>
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="statsSAAreaCode">STATSSA Area Code</label>
         <select
          name="statsSAAreaCode"
          id="statsSAAreaCode"
          value={statsSAAreaCode}
          required
          onChange={(e) => setStatsSAAreaCode(e.target.value)}
        >
          <option value="">Select STATSSA Area Code</option>
          {Object.keys(groupedOptions).map((province) => (
            <optgroup key={province} label={province}>
              {groupedOptions[province].map((option:any) => { 
                console.log("option:", {option:option.value, statsSAAreaCode:statsSAAreaCode})
                return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              )})}
            </optgroup>
          ))}
        </select>
    </div>
  </div>
  <div className="col-12 mt--20">
    <div className="rbt-form-group">
      {/* <button
         className="rbt-btn btn-gradient"
         type='submit'
         style={{ backgroundColor: '#24345c', backgroundImage: 'none' }}
      >
        {isSubmitting ? <div className="spinner-border text-light" role="status"/>:'Update Info'}
      </button> */}
      <button
        className="btn-sm mr--10 hover-icon-reverse w-100"
        style={{height:'40px', border:'none', backgroundColor:`${process.env.NEXT_PUBLIC_PRIMARY_COLOR??'rgb(36, 52, 92)'}`, borderRadius:'8px  '}}
        type="submit"
        disabled={isSubmitting}
    >
        <span className="icon-reverse-wrapper">
            <span className="btn-text text-light">Save & Proceed</span>
            <span className="btn-icon text-light">
                <i className="feather-arrow-right" />
            </span>
        </span>
    </button>
    </div>
    </div>
    </form>
    </div>
    </div>
  );
}
  