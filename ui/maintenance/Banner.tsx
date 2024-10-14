import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { useDeploymentTime } from '../../app/Utils/useDeploymentTime';
import MaintenanceModal from './MaintenanceModal';

const Banner: React.FC = () => {
  const { showBanner, endTime } = useDeploymentTime();

  if (!showBanner) return null;

  return (
    <Card className="w-full">
      <CardBody>
        {/* You can add any banner-specific content here if needed */}
        <MaintenanceModal show={showBanner} onHide={() => {}} endTime={endTime} />
      </CardBody>
    </Card>
  );
};

export default Banner;