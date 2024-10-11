// components/CardSkeleton.js
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardStyle = {
  width: '200px', 
  padding: '20px', 
  borderRadius: '8px', 
  border: '1px solid #ccc',
};

const CardSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-4' style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
      {[1,2,3,4,5,6].map((index) => (
        <div key={index} className="card-skeleton" style={cardStyle}>
          <Skeleton height={180} /> {/* Image placeholder */}
          <div style={{ marginTop: '10px' }}>
            <Skeleton height={20} width={`80%`} />
            <Skeleton height={15} width={`60%`} />
            <Skeleton height={15} width={`90%`} />
            <Skeleton height={30} width={`50%`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;