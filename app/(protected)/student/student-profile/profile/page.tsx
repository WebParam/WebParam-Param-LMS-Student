'use client';
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

export default function Profile({ student }: any) {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState('');
    const [codes, setCodes] = useState<any>();
    const [uploadingPic, setUploadingPic] = useState(false);
    const cookies = new Cookies();
    const user = cookies.get("loggedInUser");
    const router = useRouter();

    async function getInputCodes() {
        const res = await axios.get(`https://khumla-dev-user-read.azurewebsites.net/api/Student/GetCodes`);
        console.log('codes:', res.data.data);
        setCodes(res.data.data);
    }
    
    useEffect(() => {
        debugger;
        getUserProfile();
    },[profilePic])
    

    useEffect(() => {
        getUserProfile();
        setProvince(student?.data?.country)
        getInputCodes();
    }, []);

    async function getUserProfile() {
        debugger;
        if (!user?.data?.id && !user?.id) return;
        const res = await getStudentProfile(user.data.id || user.id);

        console.log('responseeeee', res);

        const dob = res?.data.data.dateOfBirth.split('T')[0];
        if (res?.data) {
            setFirstName(res.data.data.firstName);
            setSurname(res.data.data.surname);
            setIdNumber(res.data.data.idNumber);
            setEmail(res.data.data.email);
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
        debugger;
        setIsSubmitting(true);
        const payload = {
            userId: user?.data?.id,
            firstName,
            surname,
            idNumber,
            gender,
            dateOfBirth,
            country,
            city,
            province,
            phoneNumber,
            bio,
            id: id
        };

        const res = await StudentProfile(payload);

        if (res) {
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
                const response = await axios.post(`https://khumla-dev-user-write.azurewebsites.net/api/v1/Profile/UploadProfilePicture/${user?.data?.id}`, formData, {
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
                    <div className="rbt-tutor-information-right">
                        <div className="tutor-btn">
                            <a className="rbt-btn btn-sm btn-border color-white radius-round-10">
                                Edit Cover Photo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15">
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
                            type="number"
                            name="idNumber"
                            placeholder="Enter your Id number or passport"
                            value={idNumber}
                            required
                            onChange={(e) => setIdNumber(e.target.value)}
                            // onKeyPress={(e) => {
                            //     // Prevent non-numeric input
                            //     if (!/[0-9]/.test(e.key)) {
                            //         e.preventDefault();
                            //     }}}
                                pattern="[0-9]*" 
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
                            value={dateOfBirth}
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
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            required
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '')
                                setPhoneNumber(numericValue);}}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12" style={{ marginTop: '10px' }}>
                    <div className="filter-select rbt-modern-select">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                            required
                            onChange={(e) => setGender(e.target.value)}
                            className="w-100">                                
                            <option value={""}>select</option>
                            {
                            codes && codes[4]?.codes?.map((item:any, index:number) => (
                                <option key={index} value={`${item.code}`} className="text-dark">{item.description}</option>
                            ))
                            }
                            
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="rbt-form-group">
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
            </form>
        </div>
        </>
    );
}
