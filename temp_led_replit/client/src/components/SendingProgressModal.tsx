import { useState, useEffect } from "react";

interface SendingProgressModalProps {
  isOpen: boolean;
  selectedLeads: string[];
  onComplete: () => void;
}

export default function SendingProgressModal({
  isOpen,
  onComplete,
  selectedLeads
}: SendingProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    const steps = selectedLeads.length;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / steps);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
      
      setCurrentStep(prev => Math.min(prev + 1, steps));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, selectedLeads.length, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fab fa-whatsapp text-whatsapp text-2xl animate-pulse"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Enviando mensagens...</h3>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-whatsapp h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="space-y-2 text-sm">
            {selectedLeads.map((leadName, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{leadName}</span>
                {index < currentStep ? (
                  <i className="fas fa-check text-success"></i>
                ) : index === currentStep ? (
                  <i className="fas fa-spinner fa-spin text-whatsapp"></i>
                ) : (
                  <i className="fas fa-clock text-gray-400"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
