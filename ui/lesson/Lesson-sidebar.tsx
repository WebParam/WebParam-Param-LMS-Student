"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "@/ui/lesson/side.module.css";
import { fetchTopicElements } from "@/actions/paraphase/paraphase-action";
import { fetchKnowledgeTopics } from "@/actions/knowledge-topic/knowledge-topic";
import { useVideo } from "@/context/video-context/video-context";
import { useLessonContext } from "@/context/lesson-context/lesson-context";
import { KnowledgeTopic } from "@/interfaces/knowledge/knowledge";
import LessonData from "@/data/lessons/lesson.json";
import { TopicElement } from "@/interfaces/pharaphase/paraphase-d";

interface LessonSidebarHandle {
  handlePrevious: () => void;
  handleNext: () => void;
}

const LessonSidebar = forwardRef<LessonSidebarHandle>((props, ref) => {
  const { setId, navigateToLesson } = useLessonContext();
  const { setSelectedVideoUrl } = useVideo();
  const [knowledgeTopics, setKnowledgeTopics] = useState<KnowledgeTopic[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<{
    [key: string]: TopicElement[];
  }>({});
  const [isActiveUrl, setIsActiveUrl] = useState<string | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [expandedAssignments, setExpandedAssignments] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedAssessments, setExpandedAssessments] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  useEffect(() => {
    const getAllKnowledgeTopics = async (id: string) => {
      try {
        const topics = await fetchKnowledgeTopics(id);
        setKnowledgeTopics(topics);

        if (topics.length > 0) {
          const firstTopicId = topics[0].id;
          const elements = await fetchTopicElements(firstTopicId);
          setExpandedTopics((prevState) => ({
            ...prevState,
            [firstTopicId]: elements,
          }));

          const firstVideoUrl = elements.find((el) => el.videoUrl)?.videoUrl;
          if (firstVideoUrl) {
            setSelectedVideoUrl(firstVideoUrl);
            setIsActiveUrl(firstVideoUrl);
            setCurrentElementIndex(0);
          }
        }
      } catch (error) {
        console.error("Error fetching knowledge topics: ", error);
      }
    };

    const savedId = localStorage.getItem("lessonId");
    if (savedId) {
      getAllKnowledgeTopics(savedId);
    }
  }, []);

  const handleTopicClick = async (topicId: string, index: number) => {
    if (!expandedTopics[topicId]) {
      try {
        const elements = await fetchTopicElements(topicId);
        setExpandedTopics((prevState) => ({
          ...prevState,
          [topicId]: elements,
        }));

        const firstVideoUrl = elements.find((el) => el.videoUrl)?.videoUrl;
        if (firstVideoUrl) {
          setSelectedVideoUrl(firstVideoUrl);
          setIsActiveUrl(firstVideoUrl);
          setCurrentTopicIndex(index);
          setCurrentElementIndex(0);
        }
      } catch (error) {
        console.error("Error fetching topic elements: ", error);
      }
    } else {
      const firstVideoUrl = expandedTopics[topicId].find(
        (el) => el.videoUrl
      )?.videoUrl;
      if (firstVideoUrl) {
        setSelectedVideoUrl(firstVideoUrl);
        setIsActiveUrl(firstVideoUrl);
        setCurrentTopicIndex(index);
        setCurrentElementIndex(0);
      }
    }
  };

  const handleActiveVideoUrl = (videoUrl: string, elementIndex: number) => {
    setSelectedVideoUrl(videoUrl);
    setIsActiveUrl(videoUrl);
    setCurrentElementIndex(elementIndex);
  };

  const handlePrevious = async () => {
    setIsQuizActive(false);
    let newElementIndex = currentElementIndex - 1;
    let newTopicIndex = currentTopicIndex;

    if (newElementIndex < 0) {
      newTopicIndex--;
      if (newTopicIndex >= 0) {
        const prevTopicId = knowledgeTopics[newTopicIndex].id;
        await handleTopicClick(prevTopicId, newTopicIndex);
        newElementIndex = expandedTopics[prevTopicId].length - 1;
      } else {
        newElementIndex = 0;
      }
    }

    if (
      expandedTopics[knowledgeTopics[newTopicIndex].id] &&
      expandedTopics[knowledgeTopics[newTopicIndex].id][newElementIndex]
    ) {
      const prevElement =
        expandedTopics[knowledgeTopics[newTopicIndex].id][newElementIndex];
      const prevVideoUrl = prevElement.videoUrl;
      if (prevVideoUrl) {
        setSelectedVideoUrl(prevVideoUrl);
        setIsActiveUrl(prevVideoUrl);
        setCurrentTopicIndex(newTopicIndex);
        setCurrentElementIndex(newElementIndex);
      }
    }
  };

  const handleNext = async () => {
    setIsQuizActive(false);
    let newElementIndex = currentElementIndex + 1;
    let newTopicIndex = currentTopicIndex;

    if (
      newElementIndex >=
      expandedTopics[knowledgeTopics[newTopicIndex].id]?.length
    ) {
      newTopicIndex++;
      if (newTopicIndex < knowledgeTopics.length) {
        const nextTopicId = knowledgeTopics[newTopicIndex].id;
        await handleTopicClick(nextTopicId, newTopicIndex);
        newElementIndex = 0;
      } else {
        newElementIndex--;
      }
    }

    if (
      expandedTopics[knowledgeTopics[newTopicIndex].id] &&
      expandedTopics[knowledgeTopics[newTopicIndex].id][newElementIndex]
    ) {
      const nextElement =
        expandedTopics[knowledgeTopics[newTopicIndex].id][newElementIndex];
      const nextVideoUrl = nextElement.videoUrl;
      if (nextVideoUrl) {
        setSelectedVideoUrl(nextVideoUrl);
        setIsActiveUrl(nextVideoUrl);
        setCurrentTopicIndex(newTopicIndex);
        setCurrentElementIndex(newElementIndex);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handlePrevious,
    handleNext,
  }));

  const handleToggle = (setFunction: any, id: any) => {
    setFunction((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  

  return (
    <div className={styles.lessonScrollSidebar}>
      <div className="rbt-course-feature-inner rbt-search-activation">
        <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
          <div className="accordion" id="accordionExampleb2">
            {knowledgeTopics.map((topic, index) => (
              <div className="accordion-item card" key={topic.id}>
                <h2
                  className={`accordion-header card-header ${
                    currentTopicIndex === index ? "active" : ""
                  }`}
                  id={`heading${index + 1}`}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded={!!expandedTopics[topic.id]}
                    data-bs-target={`#collapse${index + 1}`}
                    aria-controls={`collapse${index + 1}`}
                    onClick={() => handleTopicClick(topic.id, index)}
                  >
                    <span
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "280px",
                      }}
                    >
                      {topic.name}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapse${index + 1}`}
                  className={`accordion-collapse collapse ${
                    expandedTopics[topic.id] ? "show" : ""
                  }`}
                  aria-labelledby={`heading${index + 1}`}
                >
                  <div className="accordion-body card-body">
                    {expandedTopics[topic.id] && (
                      <ul className="rbt-course-main-content liststyle">
                        {expandedTopics[topic.id].map((element, elIndex) => (
                          <React.Fragment key={element.id}>
                            <li className="d-flex justify-content-between align-items mt-2">
                              <div className="course-content-left">
                                <i
                                  className="feather-play-circle"
                                  style={{
                                    color:
                                      isActiveUrl === element.videoUrl
                                        ? "#2f57ef"
                                        : "#6b7385",
                                  }}
                                ></i>
                                <p
                                  onClick={() =>
                                    element.videoUrl &&
                                    handleActiveVideoUrl(
                                      element.videoUrl,
                                      elIndex
                                    )
                                  }
                                  style={{
                                    cursor: element.videoUrl
                                      ? "pointer"
                                      : "default",
                                    textDecoration: "none",
                                    fontWeight:
                                      isActiveUrl === element.videoUrl
                                        ? "bold"
                                        : "normal",
                                    color:
                                      isActiveUrl === element.videoUrl
                                        ? "#2f57ef"
                                        : "#6b7385",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    maxWidth: "240px",
                                  }}
                                >
                                  {element.title}
                                </p>
                              </div>
                              <div className="course-content-right">
                                <span
                                  className={`rbt-check ${
                                    isActiveUrl === element.videoUrl
                                      ? ""
                                      : "unread"
                                  }`}
                                >
                                  <i
                                    className={`feather-${
                                      isActiveUrl === element.videoUrl
                                        ? "check"
                                        : "circle"
                                    }`}
                                  ></i>
                                </span>
                              </div>
                            </li>

                            {/* Quizzes Section */}
                            {/* {LessonData.lesson
                              .filter((lesson) => lesson.title.includes("quiz"))
                              .map((quiz, quizIndex) => (
                                <li
                                  key={`quiz-${elIndex}-${quizIndex}`}
                                  className="d-flex justify-content-between align-items mt-2"
                                  onClick={() => {
                                    setIsActiveUrl(quiz.listItem[0].lssonLink);
                                    setIsQuizActive(true);
                                  }}
                                >
                                  <div className="course-content-left">
                                    <i
                                      className="feather-help-circle"
                                      style={{
                                        color:
                                          isActiveUrl ===
                                          quiz.listItem[0].lssonLink
                                            ? "#2f57ef"
                                            : "#6b7385",
                                      }}
                                    ></i>
                                    <p>
                                      <a href={quiz.listItem[0].lssonLink}>
                                        {quiz.title}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="course-content-right">
                                    <span
                                      className={`rbt-check ${
                                        isActiveUrl ===
                                        quiz.listItem[0].lssonLink
                                          ? ""
                                          : "unread"
                                      }`}
                                    >
                                      <i
                                        className={`feather-${
                                          isActiveUrl ===
                                          quiz.listItem[0].lssonLink
                                            ? "check"
                                            : "circle"
                                        }`}
                                      ></i>
                                    </span>
                                  </div>
                                </li>
                              ))} */}
                          </React.Fragment>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assessments Section */}
          {/* <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion mt-4">
            {LessonData.lesson
              .filter((lesson) => lesson.title.includes("Assessments"))
              .map((assessment, index) => (
                <div
                  className="accordion-item card"
                  key={`assessment-${index}`}
                >
                  <h2
                    className="accordion-header card-header"
                    id={`assessmentHeading${index}`}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded={!!expandedAssessments[index]}
                      data-bs-target={`#assessmentCollapse${index}`}
                      aria-controls={`assessmentCollapse${index}`}
                      onClick={() =>
                        handleToggle(setExpandedAssessments, index)
                      }
                    >
                      {assessment.title}
                    </button>
                  </h2>
                  <div
                    id={`assessmentCollapse${index}`}
                    className={`accordion-collapse collapse ${
                      expandedAssessments[index] ? "show" : ""
                    }`}
                    aria-labelledby={`assessmentHeading${index}`}
                  >
                    <div className="accordion-body card-body">
                      <ul className="rbt-course-main-content liststyle">
                        {assessment.listItem.map((item, idx) => (
                          <li
                            key={idx}
                            className="d-flex justify-content-between align-items mt-2"
                          >
                            <div className="course-content-left">
                              <i
                                className="feather-help-circle"
                                style={{
                                  color:
                                    activeAssessment === item.lssonLink
                                      ? "#2f57ef"
                                      : "#6b7385",
                                }}
                              ></i>
                              <p>
                                <a href={item.lssonLink}>{item.lessonName}</a>
                              </p>
                            </div>
                            <div className="course-content-right">
                              <span
                                className={`rbt-check ${
                                  activeAssessment === item.lssonLink
                                    ? ""
                                    : "unread"
                                }`}
                              >
                                <i
                                  className={`feather-${
                                    activeAssessment === item.lssonLink
                                      ? "check"
                                      : "circle"
                                  }`}
                                ></i>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
});

LessonSidebar.displayName = "LessonSidebar";

export default LessonSidebar;