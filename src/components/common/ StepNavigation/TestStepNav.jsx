import  { useState } from "react";
import { PrevButton,NextButton } from "../ StepNavigation/NextPrevButton";
const TestStepNav = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Current Step: {step}</h2>

      <div className="flex justify-between">
        <PrevButton onClick={handlePrev}  />
        <NextButton onClick={handleNext} loading={true} />
      </div>
    </div>
  );
};

export default TestStepNav;

