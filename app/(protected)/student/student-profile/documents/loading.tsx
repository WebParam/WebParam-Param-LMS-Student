import { documentsRequired } from "./data";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <div className="d-flex flex-wrap justify-content-center position-relative gap-3">
        {documentsRequired.map((item:any, index) => (
            
            <div className="p-4 bg-light text-center border m-2" style={{ width: '250px' }} key={index}>
            <h6>
                <Skeleton height={20} width={80} />
            </h6>
            <h3>
                <Skeleton height={30} width={200} />
            </h3>
            <div className="d-flex justify-content-center align-items-center my-3">
                <Skeleton circle={true} height={60} width={60} />
            </div>
            <h5>
                <Skeleton height={20} width={50} />
            </h5>
            <div className="my-3">
                <Skeleton height={25} width={150} />
            </div>
            <div className="d-grid">
                <Skeleton height={40} width={'50%'} />
            </div>
        </div>
        ))}
    </div>
  );
}
