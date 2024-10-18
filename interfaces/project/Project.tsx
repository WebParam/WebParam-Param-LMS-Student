"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Courses from "@/data/dashboard/instructor/instructor.json";
import { useLessonContext } from "@/context/lesson-context/lesson-context";
import "@/ui/student/enrolled/course.module.css";
import courseImage from "@/ui/student/enrolled/courseImage.jpeg";
import "@/styles/css/plugins/mainstyle.css";
import { IProject } from "@/interfaces/project/project";

interface UnitData {
  id: string;
  title: string;
  moduleCode?: string;
}

interface Props {
  data: IProject;
  courseStyle: string;
  isProgress: boolean;
  isCompleted: boolean;
  isEdit: boolean;
  showDescription: boolean;
  showAuthor: boolean;
}

const ProjectWidget: React.FC<Props> = ({
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

  // Function to generate a random number between 20 and 30
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (300 - 200 + 1)) + 200;
  };

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

    // Set a random number when the component mounts

    calculateDiscount();
    calculateTotalReviews();
    calculateRating();
  }, [course]);

  const handleClick = (id: string) => {
    setId(id);
    console.log(id);
    navigateToLesson();
  };

  const generateRandomVideoCount = () => {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  };

  useEffect(() => {
    setRandomNumber(generateRandomNumber());
    setRandomVideoCount(generateRandomVideoCount());
  }, []);

  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <Link
            href={`/take-lesson`}
            // onClick={() => handleClick(data.id)}
          >
            <Image
              width={330}
              height={227}
              src={courseImage.src}
              alt="Project 1"
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
                  href={`/take-lesson`}
                  // onClick={() => handleClick(data.id)}
                >
                  Project 1
                </Link>
              </h4>
            </>
          )}
          <ul className="rbt-meta mt-3">
            <li>
              <i className="feather-book" />
              Status : Rejected
            </li>
            <li>
              <i className="bi bi-play-circle-fill" />
              Reason : Not Eligible
            </li>
          </ul>
        </div>


        <div className="rbt-card-bottom"></div>
        <h6 className="rbt-title-style-2 mb--10"></h6>
        <div className="rbt-card-bottom">
          <button
            className={`rbt-btn bg-primary-opacity w-100 text-center `}
          >
            <Link href="/student/student-profile">My Profile</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectWidget;
