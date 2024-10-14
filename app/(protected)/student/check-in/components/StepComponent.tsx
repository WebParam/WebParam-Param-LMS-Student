// Define the allowed step values
type StepNumber = 3 | 4 | 5 | 6;  // Add more numbers if needed

// Update the props type
interface StepComponentProps {
    step: StepNumber;
}

// Define stepTitles with the correct type
const stepTitles: Record<StepNumber, string> = {
    3: "Step 3 Title",
    4: "Step 4 Title",
    5: "",
    6: ""
};

export default function StepComponent({ step }: StepComponentProps) {
    return (
        <div >
            <h2>{`Step ${step}:`}</h2>
        </div>
    );
}
