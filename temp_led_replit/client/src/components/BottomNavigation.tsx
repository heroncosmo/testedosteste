interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "feed", label: "Feed", icon: "fas fa-home" },
  { id: "conversations", label: "Conversas", icon: "fas fa-comments", hasNotification: true },
  { id: "favorites", label: "Favoritos", icon: "fas fa-star" },
  { id: "analytics", label: "Analytics", icon: "fas fa-chart-line" },
  { id: "profile", label: "Perfil", icon: "fas fa-user" }
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-1 py-2">
      <div className="flex justify-around">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center py-2 px-3 transition-colors relative ${
              activeTab === item.id ? "text-whatsapp" : "text-gray-500 hover:text-whatsapp"
            }`}
          >
            <i className={`${item.icon} text-lg mb-1`}></i>
            <span className="text-xs font-medium">{item.label}</span>
            {item.hasNotification && activeTab !== item.id && (
              <span className="absolute top-1 right-1 bg-conversion w-2 h-2 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
