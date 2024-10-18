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
                    <div className="section-title">
                        <h4 className="rbt-title-style-3">Student Info</h4>
                    </div>
                    <div className="advance-tab-button mb--30" style={{ overflow: 'hidden' }}>
                        <>
                        {isMobile &&     
                        <ul
                            className={`nav nav-tabs tab-button-style-2 justify-content-start navigation-tabs ${showMoreTabs ? 'show-more' : ''}`}
                            id="settinsTab-4"
                            role="tablist"
                        >
                            {isSmallScreen && showMoreTabs && (
                                <li role="presentation">
                                    <button
                                        className="tab-button more-tabs-button"
                                        onClick={() => setShowMoreTabs(!showMoreTabs)}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                </li>
                            )}
                            {!showMoreTabs && navArray.slice(0, 3).map((nav) => (
                                <li role="presentation" key={nav.key}>
                                    <Link
                                        className={`tab-button ${currentTab === nav.key ? 'active' : ''}`}
                                        id={`${nav.key}-tab`}
                                        data-bs-toggle="tab"
                                        data-bs-target="#password"
                                        role="tab"
                                        aria-controls="password"
                                        aria-selected={currentTab === nav.key ? 'true' : 'false'}
                                        href={`/student/student-profile?tab=${nav.key}`}
                                        tabIndex={-1}
                                        onClick={() => router.push(`/student/student-profile?tab=${nav.key}`)}
                                    >
                                        <span className="title">{nav.label}</span>
                                    </Link>
                                </li>
                            ))}
                            {isSmallScreen && !showMoreTabs && (
                                <li role="presentation">
                                    <button
                                        className="tab-button more-tabs-button"
                                        onClick={() => setShowMoreTabs(!showMoreTabs)}
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </li>
                            )}
                            {showMoreTabs && navArray.slice(3).map((nav) => (
                                <li role="presentation" key={nav.key}>
                                    <Link
                                        className={`tab-button ${currentTab === nav.key ? 'active' : ''}`}
                                        id={`${nav.key}-tab`}
                                        data-bs-toggle="tab"
                                        data-bs-target="#password"
                                        role="tab"
                                        aria-controls="password"
                                        aria-selected={currentTab === nav.key ? 'true' : 'false'}
                                        href={`/student/student-profile?tab=${nav.key}`}
                                        tabIndex={-1}
                                        onClick={() => router.push(`/student/student-profile?tab=${nav.key}`)}
                                    >
                                        <span className="title">{nav.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul> 
                        
                        }
                        {isDesktop &&   <ul
                            className={`nav nav-tabs tab-button-style-2 justify-content-start navigation-tabs ${showMoreTabs ? 'show-more' : ''}`}
                            id="settinsTab-4"
                            role="tablist"
                        >
                          
                            { navArray.map((nav) => (
                                <li role="presentation" key={nav.key}>
                                    <Link
                                        className={`tab-button ${currentTab === nav.key ? 'active' : ''}`}
                                        id={`${nav.key}-tab`}
                                        data-bs-toggle="tab"
                                        data-bs-target="#password"
                                        role="tab"
                                        aria-controls="password"
                                        aria-selected={currentTab === nav.key ? 'true' : 'false'}
                                        href={`/student/student-profile?tab=${nav.key}`}
                                        tabIndex={-1}
                                        onClick={() => router.push(`/student/student-profile?tab=${nav.key}`)}
                                    >
                                        <span className="title">{nav.label}</span>
                                    </Link>
                                </li>
                            ))}
                        
                            </ul>
                            }

                        </>
                    

                        <div
                            className="tab-pane fade active show"
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        ></div>
                    </div>
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
