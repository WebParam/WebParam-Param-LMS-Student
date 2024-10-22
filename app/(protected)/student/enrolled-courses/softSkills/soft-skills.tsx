"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/ui/loader/loader";
import styles from "@/styles/enrolled-courses/enrolled-courses.module.css";
import { getAlltUnitStandards } from "@/actions/unit-standards/get-unit-standards";
import { UnitStandardData } from "@/interfaces/enrolled-unit-standards/unit-standards/unit-standards";
import UnitStandardWidget from "@/ui/student/enrolled/sample-unit";
import courseImage from "../courseImage.jpeg";
import { playlistTitles } from "./data";
import { useRouter } from "next/navigation";

export default function SoftSkills() {
    
  const [currentPage, setCurrentPage] = useState(0);

  const [isProgress, setIsProgress] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [courseStyle, setCourseStyle] = useState("two");
  const router = useRouter();

  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;

  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [randomVideoCount, setRandomVideoCount] = useState<number>(0);

  // Function to generate a random number between 20 and 30
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (300 - 200 + 1)) + 200;
  };


  useEffect(() => {
    setRandomNumber(generateRandomNumber());

  }, [])


    return (
        <div
              className="tab-pane fade active show"
              id="home-4"
              role="tabpanel"
              aria-labelledby="home-tab-4"
            >
              <div className="row g-5">
                {playlistTitles.map((standard, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                   <div className="rbt-card variation-01 rbt-hover">
                        <div className="rbt-card-img">
                        <Link
                          href={`/onboarding-videos?title=${standard.title}`}
                        >
                            <Image
                            width={330}
                            height={227}
                            src={courseImage.src}
                            alt={standard.title}
                            />
                        </Link>
                        </div>
                        <div className="rbt-card-body">
                        {courseStyle === "two" && (
                            <>
                            <div className="rbt-card-top">
                            </div>
                            <h4
                                className="rbt-card-title"
                                style={{ fontSize: "1.2em", margin: "5px 0" }}
                            >
                                <Link
                                href={`/onboarding-videos?title=${standard.title}`}
                                // onClick={() => handleClick(data.id)}
                                >
                                {standard?.title}
                                </Link>
                            </h4>
                            </>
                        )}
                        <ul className="rbt-meta mt-3">
                            <li>
                            <i className="feather-book" />
                            KM{randomNumber} {/* Display the random number here */}
                            </li>
                            <li>
                            <i className="bi bi-play-circle-fill" />
                            {standard.count} Videos
                            </li>
                        </ul>

                        {isProgress ? (
                            <>
                            <div className="rbt-progress-style-1 mb--20 mt--10">
                                <div className="single-progress">
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
                                onClick={() => router.push(`/onboarding-videos?title=${standard.title}`)}
                                >
                                <Link href={`/onboarding-videos?title=${standard.title}`}>Continue Watching</Link>
                                </button>
                            </div>
                            </>
                        ) : (
                            ""
                        )}

                        {courseStyle === "one" && (
                            <h4 className="rbt-card-title">
                            <Link href="#">{standard.title}</Link>
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

                        {courseStyle === "one" && (
                            <div className="rbt-review">
                            <div className="rating">
                                {Array.from({ length: rating }, (_, i) => (
                                <i className="fas fa-star" key={i} />
                                ))}
                            </div>
                            <span className="rating-count"> ({totalReviews} Reviews)</span>
                            </div>
                        )}

                        {!isProgress ? (
                            <div className="rbt-card-bottom">
                            <div className="rbt-price">
                                {/* <span className="current-price">${standard?.offerPrice}</span> */}
                                {/* <span className="off-price">${standard?.coursePrice}</span> */}
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
                  </div>
                ))}
              </div>
            </div>
    )
}