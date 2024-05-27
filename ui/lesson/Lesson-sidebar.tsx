"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LessonData from "@/data/lessons/lesson.json";

interface LessonItem {
  lssonLink: string;
  lessonName: string;
  iconFile?: boolean;
  iconHelp?: boolean;
  lable: boolean;
  time: number;
  unread: boolean;
  isCircle: boolean;
}

interface Lesson {
  title: string;
  isShow: boolean;
  listItem: LessonItem[];
}

interface LessonDataStructure {
  lesson: Lesson[];
  lessonQuiz?: any[];
}

const LessonSidebar = () => {
  const path = usePathname();
  const isActive = (href: string) => path === href;

  return (
    <>
      <div className="rbt-course-feature-inner rbt-search-activation">
        <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
          <div className="accordion" id="accordionExampleb2">
            {(LessonData as LessonDataStructure).lesson.map((data, index) => (
              <div className="accordion-item card" key={index}>
                <h2
                  className="accordion-header card-header"
                  id={`headingTwo${index + 1}`}
                >
                  <button
                    className={`accordion-button ${
                      !data.isShow ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded={data.isShow}
                    data-bs-target={`#collapseTwo${index + 1}`}
                    aria-controls={`collapseTwo${index + 1}`}
                  >
                    {data.title}
                    <span className="rbt-badge-5 ml--10">
                      1/{data.listItem.length}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapseTwo${index + 1}`}
                  className={`accordion-collapse collapse ${
                    data.isShow ? "show" : ""
                  }`}
                  aria-labelledby={`headingTwo${index + 1}`}
                >
                  <div className="accordion-body card-body">
                    <ul className="rbt-course-main-content liststyle">
                      {data.listItem.map((innerData, innerIndex) => (
                        <li key={innerIndex}>
                          <Link
                            className={
                              isActive(innerData.lssonLink) ? "active" : ""
                            }
                            href={`${innerData.lssonLink}`}
                          >
                            <div className="course-content-left">
                              {innerData.iconHelp ? (
                                <i className="feather-help-circle"></i>
                              ) : (
                                <i
                                  className={`feather-${
                                    innerData.iconFile
                                      ? "file-text"
                                      : "play-circle"
                                  }`}
                                ></i>
                              )}
                              <span className="text">
                                {innerData.lessonName}
                              </span>
                            </div>
                            <div className="course-content-right">
                              {innerData.lable && innerData.time > 0 ? (
                                <span className="min-lable">
                                  {innerData.time} min
                                </span>
                              ) : (
                                ""
                              )}
                              <span
                                className={`rbt-check ${
                                  isActive(innerData.lssonLink) ? "" : "unread"
                                }`}
                              >
                                <i
                                  className={`feather-${
                                    isActive(innerData.lssonLink)
                                      ? "check"
                                      : "circle"
                                  }`}
                                ></i>
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonSidebar;
