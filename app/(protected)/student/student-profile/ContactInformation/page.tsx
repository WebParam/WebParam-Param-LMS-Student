'use client'
import { updateContactInformation } from "@/app/api/studentProfile/studentprofile";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { relationshipOptions } from "./data";
import { useRouter } from "next/navigation";
import { useProgressContext } from "@/context/progress-card-context/progress-context";


export default function ContactInformation({student}:any) {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const router = useRouter();
  const {setContactInformationPercentage} = useProgressContext();

  const [homeAddress1, setHomeAddress1] = useState('');
  const [postalAddress1, setPostalAddress1] = useState('');
  const [postalAddress2, setPostalAddress2] = useState('');
  const [postalAddress3, setPostalAddress3] = useState('');
  const [learnerHomeAddressPostalCode, setLearnerHomeAddressPostalCode] = useState('');
  const [learnerHomeAddressPhysicalCode, setLearnerHomeAddressPhysicalCode] = useState('');
  const [learnerPhoneNumber, setLearnerPhoneNumber] = useState('');
  const [learnerCellPhoneNumber, setLearnerCellPhoneNumber] = useState('');
  const [learnerFaxNumber, setLearnerFaxNumber] = useState('');
  const [learnerEmailAddress, setLearnerEmailAddress] = useState('');
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinSurname, setNextOfKinSurname] = useState('');
  const [nextOfKinContactNumber, setNextOfKinContactNumber] = useState('');
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
    function setStudentContactInformation(student: any) {
      console.log('stu:', student?.data);
        setHomeAddress1(student?.data?.homeAddress1);
        setPostalAddress1(student?.data?.postalAddress1);
        setPostalAddress2(student?.data?.postalAddress2);
        setPostalAddress3(student?.data?.postalAddress3);
        setLearnerHomeAddressPostalCode(student?.data?.learnerHomeAddressPostalCode);
        setLearnerHomeAddressPhysicalCode(student?.data?.learnerHomeAddressPhysicalCode);
        setLearnerPhoneNumber(student?.data?.learnerPhoneNumber);
        setLearnerCellPhoneNumber(student?.data?.learnerCellPhoneNumber);
        setLearnerFaxNumber(student?.data?.learnerFaxNumber);
        setLearnerEmailAddress(student?.data?.learnerEmailAddress);
        setNextOfKinName(student?.data?.nextOfKinName);
        setNextOfKinSurname(student?.data?.nextOfKinSurname)
        setNextOfKinContactNumber(student?.data?.nextOfKinContactNumber);
        setNextOfKinRelationship(student?.data?.nextOfKinRelationship);
    }

    useEffect(() => {
        setStudentContactInformation(student);
        calculateEmptyFieldsPercentage();
    }, [student]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setIsSubmitting(true);
      
  
      const payload = {
        userId: user?.data?.id || user?.data?.userId,
        homeAddress1: homeAddress1,
        postalAddress1: postalAddress1,
        postalAddress2: postalAddress2,
        postalAddress3: postalAddress3,
        learnerHomeAddressPostalCode: learnerHomeAddressPostalCode,
        learnerHomeAddressPhysicalCode: learnerHomeAddressPhysicalCode,
        learnerPhoneNumber: learnerPhoneNumber,
        learnerCellPhoneNumber: learnerCellPhoneNumber,
        learnerFaxNumber: learnerFaxNumber,
        learnerEmailAddress: learnerEmailAddress,
        nextOfKinName: nextOfKinName,
        nextOfKinSurname: nextOfKinSurname,
        nextOfKinRelationship: nextOfKinRelationship,
        nextOfKinContactNumber: nextOfKinContactNumber
      };
    
        const res = await updateContactInformation(payload);
  
        if (res) {
          console.log('response', res);
          setIsSubmitting(false);
          calculateEmptyFieldsPercentage();
          router.push('/student/student-profile?tab=EmploymentInformation')
        }
    }

    const calculateEmptyFieldsPercentage = () => {
      const fields = [
        homeAddress1,
        postalAddress1,
        postalAddress2,
        postalAddress3,
        learnerHomeAddressPostalCode,
        learnerHomeAddressPhysicalCode,
        learnerPhoneNumber,
        learnerCellPhoneNumber,
        learnerFaxNumber,
        learnerEmailAddress,
        nextOfKinName,
        nextOfKinSurname,
        nextOfKinRelationship,
        nextOfKinContactNumber,
      ];
  
      const totalFields = fields.length;
      
      // Filter the fields that are empty (empty strings, null, or undefined)
      const emptyFields = fields.filter(field => field).length;
      
      // Calculate percentage of empty fields
      const percentage = (emptyFields / totalFields) * 100;
      if (typeof window !== "undefined") {
        localStorage.setItem('contactInformationPercentage', percentage.toString());
        setContactInformationPercentage(percentage);
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
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="homeAddress1">Home Address 1</label>
      <input
        type="text"
        name="homeAddress1"
        placeholder="Enter Home Address 1"
        value={homeAddress1}
        id="homeAddress1"
        onChange={(e) => setHomeAddress1(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="postalAddress1">Postal Address 1</label>
      <input
        type="text"
        name="postalAddress1"
        placeholder="Enter Postal Address 1"
        value={postalAddress1}
        id="postalAddress1"
        onChange={(e) => setPostalAddress1(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="postalAddress2">Postal Address 2</label>
      <input
        type="text"
        name="postalAddress2"
        placeholder="Enter Postal Address 2"
        value={postalAddress2}
        id="postalAddress2"
        onChange={(e) => setPostalAddress2(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="postalAddress3">Postal Address 3</label>
      <input
        type="text"
        name="postalAddress3"
        placeholder="Enter Postal Address 3"
        value={postalAddress3}
        id="postalAddress3"
        onChange={(e) => setPostalAddress3(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerHomeAddressPostalCode">Learner Home Address Postal Code</label>
      <input
        type="text"
        name="learnerHomeAddressPostalCode"
        placeholder="Enter Learner Home Address Postal Code"
        value={learnerHomeAddressPostalCode}
        id="learnerHomeAddressPostalCode"
        onChange={(e) => setLearnerHomeAddressPostalCode(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerHomeAddressPhysicalCode">Learner Home Address Physical Code</label>
      <input
        type="text"
        name="learnerHomeAddressPhysicalCode"
        placeholder="Enter Learner Home Address Physical Code"
        value={learnerHomeAddressPhysicalCode}
        id="learnerHomeAddressPhysicalCode"
        onChange={(e) => setLearnerHomeAddressPhysicalCode(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerPhoneNumber">Learner Phone Number</label>
      <input
        type="text"
        name="learnerPhoneNumber"
        placeholder="Enter Learner Phone Number"
        value={learnerPhoneNumber}
        id="learnerPhoneNumber"
        onChange={(e) => setLearnerPhoneNumber(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerCellPhoneNumber">Learner Cell Phone Number</label>
      <input
        type="text"
        name="learnerCellPhoneNumber"
        placeholder="Enter Learner Cell Phone Number"
        value={learnerCellPhoneNumber}
        id="learnerCellPhoneNumber"
        onChange={(e) => setLearnerCellPhoneNumber(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerFaxNumber">Learner Fax Number</label>
      <input
        type="text"
        name="learnerFaxNumber"
        placeholder="Enter Learner Fax Number"
        value={learnerFaxNumber}
        id="learnerFaxNumber"
        onChange={(e) => setLearnerFaxNumber(e.target.value)}
      />
    </div>
  </div>
  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="learnerEmailAddress">Learner Email Address</label>
      <input
        type="email"
        name="learnerEmailAddress"
        placeholder="Enter Learner Email Address"
        value={learnerEmailAddress}
        id="learnerEmailAddress"
        onChange={(e) => setLearnerEmailAddress(e.target.value)}
      />
    </div>
  </div>

  <h6 className="rbt-form-group mt-5">Next of Kin</h6>

  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="nextOfKinName">Name</label>
      <input
        type="text"
        name="nextOfKinName"
        placeholder="Enter Next Of Kin Name"
        value={nextOfKinName}
        id="learnerEmailAddress"
        onChange={(e) => setNextOfKinName(e.target.value)}
      />
    </div>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="nextOfKinSurname">Surname</label>
      <input
        type="text"
        name="nextOfKinSurname"
        placeholder="Enter Next of Kin Surname"
        value={nextOfKinSurname}
        id="nextOfKinSurname"
        onChange={(e) => setNextOfKinSurname(e.target.value)}
      />
    </div>
  </div>

  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
    <div className="rbt-form-group">
      <label htmlFor="nextOfKinContactNumber">Contact Number</label>
      <input
        type="text"
        name="nextOfKinContactNumber"
        placeholder="Enter Next of Kin Contact Number"
        value={nextOfKinContactNumber}
        id="learnerEmailAddress"
        onChange={(e) => setNextOfKinContactNumber(e.target.value)}
      />
    </div>
  </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
      <div className="rbt-form-group">
        <label htmlFor="nextOfKinRelationship">Relationship</label>
        <select
          name="nextOfKinRelationship"
          value={nextOfKinRelationship}
          id="nextOfKinRelationship"
          onChange={(e) => setNextOfKinRelationship(e.target.value)}
        >
          <option value="">Select Relationship</option>
          {relationshipOptions.map((option, index) => (
            <option key={index} value={option.title}>
              {option.title}
            </option>
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
  )
}