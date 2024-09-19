"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Courses from "@/data/dashboard/instructor/instructor.json";
import { useLessonContext } from "@/context/lesson-context/lesson-context";
import "./courseStyle.scss";
import courseImage from "./courseImage.jpeg";
import "@/styles/css/plugins/mainstyle.css";

interface UnitData {
  id: string;
  title: string;
  moduleCode?: string;
}

interface Props {
  data: UnitData;
  courseStyle: string;
  isProgress: boolean;
  isCompleted: boolean;
  isEdit: boolean;
  showDescription: boolean;
  showAuthor: boolean;
}

const UnitStandardWidget: React.FC<Props> = ({
  data,
  courseStyle,
  isProgress,
  isEdit,
  showAuthor,
}) => {
  const { setId, navigateToLesson } = useLessonContext();
  
  const course = Courses.find((course) => course.id.toString() === data.id) || {
    courseThumbnail: "images/course/course-02.jpg",
    coursePrice: 0,
    offerPrice: 0,
    reviews: { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 },
    rating: { average: 0, total: 0 },
    lectures: "0",
    enrolledStudent: "0",
  };

  const [discountPercentage, setDiscountPercentage] = useState<string>("");
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [randomVideoCount, setRandomVideoCount] = useState<number>(0);



    // Set a random number when the component mounts
    const generateRandomVideoCount = () => {
      return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    };


  // const handleClick = (id: string) => {
  //   setId(id);
  //   console.log(id);
  //   navigateToLesson();
  // };

  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link
            href={{
              pathname: '/take-lesson',
              query: { moduleId: `${data.id}` },
            }}
            // onClick={() => handleClick(data.id)}
          >
            <Image
              width={330}
              height={227}
              src={courseImage.src}
              alt={data.title}
            />
          </Link>
        </div>
        <div className="rbt-card-body">
          {courseStyle === "two" && (
            <>
              <div className="rbt-card-top">
                {/* <p className="w-100"></p> */}
              </div>
              <h4
                className="rbt-card-title"
                style={{ fontSize: "1.2em", margin: "5px 0" }}
              >
                <Link
                  href={{
                    pathname: '/take-lesson',
                    query: { moduleId: `${data.id}` },
                  }}
                  // onClick={() => handleClick(data.id)}
                >
                  {data.title}
                  
                </Link>
              </h4>
            </>
          )}
          <ul className="rbt-meta mt-3">
            <li>
              <i className="feather-book" />
              {data?.moduleCode}
            </li>
            <li>
              <i className="bi bi-play-circle-fill" />
              {generateRandomVideoCount()} Videos
            </li>
          </ul>

          {isProgress ? (
            <>
              <div className="rbt-progress-style-1 mb--20 mt--10">
                <div className="single-progress-bar">
                  <h6 className="rbt-title-style-2 mb--10"></h6>
                </div>
              </div>

              <div className="rbt-card-bottom">
                {/* <Link
                  className="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                  href="#"
                >
                  View More
                </Link> */}
              </div>
              <h6 className="rbt-title-style-2 mb--10"></h6>
              <div className="rbt-card-bottom">
                <button
                  className={`bi bi-play rbt-btn bg-primary-opacity w-100 text-center continue-watching`}
                >
                  <Link href={{
                    pathname: '/take-lesson',
                    query: { moduleId: `${data.id}` },
                  }}>
                    Continue Watching</Link>
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {courseStyle === "one" && (
            <h4 className="rbt-card-title">
              <Link href="#">{data.title}</Link>
            </h4>
          )}

          {courseStyle === "two" && showAuthor && (
            <div className="rbt-author-meta mb--20">
              <div className="rbt-avater">
                <Link href="components/widgets#">
                  <Image
                    width={40}
                    height={40}
                    src="/images/client/avater-01.png"
                    alt="Sophia Jaymes"
                  />
                </Link>
              </div>
              <div className="rbt-author-info">
                By <Link href="#">Patrick</Link> In{" "}
                <Link href="#">Languages</Link>
              </div>
            </div>
          )}

          {/* {courseStyle === "one" && (
            <div className="rbt-review">
              <div className="rating">
                {Array.from({ length: rating }, (_, i) => (
                  <i className="fas fa-star" key={i} />
                ))}
              </div>
              <span className="rating-count"> ({totalReviews} Reviews)</span>
            </div>
          )} */}

          {!isProgress ? (
            <div className="rbt-card-bottom">
              <div className="rbt-price">
                <span className="current-price">${course.offerPrice}</span>
                <span className="off-price">${course.coursePrice}</span>
              </div>

              {isEdit ? (
                <Link className="rbt-btn-link left-icon" href="#">
                  <i className="feather-edit"></i> Edit
                </Link>
              ) : (
                <Link className="rbt-btn-link" href="#">
                  Learn More
                  <i className="feather-arrow-right" />
                </Link>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default UnitStandardWidget;
