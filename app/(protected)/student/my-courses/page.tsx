"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/ui/loader/loader";
import styles from "@/styles/enrolled-courses/enrolled-courses.module.css";
import { getAlltUnitStandards } from "@/actions/unit-standards/get-unit-standards";
import { UnitStandardData } from "@/interfaces/enrolled-unit-standards/unit-standards/unit-standards";
import UnitStandardWidget from "@/ui/student/enrolled/sample-unit";
import { getCourseId, getEnrolledCourse } from "@/app/api/my-courses/course";
import Cookies from "universal-cookie";

const EnrolledCourses = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [unitStandards, setUnitStandards] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isProgress, setIsProgress] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [courseStyle, setCourseStyle] = useState("two");
  const cookies = new Cookies();

  const user = cookies.get("loggedInUser");

  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

//   const handleNext = () => {
//     if (endIndex < unitStandards.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

  const getUnitStandards = async (courseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAlltUnitStandards(courseId);
      console.log("get data: ", data);
      setUnitStandards(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getKnowledgeModules = async (userId:any) => {
    if (userId) {
        const courseId = await getCourseId(userId);
        if (courseId?.data) {
            const res = await getEnrolledCourse(courseId?.data);
    
            console.log("knowledge modules: ", res?.data.data);
            if (res?.data) {
                setUnitStandards(res.data.data);
            }
        }
    }
  }

  useEffect(() => {
    // const courseId = "668fcf681a1ce7b0635b61c6";
    // getUnitStandards(courseId);
    debugger;
    getKnowledgeModules(user.data.id||user.data.userId);

    console.log("knowledge modules:", unitStandards);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
  }

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="get-4-color rbt-title-style-3">
              <i className="bi bi-laptop "></i>
              <span className="style-3-left">My Courses</span>
            </h4>
          </div>
          <div
            className={`advance-tab-button mb--30${styles.advanceTabButton}`}
          >
            <ul
              className={`nav nav-tabs tab-button-style-2 ${styles.navTabs}`}
              id="myTab-4"
              role="tablist"
            >
              {/* <li role="presentation">
                <Link
                  href="#"
                  className={`tab-button active ${styles.tabButton}`}
                  id="home-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#home-4"
                  role="tab"
                  aria-controls="home-4"
                  aria-selected="true"
                >
                  <span className="title">Enrolled</span>
                </Link>
              </li> */}
              <li role="presentation">
                <Link
                  href="#"
                  className={`tab-button ${styles.tabButton}`}
                  id="profile-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-4"
                  role="tab"
                  aria-controls="profile-4"
                  aria-selected="false"
                >
                  <span className="title">Active</span>
                </Link>
              </li>
              <li role="presentation">
                <Link
                  href="#"
                  className={`tab-button ${styles.tabButton}`}
                  id="contact-tab-4"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-4"
                  role="tab"
                  aria-controls="contact-4"
                  aria-selected="false"
                >
                  <span className="title">Completed</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="home-4"
              role="tabpanel"
              aria-labelledby="home-tab-4"
            >
              <div className="row g-5">
                {unitStandards?.slice(0,1).map((standard, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                   <div className="rbt-card variation-01 rbt-hover">
                    <div className="rbt-card-img">
                      <a href="/lesson">
                      <img alt="Introductory studies for Project Managers" loading="lazy" width={330} height={227} decoding="async" data-nimg={1} src="/_next/static/media/courseImage.b0b06990.jpeg" style={{color: 'transparent'}} />
                      </a>
                    </div>
                    <div className="rbt-card-body">
                      <div className="rbt-card-top">
                        <div className="rbt-bookmark-btn">
                          <a className="rbt-round-btn" title="Bookmark" href="#">
                            <i className="feather-bookmark" />
                          </a>
                        </div>
                      </div>
                      <h4 className="rbt-card-title">
                        <a href="/lesson">{standard.title}</a>
                      </h4>
                      <ul className="rbt-meta">
                        <li><i className="feather-book" />0 Lessons</li>
                        <li><i className="feather-users" />0 Students</li>
                      </ul>
                      <div className="rbt-progress-style-1 mb--20 mt--10">
                        <div className="single-progress">
                        <h6 className="rbt-title-style-2 mb--10" dangerouslySetInnerHTML={{ __html: standard.description }}></h6>
                          </div>
                        </div>
                        <h6 className="rbt-title-style-2 mb--10" />
                        <div className="rbt-card-bottom">
                          <a href="#">
                            <button className="bi bi-play rbt-btn bg-primary-opacity w-100 text-center course_buttonSmall__T0dga">Start Watching</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tab-pane fade scrollable-tab-content"
              id="profile-4"
              role="tabpanel"
              aria-labelledby="profile-tab-4"
            >
              <div className="row g-5">
                {unitStandards?.map((standard, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                    <UnitStandardWidget
                      data={standard}
                      courseStyle={courseStyle}
                      isProgress={isProgress}
                      isCompleted={isCompleted}
                      showDescription={showDescription}
                      isEdit={isEdit}
                      showAuthor={showAuthor}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="tab-pane fade scrollable-tab-content"
              id="contact-4"
              role="tabpanel"
              aria-labelledby="contact-tab-4"
            >
              <div className="row g-5">
                {unitStandards?.map((standard, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                    <UnitStandardWidget
                      data={standard}
                      courseStyle={courseStyle}
                      isProgress={isProgress}
                      isCompleted={isCompleted}
                      showDescription={showDescription}
                      isEdit={isEdit}
                      showAuthor={showAuthor}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;
