'use client'
import { updateDemographicsInformation } from "@/app/api/studentProfile/studentprofile";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { statsSAAreaCodeOptions } from "./data";
import { useRouter } from "next/navigation";

export default function DemocraticLegal({student}:any) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");

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
  const [codes, setCodes] = useState<any>();
  const router = useRouter();

  async function getInputCodes() {
    const res = await axios.get(`https://khumla-development-user-read.azurewebsites.net/api/Student/GetCodes`);

    console.log('codes:', res.data.data);
    setCodes(res.data.data)
  }

  function setStudentContactInformation(student: any) {
    console.log('stu:', student?.data);
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
    setStatsSAAreaCode(student?.data?.statsCodeSAAreaCode)
  }

  useEffect(() => {
      setStudentContactInformation(student);
    }, [student]);
    
  useEffect(() => {
    getInputCodes();
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    debugger;
    setIsSubmitting(true);

      const payload = {
        userId: user.data.id||user.data.userId,
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
        <option value="">select</option>
        {
         codes && codes[1]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[2]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[3]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[5]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[6]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[7]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[8]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
        <option value="">select</option>
        {
         codes && codes[9]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
          ))
        }
      </select>
    </div>
  </div>
  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="popiActAgree">POPI Act Agreement</label>
        <select
        name="popiActAgree"
        value={popiActAgree}
        id="popiActAgree"
        onChange={(e) => setPopiActAgree(e.target.value)}
      >
        <option value="">select</option>
        {
         codes && codes[12]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
          ))
        }
      </select>
    </div>
  </div> */}
  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
    <div className="rbt-form-group">
      <label htmlFor="popiActDate">POPI Act Date</label>
      <input
        type="date"
        name="popiActDate"
        value={popiActDate}
        id="popiActDate"
        onChange={(e) => setPopiActDate(e.target.value)}
      />
    </div>
  </div> */}
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
        <option value="">select</option>
        {
         codes && codes[11]?.codes?.map((item:any, index:number) => (
            <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
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
              {groupedOptions[province].map((option:any) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
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
        style={{height:'40px', border:'none', backgroundColor:'rgb(36, 52, 92)', borderRadius:'8px  '}}
        type="submit"
        disabled={isSubmitting}
    >
        <span className="icon-reverse-wrapper">
            <span className="btn-text text-light">Proceed</span>
            <span className="btn-icon">
                <i className="feather-arrow-right" />
            </span>
        </span>
    </button>
    </div>
  </div>
    </form>
  </div>
  </div>
  )
}