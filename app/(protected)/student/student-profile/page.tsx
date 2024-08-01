'use client'
import { useEffect, Suspense, useState } from 'react';
import Documents from './documents/page';
import EmploymentInformation from './EmploymentInformation/page';
import RegionalInformation from './RegionalInformation/page';
import DemocraticLegal from './democraticLegal/page';
import ContactInformation from './ContactInformation/page';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Profile from './profile/page';
import { useSearchParams } from 'next/navigation';
import { getStudentData } from '@/app/api/studentProfile/studentprofile';

function UserProfileContent() {
    const cookies = new Cookies();
    const searchParams = useSearchParams();
    const [student, setStudent] = useState<any>();
    const tab = searchParams.get('tab') || 'profile';
    const user = cookies.get('loggedInUser');
    console.log('user:', user);
    const router = useRouter();

    async function getStudent() {
        const res = await getStudentData(user.data.id || user.data.userId);
        console.log('student:', res.data);
        setStudent(res);
    }

    useEffect(() => {
        getStudent();
    }, []);

    const renderComponent = (tab: string | null) => {
        switch (tab) {
            case 'profile':
                return <Profile student={student} />;
            case 'democraticLegal':
                return <DemocraticLegal student={student} />;
            case 'ContactInformation':
                return <ContactInformation student={student} />;
            case 'RegionalInformation':
                return <RegionalInformation student={student} />;
            case 'EmploymentInformation':
                return <EmploymentInformation student={student} />;
            case 'documents':
                return <Documents />;
            default:
                return <Profile user={user} />;
        }
    };

    return renderComponent(tab);
}

export default function UserProfile() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfileContent />
        </Suspense>
    );
}