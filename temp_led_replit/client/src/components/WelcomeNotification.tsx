import { useState, useEffect } from "react";

interface WelcomeNotificationProps {
  message?: string;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function WelcomeNotification({ 
  message = "Bem-vindo! Encontramos 1.247 oportunidades para você",
  autoHide = true,
  autoHideDelay = 5000
}: WelcomeNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  if (!isVisible) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bg-whatsapp text-white px-4 py-3 z-50 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="fas fa-rocket animate-bounce-gentle"></i>
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
