import React from "react";
import Stepper from "./Stepper"; // Adjust the import path as necessary

const ProgrammeJourneyPage: React.FC = () => {
  const demoTitle = "Front End Developer";
  const demoLatestCompletedStep = 2; // Example: latest completed step is 2

  // Create an array of demo data
  const demoData = [
    { title: "Front End Developer", completedSteps: 2 },
    { title: "Back End Developer", completedSteps: 3 },
  ];

  return (
    <div style={{ margin: "100px" }}>
      {" "}
      {/* Add padding to the container */}
      <h3>Application Status</h3> {/* Title */}
      <p style={{ fontSize: "14px", color: "#666" }}>
        {" "}
        {/* Subtitle with smaller text */}
        Below is a summary of your current application statuses
      </p>
      <hr style={{ border: "1px solid #000000" }} /> {/* Separator line */}
      {demoData.map((data, index) => (
        <React.Fragment key={index}>
          <Stepper title={data.title} completedSteps={data.completedSteps} />
          {index < demoData.length - 1 && (
            <hr style={{ border: "1px solid #666666" }} />
          )}{" "}
          {/* Add a line separator unless it's the last Stepper */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgrammeJourneyPage;
