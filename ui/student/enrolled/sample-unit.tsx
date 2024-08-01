"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Courses from "@/data/dashboard/instructor/instructor.json";
import { useLessonContext } from "@/context/lesson-context/lesson-context";
import styles from "@/ui/student/enrolled/course.module.css";
import courseImage from './courseImage.jpeg'
import "@/styles/css/plugins/mainstyle.css"

interface UnitData {
  id: string;
  title: string;
  moduleCode: string;
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

  useEffect(() => {
    const calculateDiscount = () => {
      const discount =
        course.coursePrice > 0
          ? ((course.coursePrice - course.offerPrice) / course.coursePrice) *
            100
          : 0;
      setDiscountPercentage(discount.toFixed(0));
    };

    const calculateTotalReviews = () => {
      const total =
        course.reviews.oneStar +
        course.reviews.twoStar +
        course.reviews.threeStar +
        course.reviews.fourStar +
        course.reviews.fiveStar;
      setTotalReviews(total);
    };

    const calculateRating = () => {
      setRating(Math.round(course.rating.average));
    };

    calculateDiscount();
    calculateTotalReviews();
    calculateRating();
  }, [course]);

  const handleClick = (id: string) => {
    setId(id);
    console.log(id);
    navigateToLesson();
  };

  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link
            href={`/student/enrolled-courses/${data.id}`}
            onClick={() => handleClick(data.id)}
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
                <div className="rbt-bookmark-btn">
                  <Link className="rbt-round-btn" title="Bookmark" href="#">
                    <i className="feather-bookmark" />
                  </Link>
                </div>
              </div>
              <h4 className="rbt-card-title">
                <Link
                  href={`/student/enrolled-courses/${data.id}`}
                  onClick={() => handleClick(data.id)}
                >
                  {data.title} - {data.moduleCode}
                  
                </Link>
              </h4>
            </>
          )}
          <ul className="rbt-meta">
            <li>
              <i className="feather-book" />
              {course.lectures} Lessons
            </li>
            <li>
              <i className="feather-users" />
              {course.enrolledStudent} Students
            </li>
          </ul>

          {isProgress ? (
            <>
              <div className="rbt-progress-style-1 mb--20 mt--10">
                <div className="single-progress">
                  <h6 className="rbt-title-style-2 mb--10"></h6>
                </div>
              </div>

             
              <h6 className="rbt-title-style-2 mb--10"></h6>
              <div className="rbt-card-bottom">
                <Link href="#" onClick={() => handleClick(data.id)}>
                  <button
                    className={`bi bi-play rbt-btn bg-primary-opacity w-100 text-center ${styles.buttonSmall}`}
                  >
                    Continue Watching
                  </button>
                </Link>
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
