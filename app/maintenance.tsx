import React from 'react';

const Maintenance: React.FC = () => {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{margin:'200px 0'}}>
            <h1>Maintenance Mode</h1>
            <p>{process.env.NEXT_PUBLIC_DEPLOYMENTMESSAGE}</p>
        </div>
    </div>
  );
};

export default Maintenance;