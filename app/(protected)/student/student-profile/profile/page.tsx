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
import MaintenanceModal from '@/ui/banner/MaintanceModal';
import { useProgressContext } from '@/context/progress-card-context/progress-context';

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
    },[profilePic])
    
    
    useEffect(() => {
        getUserProfile();
        setProvince(student?.data?.country)
        console.log("codes index 4:", codes.filter((code:any)=>code.Type===4)[0]?.Codes)
        setGenderCodes(codes.filter((code:any)=>code.Type===4)[0]?.Codes)
        calculateEmptyFieldsPercentage();

        if (user) {
            setEmail(user?.data?.email)
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

            cookies.set("profilePic", res.data.data.profilePicture)

            if (res.data.data.firstName && res.data.data.surname) {
              cookies.set("username", `${res.data.data.firstName} ${res.data.data.surname}`)
            } else {
              cookies.set("username", `${res.data.data.email}`)
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
            router.push('/student/student-profile?tab=democraticLegal')
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
                <div
                    className="tutor-bg-photo height-245"
                    style={{
                        backgroundImage: coverImage ? `url(${coverImage})` : `url(${coverImageLocal})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="rbt-tutor-information">
                    <div className="rbt-tutor-information-left">
                        <div className="thumbnail rbt-avatars size-lg position-relative">
                            <Image
                                alt="Instructor"
                                loading="lazy"
                                width={300}
                                height={300}
                                decoding="async"
                                data-nimg={1}
                                src={`${profilePic}` || defaultImage.src}
                                style={{ color: 'transparent', height: '120px !important' }}
                            />
                            <div className="rbt-edit-photo-inner">
                                <button
                                    className="rbt-edit-photo"
                                    title="Upload Photo"
                                    onClick={() => document.getElementById('profilePicUpload')?.click()}
                                >
                                    <i className="feather-camera" />
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    style={{ display: 'none' }}
                                    id="profilePicUpload"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="rbt-tutor-information-right">
                        <div className="tutor-btn">
                            <a className="rbt-btn btn-sm btn-border color-white radius-round-10">
                                Edit Cover Photo
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15" style={{minWidth:'100%'}}>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="rbt-form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={firstName}
                            id="firstname"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={(e) => {
                                // Prevent numeric input
                                if (/\d/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="rbt-form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            name="surname"
                            placeholder="Enter Surname"
                            value={surname}
                            id="lastname"
                            required
                            onChange={(e) => setSurname(e.target.value)}
                            onKeyDown={(e) => {
                                // Prevent numeric input
                                if (/\d/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="rbt-form-group">
                        <label htmlFor="idNumber">ID number</label>
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="Enter your Id number or passport"
                            value={idNumber}
                            required
                            onChange={(e) => setIdNumber(e.target.value)}
                            pattern="[0-9]*" 
                            onKeyDown={(e) => {
                                // Prevent numeric input
                                if (!/\d/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="rbt-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            // onChange={(e)=> setEmail(e.target.value)}
                            readOnly
                        />
                    </div>
                </div>

               
                <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{ marginTop: '10px' }}>
                    <div className="rbt-form-group">
                        <label htmlFor="date">Date Of Birth</label>
                        <input
                            type="date"
                            name="date"
                            value={dateOfBirth == "0001-01-01" ? getTodayDate() : dateOfBirth}
                            required
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{ marginTop: '10px' }}>
                    <div className="rbt-form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter city name"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => {
                                if (/\d/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="rbt-form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            required
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '')
                                setPhoneNumber(numericValue);
                            }}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="filter-select rbt-modern-select rbt-form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                            required
                            onChange={(e) => setGender(e.target.value)}
                            className="w-100">                                
                            <option value={""} >Select</option>
                            {
                            genderCodes && genderCodes?.map((item:any, index:number) => (
                                <option key={index} value={`${item.Code}`} className="text-dark">{item.Description}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="rbt-form-group">
                        <br/>
                        <label htmlFor="bio">Biography</label>
                        <textarea
                            name="bio"
                            id="bio"
                            cols={30}
                            rows={10}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Enter your biography"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn-sm mr--10 hover-icon-reverse w-100 text-light"
                        style={{height:'40px', border:'none', backgroundColor:`${process.env.NEXT_PUBLIC_PRIMARY_COLOR??'rgb(36, 52, 92)'}`, borderRadius:'8px  '}}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <span className="icon-reverse-wrapper">
                            <span className="btn-text text-light">Save & Proceed</span>
                            <span className="btn-icon">
                                <i className="feather-arrow-right" />
                            </span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}
