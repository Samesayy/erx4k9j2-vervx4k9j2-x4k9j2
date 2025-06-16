// components/list-your-space/StepIndicator.jsx
export default function StepIndicator({ currentStep, totalSteps = 5 }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mb-12">
      {steps.map((step) => (
        <div key={step} className="flex items-center space-x-2">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300
              ${currentStep >= step ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'}
            `}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div className={`h-1 w-12 md:w-24 rounded-full transition-all duration-300 ${currentStep > step ? 'bg-brand-primary' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}