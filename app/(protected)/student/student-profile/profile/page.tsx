"use client";

import { useEffect, useState } from 'react';
import './userProfile.scss';
import { StudentProfile, getStudentProfile } from '@/app/api/studentProfile/studentprofile';
import defaultImage from './defaultPic.jpg';
import coverImageLocal from './cover.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Modal } from 'react-bootstrap';
import { readUserData } from '@/app/lib/endpoints';
import { GET } from '@/app/lib/api-client';
import { useProgressContext } from '@/context/progress-card-context/progress-context';
import './userProfile.scss';
// import '@/app/(protected)/user-profile/UserProfile.module.css';

// Import SVG files
import q1 from '@/app/(protected)/user-profile/svg/q1.svg';
import q2 from '@/app/(protected)/user-profile/svg/q2.svg';
import q3 from '@/app/(protected)/user-profile/svg/q3.svg';
import q4 from '@/app/(protected)/user-profile/svg/q4.svg';
import q5 from '@/app/(protected)/user-profile/svg/q5.svg';

export default function Profile({ student, codes }: any) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("");
  const [uploadingPic, setUploadingPic] = useState(false);
  const [genderCodes, setGenderCodes] = useState<any>();
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const router = useRouter();
  const { setBiographyPercentage } = useProgressContext();

    useEffect(() => {
        getUserProfile();
    }, [profilePic]);

    useEffect(() => {
        getUserProfile();
    }, [profilePic]);
    
    useEffect(() => {
        getUserProfile();
        setProvince(student?.data?.country);
        console.log("codes index 4:", codes.filter((code:any)=>code.Type===4)[0]?.Codes);
        setGenderCodes(codes.filter((code:any)=>code.Type===4)[0]?.Codes);
        calculateEmptyFieldsPercentage();

        if (user) {
            setEmail(user?.data?.email);
        }
    }, []);

  async function getUserProfile() {
    if (!user?.data?.id && !user?.id) return;
    const res = await getStudentProfile(user.data.id || user.id);

        const dob = res?.data.data.dateOfBirth.split('T')[0];
        if (res?.data) {
            setFirstName(res.data.data.firstName);
            setSurname(res.data.data.surname);
            setIdNumber(res.data.data.idNumber);
            setGender(res.data.data.gender);
            setDateOfBirth(dob);
            setCountry(res.data.data.country);
            setCity(res.data.data.city);
            setPhoneNumber(res.data.data.phoneNumber);

            if (res.data.data.profilePicture) {
                setProfilePic(res.data.data.profilePicture);
            }

            setCoverImage(res.data.coverPicture);
            setBio(res.data.data.bio);
            setId(res.data.data.id);

            cookies.set("profilePic", res.data.data.profilePicture);

            if (res.data.data.firstName && res.data.data.surname) {
              cookies.set("username", `${res.data.data.firstName} ${res.data.data.surname}`);
            } else {
              cookies.set("username", `${res.data.data.email}`);
            }
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        const payload = {
            userId: user?.data?.id||user?.id,
            firstName,
            surname,
            idNumber,
            gender,
            dateOfBirth,
            country,
            city,
            email: user?.data?.email,
            province,
            phoneNumber,
            bio,
            id: id
        };

        const res = await StudentProfile(payload);

        if (res) {
            calculateEmptyFieldsPercentage();
            router.push('/student/student-profile?tab=democraticLegal');
        }
        console.log(res);
        getUserProfile();
        setIsSubmitting(false);
    };

    const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadingPic(true);
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`${readUserData}/api/v1/Profile/UploadProfilePicture/${user?.data?.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Profile picture updated:', response.data);
                setUploadingPic(false);
                getUserProfile();
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const calculateEmptyFieldsPercentage = () => {
        const fields = [
            firstName,
            surname,
            idNumber,
            gender,
            dateOfBirth,
            country,
            city,
            province,
            phoneNumber,
            bio
        ];
    
        const totalFields = fields.length;
        // Filter the fields that are empty (empty strings, null, or undefined)
        const emptyFields = fields.filter(field => field).length;
        
        // Calculate percentage of empty fields
        const percentage = (emptyFields / totalFields) * 100;
        
        if (typeof window !== "undefined") {
            localStorage.setItem('Biography', percentage.toString());
            setBiographyPercentage(percentage);
        }
    };

    return (
        <>
        <Modal show={uploadingPic} onHide={() => setUploadingPic(false)}>
            <Modal.Body>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <div className="spinner-border" role="status"/>
                    <p>Uploading Profile Picture...</p>
                </div>
            </Modal.Body>
        </Modal>
        <div
            className="tab-pane fade active show"
            id="profile"
            role="tabpanel"
            aria-labelledby="Personal Information"
        >
            <div className="rbt-dashboard-content-wrapper">
                <div className="user-profile-header">
                    <div className="profile-picture">
                        <Image
                            alt="Profile Picture"
                            src={`${profilePic}` || defaultImage.src}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="profile-details">
                        <h2>{firstName} {surname}</h2>
                        <p>Youth Role | Host Placement Partner</p>
                        <p><i className="feather-map-pin"></i> {provinceCode ? `${provinceCode}, ` : ''}{province}, South Africa</p>
                        <p>Date Started: July 2022</p>
                        <div className="profile-actions">
                          <button
                            onClick={() => document.getElementById('profilePicUpload')?.click()}
                            className="edit-profile-button"
                          >
                            Edit Profile
                          </button>
                          <button className="send-message-button">
                            <i className="far fa-envelope"></i>
                            Send Message
                          </button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            style={{ display: 'none' }}
                            id="profilePicUpload"
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="bio-section">
                        <div style={{ padding: '10px 15px' }}>
                            <h5>Personal Bio</h5>
                        </div>
                        <div style={{ padding: '15px' }}>
                            <p><strong>Full Name:</strong> {firstName} {surname}</p>
                            <p><strong>Email Address:</strong> {email}</p>
                            <p><strong>ID Number:</strong> {idNumber}</p>
                            <p><strong>Mobile Number:</strong> {phoneNumber}</p>
                            <p><strong>Gender:</strong> {gender}</p>
                            <p><strong>Race:</strong> Black</p>
                            <p><strong>Disability:</strong> None</p>
                        </div>
                    </div>
                    <div className="professional-bio">
                        <div style={{ padding: '10px 15px' }}>
                            <h5>Professional Bio</h5>
                        </div>
                        <div style={{ padding: '15px' }}>
                            <p style={{ fontSize: '10px!important', color: 'black!important' }}><strong>Highest Qualification:</strong> Diploma Certificate</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Currently enrolled in studies:</strong> No</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Drivers License:</strong> Yes</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Type of License:</strong> Code 10</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Asset Assigned:</strong> Yes</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Asset Type:</strong> Vehicle</p>
                            <p style={{ fontSize: '10px!important' }}><strong>Asset Model:</strong> Toyota Hilux</p>
                            <p style={{ fontSize: '10px!important' }}><strong>License Registration Plate:</strong> CA 123-456</p>
                            <p style={{ fontSize: '10px' }}><strong>Tracker Status:</strong> Active</p>
                            <p><strong>Insurance status:</strong> Covered</p>
                            <p><strong>Incident/Accident reports:</strong> None</p>
                            <p><strong>Host Placement:</strong> Local Municipality</p>
                            <p><strong>Programme Enrollment:</strong> Learnership name/YES programme</p>
                            <p><strong>Programme Status:</strong> Active</p>
                            <p><strong>Bank Account Information:</strong> On file</p>
                            <p><strong>Contract:</strong> Signed</p>
                            <p><strong>Criminal Background check:</strong> Clear</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
              <div className="card border-0">
                <div className="card-body">
                  <h3 className="mb-5 fs-2 text-start program-journey-summary">Program Journey Summary</h3>
                  <div className="program-journey-container">
                    <div className="program-journey-items">
                      <div className="program-journey-item">
                        <Image
                          src={q1}
                          alt="Quarter 1"
                          width={50}
                          height={50}
                        />
                        <p>Quarter 1 Complete</p>
                      </div>
                      <div className="program-journey-item">
                        <Image
                          src={q2}
                          alt="Quarter 2"
                          width={50}
                          height={50}
                        />
                        <p>Quarter 2 Complete</p>
                      </div>
                      <div className="program-journey-item">
                        <Image
                          src={q3}
                          alt="Quarter 3"
                          width={50}
                          height={50}
                        />
                        <p>Quarter 3 Complete</p>
                      </div>
                      <div className="program-journey-item">
                        <Image
                          src={q4}
                          alt="Quarter 4"
                          width={50}
                          height={50}
                        />
                        <p>Quarter 4 Complete</p>
                      </div>
                      <div className="program-journey-item">
                        <Image
                          src={q5}
                          alt="Complete"
                          width={50}
                          height={50}
                        />
                        <p>Complete!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    );
}
