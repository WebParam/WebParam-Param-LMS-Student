import { getAlltUnitStandards } from "@/actions/unit-standards/get-unit-standards";
import { UnitStandardData } from "@/interfaces/enrolled-unit-standards/unit-standards/unit-standards";
import Link from "next/link";

export async function generateStaticParams() {
  const courseIds = await getAlltUnitStandards("6669f0ff8759b480859c10a7"); // Fetch all course IDs
  return courseIds.map((course) => ({ id: course.id.toString() }));
}

export default async function CourseDetails({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params.id;
  let unitStandards: UnitStandardData[] = [];
  let unitStandard: UnitStandardData | null = null;
  let error: string | null = null;

  try {
    unitStandards = await getAlltUnitStandards(courseId);
    unitStandard = unitStandards.length > 0 ? unitStandards[0] : null;
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div>
      <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="content text-start">
                <ul className="page-list">
                  <li className="rbt-breadcrumb-item">
                    <Link href="/student/enrolled-courses">Courses</Link>
                  </li>
                  <li>
                    <div className="icon-right">
                      <i className="feather-chevron-right" />
                    </div>
                  </li>
                  <li className="rbt-breadcrumb-item active">Course</li>
                </ul>
                <h2 className="title">Difficult Things About Education.</h2>
                <p className="description">
                  Master Python by building 100 projects in 100 days. Learn data
                  science, automation, build websites, games and apps!
                </p>
                <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
                  <div className="feature-sin best-seller-badge">
                    <span className="rbt-badge-2">
                      <span className="image">
                        <img
                          alt="Best Seller Icon"
                          loading="lazy"
                          width={30}
                          height={30}
                          decoding="async"
                          data-nimg={1}
                          srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ficons%2Fcard-icon-1.png&w=32&q=75"
                          src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ficons%2Fcard-icon-1.png&w=32&q=75"
                          style={{ color: "transparent" }}
                        />
                      </span>
                      Bestseller
                    </span>
                  </div>
                  <div className="feature-sin rating">
                    <a href="/course-details/2#">4.8</a>
                    <a href="/course-details/2#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="/course-details/2#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="/course-details/2#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="/course-details/2#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="/course-details/2#">
                      <i className="fa fa-star" />
                    </a>
                  </div>
                  <div className="feature-sin total-rating">
                    <a className="rbt-badge-4" href="/course-details/2#">
                      215,475 rating
                    </a>
                  </div>
                  <div className="feature-sin total-student">
                    <span> 616,029 students</span>
                  </div>
                </div>
                <div className="rbt-author-meta mb--20">
                  <div className="rbt-avater">
                    <a href="/profile/2">
                      <img
                        alt="Fred Guer"
                        loading="lazy"
                        width={40}
                        height={40}
                        decoding="async"
                        data-nimg={1}
                        srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=256&q=75 2x"
                        src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=256&q=75"
                        style={{ color: "transparent" }}
                      />
                    </a>
                  </div>
                  <div className="rbt-author-info">
                    By <a href="/profile/2">Fred Guer</a> In{" "}
                    <a href="/course-details/2#">Math Teacher</a>
                  </div>
                </div>
                <ul className="rbt-meta">
                  <li>
                    <i className="feather-calendar" />
                    Last updated 12/2024
                  </li>
                  <li>
                    <i className="feather-globe" />
                    English
                  </li>
                  <li>
                    <i className="feather-award" /> Certified Course
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rbt-course-details-area ptb--60">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-8"
              style={{ width: "100%", padding: "0 10px" }}
            >
              <div className="course-details-content">
                <div className="rbt-course-feature-box rbt-shadow-box thuumbnail">
                  <img
                    alt="Card image"
                    width={800}
                    height={550}
                    decoding="async"
                    data-nimg={1}
                    className="w-100"
                    srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-01.jpg&w=828&q=75 2x"
                    src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-01.jpg&w=828&q=75"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="rbt-inner-onepage-navigation sticky-top mt--30">
                  <nav
                    className="mainmenu-nav onepagenav"
                    style={{ borderRadius: "8px" }}
                  >
                    <ul
                      className="mainmenu"
                      style={{ padding: "10px", borderRadius: "8px" }}
                    >
                      <li className="">
                        <a style={{ cursor: "pointer" }}>Overview</a>
                      </li>
                      <li className="">
                        <a style={{ cursor: "pointer" }}>Course Content</a>
                      </li>
                      <li className="">
                        <a style={{ cursor: "pointer" }}>Details</a>
                      </li>
                      <li className="">
                        <a style={{ cursor: "pointer" }}>Intructor</a>
                      </li>
                      <li className="current">
                        <a style={{ cursor: "pointer" }}>Review</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div
                  className="rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30 has-show-more "
                  id="overview"
                >
                  <div className="rbt-course-feature-inner has-show-more-inner-content">
                    <div className="section-title">
                      <h4 className="rbt-title-style-3">
                        What you&apos;ll learn
                      </h4>
                    </div>
                    <p>
                      Are you new to PHP or need a refresher? Then this course
                      will help you get all the fundamentals of Procedural PHP,
                      Object Oriented PHP, MYSQLi and ending the course by
                      building a CMS system similar to WordPress, Joomla or
                      Drupal. Knowing PHP has allowed me to make enough money to
                      stay home and make courses like this one for students all
                      over the world.
                    </p>
                    <div className="row g-5 mb--30">
                      <div className="col-lg-6">
                        <ul className="rbt-list-style-1">
                          <li>
                            <i className="feather-check" />
                            Become an advanced, confident, and modern JavaScript
                            developer from scratch.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Have an intermediate skill level of Python
                            programming.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Have a portfolio of various data analysis projects.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Use the numpy library to create and manipulate
                            arrays.
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul className="rbt-list-style-1">
                          <li>
                            <i className="feather-check" />
                            Use the Jupyter Notebook Environment. JavaScript
                            developer from scratch.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Use the pandas module with Python to create and
                            structure data.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Have a portfolio of various data analysis projects.
                          </li>
                          <li>
                            <i className="feather-check" />
                            Create data visualizations using matplotlib and the
                            seaborn.
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis, aliquam voluptas laudantium incidunt architecto nam
                      excepturi provident rem laborum repellendus placeat neque
                      aut doloremque ut ullam, veritatis nesciunt iusto officia
                      alias, non est vitae. Eius repudiandae optio quam alias
                      aperiam nemo nam tempora, dignissimos dicta excepturi ea
                      quo ipsum omnis maiores perferendis commodi voluptatum
                      facere vel vero. Praesentium quisquam iure veritatis,
                      perferendis adipisci sequi blanditiis quidem porro
                      eligendi fugiat facilis inventore amet delectus expedita
                      deserunt ut molestiae modi laudantium, quia tenetur animi
                      natus ea. Molestiae molestias ducimus pariatur et
                      consectetur. Error vero, eum soluta delectus
                      necessitatibus eligendi numquam hic at?
                    </p>
                  </div>
                  <div className="rbt-show-more-btn ">Show More</div>
                </div>
                <div
                  className="course-content rbt-shadow-box coursecontent-wrapper mt--30"
                  id="coursecontent"
                >
                  <div className="rbt-course-feature-inner">
                    <div className="section-title">
                      <h4 className="rbt-title-style-3">Course Content</h4>
                    </div>
                    <div className="rbt-accordion-style rbt-accordion-02 accordion">
                      <div className="accordion" id="accordionExampleb2">
                        <div className="accordion-item card">
                          <h2
                            className="accordion-header card-header"
                            id="headingTwo0"
                          >
                            <button
                              className="accordion-button "
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo1"
                              aria-expanded="true"
                              aria-controls="collapseTwo1"
                            >
                              Intro to Course and Histudy
                              <span className="rbt-badge-5 ml--10">
                                1hr 30min
                              </span>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo1"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo0"
                            data-bs-parent="#accordionExampleb2"
                          >
                            <div className="accordion-body card-body pr--0">
                              <ul className="rbt-course-main-content liststyle">
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">Course Intro</span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="min-lable">30min</span>
                                      <span className="rbt-badge variation-03 bg-primary-opacity">
                                        <i className="feather-eye" /> Preview
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Watch Before Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="min-lable">0.5min</span>
                                      <span className="rbt-badge variation-03 bg-primary-opacity">
                                        <i className="feather-eye" /> Preview
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item card">
                          <h2
                            className="accordion-header card-header"
                            id="headingTwo1"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo2"
                              aria-expanded="false"
                              aria-controls="collapseTwo2"
                            >
                              Course Fundamentals
                              <span className="rbt-badge-5 ml--10">
                                2hr 30min
                              </span>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo2"
                            className="accordion-collapse collapse "
                            aria-labelledby="headingTwo1"
                            data-bs-parent="#accordionExampleb2"
                          >
                            <div className="accordion-body card-body pr--0">
                              <ul className="rbt-course-main-content liststyle">
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">Course Intro</span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Why You Should Not Go To Education
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Ten Factors That Affect Education&apos;s
                                        Longevity.
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item card">
                          <h2
                            className="accordion-header card-header"
                            id="headingTwo2"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo3"
                              aria-expanded="false"
                              aria-controls="collapseTwo3"
                            >
                              You can develop skill and setup
                              <span className="rbt-badge-5 ml--10">
                                1hr 50min
                              </span>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo3"
                            className="accordion-collapse collapse "
                            aria-labelledby="headingTwo2"
                            data-bs-parent="#accordionExampleb2"
                          >
                            <div className="accordion-body card-body pr--0">
                              <ul className="rbt-course-main-content liststyle">
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">Course Intro</span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Why You Should Not Go To Education
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Ten Factors That Affect Education&apos;s
                                        Longevity.
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item card">
                          <h2
                            className="accordion-header card-header"
                            id="headingTwo3"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo4"
                              aria-expanded="false"
                              aria-controls="collapseTwo4"
                            >
                              15 Things To Know About Education?
                              <span className="rbt-badge-5 ml--10">
                                2hr 60min
                              </span>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo4"
                            className="accordion-collapse collapse "
                            aria-labelledby="headingTwo3"
                            data-bs-parent="#accordionExampleb2"
                          >
                            <div className="accordion-body card-body pr--0">
                              <ul className="rbt-course-main-content liststyle">
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">Course Intro</span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Why You Should Not Go To Education
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Ten Factors That Affect Education&apos;s
                                        Longevity.
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item card">
                          <h2
                            className="accordion-header card-header"
                            id="headingTwo4"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo5"
                              aria-expanded="false"
                              aria-controls="collapseTwo5"
                            >
                              Course Description
                              <span className="rbt-badge-5 ml--10">
                                2hr 20min
                              </span>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo5"
                            className="accordion-collapse collapse "
                            aria-labelledby="headingTwo4"
                            data-bs-parent="#accordionExampleb2"
                          >
                            <div className="accordion-body card-body pr--0">
                              <ul className="rbt-course-main-content liststyle">
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">Course Intro</span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Why You Should Not Go To Education
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-play-circle" />
                                      <span className="text">
                                        Ten Factors That Affect Education&apos;s
                                        Longevity.
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="/lesson">
                                    <div className="course-content-left">
                                      <i className="feather-file-text" />
                                      <span className="text">
                                        Read Before You Start
                                      </span>
                                    </div>
                                    <div className="course-content-right">
                                      <span className="course-lock">
                                        <i className="feather-lock" />
                                      </span>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="rbt-course-feature-box rbt-shadow-box details-wrapper mt--30"
                  id="details"
                >
                  <div className="row g-5">
                    <div className="col-lg-6">
                      <div className="section-title">
                        <h4 className="rbt-title-style-3 mb--20">
                          Requirements
                        </h4>
                      </div>
                      <ul className="rbt-list-style-1">
                        <li>
                          <i className="feather-check" />
                          Become an advanced, confident, and modern JavaScript
                          developer from scratch.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Have an intermediate skill level of Python
                          programming.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Have a portfolio of various data analysis projects.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Use the numpy library to create and manipulate arrays.
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <div className="section-title">
                        <h4 className="rbt-title-style-3 mb--20">
                          Description
                        </h4>
                      </div>
                      <ul className="rbt-list-style-1">
                        <li>
                          <i className="feather-check" />
                          Use the Jupyter Notebook Environment. JavaScript
                          developer from scratch.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Use the pandas module with Python to create and
                          structure data.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Have a portfolio of various data analysis projects.
                        </li>
                        <li>
                          <i className="feather-check" />
                          Create data visualizations using matplotlib and the
                          seaborn.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="rbt-instructor rbt-shadow-box intructor-wrapper mt--30"
                  id="intructor"
                >
                  <div className="about-author border-0 pb--0 pt--0">
                    <div className="section-title mb--30">
                      <h4 className="rbt-title-style-3">Instructor</h4>
                    </div>
                    <div className="media align-items-center">
                      <div className="thumbnail">
                        <a href="/profile/2">
                          <img
                            alt="Author Images"
                            loading="lazy"
                            width={250}
                            height={250}
                            decoding="async"
                            data-nimg={1}
                            srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=256&q=75 2x"
                            src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=256&q=75"
                            style={{ color: "transparent" }}
                          />
                        </a>
                      </div>
                      <div className="media-body">
                        <div className="author-info">
                          <h5 className="title">
                            <a
                              className="hover-flip-item-wrapper"
                              href="/profile/2"
                            >
                              Fred Guer
                            </a>
                          </h5>
                          <span className="b3 subtitle">Math Teacher</span>
                          <ul className="rbt-meta mb--20 mt--10">
                            <li>
                              <i className="fa fa-star color-warning" />
                              215,475 Reviews
                              <span className="rbt-badge-5 ml--5">
                                4.8 Rating
                              </span>
                            </li>
                            <li>
                              <i className="feather-users" /> 616,029 Students
                            </li>
                            <li>
                              <a href="/course-details/2#">
                                <i className="feather-video" /> 15 Courses
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="content">
                          <p className="description">
                            Fred Guer is a brilliant educator, whose life was
                            spent for computer science and love of nature.
                          </p>
                          <ul className="social-icon social-default icon-naked justify-content-start">
                            <li>
                              <a href="https://www.facebook.com">
                                <i className="feather-facebook" />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com">
                                <i className="feather-twitter" />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.instagram.com">
                                <i className="feather-instagram" />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.linkdin.com">
                                <i className="feather-linkedin" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="rbt-review-wrapper rbt-shadow-box review-wrapper mt--30"
                  id="review"
                >
                  <div className="course-content">
                    <div className="section-title">
                      <h4 className="rbt-title-style-3">Review</h4>
                    </div>
                    <div className="row g-5 align-items-center">
                      <div className="col-lg-3">
                        <div className="rating-box">
                          <div className="rating-number">5.0</div>
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
                          <span className="sub-title">Course Rating</span>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="review-wrapper">
                          <div className="single-progress-bar">
                            <div className="rating-text">
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
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={63}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "63%" }}
                              />
                            </div>
                            <span className="value-text">63%</span>
                          </div>
                          <div className="single-progress-bar">
                            <div className="rating-text">
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={29}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "29%" }}
                              />
                            </div>
                            <span className="value-text">29%</span>
                          </div>
                          <div className="single-progress-bar">
                            <div className="rating-text">
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
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={6}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "6%" }}
                              />
                            </div>
                            <span className="value-text">6%</span>
                          </div>
                          <div className="single-progress-bar">
                            <div className="rating-text">
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
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={1}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "1%" }}
                              />
                            </div>
                            <span className="value-text">1%</span>
                          </div>
                          <div className="single-progress-bar">
                            <div className="rating-text">
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
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={1}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "1%" }}
                              />
                            </div>
                            <span className="value-text">1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="about-author-list rbt-shadow-box featured-wrapper mt--30 has-show-more ">
                  <div className="section-title">
                    <h4 className="rbt-title-style-3">Featured review</h4>
                  </div>{" "}
                  <div className="has-show-more-inner-content rbt-featured-review-list-wrapper">
                    <div className="rbt-course-review about-author">
                      <div className="media">
                        <div className="thumbnail">
                          <a href="/course-details/2#">
                            <img
                              alt="Author Images"
                              loading="lazy"
                              width={105}
                              height={105}
                              decoding="async"
                              data-nimg={1}
                              srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-3.jpg&w=128&q=75 2x"
                              src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-3.jpg&w=128&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <a
                                className="hover-flip-item-wrapper"
                                href="/course-details/2#"
                              >
                                Farjana Bawnia
                              </a>
                            </h5>
                            <div className="rating">
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                            </div>
                          </div>
                          <div className="content">
                            <p className="description">
                              At 29 years old, my favorite compliment is being
                              told that I look like my mom. Seeing myself in her
                              image, like this daughter up top.
                            </p>
                            <ul className="social-icon social-default transparent-with-border justify-content-start">
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-up" />
                                </a>
                              </li>
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-down" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-course-review about-author">
                      <div className="media">
                        <div className="thumbnail">
                          <a href="/course-details/2#">
                            <img
                              alt="Author Images"
                              loading="lazy"
                              width={105}
                              height={105}
                              decoding="async"
                              data-nimg={1}
                              srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-4.jpg&w=128&q=75 2x"
                              src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-4.jpg&w=128&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <a
                                className="hover-flip-item-wrapper"
                                href="/course-details/2#"
                              >
                                Razwan Islam
                              </a>
                            </h5>
                            <div className="rating">
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                            </div>
                          </div>
                          <div className="content">
                            <p className="description">
                              At 25 years old, my favorite compliment is being
                              told that I look like my mom. Seeing myself in her
                              image, like this daughter up top.
                            </p>
                            <ul className="social-icon social-default transparent-with-border justify-content-start">
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-up" />
                                </a>
                              </li>
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-down" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-course-review about-author">
                      <div className="media">
                        <div className="thumbnail">
                          <a href="/course-details/2#">
                            <img
                              alt="Author Images"
                              loading="lazy"
                              width={105}
                              height={105}
                              decoding="async"
                              data-nimg={1}
                              srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-1.jpg&w=128&q=75 2x"
                              src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-1.jpg&w=128&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <a
                                className="hover-flip-item-wrapper"
                                href="/course-details/2#"
                              >
                                Babor Azom
                              </a>
                            </h5>
                            <div className="rating">
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                            </div>
                          </div>
                          <div className="content">
                            <p className="description">
                              My favorite compliment is being told that I look
                              like my mom. Seeing myself in her image, like this
                              daughter up top.
                            </p>
                            <ul className="social-icon social-default transparent-with-border justify-content-start">
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-up" />
                                </a>
                              </li>
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-down" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-course-review about-author">
                      <div className="media">
                        <div className="thumbnail">
                          <a href="/course-details/2#">
                            <img
                              alt="Author Images"
                              loading="lazy"
                              width={105}
                              height={105}
                              decoding="async"
                              data-nimg={1}
                              srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75 2x"
                              src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <a
                                className="hover-flip-item-wrapper"
                                href="/course-details/2#"
                              >
                                Mohammad Ali
                              </a>
                            </h5>
                            <div className="rating">
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                            </div>
                          </div>
                          <div className="content">
                            <p className="description">
                              My favorite compliment is being told that I look
                              like my mom. Seeing myself in her image, like this
                              daughter up top.
                            </p>
                            <ul className="social-icon social-default transparent-with-border justify-content-start">
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-up" />
                                </a>
                              </li>
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-down" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rbt-course-review about-author">
                      <div className="media">
                        <div className="thumbnail">
                          <a href="/course-details/2#">
                            <img
                              alt="Author Images"
                              loading="lazy"
                              width={105}
                              height={105}
                              decoding="async"
                              data-nimg={1}
                              srcSet="/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-2.jpg&w=128&q=75 1x, /_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-2.jpg&w=256&q=75 2x"
                              src="/_next/image?url=%2Fimages%2Ftestimonial%2Ftestimonial-2.jpg&w=256&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <a
                                className="hover-flip-item-wrapper"
                                href="/course-details/2#"
                              >
                                Sakib Al Hasan
                              </a>
                            </h5>
                            <div className="rating">
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                              <a href="/course-details/2#">
                                <i className="fa fa-star" />
                              </a>
                            </div>
                          </div>
                          <div className="content">
                            <p className="description">
                              At 28 years old, my favorite compliment is being
                              told that I look like my mom. Seeing myself in her
                              image, like this daughter up top.
                            </p>
                            <ul className="social-icon social-default transparent-with-border justify-content-start">
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-up" />
                                </a>
                              </li>
                              <li>
                                <a href="/course-details/2#">
                                  <i className="feather-thumbs-down" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rbt-show-more-btn ">Show More</div>
                </div>
              </div>
              <div className="related-course mt--60">
                <div className="row g-5 align-items-end mb--40">
                  <div className="col-lg-8 col-md-8 col-12">
                    <div className="section-title">
                      <span className="subtitle bg-pink-opacity">
                        Top Course
                      </span>
                      <h4 className="title">
                        More Course By
                        <strong className="color-primary ms-3">
                          Fred Guer
                        </strong>
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="read-more-btn text-start text-md-end">
                      <a
                        className="rbt-btn rbt-switch-btn btn-border btn-sm"
                        href="#"
                      >
                        <span data-text="View All Course">View All Course</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row g-5">
                  <div
                    className="col-lg-6 col-md-6 col-sm-6 col-12 sal-animate"
                    data-sal-delay={150}
                    data-sal="slide-up"
                    data-sal-duration={800}
                  >
                    <div className="rbt-card variation-01 rbt-hover">
                      <div className="rbt-card-img">
                        <a href="/course-details/2">
                          <img
                            alt="Card image"
                            loading="lazy"
                            width={355}
                            height={244}
                            decoding="async"
                            data-nimg={1}
                            srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75 2x"
                            src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75"
                            style={{ color: "transparent" }}
                          />
                          <div className="rbt-badge-3 bg-white">
                            <span>-40%</span>
                            <span>Off</span>
                          </div>
                        </a>
                      </div>
                      <div className="rbt-card-body">
                        <div className="rbt-card-top">
                          <div className="rbt-review">
                            {/* <div className="rating">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rating-count">(15 Reviews)</span>
                          </div> */}
                            <div className="rbt-bookmark-btn">
                              <a
                                className="rbt-round-btn"
                                title="Bookmark"
                                href="/course-details/2#"
                              >
                                <i className="feather-bookmark" />
                              </a>
                            </div>
                          </div>
                          <h4 className="rbt-card-title">
                            <a href="/course-details/2">React Front To Back</a>
                          </h4>
                          <ul className="rbt-meta">
                            <li>
                              <i className="feather-book" />
                              12 Lessons
                            </li>
                            <li>
                              <i className="feather-users" />
                              50 Students
                            </li>
                          </ul>
                          <p className="rbt-card-text">
                            It is a long established fact that a reader will be
                            distracted.
                          </p>
                          <div className="rbt-author-meta mb--10">
                            <div className="rbt-avater">
                              <a href="/profile/2">
                                <img
                                  alt="Sophia Jaymes"
                                  loading="lazy"
                                  width={33}
                                  height={33}
                                  decoding="async"
                                  data-nimg={1}
                                  srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75 2x"
                                  src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75"
                                  style={{ color: "transparent" }}
                                />
                              </a>
                            </div>
                            <div className="rbt-author-info">
                              By <a href="/profile/2">Fred Guer</a> In{" "}
                              <a href="/course-details/2#">Math Teacher</a>
                            </div>
                          </div>
                          <div className="rbt-card-bottom">
                            <div className="rbt-price">
                              <span className="current-price">$60</span>
                              <span className="off-price">$20</span>
                            </div>
                            <a
                              className="rbt-btn-link"
                              href="/course-details/2"
                            >
                              Learn More
                              <i className="feather-arrow-right" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-12 sal-animate"
                      data-sal-delay={150}
                      data-sal="slide-up"
                      data-sal-duration={800}
                    >
                      <div className="rbt-card variation-01 rbt-hover">
                        <div className="rbt-card-img">
                          <a href="/course-details/3">
                            <img
                              alt="Card image"
                              loading="lazy"
                              width={355}
                              height={244}
                              decoding="async"
                              data-nimg={1}
                              srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75 2x"
                              src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75"
                              style={{ color: "transparent" }}
                            />
                          </a>
                        </div>
                        <div className="rbt-card-body">
                          <div className="rbt-card-top">
                            {/* <div className="rbt-review">
                            <div className="rating">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                            <span className="rating-count">(15 Reviews)</span>
                          </div> */}
                            <div className="rbt-bookmark-btn">
                              <a
                                className="rbt-round-btn"
                                title="Bookmark"
                                href="/course-details/2#"
                              >
                                <i className="feather-bookmark" />
                              </a>
                            </div>
                          </div>
                          <h4 className="rbt-card-title">
                            <a href="/course-details/3">
                              PHP Beginner Advanced
                            </a>
                          </h4>
                          <ul className="rbt-meta">
                            <li>
                              <i className="feather-book" />
                              12 Lessons
                            </li>
                            <li>
                              <i className="feather-users" />
                              50 Students
                            </li>
                          </ul>
                          <p className="rbt-card-text">
                            It is a long established fact that a reader will be
                            distracted.
                          </p>
                          <div className="rbt-author-meta mb--10">
                            <div className="rbt-avater">
                              <a href="/profile/3">
                                <img
                                  alt="Sophia Jaymes"
                                  loading="lazy"
                                  width={33}
                                  height={33}
                                  decoding="async"
                                  data-nimg={1}
                                  srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=48&q=75 2x"
                                  src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=48&q=75"
                                  style={{ color: "transparent" }}
                                />
                              </a>
                            </div>
                            <div className="rbt-author-info">
                              By <a href="/profile/3">Fred Guer</a> In{" "}
                              <a href="/course-details/2#">Math Teacher</a>
                            </div>
                          </div>
                          <div className="rbt-card-bottom">
                            <div className="rbt-price">
                              <span className="current-price">$60</span>
                              <span className="off-price">$20</span>
                            </div>
                            <a
                              className="rbt-btn-link left-icon"
                              href="/course-details/3"
                            >
                              <i className="feather-shopping-cart" /> Add To
                              Cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rbt-course-action-bottom rbt-course-action-active"></div>
        <div className="rbt-related-course-area bg-color-white pt--60 rbt-section-gapBottom">
          <div className="container">
            <div className="section-title mb--30">
              <span className="subtitle bg-primary-opacity">
                More Similar Courses
              </span>
              <h4 className="title">Related Courses</h4>
            </div>
            <div className="row g-5">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="rbt-card variation-01 rbt-hover">
                  <div className="rbt-card-img">
                    <a href="/course-details">
                      <img
                        alt="Card image"
                        loading="lazy"
                        width={355}
                        height={244}
                        decoding="async"
                        data-nimg={1}
                        srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75 2x"
                        src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-01.jpg&w=384&q=75"
                        style={{ color: "transparent" }}
                      />
                      <div className="rbt-badge-3 bg-white">
                        <span>-40%</span>
                        <span>Off</span>
                      </div>
                    </a>
                  </div>
                  <div className="rbt-card-body">
                    <div className="rbt-card-top">
                      {/* <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (15 Reviews)</span>
                    </div> */}
                      <div className="rbt-bookmark-btn">
                        <a
                          className="rbt-round-btn"
                          title="Bookmark"
                          href="/course-details/2#"
                        >
                          <i className="feather-bookmark" />
                        </a>
                      </div>
                    </div>
                    <h4 className="rbt-card-title">
                      <a href="/course-details">React Front To Back</a>
                    </h4>
                    <ul className="rbt-meta">
                      <li>
                        <i className="feather-book" />
                        12 Lessons
                      </li>
                      <li>
                        <i className="feather-users" />
                        50 Students
                      </li>
                    </ul>
                    <p className="rbt-card-text">
                      It is a long established fact that a reader will be
                      distracted.
                    </p>
                    <div className="rbt-author-meta mb--20">
                      <div className="rbt-avater">
                        <a href="/profile/2">
                          <img
                            alt="Sophia Jaymes"
                            loading="lazy"
                            width={33}
                            height={33}
                            decoding="async"
                            data-nimg={1}
                            srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=48&q=75 2x"
                            src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-02.png&w=48&q=75"
                            style={{ color: "transparent" }}
                          />
                        </a>
                      </div>
                      <div className="rbt-author-info">
                        By <a href="/profile/2">Robert</a> In
                        <a href="/course-details/2#">Development</a>
                      </div>
                    </div>
                    <div className="rbt-card-bottom">
                      <div className="rbt-price">
                        <span className="current-price">$60</span>
                        <span className="off-price">$20</span>
                      </div>
                      <a className="rbt-btn-link" href="/course-details">
                        Learn More
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="rbt-card variation-01 rbt-hover">
                  <div className="rbt-card-img">
                    <a href="/course-details">
                      <img
                        alt="Card image"
                        loading="lazy"
                        width={355}
                        height={244}
                        decoding="async"
                        data-nimg={1}
                        srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75 2x"
                        src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-02.jpg&w=750&q=75"
                        style={{ color: "transparent" }}
                      />
                    </a>
                  </div>
                  <div className="rbt-card-body">
                    <div className="rbt-card-top">
                      {/* <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (15 Reviews)</span>
                    </div> */}
                      <div className="rbt-bookmark-btn">
                        <a
                          className="rbt-round-btn"
                          title="Bookmark"
                          href="/course-details/2#"
                        >
                          <i className="feather-bookmark" />
                        </a>
                      </div>
                    </div>
                    <h4 className="rbt-card-title">
                      <a href="/course-details">PHP Beginner Advanced</a>
                    </h4>
                    <ul className="rbt-meta">
                      <li>
                        <i className="feather-book" />
                        12 Lessons
                      </li>
                      <li>
                        <i className="feather-users" />
                        50 Students
                      </li>
                    </ul>
                    <p className="rbt-card-text">
                      It is a long established fact that a reader will be
                      distracted.
                    </p>
                    <div className="rbt-author-meta mb--20">
                      <div className="rbt-avater">
                        <a href="/profile/3">
                          <img
                            alt="Sophia Jaymes"
                            loading="lazy"
                            width={33}
                            height={33}
                            decoding="async"
                            data-nimg={1}
                            srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-04.png&w=48&q=75 2x"
                            src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-04.png&w=48&q=75"
                            style={{ color: "transparent" }}
                          />
                        </a>
                      </div>
                      <div className="rbt-author-info">
                        By <a href="/profile/3">Angela</a> In
                        <a href="/course-details/2#">Development</a>
                      </div>
                    </div>
                    <div className="rbt-card-bottom">
                      <div className="rbt-price">
                        <span className="current-price">$60</span>
                        <span className="off-price">$20</span>
                      </div>
                      <a className="rbt-btn-link" href="/course-details">
                        Learn More
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="rbt-card variation-01 rbt-hover">
                  <div className="rbt-card-img">
                    <a href="/course-details">
                      <img
                        alt="Card image"
                        loading="lazy"
                        width={355}
                        height={244}
                        decoding="async"
                        data-nimg={1}
                        srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-03.jpg&w=384&q=75 2x"
                        src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcourse%2Fcourse-online-03.jpg&w=384&q=75"
                        style={{ color: "transparent" }}
                      />
                      <div className="rbt-badge-3 bg-white">
                        <span>-10%</span>
                        <span>Off</span>
                      </div>
                    </a>
                  </div>
                  <div className="rbt-card-body">
                    <div className="rbt-card-top">
                      <div className="rbt-review">
                        <div className="rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                        <span className="rating-count"> (5 Reviews)</span>
                      </div>
                      <div className="rbt-bookmark-btn">
                        <a
                          className="rbt-round-btn"
                          title="Bookmark"
                          href="/course-details/2#"
                        >
                          <i className="feather-bookmark" />
                        </a>
                      </div>
                    </div>
                    <h4 className="rbt-card-title">
                      <a href="/course-details">Angular Zero to Mastery</a>
                    </h4>
                    <ul className="rbt-meta">
                      <li>
                        <i className="feather-book" />8 Lessons
                      </li>
                      <li>
                        <i className="feather-users" />
                        30 Students
                      </li>
                    </ul>
                    <p className="rbt-card-text">
                      Angular Js long fact that a reader will be distracted by
                      the readable.
                    </p>
                    <div className="rbt-author-meta mb--20">
                      <div className="rbt-avater">
                        <a href="/profile/4">
                          <img
                            alt="Sophia Jaymes"
                            loading="lazy"
                            width={33}
                            height={33}
                            decoding="async"
                            data-nimg={1}
                            srcSet="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-03.png&w=48&q=75 2x"
                            src="https://histudy-nextjs.vercel.app/_next/image?url=%2Fimages%2Fclient%2Favatar-03.png&w=48&q=75"
                            style={{ color: "transparent" }}
                          />
                        </a>
                      </div>
                      <div className="rbt-author-info">
                        By <a href="/profile/4">Slaughter</a> In
                        <a href="/course-details/2#">Languages</a>
                      </div>
                    </div>
                    <div className="rbt-card-bottom">
                      <div className="rbt-price">
                        <span className="current-price">$80</span>
                        <span className="off-price">$100</span>
                      </div>
                      <a className="rbt-btn-link" href="/course-details">
                        Learn More
                        <i className="feather-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rbt-progress-parent rbt-backto-top-active">
          <svg
            className="rbt-back-circle svg-inner"
            width="100%"
            height="100%"
            viewBox="-1 -1 102 102"
          >
            <path
              d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              style={{
                transition: "stroke-dashoffset 10ms linear 0s",
                strokeDasharray: "307.919, 307.919",
                strokeDashoffset: "0.010184",
              }}
            />
          </svg>
        </div>
        <div className="rbt-separator-mid">
          <div className="container">
            <hr className="rbt-separator m-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
