export default function StepComponent({ step }: { step: number }) {
    const stepTitles = {
        3: "Learning",
        4: "Overall Review",
    };

    return (
        <div >
            <h2>{`Step ${step}:`}</h2>
        </div>
    );
}