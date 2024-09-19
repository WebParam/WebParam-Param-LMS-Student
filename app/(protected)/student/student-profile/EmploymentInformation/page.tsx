"use client";
import { updateEmployeeInformation } from "@/app/api/studentProfile/studentprofile";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { preferredOccupations, sector } from "./data";
import axios from "axios";
import { useRouter } from "next/navigation";
import { readUserData } from "@/app/lib/endpoints";
import { GET } from "@/app/lib/api-client";
import { useProgressContext } from "@/context/progress-card-context/progress-context";

export default function EmploymentInformation({ student }: any) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const router = useRouter();

  const [employmentStatus, setEmploymentStatus] = useState('');
  const [dateOfFisa, setDateOfFisa] = useState('');
  const [sarsTaxNumber, setSarsTaxNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSector, setSelectedSector] = useState('');
  const [preferedOccupation, setPreferedOccupation] = useState('');
  const [referalCompany, setReferalCompany] = useState('');
  const [codes, setCodes] = useState<any>()
  const { setEmploymentPercentage } = useProgressContext();

  async function getInputCodes() {
    // const res = await axios.get(`${readUserData}/api/v1/Student/GetCodes`);
    const res = await GET(`${readUserData}/api/v1/Student/GetCodes`);

    console.log('codes:', res?.data?.data);
    setCodes(res?.data?.data)
  }


  function setStudentContactInformation(student: any) {
    console.log("stu:", student?.data);
    setEmploymentStatus(student?.data?.employmentStatus);
    setDateOfFisa(student?.data?.dateOfFisa);
    setSarsTaxNumber(student?.data?.sarsTaxNumber);
    setSelectedSector(student?.data?.sector);
    setPreferedOccupation(student?.data?.preferedOccupation);
    setReferalCompany(student?.data?.referalCompany);
  }

  useEffect(() => {
    setStudentContactInformation(student);
  }, [student]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setIsSubmitting(true);
    
      const payload = {
        userId: user?.data?.id||user?.id,
        employmentStatus: employmentStatus,
        taxNumber: sarsTaxNumber,
        sector: selectedSector,
        preferedOccupation: preferedOccupation,
        referalCompany: referalCompany
      }
  
      const res = updateEmployeeInformation(payload);

      if (res) {
        console.log('response', res);
        setIsSubmitting(false);
        calculateEmploymentPercentage();
        router.push('/student/student-profile?tab=documents')
      }
      
  }

  useEffect(() => {
    getInputCodes();
    calculateEmploymentPercentage();
  }, [])

  const calculateEmploymentPercentage = () => {
    const fields = [
      employmentStatus,
      sarsTaxNumber,
      selectedSector,
      preferedOccupation,
      referalCompany,
    ];

    const totalFields = fields.length;
    const emptyFields = fields.filter(field => field).length;
    const percentage = (emptyFields / totalFields) * 100;

    if (typeof window !== "undefined") {
      localStorage.setItem('employmentPercentage', percentage.toString());
      setEmploymentPercentage(percentage);
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
    <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15" style={{minWidth:'100%'}}>
    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
      <div className="rbt-form-group">
        <label htmlFor="employmentStatus">Employment Status</label>
          <select
          // placeholder="Enter Employment Status"
          id="employmentStatus"
          value={employmentStatus}
          onChange={(e) => setEmploymentStatus(e.target.value)}
        >
          <option value="">Select</option>
          {
          codes && codes[6]?.codes?.map((item:any, index:number) => (
              <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
            ))
          }
        </select>
      </div>
    
    </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <br/>
        <label htmlFor="sarsTaxNumber">SARS TAX NUMBER</label>
        <input
          type="text"
          name="sarsTaxNumber"
          placeholder="Enter SARS Tax Number"
          value={sarsTaxNumber}
          id="sarsTaxNumber"
          onChange={(e) => setSarsTaxNumber(e.target.value)}
        />
      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{marginBottom:'15px'}}>
      <div className="rbt-form-group">
        <label htmlFor="immigrantStatus">Sector</label>
        <select
            name="sector"
            value={selectedSector}
            id="sector"
            onChange={(e) => setSelectedSector(e.target.value)}
        >
            <option value="">Select</option>
            {
          codes && codes[18]?.codes?.map((item:any, index:number) => (
              <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
            ))
          }
        </select>
      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{ marginBottom: '15px' }}>
    <div className="rbt-form-group">
      <label htmlFor="preferedOccupation">Preferred Occupation</label>
      <select
        name="preferedOccupation"
        value={preferedOccupation}
        id="preferedOccupation"
        onChange={(e) => setPreferedOccupation(e.target.value)}
      >
        <option value="">Select</option>
        {Array.from(new Set(preferredOccupations.map(item => item.sector)))
          .filter(sector => sector === selectedSector || selectedSector === '')
          .map((sector, index) => (
            <optgroup key={index} label={sector}>
              {preferredOccupations
                .filter(item => item.sector === sector)
                .map((item, idx) => (
                  <option key={idx} value={item.title} className="text-dark">
                    {item.title}
                  </option>
                ))}
            </optgroup>
          ))}
      </select>
    </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="employmentStatus">Referral Person/ Company</label>
      <input
        type="text"
        placeholder="Enter The Name of The Referral "
        id="referalStatus"
        value={referalCompany}
        onChange={(e) => setReferalCompany(e.target.value)}
      />
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
  )
}
