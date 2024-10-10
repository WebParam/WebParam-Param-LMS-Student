// components/CardSkeleton.js
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardStyle = {
  width: '40%', 
  padding: '20px', 
  borderRadius: '8px', 
//   border: '1px solid #ccc',
};

const CardSkeleton = ({loadingMessage}:{loadingMessage:string}) => {
  return (
    <>
    <p  style={{textAlign: "center"}}>
    {loadingMessage}
    </p>
    <div className='flex flex-wrap gap-4' style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
      {[1,2,3,4].map((index) => (
          <div key={index} className="card-skeleton" style={cardStyle}>
          <div style={{ marginTop: '10px' }}>
            <Skeleton height={50} width={`100%`} />
          </div>
        </div>
      ))}
    </div>
      </>
  );
};

export default CardSkeleton;