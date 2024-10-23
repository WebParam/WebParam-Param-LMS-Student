'use client'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import './layout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { isDesktop, isMobile } from 'react-device-detect';

function StudentInfoLayout({ children }: { children: React.ReactNode }) {
    const [showMoreTabs, setShowMoreTabs] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const navArray = [
        { key: 'profile', label: 'Bio' },
        { key: 'democraticLegal', label: 'Demographics' },
        { key: 'ContactInformation', label: 'Contacts' },
        { key: 'EmploymentInformation', label: 'Employment' },
        { key: 'documents', label: 'Documents' }
    ];

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 767);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'profile';

    return (
        <div className="col-lg-9" style={{ width: '100%' }}>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                
                    
                    <div className="tab-content"  style={{minWidth:'100%'}}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentInfoLayout>{children}</StudentInfoLayout>
        </Suspense>
    );
}
