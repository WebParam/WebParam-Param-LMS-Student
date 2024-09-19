'use client'
import { useEffect, Suspense, useState } from 'react';
import Documents from './documents/page';
import EmploymentInformation from './EmploymentInformation/page';
import DemocraticLegal from './democraticLegal/page';
import ContactInformation from './ContactInformation/page';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Profile from './profile/page';
import { useSearchParams } from 'next/navigation';
import { getStudentData } from '@/app/api/studentProfile/studentprofile';
import AOS from 'aos';
import 'aos/dist/aos.css';

function UserProfileContent() {
    const cookies = new Cookies();
    const searchParams = useSearchParams();
    const [student, setStudent] = useState<any>();
    const tab = searchParams.get('tab') || 'profile';
    const user = cookies.get('loggedInUser');
    const router = useRouter();

    async function getStudent() {
        if (!user) return;
        const res = await getStudentData(user?.data?.id || user?.id);
        debugger;
        console.log('student:', res.data);
        setStudent(res);
    }

    useEffect(() => {
        getStudent();
        AOS.init({ duration: 1500 , once: true}); // Initialize AOS
    }, []);


    const renderComponent = (tab: string | null) => {
        switch (tab) {
            case 'profile':
                return <Profile student={student} />;
            case 'democraticLegal':
                return <DemocraticLegal student={student} />;
            case 'ContactInformation':
                return <ContactInformation student={student} />;
            case 'EmploymentInformation':
                return <EmploymentInformation student={student} />;
            case 'documents':
                return <Documents />;
            default:
                return <Profile user={user} />;
        }
    };

    return (
        <div data-aos="fade-left">
            {renderComponent(tab)}
        </div>
    );
}

export default function UserProfile() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfileContent />
        </Suspense>
    );
}