"use client";

import Image from "next/image";
import "./userProfile.scss";

const InstructorDashboardHeader = () => {
  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="height-350 rbt-shadow-box" 
        style={{
          backgroundImage:'url(https://htmlstream.com/preview/front-v4.3.1/assets/svg/illustrations/oc-relaxing.svg)',
          backgroundRepeat:'no-repeat',
          backgroundPosition:'top',
          backgroundSize:'cover'
        }} />
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              <Image
                width={300}
                height={300}
                src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                alt="Instructor"
              />
            </div>
            <div className="tutor-content">
              <h5 className="title">John Due</h5>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDashboardHeader;
