interface TopStatusBarProps {
  creditsRemaining: number;
  totalCredits: number;
  notificationCount?: number;
}

export default function TopStatusBar({ 
  creditsRemaining, 
  totalCredits, 
  notificationCount = 3 
}: TopStatusBarProps) {
  const progressPercentage = (creditsRemaining / totalCredits) * 100;

  return (
    <div className="bg-white text-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-whatsapp rounded-lg flex items-center justify-center">
          <i className="fas fa-rocket text-white text-sm"></i>
        </div>
        <div>
          <span className="font-bold text-lg text-gray-900">Lead Pilot</span>
          <p className="text-xs text-gray-500">Networking Inteligente</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {/* Enhanced Credits with progress bar */}
        <div className="flex flex-col items-end">
          <div className="bg-whatsapp/10 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <i className="fas fa-coins text-warning"></i>
            <span>{creditsRemaining}</span>
            <span>/{totalCredits}</span>
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-warning rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        {/* Notification with badge */}
        <div className="relative">
          <i className="fas fa-bell text-lg text-gray-600"></i>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-conversion w-3 h-3 rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
