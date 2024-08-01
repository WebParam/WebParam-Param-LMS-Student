'use client'
import ChartWrapper from "@/ui/analytics/graphs/ChartWrapper";
import {
  options as OverallAssessmentBarOptions,
  data as OverallAssessmentBarData,
  barDescriptions as OverallAssessmentBarDescription,
} from "@/ui/analytics/graphs/OverallAssessment/data";
import {
  options as QuestionsAskedOptions,
  data as QuestionsAskedData,
  barDescriptions as QuestionsAskedDescription,
} from "@/ui/analytics/graphs/QuestionsAsked/data";

import {
  options as OverallQuizBarOptions,
  data as OverallQuizBarData,
  barDescriptions as OverallQuizBarDescription,
} from "@/ui/analytics/graphs/OverallQuiz/data";

import { leaderboard } from './data';
import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function Analytics() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the number of pages
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  // Calculate the current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = leaderboard.slice(startIndex, startIndex + itemsPerPage);


  function handleNextPage(): void {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage(): void {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  console.log(showModal)

  function handleShowModal(): void {
    debugger;
    setShowModal(true)
  }

    return (
        <>
        <Modal 
        size="lg" 
        centered 
        scrollable={false}
        show={showModal} 
        onHide={() => setShowModal(false)}
        animation
      >
        <Modal.Body>
          <div className="review-wrapper w-100 p-1 m-1">
            {currentItems.sort((a, b) => (Number(a.points) + Number(b.points))).map((person:any, index:number) => (
              <div className="single-progress-bar m-3"  key={index}>
                <div className="rating-text" style={{ margin:'0 30px 0 0'}}>
                  <p>{index + 1}. <small>{person.name}</small></p>
                </div>
                <div className="progress" >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={person.points}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: `${(person.points / 100) * 100}%` }}
                  />
                </div>
                <span className="value-text">{person.points} points</span>
              </div>
            ))}
            <hr/>
            <div className="d-flex justify-content-between">
              <p className="text-muted">{currentPage}/{totalPages}</p>
              <div className="d-flex gap-2">
                <i 
                  className="bi bi-arrow-left-circle text-dark"
                  style={{ fontSize: '1.5em', cursor: 'pointer' }}
                  onClick={handlePrevPage}
                ></i>
                <i 
                  className="bi bi-arrow-right-circle text-dark"
                  style={{ fontSize: '1.5em', cursor: 'pointer' }}
                  onClick={handleNextPage}
                ></i>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

         <div className="row mb-lg-8pt"></div>
        <div className="row mb-lg-8pt">
        <div className="rbt-review-wrapper rbt-shadow-box review-wrapper mt--30" id="review">
          <div className="course-content">
            <div className="section-title">
              <h4 className="rbt-title-style-3">Leaderboard</h4>
            </div>
            <div className="row g-5 align-items-center">
              <div className="col-lg-3">
                <div className="rating-box">
                  <div className="rating-number">71</div>
                  <div className="rating">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </div>
                  <span className="sub-title">You are currently ranked <b> 8th out of 56 </b> participants</span>
                </div>
              </div>


              <div className="col-lg-9">
                <div className="review-wrapper">
                  {leaderboard.sort((a, b) => (Number(a.points) + Number(b.points))).slice(0,5).map((person, index) => (
                    <div className="single-progress-bar" key={index}>
                    <div className="rating-text">
                      <p><small>{person.name}</small></p>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={person.points}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "87%" }}
                      />
                    </div>
                    <span className="value-text">{person.points} point</span>
                  </div>
                  ))}
                </div>
                <div  className="d-flex justify--content center p-3">
                  <button onClick={handleShowModal} className="bg-dark" style={{height:'40px',margin:'0 auto', width:'100px', fontSize:'12px', border:'none', borderRadius:'8px', backgroundColor:'#ff8f3c' }}>View More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row card-group-row mt-3">
      <div className="col-lg-6 col-md-12 card-group-row__col">
      <div className="rbt-review-wrapper rbt-shadow-box review-wrapper mt--10" id="review">
      <div className="col-lg-12 col-md-12 col-sm-6 col-12">
        <div className="rbt-counterup variation-01 rbt-hover-03 rbt-border-dashed bg-violet-opacity">
          <div className="inner">
            <div className="rbt-round-icon bg-violet-opacity">
              <i className="feather-award" />
            </div>
            <div className="content">
              <h3 className="counter without-icon color-violet">
                <div className="odometer odometer-auto-theme">
                  <div className="odometer-inside">
                    <span className="odometer-digit">
                      <span className="odometer-digit-spacer">1</span>
                      <span className="odometer-digit-inner">
                        <span className="odometer-ribbon">
                          <span className="odometer-ribbon-inner">
                            <span className="odometer-value"></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </h3>
              <span className="rbt-title-style-2 d-block">
                New Notification
              </span>
            </div>
          </div>
        </div>
      </div>
                  </div>
                  </div>
          <div className="col-lg-6 col-md-12 card-group-row__col">
            <ChartWrapper
              title="Quiz Attempts"
              barDescriptions={OverallQuizBarDescription}
              options={OverallQuizBarOptions}
              data={OverallQuizBarData}
              type="line"
            />
          </div>

          <div className="col-lg-6 col-md-12 card-group-row__col">
            <ChartWrapper
              title="Assessment Completed"
              barDescriptions={OverallAssessmentBarDescription}
              options={OverallAssessmentBarOptions}
              data={OverallAssessmentBarData}
              type="bar"
            />
          </div>

          <div className="col-lg-6 col-md-12 card-group-row__col">
            <ChartWrapper
              title="Questions Asked"
              barDescriptions={QuestionsAskedDescription}
              options={QuestionsAskedOptions}
              data={QuestionsAskedData}
              type="bar"
            />
          </div>

          {/* <div className="col-lg-6 col-md-12 card-group-row__col">
            <ChartWrapper
              title="Comments"
              barDescriptions={CommentsChartBarDescription}
              options={CommentsChartBarOptions}
              data={CommentsChartBarData}
              type="bar"
            />
          </div> */}
{/* 
          <div className="col-lg-6 col-md-12 card-group-row__col">
            <ChartLayout
              title="Progress Status"
              barDescriptions={StudentsProgressStatusDescription}
              type="pie"
            >
              <StudentsProgressStatus />
            </ChartLayout>
          </div> */}

        </div>
        </>
    )
}