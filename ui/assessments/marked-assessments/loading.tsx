import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CompletedSkeleton() {
    return (
    <div className="rbt-dashboard-table table-responsive mobile-table-750">
        <Skeleton width={'100%'} height={30} />
        <Skeleton width={'100%'} height={30} />
        <Skeleton width={'100%'} height={30} />
    </div>)
}