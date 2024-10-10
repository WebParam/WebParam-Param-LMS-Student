"use client";

import "./lesson.scss";
import { GetKnowledgeTopicsNew, getTopics, GetVideosWatched, PostVideoWatched } from "@/app/api/lesson/lessonEndpoint";
import { TopicElement } from "@/interfaces/pharaphase/paraphase-d";
import Notes from "@/ui/lesson/notes/notes";
import QuestionAndAnswers from "@/ui/lesson/question-answers/question-answer";
import Overview from "@/ui/overview/overview";
import Transcript from "@/ui/transcript/transcript";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LessonQuiz from "../lesson/quiz/page";
import { isMobile } from "react-device-detect";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";  
import Cookies from "universal-cookie";
import { useCourseId } from "@/context/courseId-context/courseId-context";
import { POST } from "@/app/lib/api-client";
import { rDocumentParaphraseUrl } from "@/app/lib/endpoints";

function TakeLesson() {
  const [currentVideo, setCurrentVideo] = useState<any>();
  const [knowledgeTopics, setKnowledgeTopics] = useState<any[]>([]);
  const [videoLoader, setVideoLoader] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<{
    [key: string]: TopicElement[];
  }>({});
  const [checkedSubTopics, setCheckedSubTopics] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [videosWatched, setVideosWatched] = useState<any[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<IQuizQuestion[]>([]);
  const cookies = new Cookies();
  const loggedInUser = cookies.get('loggedInUser');
  const userID = cookies.get('userID');
  const router = useRouter();  
  console.log('loggedInUser', loggedInUser)

  const topicRef = useRef<HTMLLIElement>(null);
  interface IQuizQuestion  {
    question: string;
    options: string[];
    answer: string;
  };
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const allSubTopics = Object.values(expandedTopics).flat();
  const { courseId } = useCourseId();

  // Add a state to track the currently open accordion
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  async function fetchKnowledgeTopics() {
    
    try {
      const response = await GetKnowledgeTopicsNew(moduleId);
      if (!response.error) {
        setKnowledgeTopics(response.data);
        
        response.data.length > 0 &&  handleExpandClick(response.data[0].id);
      } else {
        setError("Failed to load data");
      }
    } catch (err: any) {
      console.error("Error fetching knowledge topics:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      }

    
    
  }

  const getQuizQuestions = async (videoId:string) => {
    const payload = {
      videoId:videoId
    }
    const res = await POST(payload,`${rDocumentParaphraseUrl}/api/v1/topicQuiz/generate`);
    debugger;
   
    setCurrentQuiz(res?.data);
    
  }

  async function fetchTopics(topicId: string) {
    try {
      const response = await getTopics(topicId);
      console.log("topics", response);
      if (!response.error) {
        setExpandedTopics((prev) => ({
          ...prev,
          [topicId]: response.data,
        }));
        setTimeout(() => {
            console.log('hello world')
            topicRef.current?.click();
        }, 1000)
      } else {
        setError("Failed to load topics data");
      }
    } catch (err: any) {
      console.error("Error fetching topics:", err);
      setError(err.message);
    }
  }

  async function trackVideoWatched() {

    const totalWatchTime = Math.floor(Math.random() * 1000);
    const timeSpent = totalWatchTime + Math.floor(Math.random() * 100);

    const topicElement = knowledgeTopics.find(topic => topic.id === currentVideo.topicId);

    const payload = {
      UserId: userID || loggedInUser?.userId,
      ElementId: currentVideo.id,
      TopicId: currentVideo.topicId,
      TotalVideoTime: totalWatchTime,
      TimeSpent: timeSpent,
      courseId: courseId??process.env.NEXT_PUBLIC_COURSE_ID,
      videoTitle: currentVideo?.title,
      topicTitle: topicElement?.name,
      IsCompleted: true
    };
    
    debugger;
  
    try {
      const res = await PostVideoWatched(payload);

      if (res?.data) {
        setVideosWatched((prev) => [...prev, res.data]);
        updateVideoWatched(res.data);
      }
      return res?.data
    } catch (error) {
      console.error("Error tracking video watched:", error);
    }
  }
  
  useEffect(() => {
    fetchKnowledgeTopics();
    setVideoLoader(true);
  
  }, []);
  
  useEffect(() => {
    if (currentVideo?.topicId) {
      getWatchedVideos();
    }
  }, [currentVideo?.topicId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("expanded topics:", filteredTopics.some(topic => topic));
  }, [currentVideo]);

  function updateVideoWatched(payload: any) {
    videosWatched.push(payload);
    localStorage.setItem("videosWatched", JSON.stringify(videosWatched));
  }
  
  async function getWatchedVideos() {
    try {
      const res = await GetVideosWatched(userID || loggedInUser?.data?.id, currentVideo?.topicId);
      console.log("Videos watched:", res.data);
      if (res.data) {
        setVideosWatched(res.data);
      }
    } catch (error) {
      console.error("Error fetching watched videos:", error);
    }
  }
  

  const handleExpandClick = (topicId: string) => {
    if (openAccordionId === topicId) {
      // If the clicked accordion is already open, close it
      setOpenAccordionId(null);
    } else {
      // Open the clicked accordion and close others
      setOpenAccordionId(topicId);
      if (!expandedTopics[topicId]) {
        fetchTopics(topicId);
      } else {
        // Ensure the first subtopic is selected when re-opening an accordion
        const firstSubTopic = expandedTopics[topicId][0];
        if (firstSubTopic) {
          handleSubTopicClick(firstSubTopic, 0);
        }
      }
    }
  };

  const handleSubTopicClick = (subTopic: TopicElement, index: number) => {
    setCurrentQuiz([]);
    setVideoLoader(true);
    setCheckedSubTopics((prev) => ({
      ...prev,
      [subTopic.id]: !prev[subTopic.id],
    }));
    console.log("selected topic for video:", subTopic);
    setCurrentVideo(subTopic || null);
    setCurrentIndex(index);
    setVideoEnded(false); // Reset videoEnded state when a new video is selected
    setVideoLoader(false);

    debugger;
    const questions = getQuizQuestions(subTopic.id);
    

    // setExpandedTopicId(subTopic.id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTopics = knowledgeTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery)
  );

  const handlePrevious = () => {
    if (currentIndex >= 0) {
      const previousSubTopic = expandedTopics[currentVideo.topicId][currentIndex - 1];
      if (previousSubTopic) {
        setCurrentVideo(previousSubTopic);
        setCurrentQuiz([]);

        const questions = getQuizQuestions(previousSubTopic.id);
        setCheckedSubTopics((prev) => ({
          ...prev,
          [previousSubTopic.id]: true,
        }));
        setCurrentIndex(currentIndex - 1);
        setVideoEnded(false); // Reset videoEnded state when a new video is selected
      }
    }
  };

  const handleNext = () => {

    console.log("Current index before next:", currentIndex);  // Debugging log
  
    if (!videoEnded) {
      setVideoEnded(true); // Show quiz first
      return;
    }
  
    const currentTopicSubTopics = expandedTopics[currentVideo.topicId];
    if (currentIndex <= currentTopicSubTopics.length - 1) {
      const nextIndex = currentIndex + 1;
      console.log("Navigating to next index:", nextIndex);  // Debugging log
      const nextSubTopic = currentTopicSubTopics[nextIndex];
      if (nextSubTopic) {
        setCurrentVideo(nextSubTopic);
        setCurrentQuiz([]);
        const questions = getQuizQuestions(nextSubTopic.id);
        setCheckedSubTopics((prev) => ({
          ...prev,
          [nextSubTopic.id]: true,
        }));
        setCurrentIndex(nextIndex);
        setVideoEnded(false);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };



 

  if (error) return (
    <div className="error-area">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-10">
            <h1 className="title">404!</h1>
            <h3 className="sub-title">Page not found</h3>
            <p>The page you were looking for could not be found.</p>
            <a className="rbt-btn btn-gradient icon-hover" href="/">
              <span className="btn-text">Back To My Courses</span>
              <span className="btn-icon">
                <i className="feather-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  console.log(`topics:`,expandedTopics)

  return (
    <div className="rbt-lesson-area bg-color-white">
      <div className="rbt-lesson-content-wrapper">
        {/* Sidebar */}

        
        <div id="sidebar-desktop" className="rbt-lesson-leftsidebar">
          <div className="rbt-course-feature-inner rbt-search-activation">
            <div className="section-title" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5px'}}>
              <h4 className="rbt-title-style-3">Course Content</h4>
              <button className="rbt-btn btn-md bg-primary-opacity" onClick={() => router.push('/student/enrolled-courses')}>Back</button>
            </div>
            <div className="lesson-search-wrapper">
              <form action="#" className="rbt-search-style-1">
                <input
                  className="rbt-search-active"
                  type="text"
                  placeholder="Search Lesson"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="search-btn disabled">
                  <i className="feather-search" />
                </button>
              </form>
            </div>
            <hr className="mt--10" />
            <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
              {!loading ? filteredTopics.map((topic, index) => (
                <div className="accordion-item card" key={topic.id}>
                  <h2
                    className="accordion-header card-header"
                    id={`heading${index}`}
                  >
                    <button
                      // ref={index === 0 ? firstAccordionButtonRef : null}
                      className={`accordion-button ${openAccordionId === topic.id ? '' : 'collapsed'}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={openAccordionId === topic.id}
                      aria-controls={`collapse${index}`}
                      onClick={() => handleExpandClick(topic.id)}
                      style={{fontSize:'16px'}}
                    >
                      {topic.name}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${openAccordionId === topic.id ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExampleb2"
                  >
                    <div className="accordion-body card-body">
                      {expandedTopics[topic.id] ? (
                        <ul style={{marginLeft:'0', paddingLeft:'0'}}>
                          {expandedTopics[topic.id].map(
                            (subTopic: TopicElement, subIndex) => {

                              const isWatched = videosWatched.find(video => video?.elementId == subTopic.id);

                              return (
                              <li
                                ref={subIndex === 0 ? topicRef : null}
                                className="d-flex justify-content-between align-items mt-2"
                                key={topic.id}
                                onClick={() => handleSubTopicClick(subTopic, subIndex)}
                                style={{ color: `${currentVideo?.id == subTopic.id || isWatched?.elementId == subTopic.id ? 'rgb(47, 87, 239)' : null}`, }}
                              >
                                <div
                                  className="course-content-left topic_Element_container"
                                  style={{
                                    overflow: "hidden",
                                    display: "flex",
                                    gap: "18x",
                                    alignItems: "center",
                                    width:'100%'
                                  }}
                                >
                                  {currentVideo?.id == subTopic.id ? <i className="bi bi-pause-circle-fill" style={{marginRight:'15px'}}></i>:<i className="feather-play-circle icon" style={{marginRight:'15px'}} />}
                                  <p
                                    className="topic-Element-Title"
                                    style={{
                                      fontSize: 13,
                                      cursor: "pointer",
                                      textDecoration: "none",
                                      fontWeight: "bold",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textWrap: "wrap",
                                    }}
                                  >
                                    {subTopic.title}
                                  </p>
                                </div>
                                <div className="course-content-right">
                                  <span className="rbt-check ">
                                    {currentVideo?.id === subTopic?.id || isWatched?.elementId == subTopic.id && (
                                      <i className="feather-check" />
                                    )}
                                  </span>
                                </div>
                              </li>)
                              }
                          )}
                        </ul>
                      ) : (
                        <div>Loading topics...</div>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Skeleton count={5} height={40} />
                </div>
              )}
            </div>
          </div>
        </div>

        
        {/* End of Sidebar */}
        <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video" id="lesson-video">
          {!videoEnded ? <div className="inner">
            {!videoLoader ? (
              <>
                <iframe
                  width="100%"
                  height="500px"
                  src={currentVideo?.videoUrl}
                  title="Video player"
                  
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onEnded={handleVideoEnd}
                />
                <div>
                  <div className="content">

                    <div className="section-title">
                      <h5>{currentVideo?.title}</h5>
                    </div>

                    <div className="rbt-button-group">
                      <button
                        className="rbt-btn  btn-md bg-primary-opacity"
                        onClick={handlePrevious}
                        disabled={currentIndex <= 0}
                      >
                        
                        <span className="btn-text">Previous</span>
                      </button>
                      <button
                        className="rbt-btn  btn-md"
                        onClick={() => {trackVideoWatched();handleNext()}}
                        disabled={currentIndex > expandedTopics[currentVideo?.topicId]?.length - 1}

                      >
                        <span className="btn-text">Next</span>
                        
                      </button>
                    </div>
                    <div className="content-2">
                      <div className="advance-tab-button mb--30">
                        <ul
                          className="nav nav-tabs tab-button-style-2 justify-content-start"
                          id="myTab-4"
                          role="tablist"
                        >
                          <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button active"
                              id="overview-tab-4"
                              data-bs-toggle="tab"
                              data-bs-target="#overview-4"
                              role="tab"
                              aria-controls="overview-4"
                              aria-selected="true"
                            >
                              <span className="title">Overview</span>
                            </Link>
                          </li>
                          <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button"
                              id="transcript-tab-4"
                              data-bs-toggle="tab"
                              data-bs-target="#transcript-4"
                              role="tab"
                              aria-controls="transcript-4"
                              aria-selected="false"
                            >
                              <span className="title">Transcript</span>
                            </Link>
                          </li>
                          {/* <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button"
                              id="q&a-tab-4"
                              data-bs-toggle="tab"
                              data-bs-target="#q&a-4"
                              role="tab"
                              aria-controls="q&a-4"
                              aria-selected="false"
                            >
                              <span className="title">Q&A</span>
                            </Link>
                          </li> */}
                          {/* <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button"
                              id="notes-tab-4"
                              data-bs-toggle="tab"
                              data-bs-target="#notes-4"
                              role="tab"
                              aria-controls="notes-4"
                              aria-selected="false"
                            >
                              <span className="title">Notes</span>
                            </Link>
                          </li> */}
                          {isMobile && 
                          <li role="presentation">
                            <Link
                              href="#"
                              className="tab-button"
                              id="content-tab-4"
                              data-bs-toggle="tab"
                              data-bs-target="#content-4"
                              role="tab"
                              aria-controls="content-4"
                              aria-selected="false"
                            >
                              <span className="title">Content</span>
                            </Link>
                          </li>
}
                        </ul>
                      </div>
                    </div>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="overview-4"
                        role="tabpanel"
                        aria-labelledby="overview-tab-4"
                      >
                        <Overview currentVideo={currentVideo} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="transcript-4"
                        role="tabpanel"
                        aria-labelledby="transcript-tab-4"
                      >
                        <Transcript currentVideo={currentVideo} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="q&a-4"
                        role="tabpanel"
                        aria-labelledby="q&a-tab-4"
                      >
                        <QuestionAndAnswers />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="notes-4"
                        role="tabpanel"
                        aria-labelledby="notes-tab-4"
                      >
                        <Notes />
                      </div>
                  
                      <div
                        className="tab-pane fade"
                        id="content-4"
                        role="tabpanel"
                        aria-labelledby="content-tab-4"
                      >
                        <div className="rbt-lesson-leftsidebar">
                          <div className="rbt-course-feature-inner rbt-search-activation">
                            {/* <div className="section-title">
                              <h4 className="rbt-title-style-3">Course Content</h4>
                            </div> */}
                            {/* <div className="lesson-search-wrapper">
                              <form action="#" className="rbt-search-style-1">
                                <input
                                  className="rbt-search-active"
                                  type="text"
                                  placeholder="Search Lesson"
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                />
                                <button className="search-btn disabled">
                                  <i className="feather-search" />
                                </button>
                              </form>
                            </div> */}
                            {/* <hr className="" /> */}
                            <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
                            {!loading ? (
                                filteredTopics.map((topic, index) => (
                                  <div className="accordion-item card" key={topic.id}>
                                    <h2 className="accordion-header card-header" id={`heading${index}`}>
                                    <button
                                      className={`accordion-button ${openAccordionId === topic.id ? '' : 'collapsed'}`}
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#collapse${index}`}
                                      aria-expanded={openAccordionId === topic.id}
                                      aria-controls={`collapse${index}`}
                                      onClick={() => handleExpandClick(topic.id)}
                                      style={{fontSize:'16px'}}
                                    >
                                      {topic.name}
                                    </button>
                                    </h2>
                                    <div
                                      id={`collapse${index}`}
                                      className={`accordion-collapse collapse ${openAccordionId === topic.id ? 'show' : ''}`}
                                      aria-labelledby={`heading${index}`}
                                      data-bs-parent="#accordionExampleb2"
                                    >
                                      <div className="accordion-body card-body">
                                        {expandedTopics[topic.id] ? (
                                          <ul style={{ marginLeft: '0', paddingLeft: '0' }}>
                                            {expandedTopics[topic.id].map((subTopic: TopicElement, subIndex) => {
                                            
                                            const isWatched = videosWatched.find(video => video?.elementId == subTopic.id);

                                              return (
                                                <li
                                                  ref={subIndex === 0 ? topicRef : null}
                                                  className="d-flex justify-content-between align-items mt-2"
                                                  key={topic.id} // Use subTopic.id for uniqueness
                                                  onClick={() => handleSubTopicClick(subTopic, subIndex)}
                                                  style={{ color: `${currentVideo?.id == subTopic.id || isWatched?.elementId == subTopic.id ? 'rgb(47, 87, 239)' : null}`, }}
                                                >
                                                  <div
                                                    className="course-content-left topic_Element_container"
                                                    style={{
                                                      overflow: "hidden",
                                                      display: "flex",
                                                      gap: "18px", // Corrected from "18x" to "18px"
                                                      alignItems: "center",
                                                      width: '100%'
                                                    }}
                                                  >
                                                    {currentVideo?.id === subTopic.id ? (
                                                      <i className="bi bi-pause-circle-fill" style={{ marginRight: '15px' }}></i>
                                                    ) : (
                                                      <i className="feather-play-circle icon" style={{ marginRight: '15px' }} />
                                                    )}
                                                    <p
                                                      className="topic-Element-Title"
                                                      style={{
                                                        fontSize: 13,
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis", // Added textOverflow for better text handling
                                                      }}
                                                    >
                                                      {subTopic.title}
                                                    </p>
                                                  </div>
                                                  <div className="course-content-right">
                                                    <span className="rbt-check">
                                                      {currentVideo?.id === subTopic?.id || isWatched?.elementId == subTopic.id && <i className="feather-check" />}
                                                    </span>
                                                  </div>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        ) : (
                                          <div>Loading topics...</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <Skeleton count={5} height={40} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:'center', justifyContent:'center'}}>
                <SkeletonTheme baseColor="#fff" highlightColor="#6b7385">
                    <Skeleton width="100%" height="700px" />
                </SkeletonTheme>
              </div>
            )}
          </div>
          :
          <div className="inner">
            <LessonQuiz firstQuiz={currentQuiz} setVideoEnded={setVideoEnded} handleNext={handleNext} currentVideo={currentVideo} />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default function TakeLessonContainer() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <TakeLesson />
    </Suspense>
  )
}