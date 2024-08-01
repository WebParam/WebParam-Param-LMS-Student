import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NotificationsSkeleton = () => {
  const skeletonCount = 5; // Number of skeleton rows to display

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="tab-content">
          <div
            className="tab-pane fade active show"
            id="received"
            role="tabpanel"
            aria-labelledby="received-tab"
          >
            <div className="rbt-dashboard-table table-responsive mobile-table-750">
              <table className="rbt-table table bg-light">
                <tbody>
                  {[...Array(skeletonCount)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Skeleton width={100} height={20} />
                      </td>
                      <td>
                        <Skeleton width={300} height={20} />
                      </td>
                      <td>
                        <Skeleton width={20} height={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSkeleton;
