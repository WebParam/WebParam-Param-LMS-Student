'use client'
import { updateRegionalInformation } from "@/app/api/studentProfile/studentprofile";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function RegionalInformation({student}:any) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const [codes, setCodes] = useState<any>()

  async function getInputCodes() {
    const res = await axios.get(`https://khumla-development-user-read.azurewebsites.net/api/Student/GetCodes`);

    console.log('codes:', res.data.data);
    setCodes(res.data.data)
  }

  useEffect(() => {
    getInputCodes();
  },[])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.preventDefault();
    setIsSubmitting(true);

      const payload = {
        userId: user.data.id||user.data.userId,
        provinceCode: provinceCode,
        statsSAAreaCode: statsSAAreaCode,
        sdpAccreditationNumber: sdpAccreditationNumber,
        skillsProgrammeId: skillsProgrammeID,
        learnerEnrolledDate: learnerEnrolledDate
      }
  
      const res = updateRegionalInformation(payload);
      

      if (res) {
        console.log('response', res);
        setIsSubmitting(false);
      }

  }

  const [provinceCode, setProvinceCode] = useState('');
  const [statsSAAreaCode, setStatsSAAreaCode] = useState('');
  const [sdpAccreditationNumber, setSdpAccreditationNumber] = useState('');
  const [skillsProgrammeID, setSkillsProgrammeID] = useState('');
  const [learnerEnrolledDate, setLearnerEnrolledDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  function setStudentContactInformation(student: any) {
    console.log('stu:', student?.data);
    setProvinceCode(student?.data?.provinceCode);
    setStatsSAAreaCode(student?.data?.statssAreaCode);
    setSdpAccreditationNumber(student?.data?.sdpAccreditationNumber);
    setSkillsProgrammeID(student?.data?.skillsProgrammeId);
    setLearnerEnrolledDate(student?.data?.learnerEnrolledDate);
    
  }

  useEffect(() => {
      setStudentContactInformation(student);
  }, [student]);

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
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="provinceCode">Province Code</label>
       <select 
        name="provinceCode"
        value={provinceCode}
        id="provinceCode"
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
      <input
        type="text"
        name="statsSAAreaCode"
        placeholder="Enter STATSSA Area Code"
        value={statsSAAreaCode}
        id="statsSAAreaCode"
        onChange={(e) => setStatsSAAreaCode(e.target.value)}
      />
    </div>
  </div>
  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="sdpAccreditationNumber">SDP Accreditation Number</label>
      <input
        type="text"
        name="sdpAccreditationNumber"
        placeholder="Enter SDP Accreditation Number"
        value={sdpAccreditationNumber}
        id="sdpAccreditationNumber"
        onChange={(e) => setSdpAccreditationNumber(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="skillsProgrammeID">Skills Programme ID</label>
      <input
        type="text"
        name="skillsProgrammeID"
        placeholder="Enter Skills Programme ID"
        value={skillsProgrammeID}
        id="skillsProgrammeID"
        onChange={(e) => setSkillsProgrammeID(e.target.value)}
      />
    </div>
  </div> */}
  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerEnrolledDate">Learner Enrolled Date</label>
      <input
        type="date"
        name="learnerEnrolledDate"
        value={learnerEnrolledDate}
        id="learnerEnrolledDate"
        onChange={(e) => setLearnerEnrolledDate(e.target.value)}
      />
    </div>
  </div> */}
  <div className="col-12 mt--20">
    <div className="rbt-form-group">
      <button
       className="rbt-btn btn-gradient"
       type='submit'
       style={{ backgroundColor: '#24345c', backgroundImage: 'none' }}
      >
        {isSubmitting ? <div className="spinner-border text-light" role="status"/>:'Update Info'}
      </button>
    </div>
  </div>
</form>
</div>
</div>
  )
}