import { documentsRequired } from "./data";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center position-relative gap-3 w-100 h-100">
        <div className="p-4 bg-light text-center border m-2" style={{ width: '25%' }}>
            <Skeleton height={500} width={150} />
        </div>
        <div className="p-4 bg-light text-center border m-2" style={{ width: '65%' }}>
            <Skeleton height={500} width={500} />
        </div>

        <div className="p-4 bg-light text-center border m-2" style={{ width: '15%' }}>
            <Skeleton height={500} width={100} />
        </div>
        
    </div>
  );
}
